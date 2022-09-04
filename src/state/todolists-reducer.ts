import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todoist-api";
import {AppActionType, AppThunk} from "./store";
import {Dispatch} from "redux";

export type TodolistReducerType = RemoveTodolistACType
    | AddTodoListACType
    | UpdateTodoListACType
    | ChangeFilterValueACType
    | SetTodolistACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>
type ChangeFilterValueACType = ReturnType<typeof changeFilterValueAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID
    } as const
}

export const addTodoListAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist,

    } as const
}

export const updateTodoListAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            title
        }
    } as const
}
export const changeFilterValueAC = (todolistID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID,
            filter
        }
    } as const
}

export const setTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}


export const getTodosTC = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))
        })
}

export const removeTodolistTC = (todolistID:string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC(todolistID))
        })
}

export const createTodolistTC = (title:string): AppThunk => (dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })

}

export const updateTodolistTitleTC = (todolistID:string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(todolistID, title)
        .then(res => {
            dispatch(updateTodoListAC(todolistID,title))
        })
}

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state = initialState, action: TodolistReducerType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistID)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.todolistID
                ? {...el, title: action.payload.title}
                : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.todolistID
                ? {...el, filter: action.payload.filter}
                : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: "all"}))
        default:
            return state
    }
}