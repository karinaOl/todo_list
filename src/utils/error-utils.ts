import {AppDispatch} from "../app/store";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todoist-api";


export const handleServerNetworkError   = (error: {message:string}, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}