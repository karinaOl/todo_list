import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValueType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {

    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistsID1, title: "What to learn", filter: "all"},
        {id: todolistsID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistsID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistsID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Cream", isDone: false},
            {id: v1(), title: "Glasses", isDone: false}
        ],

    });

    console.log(tasks)
    console.log(tasks[todolistsID1])

    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }

    const addTask = (todoListID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const updateTodoList = (todoListID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
    }
    const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    const changeFilterValue = (todoListID: string, filter: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
    }

    const changeCheckbox = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }

    const addTodoList = (title: string) => {
        let newID = v1();
        let newTodoList: TodolistType = {id: newID, title: title, filter: "all"}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newID]: []})
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

export default App;
