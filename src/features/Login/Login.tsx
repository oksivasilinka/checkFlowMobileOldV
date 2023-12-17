import React from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAppDispatch} from "app/store";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {Checkbox} from "expo-checkbox";
import {globalStyles} from "globalStyles";
import {loginTC} from "features/Login/auth-reducer";
import {StackActions, useNavigation} from "@react-navigation/native";

export const Login = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    })
    if (isLoggedIn) {
        navigation.dispatch(StackActions.replace('Home'));
        return null;
    }

    const onSubmit = (data: any) => dispatch(loginTC(data))
    return (
        <View style={styles.wrapper}>
            <Text>
                To log in get registered
                {/*<Text href={'https://social-network.samuraijs.com/'} target={'_blank'}>*/}
                {/*    here*/}
                {/*</Text>*/}
            </Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                    maxLength: 30,
                    minLength: 10
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        placeholder="Type email"
                        onBlur={onBlur}
                        onChangeText={onChange}

                        style={[globalStyles.border, styles.input]}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text>{errors.email.message}</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                    maxLength: 20,
                    minLength: 4
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        placeholder="Type password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        style={[globalStyles.border, styles.input]}
                        value={value}
                    />
                )}
                name="password"
            />
            {errors.password && <Text>{errors.password.message}</Text>}

            <View style={styles.rememberMe}>
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <Checkbox color={'#e91e63'}
                                  onChange={onChange}
                                  style={[globalStyles.border]}
                                  value={value}
                        />
                    )}
                    name="rememberMe"
                />
                <Text> Remember me </Text></View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.textButton}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        gap: 20,
        justifyContent: 'center',
        padding: 50
    },
    input: {
        width: '100%',
        padding: 5,
        fontSize: 20
    },
    rememberMe: {
        flexDirection: 'row',
        gap: 10
    },
    button: {
        backgroundColor: '#e91e63',
        color: 'white',
        padding: 10,
        width: '100%',
        borderRadius: 5
    },
    textButton: {
        color: 'white',
        textAlign: 'center'
    }
})