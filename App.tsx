import React from 'react'
import {Provider} from 'react-redux'
import {Main} from "./src/app/Main";
import {store} from "./src/app/store";
import {View, StyleSheet} from "react-native";

type PropsType = {
    demo?: boolean
}

export default function App() {


    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Main/>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})