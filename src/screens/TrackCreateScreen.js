//import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { withNavigationFocus } from "react-navigation";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { AntDesign } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView style={styles.container}>
      <Text h3>Create a Track</Text>
      <Map />

      {err ? <Text>허용하기를 눌러주세요</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <AntDesign name="pluscircleo" size={24} color="black" />,
};

export default withNavigationFocus(TrackCreateScreen);
