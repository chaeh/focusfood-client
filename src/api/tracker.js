import axios from "axios";
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://09262d3e7816.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // errorcase
    return Promise.reject(err);
  }
);

export default instance;
