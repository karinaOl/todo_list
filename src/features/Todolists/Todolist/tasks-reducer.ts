import {
    AddTodoListACType,
    RemoveTodolistACType,
    SetTodolistACType
} from "./todolists-reducer";
import {TaskType, todolistsAPI} from "../../../api/todoist-api";
import {AppRootStateType, AppThunk} from "../../../app/store";
import {
    RequestStatusType,
    setAppErrorAC,
    setAppErrorACType,
    setAppStatusAC,
    setAppStatusACType
} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


//task-reducer.tsx
const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [{...action.task, entityStatus: "idle"}, ...state[action.todolistID]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskID ? {...el, ...action.updatedTask} : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todolistID]
            //let {[action.todolistID]:[], ...rest} = {...state}
            return copyState
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.map(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "TASK/CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskID ? {...el, entityStatus: action.status} : el)
            }
        case "SET-TASKS":
            return {...state, [action.todolistID]: action.tasks.map(el => ({...el, entityStatus: "idle"}))}
        default:
            return state
    }
}

// actions creator
export const removeTaskAC = (taskID: string, todolistID: string) =>
    ({type: "REMOVE-TASK", taskID, todolistID}) as const

export const addTaskAC = (task: TaskType, todolistID: string) =>
    ({type: "ADD-TASK", task, todolistID}) as const

export const setTasksAC = (todolistID: string, tasks: TaskType[]) =>
    ({type: "SET-TASKS", todolistID, tasks}) as const

export const updateTaskAC = (taskID: string, todolistID: string, updatedTask: TaskType) =>
    ({type: "UPDATE-TASK", taskID, todolistID, updatedTask}) as const

export const changeTaskEntityStatusAC = (taskID: string, todolistID: string, status: RequestStatusType) =>
    ({type: "TASK/CHANGE-TASK-ENTITY-STATUS", taskID, todolistID, status}) as const


//thanks creator
export const setTasksTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(todolistID, res.data.items))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(taskID, todolistID, "loading"))
    todolistsAPI.deleteTask(todolistID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskID, todolistID))
                dispatch(setAppStatusAC("succeeded"))
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTaskEntityStatusAC(taskID, todolistID, "failed"))
    })
}

export const addTaskTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todolistID))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskRequestDataType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(taskID, todolistID, "loading"))
    const task = getState().tasks[todolistID].find(el => el.id === taskID)
    if (task) {
        todolistsAPI.updateTask(todolistID, taskID, {
            title: task.title,
            status: task.status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskID, todolistID, res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(changeTaskEntityStatusAC(taskID,todolistID, "idle"))
            }).catch((e) => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTaskEntityStatusAC(taskID, todolistID, "failed"))
        })
    }
}

//types
export type UpdateTaskRequestDataType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
};

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TaskReducerActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListACType
    | RemoveTodolistACType
    | SetTodolistACType
    | setAppStatusACType
    | setAppErrorACType
    | ReturnType<typeof changeTaskEntityStatusAC>




