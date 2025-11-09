import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InfoButtonStyle } from "./InfoButtonStyle";
import IcnInfo from "../../assets/svg/dtrSvgs/IcnInfo";

export default function InfoButton() {
  return (
    <View>
      <TouchableOpacity style={InfoButtonStyle.rightIcon}>
        <IcnInfo />
      </TouchableOpacity>
    </View>
  );
}
