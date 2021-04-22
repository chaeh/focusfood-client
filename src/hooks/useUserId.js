import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as BusinessContext } from "../context/BusinessContext";

export default () => {
  const { createTrack } = useContext(AuthContext);
  const {
    state: { userId },
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate("TrackList");
  };

  return [saveTrack];
};
