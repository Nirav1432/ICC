import { View, Text } from "react-native";
import React from "react";
import { dropDownData } from "../../utils/CardData";
import DropDownCardStyle2 from "./DropDownCardStyle2";
import { Labels } from "../../utils/Labels";
import FileContainer from "../fileContainer/FileContainer";
import { TouchableOpacity } from "react-native-gesture-handler";

const DropDownCard2 = (props) => {
  const isCompliant = props.status === "Compliant";
  return (
    <View>
      <View style={DropDownCardStyle2.container}>
        <View style={DropDownCardStyle2.row}>
          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardTargetDate}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.targetDate}</Text>
          </View>

          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardPublishedDate}
            </Text>
            <Text style={DropDownCardStyle2.textField}>
              {props.publishDate}
            </Text>
          </View>
        </View>
        <View style={DropDownCardStyle2.row}>
          <Text style={DropDownCardStyle2.subtitle}>
            {Labels.dropDownCardStatus}
          </Text>
          <View
            style={[
              DropDownCardStyle2.statusView,
              isCompliant
                ? DropDownCardStyle2.compliantStatusView
                : DropDownCardStyle2.nonCompliantStatusView,
            ]}
          >
            <Text style={DropDownCardStyle2.statusTextField}>
              {props.status}
            </Text>
          </View>
        </View>

        <View style={DropDownCardStyle2.row}>
          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardStatutoryAudit}
            </Text>
            <Text style={DropDownCardStyle2.textField}>
              {props.auditStatus}
            </Text>
          </View>

          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardDate}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.auditDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={DropDownCardStyle2.row2}>
          <FileContainer />
          <Text style={DropDownCardStyle2.fileName}>
            {props.statutoryUpload}
          </Text>
        </TouchableOpacity>

        <View style={DropDownCardStyle2.horizontalLine} />
        <View style={DropDownCardStyle2.row}>
          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardBoardApproval}
            </Text>
            <Text style={DropDownCardStyle2.textField}>
              {props.boardStatus}
            </Text>
          </View>

          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardDate}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.boardDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={DropDownCardStyle2.row2}>
          <FileContainer />
          <Text style={DropDownCardStyle2.fileName}>{props.boardUpload}</Text>
        </TouchableOpacity>
        <View style={DropDownCardStyle2.horizontalLine} />
        <View style={DropDownCardStyle2.row}>
          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardCag}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.cagStatus}</Text>
          </View>

          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardDate}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.cagDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={DropDownCardStyle2.row2}>
          <FileContainer />
          <Text style={DropDownCardStyle2.fileName}>{props.cagUpload}</Text>
        </TouchableOpacity>
        <View style={DropDownCardStyle2.horizontalLine} />
        <View style={DropDownCardStyle2.row}>
          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardAGM}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.agmStatus}</Text>
          </View>

          <View style={DropDownCardStyle2.column}>
            <Text style={DropDownCardStyle2.subtitle}>
              {Labels.dropDownCardDate}
            </Text>
            <Text style={DropDownCardStyle2.textField}>{props.agmDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={DropDownCardStyle2.row2}>
          <FileContainer />
          <Text style={DropDownCardStyle2.fileName}>{props.agmUpload}</Text>
        </TouchableOpacity>
        <View style={DropDownCardStyle2.horizontalLine} />
        <Text style={DropDownCardStyle2.remarks}>
          {Labels.dropDownCardRemarks}
        </Text>
        <Text style={DropDownCardStyle2.subText}>{props.remarks}</Text>
      </View>
    </View>
  );
};
export default DropDownCard2;
