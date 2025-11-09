import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import HalfDropDownStyle from "./HalfDropDownStyle";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from 'react-native-select-dropdown';

const HalfDropDown = (props) => {
  return (
    <View style={{ width: "49%", marginRight: 10 }}>
      <Text style={HalfDropDownStyle.headerText}>{props.title}</Text>
      <View style={HalfDropDownStyle.btnDrop}>

        <SelectDropdown
          data={props.data}
          buttonStyle={HalfDropDownStyle.dropDown}
          onSelect={(selectedItem, index) => {
            props.onValueChange(selectedItem);
          }}

          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={HalfDropDownStyle.dropdown3BtnChildStyle}>
                <Text style={HalfDropDownStyle.txtCaption}>{selectedItem ? selectedItem.label : 'Select'}</Text>
                <IcnGreyDown />
              </View>
            );
          }}

          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={HalfDropDownStyle.dropdown3RowChildStyle}>
                <Text style={HalfDropDownStyle.dropdown3RowTxt}>{item.label}</Text>
              </View>
            );
          }}
        />
       
      </View>
    </View>
  );
};

export default HalfDropDown;
