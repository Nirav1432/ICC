import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { RadioButtonImageStyle } from "./RadioButtonImageStyle";

const RadioButtonImage = ({ options, selectedOption, onSelect, imageSource, }) => {

  const handleSelectOption = (option) => {
    if (selectedOption === option) {
      onSelect(null);
    } else {
      onSelect(option);
    }
  };

  return (
    <View>
      <View style={RadioButtonImageStyle.container}>

        <TouchableOpacity style={RadioButtonImageStyle.radioButton} onPress={() => handleSelectOption(options[0])}>
          <View style={[RadioButtonImageStyle.radioButtonDot, selectedOption === options[0] && RadioButtonImageStyle.radioButtonDotSelected,]} />
          <View style={RadioButtonImageStyle.radioButtonImage}>
            {imageSource[0]}
          </View>
          <View style={RadioButtonImageStyle.radioButtonContent}>
            <Text style={RadioButtonImageStyle.radioButtonLabel}>{options[0]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={RadioButtonImageStyle.radioButton} onPress={() => handleSelectOption(options[1])}>
          <View style={[RadioButtonImageStyle.radioButtonDot, selectedOption === options[1] && RadioButtonImageStyle.radioButtonDotSelected,]} />
          <View style={RadioButtonImageStyle.radioButtonImage}>
            {imageSource[1]}
          </View>
          <View style={RadioButtonImageStyle.radioButtonContent}>
            <Text style={RadioButtonImageStyle.radioButtonLabel}>{options[1]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={RadioButtonImageStyle.radioButton} onPress={() => handleSelectOption(options[2])}>
          <View style={[RadioButtonImageStyle.radioButtonDot, selectedOption === options[2] && RadioButtonImageStyle.radioButtonDotSelected,]} />
          <View style={RadioButtonImageStyle.radioButtonImage}>
            {imageSource[2]}
          </View>
          <View style={RadioButtonImageStyle.radioButtonContent}>
            <Text style={RadioButtonImageStyle.radioButtonLabel}>{options[2]}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {options.length > 3 &&
        <View style={RadioButtonImageStyle.container}>

          <TouchableOpacity style={RadioButtonImageStyle.radioButton} onPress={() => handleSelectOption(options[3])}>
            <View style={[RadioButtonImageStyle.radioButtonDot, selectedOption === options[3] && RadioButtonImageStyle.radioButtonDotSelected,]} />
            <View style={RadioButtonImageStyle.radioButtonImage}>
              {imageSource[3]}
            </View>
            <View style={RadioButtonImageStyle.radioButtonContent}>
              <Text style={RadioButtonImageStyle.radioButtonLabel}>{options[3]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={RadioButtonImageStyle.radioButton} onPress={() => handleSelectOption(options[4])}>
            <View style={[RadioButtonImageStyle.radioButtonDot, selectedOption === options[4] && RadioButtonImageStyle.radioButtonDotSelected,]} />
            <View style={RadioButtonImageStyle.radioButtonImage}>
              {imageSource[4]}
            </View>
            <View style={RadioButtonImageStyle.radioButtonContent}>
              <Text style={RadioButtonImageStyle.radioButtonLabel}>{options[4]}</Text>
            </View>
          </TouchableOpacity>

        </View>
      }
    </View>
  );
};

export default RadioButtonImage;
