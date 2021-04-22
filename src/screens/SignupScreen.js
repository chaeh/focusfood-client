import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import {NavigationEvents} from 'react-navigation';

const SignupScreen = () => {
    const {state,signup,clearErrorMessage} = useContext(AuthContext);
    return (
        <View style = {styles.container}>
        <NavigationEvents 
            //onWillFocus = {()=>{}} when start navigate
            //onDidFocus = {()=>{}} when navigate is done
            //onWillBlur = {()=>{}} when navigate to other page
            //onDidBlur = {()=>{}} when finished landing to other page
            onWillBlur = {clearErrorMessage}
        />
        <AuthForm
        headerText = 'Sign Up for Tracker'
        errorMessage = {state.errorMsg}
        onSubmit = {({email,password}) => signup({email, password})}
        submitButtonText = 'Sign Up'
        />
        <NavLink
        text = "Already have an account? Sign in account!"
        routeName = "Signin"
        />
        </View>
    )
}

SignupScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom:200,
    },
})

export default SignupScreen;