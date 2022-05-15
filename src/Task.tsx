import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./Todolist";

type TasksPropsType = {
    removeTask: (taskID: string, todolistID: string) => void
    changeCheckbox: (taskID: string, isDone: boolean, todolistID: string) => void
    updateTask: (taskID: string, title: string, todolistID: string) => void
    task: TasksType
    todoListID: string
}
export const Task = React.memo( (props: TasksPropsType) => {
    const onClickRemoveTaskHandler = () => {
        props.removeTask(props.task.id, props.todoListID)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(props.task.id, e.currentTarget.checked, props.todoListID)
    }

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        props.updateTask(props.task.id, newTitle, props.todoListID)
    }, [props.updateTask, props.task.id, props.todoListID])

    return (
        <li key={props.task.id}>
            <Checkbox color="secondary"
                      checked={props.task.isDone}
                      onChange={changeStatusHandler}/>
            <EditableSpan title={props.task.title} callBack={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})