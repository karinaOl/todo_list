import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValueType = "all" | "active" | "completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string] : TasksType[]
}

function App() {

    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
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
        setTodolists(todolists.filter(el=> el.id!==todoListID))
        delete tasks[todoListID]
    }

    const removeTask = (todoListID: string, taskID: string,) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el=> el.id!==taskID)})
    }

    const addTask = (todoListID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const changeFilterValue = (todoListID: string, filter: FilterValueType) => {
        setTodolists(todolists.map(el=> el.id === todoListID ? {...el, filter: filter} : el))
    }

    const changeCheckbox = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let currentFilterValue = tasks[el.id];
                if (el.filter === "completed") {
                    currentFilterValue = tasks[el.id].filter(el => el.isDone)
                }
                if (el.filter === "active") {
                    currentFilterValue = tasks[el.id].filter(el => !el.isDone)
                }
                return (
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
                    />
                )
            })}
        </div>
    );
}

export default App;
