import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Image } from "react-native-elements";

const MenuDetailScreen = ({ navigation }) => {
  const menu = navigation.getParam("item");
  console.log(menu);
  return (
    <>
      <Text> {menu.name}</Text>
      <Text>가격: {menu.price}</Text>
      <Image
        source={{ uri: menu.images[0] }}
        style={{ width: 200, height: 200 }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default MenuDetailScreen;
