import {AddTodoListACType, RemoveTodolistACType, SetTodolistACType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskType, todolistsAPI} from "../api/todoist-api";
import {AppRootStateType, AppThunk} from "./store";

export type UpdateTaskRequestDataType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
};

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type SetTaskType = ReturnType<typeof setTasksAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>

export type TaskReducerActionType = RemoveTaskType
    | AddTaskType
    | AddTodoListACType
    | RemoveTodolistACType
    | SetTodolistACType
    | SetTaskType
    | UpdateTaskType

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        taskID,
        todolistID
    } as const
}

export const addTaskAC = (task: TaskType, todolistID: string) => {
    return {
        type: "ADD-TASK",
        task,
        todolistID
    } as const
}

export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        todolistID,
        tasks
    } as const
}

export const updateTaskAC = (taskID: string, todolistID: string, updatedTask: TaskType) => {
    return {
        type: "UPDATE_TASK",
        taskID,
        todolistID,
        updatedTask
    } as const
}

export const setTasksTC = (todolistID: string): AppThunk => (dispatch) => {
    todolistsAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(todolistID, res.data.items))
        })
}

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistID, taskID)
        .then(res => dispatch(removeTaskAC(taskID, todolistID)))
}

export const addTaskTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.createTask(todolistID, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item, todolistID))
        })
}

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskRequestDataType): AppThunk => (dispatch, getState: () => AppRootStateType) => {

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
                dispatch(updateTaskAC(taskID, todolistID, res.data.data.item))
            })
    }


}

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
                [action.todolistID]: [action.task, ...state[action.todolistID]]
            }
        case "UPDATE_TASK":{
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskID ? action.updatedTask : el)
            }
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]: []
            }
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
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistID]: action.tasks
            }
        }
        default:
            return state
    }
}

