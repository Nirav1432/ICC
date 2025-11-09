import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import LoseReductionStyle from "./LoseReductionStyle";
import HalfDropDown from "../../../components/halfDropDown/HalfDropDown";
import FullDropDown from "../../../components/fullDropDown/FullDropDown";
import LoseReductionTab from "../../../components/loseReductionTab/LoseReductionTab";
import General from "../../general/General";

const LoseReduction = (props) => {
  const [tab, SetTab] = useState(1);

  const handleChangeTab = (index) => {
    SetTab(index);
  };

  const data = [
    { label: "2020-2021", value: "2020-2021" },
    { label: "2021-2022", value: "2021-2022" },
    { label: "2022-2023", value: "2022-2023" },
  ];

  return (
    <ScrollView
      style={LoseReductionStyle.scrollStl}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {/*  */}
        <View style={LoseReductionStyle.firstView}>
          <View style={LoseReductionStyle.flexView}>
            <HalfDropDown title={"Financial Year"} data={data} />
            <HalfDropDown title={"Month"} data={data} />
          </View>
          <View style={LoseReductionStyle.margin}>
            <FullDropDown title={"District"} />
          </View>
        </View>
        {/* tab bar */}
        <LoseReductionTab getTab={(index) => handleChangeTab(index)} />

        {/* {tab == 0 ? (
          <SmartMetering />
        ) : tab == 1 ? (
          <LoseReduction />
        ) : tab == 2 ? (
          <Modernization />
        ) : null} */}

        {/*  */}
        <General props={props} />
      </View>
    </ScrollView>
  );
};

export default LoseReduction;
