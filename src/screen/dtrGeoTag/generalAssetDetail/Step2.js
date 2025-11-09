import { View, Text, TextInput, Alert } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../../utils/Colors";
import GeneralAssetDetailStyle from "./GeneralAssetDetailStyle";
import FullDropDown from "../../../components/fullDropDown/FullDropDown";
import EnableView from "../../../components/enableView/EnableView";
import CalendarView from "../../../components/calendarView/CalendarView";
import SubmitButton from "../../../components/submit button/SubmitButton";
import { Labels } from "../../../utils/Labels";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import CalendarViewSecond from "../../../components/calendarView/CalendarViewSecond";
import SingleValueDropdownListSetOldData from "../../../components/singleselectlist/SingleValueDropdownListSetOldData";


const Step2 = ({ handleButtonPress, data, oldData, pacageList }) => {

  // const [isDtrType, setDtrType] = React.useState(null);
  const [isDtrCapacity, setDtrCapacity] = React.useState(null);
  const [isPackege, setPackege] = React.useState(null);
  const [isDtrVoltage, setDtrVoltage] = React.useState(null);
  const [isMake, setMake] = React.useState(null);
  const [isManufacturingDate, setManufacturingDate] = React.useState(null);
  const [isInstallationDate, setInstallationDate] = React.useState(null);
  const [isDtrMounting, setDtrMounting] = React.useState(null);
  const [isNomberOfFeeder, setNomberOfFeeder] = React.useState(null);

  useEffect(() => {
    if (oldData) {
      data?.dtr_capacity?.forEach(element => {
        if (oldData?.dtr_capacity == element.id) {
          setDtrCapacity(element);
        }
      });

      data?.dtr_voltage_ratio?.forEach(element => {
        if (oldData?.dtr_voltage_ratio == element.id) {
          setDtrVoltage(element);
        }
      });

      data?.dtr_mounting?.forEach(element => {
        if (oldData?.dtr_mounting == element.id) {
          setDtrMounting(element);
        }
      });


      setMake(oldData?.dtr_model)
      setNomberOfFeeder(oldData?.dtr_number_of_dtr);
      setPackege(oldData?.dtr_Package);
    }
  }, [oldData]);

  const onSubmit = () => {
    if (isDtrCapacity == null) {
      Alert.alert("Alert", "Please add DTR capacity")
      return
    }
    else if (isDtrVoltage == null) {
      Alert.alert("Alert", "Please add Voltage")
      return
    }
    else if (isMake == null) {
      Alert.alert("Alert", "Please add make/model of DTR")
      return
    }
    else if (isDtrMounting == null) {
      Alert.alert("Alert", "Please add Mounting")
      return
    }
    else if (isNomberOfFeeder == null) {
      Alert.alert("Alert", "Please add No of feeder")
      return
    }

    handleButtonPress({
      // dtr_type:isDtrType?.id,
      dtr_capacity: isDtrCapacity?.id,
      dtr_voltage_ratio: isDtrVoltage?.id,
      dtr_model: isMake,
      dtr_manufacturing_month_year: isManufacturingDate,
      dtr_year_installation: isInstallationDate,
      dtr_mounting: isDtrMounting?.id,
      dtr_number_of_dtr: isNomberOfFeeder,
      dtr_Package: isPackege,
    })
  }
  return (
    <>

      <View style={GeneralAssetDetailStyle.marginTop}>

        <SingleValueDropdownListSetOldData oldIndex={""} title={"Package No."} oldIndex={pacageList?.indexOf(oldData?.dtr_Package)} data={pacageList} onSelectedSevice={(value) => setPackege(value)} />
        <Text style={GeneralAssetDetailStyle.asaText}>*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”</Text>
      </View>

      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={"DTR Capacity (KVA)*"} defoultVaule={oldData && oldData?.dtr_capacity} data={data?.dtr_capacity} onSelectedSevice={(selectState) => setDtrCapacity(selectState)} />
        <Text style={GeneralAssetDetailStyle.asaText}>*(6/15/25/…)</Text>
      </View>

      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={"DTR Voltage Ratio*"} defoultVaule={oldData && oldData?.dtr_voltage_ratio} data={data?.dtr_voltage_ratio} onSelectedSevice={(selectState) => setDtrVoltage(selectState)} />
      </View>

      <View style={GeneralAssetDetailStyle.marginTop}>

        <Text style={GeneralAssetDetailStyle.headerText}>{"Make/Model / S.No of DTR*"}</Text>

        <TextInput
          maxLength={70}
          value={isMake}
          style={GeneralAssetDetailStyle.inpView}
          onChangeText={(txt) => setMake(txt.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))}

        />
      </View>

      <View style={GeneralAssetDetailStyle.marginTop}>
        <CalendarView oldDate={oldData.dtr_manufacturing_month_year} title={"Manufacturing month and year of DTR*"} maximumDate={new Date()} onChange={(value) => setManufacturingDate(value)} />
      </View>

      <View style={GeneralAssetDetailStyle.marginTop}>
        <CalendarViewSecond oldDate={oldData.dtr_year_installation} title={"Month/Year of Installation*"} maximumDate={new Date()} minimumDate={isManufacturingDate} onChange={(value) => setInstallationDate(value)} />
      </View>

      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={"DTR Mounting*"} defoultVaule={oldData && oldData?.dtr_mounting} data={data?.dtr_mounting} onSelectedSevice={(value) => setDtrMounting(value)} />
        <Text style={GeneralAssetDetailStyle.asaText}>
          *(Single Pole/ Double Pole, Plinth….)
        </Text>
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <Text style={GeneralAssetDetailStyle.headerText}>{"No of Feeders Emanating from DTR*"}</Text>
        <TextInput
          maxLength={70}
          value={isNomberOfFeeder}
          style={GeneralAssetDetailStyle.inpView}
          onChangeText={(txt) => setNomberOfFeeder(txt.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
        />
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>

        <SubmitButton
          textColor={Colors.white}
          borderColor={Colors.transparent}
          handlePress={() => onSubmit()}
          buttonColor={Colors.orange}
          buttonText={"Next"}
        />
      </View>
    </>
  );
};

export default Step2;
