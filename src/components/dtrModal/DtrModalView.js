import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ModalViewStyle } from "./ModalViewStyle";
import SubmitBtn from "../clogin/commonButton/SubmitBtn";
import SingleDropdownList from "../singleselectlist/SingleDropdownListSetOldData";
import CalendarView from "../calendarView/CalendarViewTherd";
import CalendarViewfour from "../calendarView/CalendarViewfour";
import { EngravedUnderRDSS, EngravedUnderRDSS1 } from "../../utils/CardData";
import SingleValueDropdownListSetOldData from "../singleselectlist/SingleValueDropdownListSetOldData";

function DtrModalView({
  handleClose, isModalVisible, list1,
  getCapacitye, oldCapacity,
  getVoltage, oldVoltage,
  getmodelofDTR, modelofDTR,
  getinstallationDT, installationDT,
  getmanufacturingDT, manufacturingDT,
  getMounying, oldmounting,
  getnoonFeeder, noonFeeder,
  oldEngravedUnderRDSS, onEngravedUnderRDSS,
}) {


  const [isManufacturingDate, setManufacturingDate] = React.useState(null);

  const [isMake, setMake] = React.useState(null);
  const [isNomberOfFeeder, setNomberOfFeeder] = React.useState(null);

  useEffect(() => {
    setMake(modelofDTR);
    setNomberOfFeeder(noonFeeder);
  }, [handleClose, isModalVisible]);

  const onClickDTRCapacity = (data) => {
    getCapacitye(data);
  }
  const onClickDTRVoltage = (data) => {
    getVoltage(data);
  }
  const onClickDTRMounting = (data) => {
    getMounying(data);
  }

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={ModalViewStyle.container}>
          <KeyboardAwareScrollView>
            <View style={ModalViewStyle.header}>
              <View style={ModalViewStyle.headerLeft}>
                <Text style={ModalViewStyle.title}>DTR Details</Text>
              </View>
              <View style={ModalViewStyle.headerRight}>
                <TouchableOpacity onPress={handleClose}>
                  <Text style={{ color: "black" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={ModalViewStyle.fields}>

              <SingleDropdownList defoultVaule={oldCapacity} title={"DTR Capacity(KVA)*"} data={list1?.dtr_capacity} onSelectedSevice={(value) => onClickDTRCapacity(value?.title)} />
              <SingleDropdownList defoultVaule={oldVoltage} title={"DTR Voltage Ratio*"} data={list1?.dtr_voltage_ratio} onSelectedSevice={(value) => onClickDTRVoltage(value?.title)} />


              <View style={ModalViewStyle.marginTop}>
                <Text style={ModalViewStyle.headerText}>{"Make/ Model / S.No of DTR"}</Text>
                <TextInput
                  maxLength={70}
                  value={isMake}
                  style={ModalViewStyle.inpView}
                  onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                />
              </View>

              <CalendarViewfour title={"Manufacturing Month & Year of DTR"} oldDate={manufacturingDT} maximumDate={new Date()} onChange={(value) => { setManufacturingDate(value), getmanufacturingDT(value) }} />
              <CalendarView title={"Month/Year of installation"} oldDate={installationDT} maximumDate={new Date()} minimumDate={isManufacturingDate} onChange={(value) => { getinstallationDT(value) }} />

              <SingleDropdownList defoultVaule={oldmounting} title={"DTR Mounting"} data={list1?.dtr_mounting} onSelectedSevice={(value) => onClickDTRMounting(value?.title)} />

              <SingleValueDropdownListSetOldData oldIndex={EngravedUnderRDSS1?.indexOf(oldEngravedUnderRDSS)} title={"Engraved under RDSS"} data={EngravedUnderRDSS1} onSelectedSevice={(value) => onEngravedUnderRDSS(value)} />

              <View style={ModalViewStyle.marginTop}>
                <Text style={ModalViewStyle.headerText}>{"No of Feeders Emanating from DTR"}</Text>
                <TextInput
                  maxLength={70}
                  value={isNomberOfFeeder}
                  keyboardType="number-pad"
                  style={ModalViewStyle.inpView}
                  onChangeText={(txt) => { setNomberOfFeeder(txt), getnoonFeeder(txt) }}
                />
              </View>

            </View>
            <SubmitBtn title={"Save"} onPress={handleClose} />
          </KeyboardAwareScrollView>

        </View>
      </View>

    </Modal>
  );
}
export default React.memo(DtrModalView);