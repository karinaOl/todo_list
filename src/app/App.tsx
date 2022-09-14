import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar/Header";
import {CircularProgress, Container} from "@mui/material";
import {Todolists} from "../features/Todolists/Todolist/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC} from "./app-reducer";


function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(()=> {
        dispatch(initializeAppTC())
    })

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <CustomizedSnackbars/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<Todolists/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path='*' element={<Navigate to={"/404"}/>} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
