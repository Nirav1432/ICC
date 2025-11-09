import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { RadioButtonStyle } from "./RadioButtonStyle";
import { Colors } from "../../utils/Colors";

const RadioButton = ({ options, selectedOption, onSelect, disble = false }) => {

  const handleSelectOption = (option) => {
    if (selectedOption === option) {
      onSelect(null);
    } else {
      onSelect(option);
    }
  };

  return (
    <View style={[RadioButtonStyle.container]}>

      {options.map((option, index) => (

        <TouchableOpacity
          key={index}
          style={[RadioButtonStyle.radioButton, selectedOption === option && { backgroundColor: Colors.secondary, },disble === false && { backgroundColor: Colors.disableViewColor1 }]}
          onPress={() => disble == false ? "" : handleSelectOption(option)}
        >
          <View
            style={[
              RadioButtonStyle.radioButtonInner,
              selectedOption === option && RadioButtonStyle.radioButtonDotSelected,

            ]}
          />
          <Text
            style={[
              RadioButtonStyle.radioButtonLabel,
              selectedOption === option && {color: Colors.white,},
              disble === false && { color: Colors.lightGray }
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))
      }
    </View >
  );
};

export default RadioButton;
