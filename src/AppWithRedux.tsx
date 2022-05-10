import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeFilterValueAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists );
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    console.log(tasks)
    console.log(tasks[todolistsID1])

    const removeTodoList = (todoListID: string) => {
        let action = removeTodolistAC(todoListID);
        dispatch(action);
    }

    const removeTask = (taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID));
    }

    const addTask = (title:string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID));
    }

    const updateTodoList = (todoListID: string, newTitle: string) => {
        dispatch(updateTodoListAC(todoListID, newTitle));
    }
    const updateTask = (taskID: string, title: string, todolistID: string) => {
       dispatch(changeTaskTitleAC(taskID, title, todolistID));
    }

    const changeFilterValue = (todoListID: string, filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoListID, filter));
    }

    const changeCheckbox = (taskID: string, isDone: boolean, todolistID: string) => {
       dispatch(changeTaskStatusAC(taskID, isDone, todolistID));
    }

    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        let currentFilterValue = tasks[el.id];
                        if (el.filter === "completed") {
                            currentFilterValue = tasks[el.id].filter(el => el.isDone)
                        }
                        if (el.filter === "active") {
                            currentFilterValue = tasks[el.id].filter(el => !el.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={el.id}
                                    todoListID={el.id}
                                    title={el.title}
                                    tasks={currentFilterValue}
                                    removeTask={removeTask}
                                    changeFilterValue={changeFilterValue}
                                    addTask={addTask}
                                    changeCheckbox={changeCheckbox}
                                    filter={el.filter}
                                    removeTodoList={removeTodoList}
                                    updateTodoList={updateTodoList}
                                    updateTask={updateTask}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
