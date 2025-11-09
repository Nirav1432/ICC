import { View, Text, TextInput } from "react-native";
import React from "react";

import { EnabledFieldStyle } from "./EnabledFieldStyle";

export default function EnabledField({ keyBordType,title, value, onChangeText }) {
  return (
    <View>
      <Text style={EnabledFieldStyle.fieldTitle}>{title}</Text>
      <View style={EnabledFieldStyle.container}>
        <TextInput
        maxLength={70}
          editable={true}
          style={EnabledFieldStyle.enabledField}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Enter Value"
          placeholderTextColor="black"
          keyboardType={keyBordType} 
        />
      </View>
    </View>
  );
}
