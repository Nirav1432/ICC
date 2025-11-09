

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CalendarViewStyle from "./CalendarViewStyle";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import IcnCalendar from "../../assets/svg/IcnCalendar";
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const CalendarViewTherd = (props) => {

  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {


    props.onChange(date);
  }, [date]);


  React.useEffect(() => {

    if (props?.oldDate != null) {
      setDate(new Date(props?.oldDate))
    }

  }, []);

  React.useEffect(() => {
    if (props?.minimumDate == null)
      return

    setTimeout(() => {
      if (props?.minimumDate > date) {
        setDate(new Date(props?.minimumDate))
      }
    }, 500)

  }, [props.minimumDate]);

  return (
    <View>

      <Text style={CalendarViewStyle.headerText2}>{props.title}</Text>

      <TouchableOpacity style={CalendarViewStyle.btnDrop} onPress={() => setOpen(true)}>
        <Text style={CalendarViewStyle.text2}>{moment(date).format("MM/YYYY")}</Text>
        <IcnCalendar />

        <DatePicker
          modal
          mode='date'
          open={open}
          date={date}
          minimumDate={props?.minimumDate}
          maximumDate={props?.maximumDate}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarViewTherd;
