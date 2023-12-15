import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StyleSheet, Text, View,} from "react-native";
import {AppRootStateType} from "../../src/app/store";
import {initializeAppTC, RequestStatusType} from "../../src/app/app-reducer";
import {logoutTC} from "../../src/features/Login/auth-reducer";
import {TodolistsList} from "../../src/features/TodolistsList/TodolistsList";

type PropsType = {
    demo?: boolean
}

export const Main = ({demo = false}: PropsType) => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        // @ts-ignore
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
                <TodolistsList demo={demo}/>
                {/*<Route path={'/login'} element={<Login/>}/>*/}
                {/*</Routes>*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 10
    },
    title: {
        color: '#e91e63',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    }
})