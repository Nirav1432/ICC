import { View, Text } from "react-native";
import React from "react";
import { FileContainerStyle } from "./FileContainerStyle";
import IcnExcel from "../../assets/svg/dtrSvgs/IcnExcel";
import InfoButton from "../InfoButton/InfoButton";

export default function FileContainer({ showInfoButton, marginTop }) {
  return (
    <View>
      <View style={[FileContainerStyle.fileContainer, { marginTop }]}>
        <View style={FileContainerStyle.leftIcon}>
          <IcnExcel />
        </View>

        {showInfoButton && <InfoButton />}
      </View>
    </View>
  );
}
