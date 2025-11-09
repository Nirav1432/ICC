import React from "react";
import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import { HeaderStyle } from "./HeaderStyle";
import { Colors } from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor={Colors.secondary} />
      <View style={HeaderStyle.container}>

        <TouchableOpacity onPress={onLeftPress} style={HeaderStyle.iconContainer}>
          <View>{leftIcon}</View>
        </TouchableOpacity>

        <Text style={HeaderStyle.title}>{title}</Text>

        <TouchableOpacity onPress={onRightPress} style={HeaderStyle.iconContainer}        >
          <View>{rightIcon}</View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;
