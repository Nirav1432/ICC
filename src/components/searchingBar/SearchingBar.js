import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SearchingBarStyle } from "./SearchingBarStyle";
// import { IcnAddress } from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import IcnAddress from "./../../assets/svg/powerTransformersSvgs/IcnAddress";

export default function SearchingBar(props) {
  return (
    <>
      <View style={SearchingBarStyle.addressSearchBar}>
        <Text style={SearchingBarStyle.titleText}>{props.title}</Text>
        <View style={SearchingBarStyle.row}>
          
          <TextInput
          maxLength={70}
            placeholder={props.placeholder}
            style={SearchingBarStyle.textInput}
            placeholderTextColor="black"
          />
          <TouchableOpacity onPress={()=>props.handlePress()} style={SearchingBarStyle.buttonIcon}>
            {props.icon}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
