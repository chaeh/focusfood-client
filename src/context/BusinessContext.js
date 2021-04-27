// We fetch and save using this context
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const businessReducer = (state, action) => {
  switch (action.type) {
    case "create_business":
      return state;
    case "fetch_businesses":
      return action.payload; //list of businesses
    case "create_menu":
      const changedState = state.map((t) => {
        if (t._id === action.payload._id) {
          return action.payload;
        }
        return t;
      });
      console.log("changed is " + changedState);
      return changedState;
    default:
      return state;
  }
};

const createMenu = (dispatch) => async (
  businessId,
  name,
  price,
  priority,
  images = []
) => {
  try {
    const response = await trackerApi.post(`/${businessId}/addmenu`, {
      name,
      price,
      priority,
      images,
    });
    dispatch({
      type: "create_menu",
      payload: response.data,
    });
  } catch (err) {
    console.log(err + "while createMenu");
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
  { createBusiness, fetchBusinesses, createMenu },
  []
);
