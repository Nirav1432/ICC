import React from "react";
import { View } from "react-native";
import { ProgressBarStyle } from "./ProgressBarStyle";

const ProgressBar = ({ progress }) => {
  return (
    <View style={ProgressBarStyle.progressBarContainer}>
      <View style={[ProgressBarStyle.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

export default ProgressBar;
