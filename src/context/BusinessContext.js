// We fetch and save using this context
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const businessReducer = (state, action) => {
  switch (action.type) {
    case "create_business":
      return state;
    case "fetch_businesses":
      return action.payload;
    default:
      return state;
  }
};

const createBusiness = (dispatch) => async (userId, businessName) => {
  try {
    const response = await trackerApi.post("/addbusiness", {
      name: businessName,
      userId,
    });
    //await dispatch({ type: "create_business", payload: response.data });
    console.log("success");
    navigate("BusinessList");
  } catch (err) {
    console.log(`${err}
         + at /BusinessContext`);
  }
};

const fetchBusinesses = (dispatch) => async (userId) => {
  try {
    const response = await trackerApi.patch("/business", {
      userId,
    });
    await dispatch({ type: "fetch_businesses", payload: response.data });
    console.log(response.data);
  } catch (err) {
    console.log(`${err}
         + at /BusinessContext`);
  }
};

const fetchTracks = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/tracks");
    await dispatch({ type: "fetch_tracks", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  businessReducer,
  { createBusiness, fetchBusinesses },
  []
);
