import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";
import { Context as BusinessContext } from "../context/BusinessContext";

const BusinessCreateScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const { state } = useContext(AuthContext);
  const { createBusiness } = useContext(BusinessContext);
  const userId = state.userId;
  return (
    <View style={styles.container}>
      {/* <NavigationEvents
        //onWillFocus = {()=>{}} when start navigate
        //onDidFocus = {()=>{}} when navigate is done
        //onWillBlur = {()=>{}} when navigate to other page
        //onDidBlur = {()=>{}} when finished landing to other page
        onWillBlur={() => {}}
      /> */}
      <Text style={styles.titleStyle}>당신의 가게 이름을 입력해 주세요</Text>
      <Input
        label="Name of Restaurant"
        labelStyle={styles.labelstyle}
        placeholder="비즈니스 이름"
        onChangeText={(item) => setName(item)}
      />
      <Button
        onPress={async () => {
          await createBusiness(userId, name);
          navigation.navigate("BusinessList");
        }}
        title="입력 완료"
      />
    </View>
  );
};

// BusinessCreateScreen.navigationOptions = () => {
//   return {
//     headerShown: false,
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
  labelstyle: {
    color: "black",
  },
  titleStyle: {
    fontSize: 30,
    margin: 30,
  },
});

export default BusinessCreateScreen;
