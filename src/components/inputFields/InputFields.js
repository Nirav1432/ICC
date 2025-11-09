import { View, Text, TextInput } from "react-native";
import React from "react";
import { InputFieldsStyle } from "./InputFieldsStyle";
import { Colors } from "../../utils/Colors";

export default function InputFields(props) {
  return (
    <>
      <View style={InputFieldsStyle.inputFields}>
        <View style={InputFieldsStyle.input}>
          <Text style={InputFieldsStyle.textInputTitle1}>{props.title1}</Text>
          <TextInput
          maxLength={70}
            editable={false}
            selectTextOnFocus={false}
            style={InputFieldsStyle.textInput}
            placeholderTextColor={Colors.darkBlack}
            value={props.value1}
          />
        </View>
        <View style={InputFieldsStyle.input}>
          <Text style={InputFieldsStyle.textInputTitle1}>{props.title2}</Text>
          <TextInput
          maxLength={70}
            editable={false}
            selectTextOnFocus={false}
            style={InputFieldsStyle.textInput}
            placeholderTextColor={Colors.darkBlack}
            value={props.value2}
          />
        </View>
      </View>
      
      <View style={InputFieldsStyle.inputFields}>
        <View style={InputFieldsStyle.input}>
          <Text style={InputFieldsStyle.textInputTitle1}>{props.title3}</Text>
          <TextInput
          maxLength={70}
            editable={false}
            selectTextOnFocus={false}
            style={InputFieldsStyle.textInput}
            placeholderTextColor={Colors.darkBlack}
            value={props.value3}
          />
        </View>
        <View style={InputFieldsStyle.input}>
          <Text style={InputFieldsStyle.textInputTitle1}>{props.title4}</Text>
          <TextInput
          maxLength={70}
            editable={false}
            selectTextOnFocus={false}
            style={InputFieldsStyle.textInput}
            placeholderTextColor={Colors.darkBlack}
            value={props.value4}
          />
        </View>
      </View>
    </>
  );
}
