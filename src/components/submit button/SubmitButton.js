import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { SubmitButtonStyle } from "./SubmitButtonStyle";

const SubmitButton = ({
  handlePress,
  buttonText,
  buttonColor,
  borderColor,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        SubmitButtonStyle.submitButton,
        { backgroundColor: buttonColor, borderColor: borderColor },
      ]}
      onPress={handlePress}
    >
      <Text style={[SubmitButtonStyle.buttonText, { color: textColor }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
