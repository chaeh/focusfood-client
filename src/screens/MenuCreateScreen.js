import React, { useState, useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as BusinessContext } from "../context/BusinessContext";

const MenuCreateScreen = ({ navigation }) => {
  const businessId = navigation.getParam("businessId");

  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [priority, setPriority] = useState("");

  const { createMenu } = useContext(BusinessContext);
  return (
    <>
      <Spacer />
      <Input
        label="메뉴명"
        placeholder="메뉴 이름을 입력해주세요"
        onChangeText={(item) => setMenuName(item)}
      />
      <Spacer />
      <Input
        label="메뉴 가격"
        placeholder="메뉴 가격을 입력해주세요"
        onChangeText={(item) => setMenuPrice(item)}
      />
      <Spacer />
      <Input
        label="우선순위"
        placeholder="우선순위를 입력해주세요"
        onChangeText={(item) => setPriority(item)}
      />
      <Button
        title="메뉴 추가"
        onPress={async () => {
          await createMenu(businessId, menuName, menuPrice, priority);
          navigation.goBack();
        }}
      />
    </>
  );
};
MenuCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "메뉴 추가",
  };
};

const styles = StyleSheet.create({});

export default MenuCreateScreen;
