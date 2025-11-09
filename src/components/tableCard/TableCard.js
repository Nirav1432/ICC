import { View, Text } from "react-native";
import React from "react";
import { TableCardStyle } from "./TableCardStyle";
import FileContainer from "../fileContainer/FileContainer";
import { AppUtil } from "../../utils/AppUtil";

export default function TableCard({
  data,
  shouldShowTitle,
  shouldShowFileContainer,
}) {
  const shouldShowInfoButton = true;
  const margintop = AppUtil.getHP(2);
  return (
    <View style={TableCardStyle.container}>
      {shouldShowTitle && (
        <View style={TableCardStyle.title}>
          <Text style={TableCardStyle.titleLeftText}>Items</Text>
          <Text style={TableCardStyle.titleCenterText}>Weightage</Text>
          <Text style={TableCardStyle.titleRightText}>Score</Text>
        </View>
      )}
      {data.map((row, index) => (
        <View
          style={[
            TableCardStyle.row,
            index % 2 === 0 ? TableCardStyle.evenRow : TableCardStyle.oddRow,
          ]}
          key={index}
        >
          <Text style={TableCardStyle.leftText}>{row.leftText}</Text>
          {row.centerText && (
            <Text style={TableCardStyle.centerText}>{row.centerText}</Text>
          )}
          <Text style={TableCardStyle.rightText}>{row.rightText}</Text>
        </View>
      ))}
      {shouldShowFileContainer && (
        <FileContainer
          showInfoButton={shouldShowInfoButton}
          marginTop={margintop}
        />
      )}
    </View>
  );
}
