import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    changeFilterValueAC, createTodolistTC, FilterValueType, getTodosTC,
    removeTodolistTC, TodolistDomainType,
    updateTodolistTitleTC
} from "./state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC,
    updateTaskTC
} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todoist-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useAppDispatch();

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID));
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todolistID: string) => {
        dispatch(removeTaskTC(todolistID, taskID));
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskTC(todolistID, title));
    }, [dispatch])

    const updateTodoList = useCallback((todoListID: string, newTitle: string) => {
        dispatch(updateTodolistTitleTC(todoListID, newTitle));
    }, [dispatch])
    const updateTask = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(updateTaskTC(todolistID, taskID, {title}))
    }, [dispatch])

    const changeFilterValue = useCallback((todoListID: string, filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoListID, filter));
    }, [dispatch])

    const changeCheckbox = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        dispatch(updateTaskTC(todolistID, taskID, {status}));
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodosTC())
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={el.id}
                                    todoListID={el.id}
                                    title={el.title}
                                    tasks={tasks[el.id]}
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
