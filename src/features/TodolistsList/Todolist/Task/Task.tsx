import {TaskStatuses, TaskType} from "api/todolists-api";
import {Checkbox} from "expo-checkbox";
import {EditableSpan} from "components/EditableSpan/EditableSpan";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from "globalStyles";
import {removeTaskTC, updateTaskTC} from "features/TodolistsList/tasks-reducer";
import {useAppDispatch} from "app/store";

type Props = {
    task: TaskType
    todolistId: string
}
export const Task = ({task, todolistId}: Props) => {
    const {id, status, title} = task
    const dispatch = useAppDispatch()

    const onClickHandler = () => dispatch(removeTaskTC(id, todolistId))

    const onChangeHandler = (checked: boolean) => {
        dispatch(updateTaskTC(id, {
            ...task,
            status: checked ? TaskStatuses.Completed : TaskStatuses.New
        }, todolistId))
    }

    const onTitleChangeHandler = (newValue: string) => dispatch(updateTaskTC(id, {title: newValue}, todolistId))

    return (
        <View key={id}
              style={status === TaskStatuses.Completed ? {...styles.wrapper, opacity: 0.5} : {...styles.wrapper}}>
            <View style={styles.task}>
                <Checkbox color={'#e91e63'} value={status === TaskStatuses.Completed}
                          onValueChange={onChangeHandler}
                          style={[globalStyles.border]}
                />
                <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            </View>
            <TouchableOpacity onPress={onClickHandler}>
                <MaterialIcons name="delete" size={28} color="grey"/>
            </TouchableOpacity>
        </View>
    )
}


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