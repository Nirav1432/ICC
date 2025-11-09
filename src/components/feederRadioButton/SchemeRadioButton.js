import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FeederRadioButtonStyle from "./FeederRadioButtonStyle";
import FillRadio from "../../assets/svg/FillRadio";
import Radio from "../../assets/svg/Radio";

const SchemeRadioButton = (props) => {
  const [isTouch, setTouch] = useState(true);

  handlePressScheme = (value) => {
    setTouch(value);
    props.onPress(value);
  };
  return (
    <View>
      <Text style={FeederRadioButtonStyle.headerText}>{props.title}</Text>
      <View style={FeederRadioButtonStyle.flexView}>
        <TouchableOpacity
          onPress={() => handlePressScheme(true)}
          style={
            isTouch
              ? FeederRadioButtonStyle.selectedBtnRadio
              : FeederRadioButtonStyle.btnRadio
          }
        >
          {isTouch ? <FillRadio /> : <Radio />}
          <Text
            style={
              isTouch
                ? FeederRadioButtonStyle.selectedRadioText
                : FeederRadioButtonStyle.radioText
            }
          >
            RDSS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePressScheme(false)}
          style={
            !isTouch
              ? FeederRadioButtonStyle.selectedBtnRadio
              : FeederRadioButtonStyle.btnRadio
          }
        >
          {!isTouch ? <FillRadio /> : <Radio />}
          <Text
            style={
              !isTouch
                ? FeederRadioButtonStyle.selectedRadioText
                : FeederRadioButtonStyle.radioText
            }
          >
            Non RDSS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SchemeRadioButton;
