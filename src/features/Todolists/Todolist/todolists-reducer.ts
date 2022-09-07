import {todolistsAPI, TodolistType} from "../../../api/todoist-api";
import {AppThunk} from "../../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC, setAppStatusACType} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


//todolist-reducer.tsx
const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state = initialState, action: TodolistReducerType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistID)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.todolistID
                ? {...el, title: action.payload.title}
                : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.todolistID
                ? {...el, filter: action.payload.filter}
                : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: "all", entityStatus: "idle"}))
        case "TODO/CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(el => el.id === action.todolistID ? {...el, entityStatus: action.status} : el)

        default:
            return state
    }
}

// actions creator
export const removeTodolistAC = (todolistID: string) =>
    ({type: 'REMOVE-TODOLIST', todolistID}) as const

export const addTodoListAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist}) as const

export const changeTodolistEntityStatusAC = (todolistID: string, status: RequestStatusType) =>
    ({type: "TODO/CHANGE-TODOLIST-ENTITY-STATUS", todolistID, status}) as const

export const updateTodoListAC = (todolistID: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistID, title}}) as const

export const changeFilterValueAC = (todolistID: string, filter: FilterValueType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {todolistID, filter}} as const)

export const setTodolistAC = (todolists: TodolistType[]) =>
    ({type: "SET-TODOLISTS", todolists}) as const


//thanks creator
export const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTodolistTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistID, "loading"))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
        dispatch(changeTodolistEntityStatusAC(todolistID, "failed"))
        handleServerNetworkError(e, dispatch)
    })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const updateTodolistTitleTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistID, "loading"))
    todolistsAPI.updateTodolist(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTodoListAC(todolistID, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(changeTodolistEntityStatusAC(todolistID, "idle"))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTodolistEntityStatusAC(todolistID, "failed"))
    })
}

//types
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>

export type TodolistReducerType = RemoveTodolistACType
    | AddTodoListACType
    | ReturnType<typeof updateTodoListAC>
    | ReturnType<typeof changeFilterValueAC>
    | SetTodolistACType
    | setAppStatusACType
    | ReturnType<typeof changeTodolistEntityStatusAC>


export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType,
    entityStatus: RequestStatusType
}