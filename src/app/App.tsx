import React from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar/Header";
import {Container, LinearProgress} from "@mui/material";
import {Todolists} from "../features/Todolists/Todolist/TodolistsList";
import {useAppSelector} from "./store";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";


function App() {

    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <CustomizedSnackbars/>
            <ButtonAppBar/>
            {status === "loading" && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Todolists/>
            </Container>
        </div>
    );
}

export default App;
