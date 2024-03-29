import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todoist-api";
import {FilterValueType} from "./todolists-reducer";
import {useAppDispatch} from "../../../app/store";
import {setTasksTC, TaskDomainType} from "./tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";


type TodolistType = {
    todoListID: string
    title: string
    tasks: TaskDomainType[]
    removeTask: (taskID: string, todolistID: string) => void
    changeFilterValue: (todoListID: string, filter: FilterValueType) => void
    addTask: (title: string, todolistID: string) => void
    changeCheckbox: (taskID: string, status: TaskStatuses, todolistID: string) => void
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
    updateTodoList: (todoListID: string, newTitle: string) => void
    updateTask: (taskID: string, title: string, todolistID: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = React.memo((props: TodolistType) => {

    const dispatch = useAppDispatch();

    const onClickRemoveHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID])

    const changeTodolistTitleHandler = useCallback( (newTitle: string) => {
        props.updateTodoList(props.todoListID, newTitle)
    }, [props.todoListID, props.todoListID])

    const onClickChangeFilterHandlerAll = useCallback(() => {
        props.changeFilterValue(props.todoListID, "all")
    }, [props.changeFilterValue, props.todoListID])

    const onClickChangeFilterHandlerActive = useCallback(() => {
        props.changeFilterValue(props.todoListID, "active")
    }, [props.changeFilterValue, props.todoListID])

    const onClickChangeFilterHandlerCompleted = useCallback(() => {
        props.changeFilterValue(props.todoListID, "completed")
    }, [props.changeFilterValue, props.todoListID])

    let currentFilterValue = props.tasks;

    if (props.filter === "completed") {
        currentFilterValue = props.tasks.filter(el => el.status === TaskStatuses.Completed);
    }
    if (props.filter === "active") {
        currentFilterValue = props.tasks.filter(el => el.status === TaskStatuses.New);
    }

    useEffect(()=>{
        dispatch(setTasksTC(props.todoListID))
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan disabled={props.entityStatus === "loading"} title={props.title} callBack={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete"
                            onClick={onClickRemoveHandler}
                            disabled={props.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTask} disabled={props.entityStatus === "loading"}/>
            <ul>
                {currentFilterValue.map(el => <Task removeTask={props.removeTask}
                                             changeCheckbox={props.changeCheckbox}
                                             updateTask={props.updateTask}
                                             task={el}
                                             todoListID={props.todoListID}
                                             key={el.id}/>)}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={onClickChangeFilterHandlerAll}>
                    All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={onClickChangeFilterHandlerActive}>
                    Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={onClickChangeFilterHandlerCompleted}>
                    Completed
                </Button>
            </div>
        </div>
    )
})

