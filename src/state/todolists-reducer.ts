import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

type TodolistReducerType = RemoveTodolistACType | AddTodoListACType | UpdateTodoListACType | ChangeFilterValueACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>
type ChangeFilterValueACType = ReturnType<typeof changeFilterValueAC>

export const removeTodolistAC = (todolistID: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        todolistID
    }as const
}

export const addTodoListAC = (title: string) => {
    return{
        type: 'ADD-TODOLIST',
        title,
        todolistID: v1()
    }as const
}

export const updateTodoListAC = (todolistID:string, title: string) => {
  return{
      type: 'CHANGE-TODOLIST-TITLE',
      payload:{
          todolistID,
          title
      }
  }as const
}
export const changeFilterValueAC = (todolistID: string, filter: FilterValueType) => {
  return{
      type: 'CHANGE-TODOLIST-FILTER',
      payload:{
          todolistID,
          filter
      }
  }as const
}

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerType) : TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el=> el.id !== action.todolistID)
        case 'ADD-TODOLIST':
            let newID = v1();
            //let newTodoList: TodolistType = {id: newID, title: action.title, filter: "all"}
            return [{id: action.todolistID, title: action.title, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id === action.payload.todolistID
            ? {...el, title: action.payload.title}
            : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el=> el.id === action.payload.todolistID
            ? {...el, filter: action.payload.filter}
            : el)
        default: return  state
    }
}