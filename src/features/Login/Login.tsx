import React from 'react'
import {useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {AppRootStateType, useAppDispatch} from "app/store";
import {loginTC} from "features/Login/auth-reducer";
import {Button, Text, TextInput, View} from "react-native";
import {Checkbox} from "expo-checkbox";

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    //
    // const formik = useFormik({
    //     validate: (values) => {
    //         if (!values.email) {
    //             return {
    //                 email: 'Email is required'
    //             }
    //         }
    //         if (!values.password) {
    //             return {
    //                 password: 'Password is required'
    //             }
    //         }
    //
    //     },
    //     initialValues: {
    //         email: '',
    //         password: '',
    //         rememberMe: false
    //     },
    //     onSubmit: values => {
    //         // @ts-ignore
    //         dispatch(loginTC(values));
    //     },
    // })
    //
    // if (isLoggedIn) {
    //     // return <Navigate to={"/"}/>
    // }


    return (
        <View>
            {/*<form onSubmit={formik.handleSubmit}>*/}
                {/*<FormControl>*/}
                    <View>
                        <Text>
                            To log in get registered
                            {/*<Text href={'https://social-network.samuraijs.com/'} target={'_blank'}>here</Text>*/}
                        </Text>
                        <Text> or use common test account credentials: </Text>
                    </View>
                    {/*/!*<FormGroup>*!/*/}
                    {/*    <TextInput {...formik.getFieldProps("email")}/>*/}
                    {/*    {formik.errors.email ? <Text>{formik.errors.email}</Text> : null}*/}
                    {/*    <TextInput                             {...formik.getFieldProps("password")}/>*/}
                    {/*    {formik.errors.password ? <Text>{formik.errors.password}</Text> : null}*/}
                    {/*    /!*<FormControlLabel*!/*/}
                    {/*        label={'Remember me'}*/}
                    {/*        control={<Checkbox*/}
                    {/*            {...formik.getFieldProps("rememberMe")}*/}
                    {/*            // onChange={formik.values.rememberMe}*/}
                    {/*        />}*/}
                        {/*/>*/}
                        <Button title={'Login'}/>
                {/*    </FormGroup>*/}
                {/*</FormControl>*/}
            {/*</form>*/}
        </View>
    )
}
