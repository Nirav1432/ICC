import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import EnableViewStyle from "./EnableViewStyle";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

const EnableView = (props) => {
  return (
    <View>
        <Text style={EnableViewStyle.headerText}>{props.title}</Text>
        <TouchableOpacity style={EnableViewStyle.btnDrop}>
            <Text>2023</Text>
        </TouchableOpacity>
    </View>
  );
};

export default EnableView;
