import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { DropDownStyle } from "./DropDownStyle";
import IcnPdf from "../../assets/svg/rdssSvgs/IcnPdf";
import { Dropdown } from 'react-native-element-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

export default function DropDown({
  shouldShowButton,
  dropDownTitle,
  data,
  onValueChange,
  selectedValue,
}) {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={DropDownStyle.item}>
        <Text style={DropDownStyle.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View style={DropDownStyle.container}>
      {dropDownTitle && (
        <Text style={DropDownStyle.dropDownTitle}>{dropDownTitle}</Text>
      )}
      <View style={DropDownStyle.rowContainer}>
        <View style={DropDownStyle.dropDownWrapper}>
           <Picker
            style={DropDownStyle.dropDown}
            dropdownIconColor={"#000"}
            onValueChange={onValueChange}
            selectedValue={selectedValue}
            mode="dialog"
          >
            {data &&
              data.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
          </Picker>
     </View>
       
        {shouldShowButton && (
          <TouchableOpacity style={DropDownStyle.buttonStyle}>
            <IcnPdf />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
