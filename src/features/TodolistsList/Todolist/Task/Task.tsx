import React, {useCallback} from 'react'
import {TaskStatuses, TaskType} from "api/todolists-api";
import {Checkbox} from "expo-checkbox";
import {EditableSpan} from "components/EditableSpan/EditableSpan";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
 import {globalStyles} from "globalStyles";

type Props = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo(({task, removeTask, changeTaskTitle, changeTaskStatus, todolistId}: Props) => {
    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, todolistId]);

    const onChangeHandler = useCallback((checked: boolean) => {
        changeTaskStatus(task.id, checked ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [task.id, todolistId]);

    return (
        <View key={task.id}
              style={task.status === TaskStatuses.Completed ? {...styles.wrapper, opacity: 0.5} : {...styles.wrapper}}>
            <View style={styles.task}>
                <Checkbox color={'#e91e63'} value={task.status === TaskStatuses.Completed}
                          onValueChange={onChangeHandler}
                          style={[globalStyles.border]}
                />
                <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            </View>
            <TouchableOpacity onPress={onClickHandler}>
                <MaterialIcons name="delete" size={28} color="grey"/>
            </TouchableOpacity>
        </View>
    )
})


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    task: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
})