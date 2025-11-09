import { Text, TouchableOpacity } from "react-native";
import React from "react";
import BoxViewStyle from "./BoxViewStyle";

const BoxView = ({ data, handleClick, componentTitles }) => {
  return (
    <TouchableOpacity
      style={BoxViewStyle.boxView}
      onPress={() => {
        handleClick();
      }}
    >
      {/* <Image style={BoxViewStyle.icon} /> */}
      {data.icon}
      {/* <Text style={BoxViewStyle.text}>{data.title}</Text> */}
      <Text style={BoxViewStyle.text}>{componentTitles}</Text>
    </TouchableOpacity>
  );
};

export default BoxView;
