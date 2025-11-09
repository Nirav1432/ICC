import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CommonTabsStyle from "./CommonTabsStyle";

const CommonTabs = ({ data, getTab }) => {
  const [tabData, setTabData] = useState(data);

  const handleChangeTab = (index) => {
    const updatedTabData = tabData.map((item, i) => {
      return {
        ...item,
        selected: i === index,
      };
    });

    setTabData(updatedTabData);
    getTab(index);
  };

  return (
    <View style={CommonTabsStyle.tabView}>
      {tabData.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleChangeTab(index)}
          style={[
            item.selected
              ? CommonTabsStyle.selectedTabBtn
              : CommonTabsStyle.tabBtn,
            index === tabData.length - 1 && { borderRightWidth: 0 },
            { width: `${100 / tabData.length}%` },
          ]}
          key={index}
        >
          <Text
            style={
              item.selected
                ? CommonTabsStyle.selectedTabText
                : CommonTabsStyle.tabText
            }
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CommonTabs;
