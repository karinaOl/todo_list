import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValueType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Angular", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const [filterValue, setFilterValue] = useState<FilterValueType>("all")

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask,...tasks])
    }

    const changeFilterValue = (filter: FilterValueType) => {
        setFilterValue(filter)
    }

    let currentFilterValue = tasks;
    if (filterValue === "completed") {
        currentFilterValue = tasks.filter(el => el.isDone)
    }
    if (filterValue === "active") {
        currentFilterValue = tasks.filter(el => !el.isDone)
    }

    const changeCheckbox = (taskID: string, isDone:boolean) => {
      setTasks(tasks.map(el=> el.id === taskID ? {...el, isDone} : el))
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={currentFilterValue}
                removeTask={removeTask}
                changeFilterValue={changeFilterValue}
                addTask={addTask}
                changeCheckbox={changeCheckbox}
                filter={filterValue}
            />
        </div>
    );
}

export default App;
