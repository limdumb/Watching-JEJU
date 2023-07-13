import { NativeScrollEvent } from "react-native";

export const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
  const paddingToBottom = 34;
  return (
    nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
    nativeEvent.contentSize.height - paddingToBottom
  );
};