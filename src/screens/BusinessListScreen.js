import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { Context as BusinessContext } from "../context/BusinessContext";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem, LinearProgress } from "react-native-elements";

const BusinessListScreen = ({ navigation }) => {
  const { state: businessState, fetchBusinesses } = useContext(BusinessContext);
  const { state: authState } = useContext(AuthContext);
  useEffect(() => {
    fetchBusinesses(authState.userId);
  }, []);
  return (
    <>
      {/* <NavigationEvents
        onWillFocus={() => {
          fetchBusinesses(authState.userId);
        }}
      /> */}
      <FlatList
        data={businessState}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BusinessDetail", { _id: item._id });
              }}
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

BusinessListScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "내 레스토랑",
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BusinessCreate");
        }}
      >
        <Feather name="plus" size={30} style={{ marginRight: 20 }} />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => {}}>
        <Text>Get</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  ContainerStyle: {
    alignItems: "center",
    margin: 20,
    marginTop: 40,
  },
  TextStyle: {
    color: "#1E1E1E",
    fontSize: 25,
  },
});

export default BusinessListScreen;
