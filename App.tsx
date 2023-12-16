import React from 'react'
import {Provider} from 'react-redux'
import {Main} from "app/Main";
import {store} from "app/store";
import {View, StyleSheet, Button} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';
import {Login} from "features/Login/Login";
type PropsType = {
    demo?: boolean
}

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}: any) {
    return (
        <View style={styles.container}>
            <Main/>
            <Button title={'login'} onPress={()=> {navigation.navigate('Login')}}/>
        </View>
    );
}

function LoginScreen({navigation}: any) {
    return (
        <View style={styles.container}>
            <Login/>
            <Button title={'Home'} onPress={()=> {navigation.navigate('Home')}}/>
        </View>
    );
}


export default function App() {


    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})