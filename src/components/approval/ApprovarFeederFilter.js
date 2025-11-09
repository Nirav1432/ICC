import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ApprovalFilterStyle } from "./ApprovalFilterStyle";
import DatePicker from 'react-native-date-picker'
import SubmitBtn from "../clogin/commonButton/SubmitBtn";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";

import SingleDropdownList1 from "../singleselectlist/SingleDropdownList1";
import SingleDropdownList2 from "../singleselectlist/SingleDropdownList2";
import FillRadio from "../../assets/svg/FillRadio";
import Radio from "../../assets/svg/Radio";
import IcnCalendar from "../../assets/svg/IcnCalendar";
import moment from "moment";
import Loader from "../Loader";
import SingleDropdownList3 from "../singleselectlist/SingleDropdownList3";
import SingleValueDropdownListSetOldData from "../singleselectlist/SingleValueDropdownListSetOldData";
import { Labels } from "../../utils/Labels";
import { CircuitType1, ddrFeederGeotagFilterStatus, Line, LTLineVoltage1, PoleStructur1, Scheme1, SinglePhaseThreePhase1, TypeOfCable1, TypeOfConductor1, UGorOH1, WhetherCableOrConductor1 } from "../../utils/CardData";

export default function ApprovarFeederFilter({ handleClose, modalVisible, oldFilter, newFilter, majorComponentList, }) {

    const [isLoader, setLoader] = useState(false);

    const [isStatus, setStatus] = useState("");
    const [isLTHTline, setLTHTline] = useState("");
    const [isScheme, setScheme] = useState("");
    const [isMajorComponent, setMajorComponent] = useState("");
    const [isUGorOH, setUGorOH] = useState("");
    const [isWhetherCableOrConductor, setWhetherCableOrConductor] = useState("");
    const [isTypeOfCable, setTypeOfCable] = useState("");
    const [isTypeOfConductor, setTypeOfConductor] = useState("");
    const [isCircuitType, setCircuitType] = useState("");
    const [isHTLineVoltage, setHTLineVoltage] = useState("");
    const [isPoleStructur, setPoleStructur] = useState("");
    const [isSinglePhaseThreePhase, setSinglePhaseThreePhase] = useState("");

    useEffect(() => {

        if (oldFilter != null && oldFilter != undefined) {

            if (oldFilter?.Line == "HTline")
                setLTHTline("LT Line");
            else if (oldFilter?.Line == "HLline")
                setLTHTline("HT Line");
            else
                setLTHTline("");

            setScheme(oldFilter?.Scheme);
            setMajorComponent(oldFilter?.MajorComponent);
            setUGorOH(oldFilter?.UGorOH)
            setWhetherCableOrConductor(oldFilter?.WhetherCableOrConductor);
            setTypeOfCable(oldFilter?.TypeOfCable);
            setTypeOfConductor(oldFilter?.TypeOfConductor);
            setCircuitType(oldFilter?.CircuitType);
            setHTLineVoltage(oldFilter?.HTLineVoltage);
            setPoleStructur(oldFilter?.PoleStructur);
            setSinglePhaseThreePhase(oldFilter?.SinglePhaseThreePhase);
            setStatus(oldFilter?.status);

        }
        else {
            setLTHTline("");
            setScheme("");
            setMajorComponent("");
            setUGorOH("");
            setWhetherCableOrConductor("");
            setTypeOfCable("");
            setTypeOfConductor("");
            setCircuitType("");
            setHTLineVoltage("");
            setPoleStructur("");
            setSinglePhaseThreePhase("");
            setStatus("")
        }
    }, [modalVisible, handleClose]);


    const onClose = () => {
        handleClose();
    }
    const onSave = () => {
        var obj = {
            status: isStatus,
            Line: isLTHTline, Scheme: isScheme, MajorComponent: isMajorComponent, UGorOH: isUGorOH, WhetherCableOrConductor: isWhetherCableOrConductor,
            TypeOfCable: isTypeOfCable, TypeOfConductor: isTypeOfConductor, CircuitType: isCircuitType, HTLineVoltage: isHTLineVoltage, PoleStructur: isPoleStructur,
            SinglePhaseThreePhase: isSinglePhaseThreePhase,
        }
        newFilter(obj);
        handleClose();
    }

    const onSelectItem = (item) => {
        setStatus(item?.value);
    }


    return (

        <Modal animationType="none" visible={modalVisible} transparent={true}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={ApprovalFilterStyle.container}>
                    <KeyboardAwareScrollView>
                        <View style={ApprovalFilterStyle.header}>
                            <View style={ApprovalFilterStyle.headerLeft}>
                                <Text style={ApprovalFilterStyle.title}>Filter</Text>
                            </View>
                            <View style={ApprovalFilterStyle.headerRight}>
                                <TouchableOpacity onPress={onClose} >
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={ApprovalFilterStyle.fields}>
                            {/* <SingleValueDropdownListSetOldData oldIndex={Line.indexOf(isStatus)} title={Labels.ddrFeederGeotaStatus} data={ddrFeederGeotagFilterStatus} onSelectedSevice={(value) => setStatus(value)} />  */}

                            <SingleDropdownList2 defoultVaule={isStatus} title={"Statuss"} data={ddrFeederGeotagFilterStatus} onSelectedSevice={(value) => onSelectItem(value)} />

                            <SingleValueDropdownListSetOldData oldIndex={Line.indexOf(isLTHTline)} title={Labels.HtLtLineTitle} data={Line} onSelectedSevice={(value) => setLTHTline(value)} />
                            <SingleValueDropdownListSetOldData oldIndex={Scheme1.indexOf(isScheme)} title={"Scheme"} data={Scheme1} onSelectedSevice={(value) => setScheme(value)} />
                            <SingleValueDropdownListSetOldData oldIndex={majorComponentList.indexOf(isMajorComponent)} title={"Major Component"} data={majorComponentList} onSelectedSevice={(value) => setMajorComponent(value)} />
                            <SingleValueDropdownListSetOldData oldIndex={UGorOH1.indexOf(isUGorOH)} title={"UG or OH"} data={UGorOH1} onSelectedSevice={(value) => setUGorOH(value)} />
                            <SingleValueDropdownListSetOldData oldIndex={WhetherCableOrConductor1?.indexOf(isWhetherCableOrConductor)} title={"Whether cable or conductor"} data={WhetherCableOrConductor1}
                                onSelectedSevice={(value) => setWhetherCableOrConductor(value)} />
                            {
                                isWhetherCableOrConductor == "Cable" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfCable1?.indexOf(isTypeOfCable)} title={"Type of Cable"} data={TypeOfCable1} onSelectedSevice={(value) => setTypeOfCable(value)} />
                            }
                            {
                                isWhetherCableOrConductor == "Conductor" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfConductor1?.indexOf(isTypeOfConductor)} title={"Type of Conductor"} data={TypeOfConductor1} onSelectedSevice={(value) => setTypeOfConductor(value)} />
                            }
                            
                            <SingleValueDropdownListSetOldData oldIndex={CircuitType1?.indexOf(isCircuitType)} title={"Circuit Type"} data={CircuitType1} onSelectedSevice={(value) => setCircuitType(value)} />

                            {isLTHTline == "HT Line" &&
                                <SingleValueDropdownListSetOldData oldIndex={LTLineVoltage1?.indexOf(isHTLineVoltage)} title={"HT Line Voltage"} data={LTLineVoltage1} onSelectedSevice={(value) => { setHTLineVoltage(value) }} />
                            }
                            {isLTHTline == "HT Line" &&
                                <SingleValueDropdownListSetOldData oldIndex={PoleStructur1?.indexOf(isPoleStructur)} title={"Pole Structure"} data={PoleStructur1} onSelectedSevice={(value) => setPoleStructur(value)} />
                            }
                            {isLTHTline == "LT Line" &&
                                <SingleValueDropdownListSetOldData oldIndex={SinglePhaseThreePhase1?.indexOf(isSinglePhaseThreePhase)} title={"Single Phase / Three Phase"} data={SinglePhaseThreePhase1} onSelectedSevice={(value) => setSinglePhaseThreePhase(value)} />
                            }
                        </View>

                        <SubmitBtn title={"Save"} onPress={() => onSave()} />
                    </KeyboardAwareScrollView>

                </View>
            </View>
            {isLoader && <Loader />}
        </Modal>
    );
}
