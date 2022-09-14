// app-reducer.tsx
import {AppThunk} from "./store";
import {authAPI} from "../api/todoist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialStateApp = {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state = initialStateApp, action: AppReducerACType): InitialStateAppType => {
    switch (action.type){
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.errorText}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// actions-creator
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status}) as const
export const setAppErrorAC = (errorText: string | null) => ({type: "APP/SET-ERROR", errorText}) as const
export const setAppInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value}) as const

//thanks creator
export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try{
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (e){
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(setAppInitializedAC(true))
    }
}

// types
type InitialStateAppType = typeof initialStateApp

export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>

export type AppReducerACType = setAppStatusACType | setAppErrorACType | setAppInitializedACType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'