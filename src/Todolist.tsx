import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

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
}

export const Todolist = (props: TodolistType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickRemoveHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todoListID, title)
        }else{
            setError('Title is required')
        }
        setTitle('')
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Enter"){
          onClickAddTaskHandler()
      }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const changeStatusHandler = (taskID: string, isDone:boolean) => {
      props.changeCheckbox(props.todoListID,taskID, isDone)
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
                {props.title}
                <button onClick={onClickRemoveHandler}>x</button>
            </h3>
            <div>
                <input
                    className={error ? "error" : ''}
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(props.todoListID, el.id)
                    }
                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(e)=>changeStatusHandler(el.id,e.currentTarget.checked)}/>
                            <span>{el.title}</span>
                            <button onClick={onClickRemoveTaskHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "activeFilter" : ''} onClick={onClickChangeFilterHandlerAll}>All</button>
                <button className={props.filter === "active" ? "activeFilter" : ''} onClick={onClickChangeFilterHandlerActive}>Active</button>
                <button className={props.filter === "completed" ? "activeFilter" : ''} onClick={onClickChangeFilterHandlerCompleted}>Completed</button>
            </div>
        </div>
    )
}