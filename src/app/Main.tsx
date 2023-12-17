import React, {useCallback, useEffect} from 'react'
import { useSelector} from 'react-redux'
import {StyleSheet, Text, View,} from "react-native";
import {AppRootStateType, useAppDispatch} from "app/store";
import {initializeAppTC, RequestStatusType} from "app/app-reducer";
import {logoutTC} from "features/Login/auth-reducer";
import {TodolistsList} from "features/TodolistsList/TodolistsList";

export const Main = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

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

    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.title}>Check Flow</Text>
            {/*<ErrorSnackbar/>*/}
            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
            {/*            <Menu/>*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6">*/}
            {/*            News*/}
            {/*        </Typography>*/}
            {/*        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}*/}
            {/*    </Toolbar>*/}
            {/*    {status === 'loading' && <LinearProgress/>}*/}
            {/*</AppBar>*/}
            <View style={{flex: 1}}>
                {/*<Routes>*/}
                {/*    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>*/}
                <TodolistsList/>
                {/*<Route path={'/login'} element={<Login/>}/>*/}
                {/*</Routes>*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        color: '#e91e63',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    }
})