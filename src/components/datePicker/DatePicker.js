import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { DatePickerStyle } from "./DatePickerStyle";
import IcnCalendar from "../../assets/svg/IcnCalendar";

export default function DatePicker({ title, monthYear, onPress }) {
  return (
    <>
      <Text style={DatePickerStyle.text1}>{title}</Text>
      <View style={DatePickerStyle.pickerWrapper}>
        <TouchableOpacity
          style={DatePickerStyle.wrapperButton}
          onPress={onPress}
        >
          <View style={DatePickerStyle.textView}>
            <Text style={DatePickerStyle.text}>{monthYear}</Text>
          </View>
          <View style={DatePickerStyle.iconView}>
            <IcnCalendar style={DatePickerStyle.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
