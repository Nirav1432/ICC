import { View, Text } from "react-native";
import React, { useState } from "react";
import GeotaggedSubstationStyle from "./GeotaggedSubstationStyle";
import { AppUtil } from "../../utils/AppUtil";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import SubmitButton from "../submit button/SubmitButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const GeotaggedSubstation = () => {
  const [dropDown, setDropDown] = useState(true);

  const handlePress = (index) => {
   
  };

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <View style={GeotaggedSubstationStyle.container}>
      <Text style={GeotaggedSubstationStyle.headText}>
        Geotagged Substation
      </Text>
      <View style={GeotaggedSubstationStyle.subContainer}>
        <View style={GeotaggedSubstationStyle.subHeader1}>
          <Text style={GeotaggedSubstationStyle.subHeaderText1}>
            New Power Substation
          </Text>
          <TouchableOpacity onPress={() => toggleDropDown()}>
            <IcnGreyDown height={AppUtil.getHP(2)} width={AppUtil.getHP(2)} />
          </TouchableOpacity>
        </View>
        {[1, 2].map((item, index) => {
          return (
            dropDown && (
              <TouchableOpacity
                style={[
                  GeotaggedSubstationStyle.subView,
                  index == 1
                    ? GeotaggedSubstationStyle.curve
                    : GeotaggedSubstationStyle.line,
                ]}
                onPress={() => handlePress(index)}
                key={index}
                dropDown={dropDown}
              >
                <Text style={GeotaggedSubstationStyle.headText}>
                  New Power Substation
                </Text>
                <Text style={GeotaggedSubstationStyle.subText}>
                  1. APD_Baj_SS33_NPS_0001
                </Text>
              </TouchableOpacity>
            )
          );
        })}
      </View>
    </View>
  );
};

export default GeotaggedSubstation;
