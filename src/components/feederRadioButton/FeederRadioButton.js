import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import FeederRadioButtonStyle from "./FeederRadioButtonStyle";
import FillRadio from "../../assets/svg/FillRadio";
import Radio from "../../assets/svg/Radio";

const FeederRadioButton = (props) => {
  const [isTouch, setTouch] = useState(false);

  useEffect(() => {
    if (props?.BtnType == "Substation")
      handlePressFeeder(false)
    else if (props?.BtnType == "Feeder")
      handlePressFeeder(true)

  }, [])

  handlePressFeeder = (value) => {
    setTouch(value);
    props.onPress(value);
  };
  return (
    <View>
      <Text style={FeederRadioButtonStyle.headerText}>{props.title}</Text>
      <View style={FeederRadioButtonStyle.flexView}>
       
        <TouchableOpacity
          onPress={() => handlePressFeeder(false)}
          style={isTouch ? FeederRadioButtonStyle.btnRadio : FeederRadioButtonStyle.selectedBtnRadio}>
          {isTouch ? <Radio /> : <FillRadio />}
          <Text style={isTouch ? FeederRadioButtonStyle.radioText : FeederRadioButtonStyle.selectedRadioText}>
            Substation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePressFeeder(true)}
          style={!isTouch ? FeederRadioButtonStyle.btnRadio : FeederRadioButtonStyle.selectedBtnRadio}>
          {!isTouch ? <Radio /> : <FillRadio />}
          <Text style={!isTouch ? FeederRadioButtonStyle.radioText : FeederRadioButtonStyle.selectedRadioText}>
            Existing Feeder
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default FeederRadioButton;
