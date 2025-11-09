import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import CalendarViewStyle from "./CalendarViewStyle";
import IcnCalendar from "../../assets/svg/IcnCalendar";
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const CalendarView = (props) => {

  const [date, setDate] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    props.onChange(date);
  }, [date]);

  React.useEffect(() => {

    // if (props?.oldDate != null && props?.oldDate != "") {
    //   setDate(new Date(props?.oldDate))
    // }
    if (props?.oldDate != null && props?.oldDate != "") {
      setDate(new Date(props?.oldDate))
    }
    else {
      setDate(new Date())
    }

  }, []);

  React.useEffect(() => {
    if (props.minimumDate == null)
      return

    if (props.minimumDate > date) {
      setDate(new Date(props.minimumDate))
    }
  }, [props.minimumDate, date]);

  return (
    <View>
      <Text style={CalendarViewStyle.headerText}>{props.title}</Text>
      <TouchableOpacity style={CalendarViewStyle.btnDrop} onPress={() => setOpen(true)}>
        <Text style={CalendarViewStyle.text}>{props.isFullDate ? moment(date).format("YYYY-MM-DD") : moment(date).format("MM/YYYY")}</Text>
        <View style={CalendarViewStyle.line} />
        <IcnCalendar />

        {date &&
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
        }
      </TouchableOpacity>
    </View>
  );
};

export default memo(CalendarView);
