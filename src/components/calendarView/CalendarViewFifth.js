import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { memo } from "react";
import CalendarViewStyle from "./CalendarViewStyle";
import IcnCalendar from "../../assets/svg/IcnCalendar";
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const CalendarView = (props) => {

    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [isShowDate, setShowDate] = React.useState("Installation Date")

    React.useEffect(() => {
        props.onChange({ defoultDate: date, currentDate: isShowDate });
    }, [date]);

    React.useEffect(() => {

        if (props?.oldDate != null && props?.oldDate != "" && props?.oldDate != "Installation Date") {
            setDate(new Date(props?.oldDate))
            setShowDate(moment(new Date(props?.oldDate)).format("MM/YYYY"))
        }
    }, []);


    React.useEffect(() => {

        if (props?.minimumDate && isShowDate !== "Installation Date" && props?.minimumDate > date) {
            setDate(new Date())
            setShowDate("Installation Date")
        }
        else {

        }

    }, [props?.minimumDate]);


    const onSelectDate = (dt) => {

        if (dt >= props?.minimumDate) {
            setShowDate(moment(dt).format("MM/YYYY"))
            setDate(dt)
            setOpen(false)

            // props.onChange({ defoultDate: dt, currentDate: moment(dt).format("MM/YYYY") });
        }
        else {
            setOpen(false)
            Alert.alert("Alert", "Invalid Installation Date")
        }
    }

    const onOpenPickerView = () => {

        if (props.minimumDate != "Manufacturing Date") {
            setOpen(true)
        }
        else {
            Alert.alert("Alert", "Please Select First Manufacturing Date")
        }

    }

    return (
        <View>
            <Text style={CalendarViewStyle.headerText}>{props.title}</Text>
            <TouchableOpacity style={CalendarViewStyle.btnDrop} onPress={() => onOpenPickerView()}>

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

export default memo(CalendarView);
