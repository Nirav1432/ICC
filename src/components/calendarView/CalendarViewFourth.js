import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import CalendarViewStyle from "./CalendarViewStyle";
import IcnCalendar from "../../assets/svg/IcnCalendar";
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const CalendarViewFourth = (props) => {

  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [isShowDate, setShowDate] = React.useState("Manufacturing Date")

  React.useEffect(() => {
    props.onChange({ defoultDate: date, currentDate: isShowDate });
  }, [date]);

  React.useEffect(() => {

    if (props?.oldDate != null && props?.oldDate != "" & props?.oldDate != "Manufacturing Date") {
      setDate(new Date(props?.oldDate))
      setShowDate(moment(new Date(props?.oldDate)).format("MM/YYYY"))
    }

  }, []);

  const onSelectDate = (date) => {
    setShowDate(moment(date).format("MM/YYYY"))
    setDate(date)
    setOpen(false)

    // props.onChange({ defoultDate: date, currentDate: moment(date).format("MM/YYYY") });
  }

  return (
    <View>
      <Text style={CalendarViewStyle.headerText}>{props.title}</Text>
      <TouchableOpacity style={CalendarViewStyle.btnDrop} onPress={() => setOpen(true)}>
        <Text style={CalendarViewStyle.text}>{isShowDate}</Text>
        <View style={CalendarViewStyle.line} />
        <IcnCalendar />

        <DatePicker
          modal
          mode='date'
          open={open}
          date={date}
          maximumDate={props?.maximumDate}
          onConfirm={(date) => { onSelectDate(date) }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarViewFourth;
