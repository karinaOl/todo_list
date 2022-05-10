import {v1} from "uuid";
import {AddTodoListACType, RemoveTodolistACType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodoListACType | RemoveTodolistACType

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return{
        type: "REMOVE-TASK",
        taskID,
        todolistID
    }as const
}

export const addTaskAC = (title:string, todolistID: string) =>{
    return{
        type: "ADD-TASK",
        title,
        todolistID
    }as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
  return{
      type: "CHANGE-TASK-STATUS",
      taskID,
      isDone,
      todolistID
  }as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
  return{
      type: "CHANGE-TASK-TITLE",
      taskID,
      title,
      todolistID
  }as const
}

const initialState: TasksStateType = {};

export const tasksReducer = (state= initialState, action: ActionType) : TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]:state[action.todolistID].filter(el=> el.id !== action.taskID)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]:[{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistID]:state[action.todolistID].map(el=> el.id === action.taskID ? {...el, isDone: action.isDone} : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistID]:state[action.todolistID]
                    .map(el=>el.id === action.taskID ? {...el, title: action.title} : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistID]:[]
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete  copyState[action.todolistID]
            //let {[action.todolistID]:[], ...rest} = {...state}
            return copyState
        default: return state
    }
}

