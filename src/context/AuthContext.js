import createDataContext from "./createDataContext";
//import trackerApi from "../api/tracker";
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import tracker from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMsg: action.payload };
    case "signin":
      return { errorMsg: "", ...action.payload };
    case "clear_error_message":
      return { ...state, errorMsg: "" };
    case "signout":
      return { token: null, errorMsg: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make api request to sign up with that email and password
    //if we sign up , modify our state, and say that we are authenticated
    try {
      const response = await tracker.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);

      dispatch({
        type: "signin",
        payload: { token: response.data.token, userId: response.data.userId },
      });

      navigate("BusinessList");
      //if signing fails, we need to reflect an error message
    } catch (err) {
      dispatch({ type: "add_error", payload: "Something went wrong" });
    }
  };
};
// same thing with above but more compact
const signin = (dispatch) => async ({ email, password }) => {
  //Try to sign in
  try {
    const response = await tracker.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "signin",
      payload: { token: response.data.token, userId: response.data.userId },
    });
    navigate("BusinessList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
  //Handle success by updating state
  //handle failure
};

const signout = (dispatch) => async () => {
  //somehow sign out
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    const response = await tracker.patch("/userId", { token }); // 이거 고쳐야되는데..ㅠㅠ
    dispatch({
      type: "signin",
      payload: { token, userId: response.data.userId },
    });

    navigate("BusinessList");
  } else {
    navigate("loginFlow");
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMsg: "", userId: null }
);
