import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SubmitBtnStyles from "./SubmitBtnStyles";
import { Colors } from "../../../utils/Colors";

const SubmitBtn = (props) => {
  return (
    <TouchableOpacity onPress={()=>{props.onPress()}} style={[SubmitBtnStyles.btnLogin,{ backgroundColor: props.backColor?props.backColor:Colors.orange,}]}>
      <Text style={SubmitBtnStyles.btnLoginText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitBtn;
