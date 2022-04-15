import React from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    removeTask: (todoListID: string, taskID: string) => void
    changeFilterValue: (todoListID: string, filter: FilterValueType) => void
    addTask: (todoListID: string, title: string) => void
    changeCheckbox: (todoListID: string, taskID: string, isDone:boolean)=>void
    filter: FilterValueType
    removeTodoList: (todoListID: string)=>void
    updateTodoList: (todoListID: string, newTitle:string)=>void
    updateTask: (todoListID: string, taskID: string, newTitle:string)=>void
}

export const Todolist = (props: TodolistType) => {

    const onClickRemoveHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTask = (title:string) => {
        props.addTask(props.todoListID, title)
    }

    const changeStatusHandler = (taskID: string, isDone:boolean) => {
      props.changeCheckbox(props.todoListID,taskID, isDone)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.updateTodoList(props.todoListID, newTitle)
    }

    const changeTaskTitleHandler = (taskID:string, newTitle: string) => {
      props.updateTask(props.todoListID,taskID,newTitle)
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
                        props.removeTask(props.todoListID, el.id)
                    }
                    return (
                        <li key={el.id}>
                            <Checkbox color="secondary"
                                      checked={el.isDone}
                                      onChange={(e)=>changeStatusHandler(el.id,e.currentTarget.checked)}/>
                           {/* <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(e)=>changeStatusHandler(el.id,e.currentTarget.checked)}/>*/}
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