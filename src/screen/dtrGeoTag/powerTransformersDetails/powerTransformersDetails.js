import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { PowerTransformersDetailsStyle } from "./PowerTransformersDetailsStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import DropDown from "../../../components/dropdown/DropDown";
import { Labels } from "../../../utils/Labels";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import DisabledField from "../../../components/disabledField/DisabledField";
import DatePicker from "../../../components/datePicker/DatePicker";

export default function PowerTransformersDetails(props) {
  const block = [
    { label: "Select", value: "block1" },
    { label: "Select", value: "block2" },
    { label: "Select", value: "block3" },
  ];

  const [showCalendar1, setShowCalendar1] = useState(false);
  const [selected1, setSelected1] = useState("");
  const [monthYear1, setMonthYear1] = useState("MM/YY");

  const [showCalendar2, setShowCalendar2] = useState(false);
  const [selected2, setSelected2] = useState("");
  const [monthYear2, setMonthYear2] = useState("MM/YY");

  const handleDayPress = (day, setMonthYear, setSelected, setShowCalendar) => {
    setSelected(day.dateString);
    setShowCalendar(false);

    const selectedDate = new Date(day.dateString);
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const updatedMonthYear = `${selectedMonth}/${selectedYear}`;
    setMonthYear(updatedMonthYear);
  };

  return (
    <>
      <Header
        title="Power Transformers Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />

      <ScrollView>
        <View style={PowerTransformersDetailsStyle.modifySearch1}>
          <Text style={PowerTransformersDetailsStyle.modifySearchText1}>
            {Labels.powerTransfromerHeader}
          </Text>
        </View>
        <View style={PowerTransformersDetailsStyle.modifySearch}>
          <Text style={PowerTransformersDetailsStyle.modifySearchText}>
            {Labels.generalDetails}
          </Text>
          <TouchableOpacity>
            <IcnGreyDown />
          </TouchableOpacity>
        </View>
        <View style={PowerTransformersDetailsStyle.innerContainer}>
          <DropDown dropDownTitle="SS Name" data={block} />
          <DropDown dropDownTitle="PT Capability" data={block} />
          <DisabledField title="SS Code" value="50" />
          <DropDown dropDownTitle="Make Model" data={block} />
          <DatePicker
            title={"Other"}
            onPress={() => setShowCalendar1(true)}
            monthYear={monthYear1}
          />
          {showCalendar1 && (
            <Calendar
              onDayPress={(day) =>
                handleDayPress(
                  day,
                  setMonthYear1,
                  setSelected1,
                  setShowCalendar1
                )
              }
              markedDates={{
                [selected1]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          )}
          <DatePicker
            title={"Manufacturing Month/Year"}
            onPress={() => setShowCalendar2(true)}
            monthYear={monthYear2}
          />
          {showCalendar2 && (
            <Calendar
              onDayPress={(day) =>
                handleDayPress(
                  day,
                  setMonthYear2,
                  setSelected2,
                  setShowCalendar2
                )
              }
              markedDates={{
                [selected2]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          )}

          <SubmitBtn
            title="Submit"
            onPress={() => {
              props.navigation.navigate("InitialPage");
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
