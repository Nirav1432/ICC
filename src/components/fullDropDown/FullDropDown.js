import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FullDropDownStyle from "./FullDropDownStyle";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

const FullDropDown = (props) => {
  return (
    <View>
        <Text style={FullDropDownStyle.headerText}>{props.title}</Text>
        <TouchableOpacity style={FullDropDownStyle.btnDrop}>
            <Text>{props.value}</Text>
            <IcnGreyDown />
        </TouchableOpacity>
    </View>
  );
};

export default FullDropDown;
