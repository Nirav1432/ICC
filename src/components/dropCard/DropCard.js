import { View, Text } from "react-native";
import React, { useState } from "react";
import { DropCardStyle } from "./DropCardStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

export default function DropCard({ isExpanded, onPress, title, addressCard }) {
  return (
      <View style={DropCardStyle.dropCard}>
        <TouchableOpacity style={DropCardStyle.expandBtn} onPress={onPress}>
        <View style={DropCardStyle.expandableCard}>
          <View style={DropCardStyle.cardText}>
            <Text style={DropCardStyle.expandableCardText}>{title}</Text>
          </View>
          <View style={DropCardStyle.cardBtn}>
              <IcnGreyDown />
          </View>
        </View>
        </TouchableOpacity>
        {isExpanded && addressCard}
      </View>
  );
}
