import { View, Text, TextInput } from "react-native";
import React from "react";
import { InputFieldsStyle } from "./InputFieldsStyle";
import { Colors } from "../../utils/Colors";

export default function InputFields3(props) {
  return (
    <>
      <View style={InputFieldsStyle.inputFields}>

        <View style={InputFieldsStyle.input}>
          <Text style={InputFieldsStyle.textInputTitle1}>{props.title1}</Text>
          <Text style={props.backgroundColor ? InputFieldsStyle.textInput1 : InputFieldsStyle.textInput}>{props.value1 != null ? props.value1 : "0"}</Text>
        </View>

        <View style={InputFieldsStyle.input}>
          <Text style={InputFieldsStyle.textInputTitle1}>{props.title2}</Text>
          <Text style={props.backgroundColor ? InputFieldsStyle.textInput1 : InputFieldsStyle.textInput}>{props.value2 != null ? props.value2 : "0"}</Text>
        </View>

      </View>
    </>
  );
}
