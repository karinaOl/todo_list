import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "21db99da-e3b9-4d8a-b289-1f482b433dd9"
    }
})

//api
export const todolistsAPI = {
    updateTodolist(todolistID:string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
    },
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title:string) {
        return instance.post<ResponseType<{item: TodolistType}>>("todo-lists", {title})
    },
    deleteTodolist(todolistID:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    getTasks(todolistID: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title:string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks`, {title})
    },
    deleteTask(todolistID: string, taskID:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID:string, model: UpdateTaskRequestDataType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    }
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    todoListId: string
    id: string
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
    order: number
};

export type UpdateTaskRequestDataType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
};

type GetTaskType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
