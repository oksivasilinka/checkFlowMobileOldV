import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {globalStyles} from "../../../globalStyles";
import {MaterialIcons} from '@expo/vector-icons';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: string) => {
        setTitle(e)
    }

    return (
        <View>
            {editMode &&
                <View style={styles.wrapper}>
                    <TextInput style={[globalStyles.border, styles.input]} value={title}
                               onChangeText={changeTitle}
                               autoFocus/>
                    <View>
                        <MaterialIcons name="done" size={30} color={"#e91e63"} onPress={activateViewMode}/>
                    </View>
                </View>}
            {!editMode && <Text style={{fontSize: 20}} onLongPress={activateEditMode}>{props.value}</Text>
            }
        </View>
    )
});


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        padding: 5,
        fontSize: 20
    }
})