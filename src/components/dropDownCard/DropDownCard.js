import { View, Text } from "react-native";
import React from "react";
import { dropDownData } from "../../utils/CardData";
import DropDownCardStyle from "./DropDownCardStyle";
import { Labels } from "../../utils/Labels";

const DropDownCard = (props) => {
  const isCompliant = props.status === "Compliant";

  return (
    <View>
      <View style={DropDownCardStyle.container}>
        <Text style={DropDownCardStyle.title}>{props.title}</Text>
        <View style={DropDownCardStyle.horizontalLine} />
        <View style={DropDownCardStyle.row}>
          <View style={DropDownCardStyle.column}>
            <Text style={DropDownCardStyle.subtitle}>
              {Labels.dropDownCardTargetDate}
            </Text>
            <Text style={DropDownCardStyle.textField}>{props.targetDate}</Text>
          </View>
          <View style={DropDownCardStyle.column}>
            <Text style={DropDownCardStyle.subtitle}>
              {Labels.dropDownCardPublishedDate}
            </Text>
            <Text style={DropDownCardStyle.textField}>{props.publishDate}</Text>
          </View>
        </View>
        <View style={DropDownCardStyle.row}>
          <Text style={DropDownCardStyle.subtitle}>
            {Labels.dropDownCardStatus}
          </Text>
          <View
            style={[
              DropDownCardStyle.statusView,
              isCompliant
                ? DropDownCardStyle.compliantStatusView
                : DropDownCardStyle.nonCompliantStatusView,
            ]}
          >
            <Text style={DropDownCardStyle.statusTextField}>
              {props.status}
            </Text>
          </View>
        </View>

        <Text style={DropDownCardStyle.subtitle}>
          {Labels.dropDownCardRemarks}
        </Text>
        <Text style={DropDownCardStyle.subText}>{props.remarks}</Text>
        <Text style={DropDownCardStyle.documentsTitle}>
          {Labels.dropDownCardDocuments}
        </Text>

        <Text style={DropDownCardStyle.documentText}>{props.document}</Text>
      </View>
    </View>
  );
};
export default DropDownCard;
