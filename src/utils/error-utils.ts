import {AppDispatch} from "../app/store";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todoist-api";
import {Dispatch} from "redux";


export const handleServerNetworkError   = (error: {message:string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({errorText: error.message ? error.message : "Some error occurred"}))
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({errorText: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({errorText: "Some error occurred"}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}