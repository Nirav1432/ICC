import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import DisableViewStyle from "./DisableViewStyle";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

const DisableView = (props) => {
  return (
    <>
        <Text style={DisableViewStyle.headerText}>{props.title}</Text>
        <View style={DisableViewStyle.btnDrop}>
            <Text>{props.value}</Text>
        </View>
    </>
  );
};

export default DisableView;
