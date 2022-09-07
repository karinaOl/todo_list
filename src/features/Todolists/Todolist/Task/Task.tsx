import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todoist-api";
import {TaskDomainType} from "../tasks-reducer";


type TasksPropsType = {
    removeTask: (taskID: string, todolistID: string) => void
    changeCheckbox: (taskID: string, status: TaskStatuses, todolistID: string) => void
    updateTask: (taskID: string, title: string, todolistID: string) => void
    task: TaskDomainType
    todoListID: string
}
export const Task = React.memo( (props: TasksPropsType) => {
    const onClickRemoveTaskHandler = () => {
        props.removeTask(props.task.id, props.todoListID)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todoListID)
    }

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        props.updateTask(props.task.id, newTitle, props.todoListID)
    }, [props.updateTask, props.task.id, props.todoListID])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "isDone" : ""}>
            <Checkbox color="secondary"
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={changeStatusHandler}/>
            <EditableSpan title={props.task.title}
                          callBack={changeTaskTitleHandler}
                          disabled={props.task.entityStatus === "loading"}
            />
            <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler} disabled={props.task.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </div>
    )
})