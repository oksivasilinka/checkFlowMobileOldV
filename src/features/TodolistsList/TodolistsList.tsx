import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from "app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "features/TodolistsList/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "features/TodolistsList/tasks-reducer";
import {TaskStatuses} from "api/todolists-api";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {Todolist} from "features/TodolistsList/Todolist/Todolist";
import {View} from "react-native";

export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        const thunk = fetchTodolistsTC()
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        // @ts-ignore
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        // return <Navigate to={"/login"}/>
    }

    return (
        <View style={{ gap: 40}}>
            <View>
                {todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (
                        <View key={tl.id}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}

                            />
                        </View>
                    )
                })
                }
            </View>
            <View>
                <AddItemForm addItem={addTodolist}/>
            </View>
        </View>
    )
}
