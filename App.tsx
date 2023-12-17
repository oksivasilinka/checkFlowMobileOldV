import React from 'react'
import {Provider} from 'react-redux'
import {Main} from "app/Main";
import {store} from "app/store";
import {Button} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';
import {Login} from "features/Login/Login";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {WithSaveAreaView} from "componentHelper/WithSaveAreaView";
import {NavigationsType} from "types/navigationsType";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from "@react-navigation/drawer";

//const Stack = createNativeStackNavigator<NavigationsType>();
 const Stack = createBottomTabNavigator<NavigationsType>();
// const Stack = createDrawerNavigator<NavigationsType>();

const HomeScreen = ({navigation}: NativeStackScreenProps<NavigationsType, 'Home'>) => {
    return (
        <WithSaveAreaView>
            <>
                <Main/>
                <Button title={'login'} onPress={() => {
                    navigation.navigate('Login')
                }}/>
            </>
        </WithSaveAreaView>
    );
}

const LoginScreen = ({navigation}: NativeStackScreenProps<NavigationsType, 'Login'>) => {
    return (
       <WithSaveAreaView>
           <>
               <Login/>
               <Button title={'Home'} onPress={() => {
                   navigation.navigate('Home')
               }}/>
           </>
       </WithSaveAreaView>
    );
}


export default function App() {


    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Provider store={store}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                    </Stack.Navigator>
                </Provider>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
