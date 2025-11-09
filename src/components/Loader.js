import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "../utils/Colors";

const Loader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={Colors.primary} />
    </View>
  );
};

export default Loader;
