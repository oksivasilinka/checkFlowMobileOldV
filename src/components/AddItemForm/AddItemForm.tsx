import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {globalStyles} from "globalStyles";

type Props = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: Props) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: string) => {
        setTitle(e)
    }


    return (
        <View style={styles.wrapper}>
            <TextInput value={title} style={[globalStyles.border, styles.input]}
                // disabled={disabled}
                // error={!!error}
                       onChangeText={onChangeHandler}
            />
            <View>
                <TouchableOpacity>
                    <AntDesign name="pluscircle" size={30} color="#e91e63" onPress={addItemHandler}/>
                </TouchableOpacity>
            </View>
        </View>
    )
})


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '90%',
        padding: 5,
        fontSize: 20,
        marginVertical: 5
    }
})