import { View, TouchableOpacity } from "react-native";
import React from "react";
import { UploadButtonStyle } from "./UploadButtonStyle";

export default function UploadButton({ icon, onPress, iconSize }) {
  return (
    <View>
      <TouchableOpacity
        style={[UploadButtonStyle.buttonStyle]}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
}
