import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "app/store";
import {addTodolistTC, fetchTodolistsTC} from "features/TodolistsList/todolists-reducer";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {Todolist} from "features/TodolistsList/Todolist/Todolist";
import {View} from "react-native";

export const TodolistsList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <View style={{gap: 40}}>
            <View>
                {todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (
                        <View key={tl.id}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
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
