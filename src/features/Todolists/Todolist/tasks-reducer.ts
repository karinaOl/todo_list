import {
    addTodoListAC,
    AddTodoListACType, removeTodolistAC,
    RemoveTodolistACType, setTodolistAC,
    SetTodolistACType
} from "./todolists-reducer";
import {TaskType, todolistsAPI} from "../../../api/todoist-api";
import {AppRootStateType, AppThunk} from "../../../app/store";
import {
    RequestStatusType, setAppStatusAC,
} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



//task-reducer.tsx
const initialState: TasksStateType = {};

const slice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistID: string }>) {
            const task = state[action.payload.todolistID]
            const index = task.findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                task.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: "idle"})
        },
        setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) {
            state[action.payload.todolistID] = action.payload.tasks.map(el => ({...el, entityStatus: "idle"}));
        },
        updateTaskAC(state, action: PayloadAction<{ taskID: string, todolistID: string, updatedTask: UpdateTaskRequestDataType }>) {
            const task = state[action.payload.todolistID]
            const index = task.findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                task[index] = {...task[index], ...action.payload.updatedTask}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ taskID: string, todolistID: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistID];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index > -1) tasks[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistAC, (state, action) => {
            action.payload.todolists.forEach(el => state[el.id] = [])
        });
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistID]
        });
    },
})

export const tasksReducer = slice.reducer;
export const {
    removeTaskAC,
    addTaskAC,
    setTasksAC,
    updateTaskAC,
    changeTaskEntityStatusAC
} = slice.actions;

//thanks creator
export const setTasksTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC({todolistID: todolistID, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTaskEntityStatusAC({taskID: taskID, todolistID: todolistID, status: "loading"}))
    todolistsAPI.deleteTask(todolistID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskID: taskID, todolistID: todolistID}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTaskEntityStatusAC({
            taskID: taskID, todolistID: todolistID, status: "failed"
        }))
    })
}

export const addTaskTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskRequestDataType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTaskEntityStatusAC({taskID: taskID, todolistID: todolistID, status: "loading"}))
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
                    dispatch(updateTaskAC({
                        taskID: taskID,
                        todolistID: todolistID,
                        updatedTask: res.data.data.item
                    }))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(changeTaskEntityStatusAC({
                    taskID: taskID,
                    todolistID: todolistID,
                    status: "idle"
                }))
            }).catch((e) => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTaskEntityStatusAC({
                taskID: taskID,
                todolistID: todolistID,
                status: "failed"
            }))
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
    [todoList_ID: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {entityStatus: RequestStatusType}

export type TaskReducerActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListACType
    | RemoveTodolistACType
    | SetTodolistACType
    | ReturnType<typeof changeTaskEntityStatusAC>




