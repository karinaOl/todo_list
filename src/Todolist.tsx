import React from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import { FilterValueType } from "./AppWithRedux";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    removeTask: (taskID: string, todolistID: string) => void
    changeFilterValue: (todoListID: string, filter: FilterValueType) => void
    addTask: (title:string, todolistID: string) => void
    changeCheckbox: (taskID: string, isDone: boolean, todolistID: string)=>void
    filter: FilterValueType
    removeTodoList: (todoListID: string)=>void
    updateTodoList: (todoListID: string, newTitle:string)=>void
    updateTask: (taskID: string, title: string, todolistID: string)=>void
}

export const Todolist = (props: TodolistType) => {

    const onClickRemoveHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTask = (title:string) => {
        props.addTask(title, props.todoListID)
    }

    const changeStatusHandler = (taskID: string, isDone:boolean) => {
      props.changeCheckbox(taskID, isDone, props.todoListID)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.updateTodoList(props.todoListID, newTitle)
    }

    const changeTaskTitleHandler = (taskID:string, newTitle: string) => {
      props.updateTask(taskID,newTitle, props.todoListID)
    }

    const onClickChangeFilterHandlerAll = () => {
        props.changeFilterValue(props.todoListID, "all")
    }
    const onClickChangeFilterHandlerActive = () => {
        props.changeFilterValue(props.todoListID, "active")
    }
    const onClickChangeFilterHandlerCompleted = () => {
        props.changeFilterValue(props.todoListID, "completed")
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickRemoveHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm callBack={addTask}/>
            <ul>
                {props.tasks.map(el => {
                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(el.id, props.todoListID)
                    }
                    return (
                        <li key={el.id}>
                            <Checkbox color="secondary"
                                      checked={el.isDone}
                                      onChange={(e)=>changeStatusHandler(el.id,e.currentTarget.checked)}/>
                            <EditableSpan title={el.title} callBack={(newTitle)=>changeTaskTitleHandler(el.id,newTitle)}/>
                            <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
                                <Delete />
                            </IconButton>
                        </li>
                    )
                })}
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
}