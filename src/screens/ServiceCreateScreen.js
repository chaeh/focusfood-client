import React, { useState, useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as BusinessContext } from "../context/BusinessContext";

const ServiceCreateScreen = ({ navigation }) => {
  const businessId = navigation.getParam("businessId");

  const [serviceName, setServiceName] = useState("");
  const [priority, setPriority] = useState("");

  const { createService } = useContext(BusinessContext);
  return (
    <>
      <Spacer />
      <Input
        label="메뉴명"
        placeholder="메뉴 이름을 입력해주세요"
        onChangeText={(item) => setServiceName(item)}
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
          await createService(businessId, serviceName, priority);
          navigation.goBack();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ServiceCreateScreen;
