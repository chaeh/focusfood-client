import React, { useState } from "react";
import { Text, Input, Button } from "react-native-elements";
import { StyleSheet, TouchableOpacity } from "react-native";
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("chae");
  const [password, setPassword] = useState("12345");
  const [hidePassword, sethidePassword] = useState(true);

  console.log(errorMessage);
  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Input
          label="Email"
          value={email}
          onChangeText={(newEmail) => setEmail(newEmail)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          secureTextEntry={hidePassword}
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <Button
        title={submitButtonText}
        onPress={() => {
          onSubmit({ email, password });
        }}
      />
      {errorMessage ? (
        <Text style={styles.errorMsg}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <TouchableOpacity
          onPress={() => sethidePassword(!hidePassword)}
          style={{ flexDirection: "row" }}
        >
          {hidePassword ? (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={24}
              color="black"
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color="black"
            />
          )}
          <Text>{hidePassword ? "Show" : "Hide"} Password</Text>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    fontSize: 13,
    color: "red",
    marginLeft: 15,
    marginTop: 7,
    marginBottom: 7,
  },
});

export default AuthForm;
