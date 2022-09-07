// app-reducer.tsx
const initialStateApp = {
    status: "loading" as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state = initialStateApp, action: AppReducerACType): InitialStateAppType => {
    switch (action.type){
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.errorText}
        default:
            return state
    }
}

// actions-creator
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status}) as const
export const setAppErrorAC = (errorText: string | null) => ({type: "APP/SET-ERROR", errorText}) as const


// types
type InitialStateAppType = typeof initialStateApp

export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

export type AppReducerACType = setAppStatusACType | setAppErrorACType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'