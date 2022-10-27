import React from "react"
import {Provider} from "react-redux";
import {AppRootStateType} from "../app/store";
import {applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/Todolist/tasks-reducer";
import {todolistsReducer} from "../features/Todolists/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todoist-api";
import thunk from "redux-thunk";
import {HashRouter} from "react-router-dom";


import {Story} from "@storybook/react";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: "",
                entityStatus: "idle"
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: "",
                entityStatus: "idle"
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: "",
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: "",
                entityStatus: "idle"
            }
        ]
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

export const ReduxStoreProviderDecorator = (StoryFn: Story) => {
    return (
        <Provider store={storyBookStore}>
            <StoryFn/>
        </Provider>
    );
};

export const BrowserRouterDecorator = (StoryFn: Story) => {
    return (
        <HashRouter>
            <StoryFn/>
        </HashRouter>
    );
};