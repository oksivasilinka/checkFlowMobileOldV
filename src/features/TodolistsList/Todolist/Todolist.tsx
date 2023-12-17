import React, {useCallback, useEffect} from 'react'
import {fetchTasksTC} from "features/TodolistsList/tasks-reducer";
import {FilterValuesType, TodolistDomainType} from "features/TodolistsList/todolists-reducer";
import {TaskStatuses, TaskType} from "api/todolists-api";
import {EditableSpan} from "components/EditableSpan/EditableSpan";
import {Task} from "features/TodolistsList/Todolist/Task/Task";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {Button, StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from "globalStyles";
import {useAppDispatch} from "app/store";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

}

export const Todolist = React.memo(function ({
                                                 todolist,
                                                 removeTodolist,
                                                 removeTask,
                                                 addTask,
                                                 changeTaskStatus,
                                                 changeTaskTitle,
                                                 changeTodolistTitle,
                                                 changeFilter,
                                                 tasks
                                             }: Props) {


    const dispatch = useAppDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(todolist.id)
        dispatch(thunk)
    }, [])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [todolist.id, changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [todolist.id, changeFilter])


    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <View style={[globalStyles.card, styles.wrapper]}>
            <View style={styles.title}>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>

                <TouchableOpacity onPress={removeTodolistHandler}>
                    {/*disabled={props.todolist.entityStatus === 'loading'}*/}
                    <MaterialIcons name="delete" size={28} color="grey"/>
                </TouchableOpacity>
            </View>

            <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
            <View>
                {
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                                                    removeTask={removeTask}
                                                    changeTaskTitle={changeTaskTitle}
                                                    changeTaskStatus={changeTaskStatus}
                        />
                    )}
            </View>
            <View style={styles.buttonWrapper}>
                <Button title={'All'} color={'grey'} onPress={onAllClickHandler}/>
                <Button title={'Active'} color={'grey'} onPress={onActiveClickHandler}/>
                <Button title={'Completed'} color={'grey'} onPress={onCompletedClickHandler}/>
            </View>
        </View>
    )
})


const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    buttonWrapper: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 10
    }
})