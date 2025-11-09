import { View, Text } from "react-native";
import React, { useState } from "react";
import { DropDefectCardStyle } from "./DropDefectCardStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import IcnGreyDown from "../assets/svg/IcnGreyDown";

export default function DropDefectCard({ isExpanded, onPress, title, addressCard }) {
  return (
    <View style={DropDefectCardStyle.dropCard}>

      <TouchableOpacity onPress={onPress}>

        <View style={!isExpanded ? DropDefectCardStyle.expandableCard : DropDefectCardStyle.noeExpandableCard}>
          <View style={DropDefectCardStyle.cardText}>
            <Text style={DropDefectCardStyle.expandableCardText}>{title}</Text>
          </View>

          <View style={DropDefectCardStyle.cardBtn}>
            <IcnGreyDown />
          </View>
        </View>

      </TouchableOpacity >
      {isExpanded && addressCard
      }
    </View >
  );
}
