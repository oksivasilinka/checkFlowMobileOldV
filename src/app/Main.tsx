import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Button, StyleSheet, Text, View,} from "react-native";
import {AppRootStateType, useAppDispatch} from "app/store";
import {initializeAppTC, RequestStatusType} from "app/app-reducer";
import {logoutTC} from "features/Login/auth-reducer";
import {TodolistsList} from "features/TodolistsList/TodolistsList";
import {StackActions, useNavigation} from "@react-navigation/native";

export const Main = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigation = useNavigation();
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <View>
            {/*<CircularProgress/>*/}
            <Text> ...Loading</Text>
        </View>
    }

    if (!isLoggedIn) {
        navigation.dispatch(StackActions.replace('Login'));
        return null;
    }

    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.title}>Check Flow</Text>
            <View style={{flex: 1}}>
                <TodolistsList/>
            </View>
            <Button title={'logout'} onPress={logoutHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingHorizontal: 20
    },
    title: {
        color: '#e91e63',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    }
})