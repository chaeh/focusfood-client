import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";
const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <NavigationEvents
        //onWillFocus = {()=>{}} when start navigate
        //onDidFocus = {()=>{}} when navigate is done
        //onWillBlur = {()=>{}} when navigate to other page
        //onDidBlur = {()=>{}} when finished landing to other page
        onWillBlur={clearErrorMessage}
      />
      <AuthForm
        headerText="Sign In for Tracker"
        errorMessage={state.errorMsg}
        onSubmit={({ email, password }) => signin({ email, password })}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign up an account!"
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SigninScreen;
