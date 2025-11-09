import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RdssStyle } from "./RdssStyle";

const CardComponent = ({ card, index, touchedIndex, handleCardTouch }) => {
  return (
    <TouchableOpacity onPress={() => handleCardTouch(index)}>
      <View
        style={[
          RdssStyle.cardContainer,
          touchedIndex === index && RdssStyle.cardContainerTouched,
        ]}
      >
        <View style={RdssStyle.cardImage}>{card.image}</View>
        <Text style={RdssStyle.cardText}>{card.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardComponent;
