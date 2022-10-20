// app-reducer.tsx
import {AppThunk} from "./store";
import {authAPI} from "../api/todoist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialStateApp = {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
        name: "app",
        initialState: initialStateApp,
        reducers: {
            setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
                state.status = action.payload.status
            },
            setAppErrorAC(state, action: PayloadAction<{ errorText: string | null }>) {
                state.error = action.payload.errorText
            },
            setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
                state.isInitialized = action.payload.value
            }
        }
    }
)

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions;


//thanks creator
export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(setAppInitializedAC({value: true}))
    }
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'