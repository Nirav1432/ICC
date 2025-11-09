import { View, Text, TextInput } from "react-native";
import React from "react";

import { DisabledFieldStyle } from "./DisabledFieldStyle";

export default function DisabledField({ title, value }) {
  return (
    <View>
      <Text style={DisabledFieldStyle.fieldTitle}>{title}</Text>
      <View style={DisabledFieldStyle.container}>
        <TextInput
          style={DisabledFieldStyle.disabledField}
          value={value}
          editable={false}
          maxLength={70}
        />
      </View>
    </View>
  );
}
