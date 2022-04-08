import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskID: string) => void
    changeFilterValue: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeCheckbox: (taskID: string, isDone:boolean)=>void
    filter: FilterValueType
}

export const Todolist = (props: TodolistType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
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
      props.changeCheckbox(taskID, isDone)
    }

    const onClickChangeFilterHandlerAll = () => {
        props.changeFilterValue("all")
    }
    const onClickChangeFilterHandlerActive = () => {
        props.changeFilterValue("active")
    }
    const onClickChangeFilterHandlerCompleted = () => {
        props.changeFilterValue("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                        props.removeTask(el.id)
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