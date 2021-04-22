import { useState, useEffect } from "react";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  //We want to run callback whenever 'shoudTrack' variable changes
  //It's good to put the helper function inside useEffect so that we can easily track value(state, context, prop) that re-renders the function
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        //requesting Permission for location
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      //stop watching
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    //this cleanup function is called when new useEffect is called
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
