import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'daee8b0a-f79f-4c77-a8a2-1e2410d2bc56',
        'cookie': '_ym_uid=1699463616587500651; _ym_d=1702537737; _ym_isad=1; ASP.NET_SessionId=t4atjgyrzybv21sq5vvxp5aw; .ASPXAUTH=59F14A5F2508205ECB92717736641F23657AE29C75D56E9E26ACC0C8DD947BE93BA570E50DF8C85933317AF8468D7267237DB5475AD8C2D64C4A82FF388823BC7BDCD339A71A2F6E512DBBFC8259D0DBCCDEB3EB'

    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists');
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<Response<{ item: TodolistType }>>('todo-lists', {title: title});
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<Response>(`todo-lists/${id}`);
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<Response>(`todo-lists/${id}`, {title: title});
        return promise;
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<Response<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitile});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<Response<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<Response<{ userId?: number }>>('auth/login', data);
        return promise;
    },
    logout() {
        const promise = instance.delete<Response<{ userId?: number }>>('auth/login');
        return promise;
    },
    me() {
        const promise = instance.get<Response<{ id: number; email: string; login: string }>>('auth/me');
        return promise
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type Response<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
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
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
