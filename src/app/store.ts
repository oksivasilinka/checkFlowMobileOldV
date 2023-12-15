import {combineReducers} from 'redux'
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../../src/features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../src/features/TodolistsList/todolists-reducer";
import {appReducer} from "../../src/app/app-reducer";
import {authReducer} from "../../src/features/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({reducer: rootReducer});

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch<AppDispatch>

// @ts-ignore
window.store = store;
