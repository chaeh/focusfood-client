import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";
import { Context as BusinessContext } from "../context/BusinessContext";
import HorizontalImageList from "../components/HorizontalImageList";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
const BusinessDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam("_id");
  const { state } = useContext(BusinessContext);
  const business = state.find((t) => t._id === _id);
  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
        >{`${business.name}에 오신것을 환영합니다`}</Text>
      </View>
      <Spacer />
      <View style={styles.listTitleContainder}>
        <Text style={styles.listTitle}>대표 메뉴</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MenuCreate", { businessId: business._id });
          }}
        >
          <Text style={styles.addMenu}> 메뉴추가 </Text>
        </TouchableOpacity>
      </View>
      <HorizontalImageList list={business.menulist} />
      <TouchableOpacity>
        <Text style={styles.moreMenu}>메뉴 전체보기</Text>
      </TouchableOpacity>

      <Divider style={{ backgroundColor: "black" }} />
      <Spacer />
      <View style={styles.listTitleContainder}>
        <Text style={styles.listTitle}>자주 찾는 서비스</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ServiceCreate");
          }}
        >
          <Text style={styles.addMenu}> 서비스 추가 </Text>
        </TouchableOpacity>
      </View>
      <HorizontalImageList list={business.servicelist} />
      <TouchableOpacity>
        <Text style={styles.moreMenu}>서비스 전체보기</Text>
      </TouchableOpacity>
      <Divider style={{ backgroundColor: "black" }} />
      <Spacer />
      <View style={styles.listTitleContainder}>
        <Text style={styles.listTitle}>이벤트 및 공지사항</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NoticeCreate");
          }}
        >
          <Text style={styles.addMenu}> 글 추가 </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

BusinessDetailScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    //alignSelf: "center",
  },
  listTitleContainder: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: 18,
    //fontWeight: "bold",
  },
  addMenu: {
    alignSelf: "flex-end",
  },
  moreMenu: {
    fontSize: 14,
    alignSelf: "center",
    color: "#8A8A8A",
  },
});

export default BusinessDetailScreen;
