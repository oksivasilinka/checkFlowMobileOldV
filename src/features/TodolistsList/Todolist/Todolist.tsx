import React, {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from "../../../../src/features/TodolistsList/tasks-reducer";
import {FilterValuesType, TodolistDomainType} from "../../../../src/features/TodolistsList/todolists-reducer";
import {TaskStatuses, TaskType} from "../../../../src/api/todolists-api";
import {EditableSpan} from "../../../../src/components/EditableSpan/EditableSpan";
import {Task} from "../../../../src/features/TodolistsList/Todolist/Task/Task";
import {AddItemForm} from "../../../../src/components/AddItemForm/AddItemForm";
import {Button, StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from "../../../../globalStyles";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist called')

    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        const thunk = fetchTasksTC(props.todolist.id)
        // @ts-ignore
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        // props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <View style={[globalStyles.border, styles.wrapper]}>
            <View style={styles.title}>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>

                <TouchableOpacity onPress={removeTodolist}>
                    {/*disabled={props.todolist.entityStatus === 'loading'}*/}
                    <MaterialIcons name="delete" size={28} color="grey"/>
                </TouchableOpacity>
            </View>

            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <View>
                {
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                    removeTask={props.removeTask}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    changeTaskStatus={props.changeTaskStatus}
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