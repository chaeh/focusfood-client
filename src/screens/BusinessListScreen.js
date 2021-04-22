import React, { useContext } from "react";
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
import { ListItem } from "react-native-elements";

const BusinessListScreen = ({ navigation }) => {
  // const { fetchBusinesses } = useContext(BusinessContext);
  const { state } = useContext(AuthContext);
  return (
    <View style={styles.ContainerStyle}>
      <NavigationEvents
        onWillFocus={() => {
          // fetchBusinesses();
        }}
      />
      <Text style={styles.TextStyle}>레스토랑 리스트</Text>
      <Button
        title="Log"
        onPress={() => {
          console.log(state);
        }}
      />
      <FlatList
        data={state}
        KeyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
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
    </View>
  );
};

BusinessListScreen.navigationOptions = ({ navigation }) => {
  return {
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
      <TouchableOpacity
        onPress={() => {
          console.log(authstate);
        }}
      >
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
