import {useEffect} from 'react'
import {addTaskTC, fetchTasksTC} from "features/TodolistsList/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistDomainType
} from "features/TodolistsList/todolists-reducer";
import {TaskStatuses, TaskType} from "api/todolists-api";
import {EditableSpan} from "components/EditableSpan/EditableSpan";
import {Task} from "features/TodolistsList/Todolist/Task/Task";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from "globalStyles";
import {useAppDispatch} from "app/store";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

export const Todolist = ({todolist, tasks}: Props) => {
    const {id, title, filter, entityStatus} = todolist

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    const addTaskHandler = (title: string) => {
        dispatch(addTaskTC(title, id))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }

    const onAllClickHandler = () => {
        dispatch(changeTodolistFilterAC(id, 'all'))
    }

    const onActiveClickHandler = () => {
        dispatch(changeTodolistFilterAC(id, 'active'))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodolistFilterAC(id, 'completed'))
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <View style={[globalStyles.card, styles.wrapper]}>
            <View style={styles.title}>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>

                <TouchableOpacity onPress={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                    <MaterialIcons name="delete" size={28} color="grey"/>
                </TouchableOpacity>
            </View>

            <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'}/>
            <View>
                {
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={id}/>
                    )}
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={onAllClickHandler}>
                    <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onActiveClickHandler}>
                    <Text style={styles.buttonText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onCompletedClickHandler}>
                    <Text style={styles.buttonText}>Completed</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


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
        marginVertical: 10,
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        width: '28%'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
})