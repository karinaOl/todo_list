import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
    changeFilterValueAC, createTodolistTC,
    FilterValueType, getTodosTC,
    removeTodolistTC,
    updateTodolistTitleTC
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC,updateTaskTC} from "./tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/todoist-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";

export const Todolists = () => {
    let todolists = useAppSelector(state => state.todolists);
    let tasks = useAppSelector(state => state.tasks);

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
    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm callBack={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(el => {

                return <Grid item>
                    <Paper style={{padding: "10px"}}>
                        <Todolist
                            key={el.id}
                            entityStatus={el.entityStatus}
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
    </>
}