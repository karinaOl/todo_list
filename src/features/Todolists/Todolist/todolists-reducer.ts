import {todolistsAPI, TodolistType} from "../../../api/todoist-api";
import {AppThunk} from "../../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


//todolist-reducer.tsx
const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistID: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistID: string, status: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            state[index].entityStatus = action.payload.status
        },
        updateTodoListAC(state, action: PayloadAction<{ todolistID: string, title: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            state[index].title = action.payload.title
        },
        changeFilterValueAC(state, action: PayloadAction<{ todolistID: string, filter: FilterValueType }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            state[index].filter = action.payload.filter
        },
        setTodolistAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(el => ({...el, filter: "all", entityStatus: "idle"}))
        },
    }
})

export const todolistsReducer = slice.reducer;
export const {
    removeTodolistAC,
    addTodoListAC,
    changeTodolistEntityStatusAC,
    updateTodoListAC,
    changeFilterValueAC,
    setTodolistAC
} = slice.actions;


//thanks creator
export const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTodolistTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({todolistID: todolistID, status: "loading"}))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({todolistID: todolistID}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
        dispatch(changeTodolistEntityStatusAC({todolistID: todolistID, status: "failed"}))
        handleServerNetworkError(e, dispatch)
    })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const updateTodolistTitleTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({todolistID: todolistID, status: "loading"}))
    todolistsAPI.updateTodolist(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTodoListAC({todolistID: todolistID, title: title}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(changeTodolistEntityStatusAC({todolistID: todolistID, status: "idle"}))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTodolistEntityStatusAC({todolistID: todolistID, status: "failed"}))
    })
}

//types
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>


export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType,
    entityStatus: RequestStatusType
}