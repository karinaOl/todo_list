import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeFilterValueAC,
    removeTodolistAC,
    updateTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
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

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists );
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodolistAC(todoListID);
        dispatch(action);
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID));
    }, [dispatch])

    const addTask = useCallback((title:string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID));
    }, [dispatch])

    const updateTodoList = useCallback((todoListID: string, newTitle: string) => {
        dispatch(updateTodoListAC(todoListID, newTitle));
    }, [dispatch])
    const updateTask = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistID));
    }, [dispatch])

    const changeFilterValue = useCallback((todoListID: string, filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoListID, filter));
    }, [dispatch])

    const changeCheckbox = useCallback((taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID));
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

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
