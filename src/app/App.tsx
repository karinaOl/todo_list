import React from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar/Header";
import {Container} from "@mui/material";
import {Todolists} from "../features/Todolists/Todolist/TodolistsList";

function App() {
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Todolists/>
            </Container>
        </div>
    );
}

export default App;
