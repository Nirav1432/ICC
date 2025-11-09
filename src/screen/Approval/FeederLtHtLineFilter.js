//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppUtil } from "../../utils/AppUtil";
import { Labels } from "../../utils/Labels";
import {
    CircuitType, Scheme, PoleStructur, LTLineVoltage, TypeOfCable, TypeOfConductor, UGorOH, SinglePhaseThreePhase1, Line,
    Scheme1, UGorOH1, LTLineVoltage1, WhetherCableOrConductor1, TypeOfCable1, TypeOfConductor1, PoleStructur1, CircuitType1
} from "../../utils/CardData";
import SingleValueDropdownListSetOldData from "../../components/singleselectlist/SingleValueDropdownListSetOldData";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

// create a component
const FeederLtHtLineFilter = ({ handleClose, modalVisible, newFilter, oldFilter, majorComponentList,

    oldScheme, onSelectScheme,
    oldMajorComponent, onSelectMajorComponent,
    oldUGorOH, onSelectUGorOH,

    oldLTLineVoltage, onSelectLTLineVoltage,
    oldSpecifyTypeVoltage, onSelectSpecifyTypeVoltage,

    oldTypeOfCable, onSelectTypeOfCable,
    olsSpecifyTypeOfCable, onSelectSpecifyTypeOfCable,

    oldTypeOfConductor, onSelectTypeOfConductor,
    olsSpecifyTypeOfConductor, onSelectSpecifyTypeOfConductor,

    oldWhetherCableOrConductor, onSelectWhetherCableOrConductor,
    oldPoleStructur, onSelectPoleStructur,
    oldCircuitType, onSelectCircuitType,
    saveObj,

}) => {

    const [isLine, setLine] = React.useState("");
    const [isScheme, setScheme] = React.useState("");
    const [isSelectedMajorComponent, setSelectedMajorComponent] = React.useState("");
    const [isUGorOH, setUGorOH] = React.useState("");
    const [isHTLineVoltage, setHTLineVoltage] = React.useState("");
    const [isCableOrConductor, setCableOrConductor] = React.useState("");
    const [isTypeofCable, setTypeofCable] = React.useState("");
    const [isTypeofConductor, setTypeofConductor] = React.useState("");
    const [isPoleStructure, setPoleStructure] = React.useState("");
    const [isCircuitType, setCircuitType] = React.useState("");
    const [isSinglePhaseThreePhase, setSinglePhaseThreePhase] = React.useState("");

    const [isTypeCableConductor, setTypeCableConductor] = React.useState(oldWhetherCableOrConductor);

    // const [isHTLineVoltage, setHTLineVoltage] = React.useState(oldLTLineVoltage);
    const [isSpecifyTypeVoltage, setSpecifyTypeVoltage] = React.useState(oldSpecifyTypeVoltage);

    const [isTypeOfCable, setTypeOfCable] = React.useState(oldTypeOfCable);
    const [isSpecifyTypeOfCable, setSpecifyTypeOfCable] = React.useState(olsSpecifyTypeOfCable);

    const [isTypeOfConductor, setTypeOfConductor] = React.useState(oldTypeOfConductor);
    const [isSpecifyTypeOfConductor, setSpecifyTypeOfConductor] = React.useState(olsSpecifyTypeOfConductor);


    useEffect(() => {
        if (oldFilter != null && oldFilter != undefined) {
            setLine(oldFilter?.Line);
            setScheme(oldFilter?.Scheme)
            setSelectedMajorComponent(oldFilter?.SelectedMajorComponent);
            setUGorOH(oldFilter?.UGorOH);
            setHTLineVoltage(oldFilter?.HTLineVoltage);
            setCableOrConductor(oldFilter?.CableOrConductor);
            setTypeofCable(oldFilter?.TypeofCable);
            setTypeofConductor(oldFilter?.TypeofConductor);
            setPoleStructure(oldFilter?.PoleStructure);
            setCircuitType(oldFilter?.CircuitType);
        }
    }, [modalVisible, handleClose]);

    const onSelectItem = (type, item) => {
        if (type == "Line") {
            setLine(item);
            setHTLineVoltage("");
            setPoleStructure("");
            setSinglePhaseThreePhase("");
        }
        else if (type == "Scheme")
            setScheme(item);
        else if (type == "MajorComponent")
            setSelectedMajorComponent(item);
        else if (type == "UGorOH")
            setUGorOH(item);
        else if (type == "HTLineVoltage")
            setHTLineVoltage(item);
        else if (type == "CableOrConductor") {
            setCableOrConductor(item);
            setTypeofCable("");
            setTypeofConductor("");
        }
        else if (type == "TypeofCable")
            setTypeofCable(item);
        else if (type == "TypeofConductor")
            setTypeofConductor(item);
        else if (type == "PoleStructure")
            setPoleStructure(item);
        else if (type == "SinglePhaseThreePhase")
            setSinglePhaseThreePhase(item);
        else if (type == "CircuitType")
            setCircuitType(item);
    }
    const onApply = () => {
        var obj = {
            Line: isLine,
            Scheme: isScheme,
            SelectedMajorComponent: isSelectedMajorComponent,
            UGorOH: isUGorOH,
            HTLineVoltage: isHTLineVoltage,
            CableOrConductor: isCableOrConductor,
            TypeofCable: isTypeofCable,
            TypeofConductor: isTypeofConductor,
            PoleStructure: isPoleStructure,
            SinglePhaseThreePhase: isSinglePhaseThreePhase,
            CircuitType: isCircuitType,
        }
        newFilter(obj);
        handleClose();
    }
    // const onClickVoltage = (value) => {
    //     if (value != "Other") {
    //         setSpecifyTypeVoltage("");
    //         onSelectSpecifyTypeVoltage("");
    //     }
    //     onSelectLTLineVoltage(value);
    //     setHTLineVoltage(value)
    // }
    // const onCableClick = (value) => {
    //     if (value != "Other") {
    //         setSpecifyTypeOfCable("")
    //         onSelectSpecifyTypeOfCable("")
    //     }
    //     onSelectTypeOfCable(value);
    //     setTypeOfCable(value)
    // }

    // const onConductorClick = (value) => {
    //     if (value != "Other") {
    //         setSpecifyTypeOfConductor("")
    //         onSelectSpecifyTypeOfConductor("")
    //     }
    //     onSelectTypeOfConductor(value);
    //     setTypeOfConductor(value)
    // }

    // const onSelectCableOrConductor = (value) => {
    //     onSelectWhetherCableOrConductor(value)
    //     setTypeCableConductor(value)
    // }
    return (
        <Modal animationType="slide" visible={modalVisible} transparent={true}>

            <View style={ModalViewStyle.container}>
                <KeyboardAwareScrollView>

                    <View style={ModalViewStyle.header}>
                        <View style={ModalViewStyle.headerLeft}>
                            <Text style={ModalViewStyle.title}>Filter</Text>
                        </View>

                        <View style={ModalViewStyle.headerRight}>
                            <TouchableOpacity onPress={handleClose}>
                                <Text style={{ color: "black" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ModalViewStyle.fields}>

                        <SingleValueDropdownListSetOldData oldIndex={Line?.indexOf(isLine)} title={"Line"} data={Line} onSelectedSevice={(value) => onSelectItem("Line", value)} />

                        <SingleValueDropdownListSetOldData oldIndex={Scheme1?.indexOf(isScheme)} title={"Scheme"} data={Scheme1} onSelectedSevice={(value) => onSelectItem("Scheme", value)} />
                        <SingleValueDropdownListSetOldData oldIndex={majorComponentList?.indexOf(isSelectedMajorComponent)} title={"Major Component"} data={majorComponentList} onSelectedSevice={(value) => onSelectItem("MajorComponent", value)} />
                        <SingleValueDropdownListSetOldData oldIndex={UGorOH1?.indexOf(isUGorOH)} title={"UG or OH"} data={UGorOH1} onSelectedSevice={(value) => onSelectItem("UGorOH", value)} />
                        {
                            isLine == "HT Line" &&
                            <SingleValueDropdownListSetOldData oldIndex={LTLineVoltage1?.indexOf(isHTLineVoltage)} title={"HT Line Voltage"} data={LTLineVoltage1}
                                onSelectedSevice={(value) => { onSelectItem("HTLineVoltage", value) }} />

                        }
                        <SingleValueDropdownListSetOldData oldIndex={WhetherCableOrConductor1?.indexOf(isCableOrConductor)} title={"Whether cable or conductor*"} data={WhetherCableOrConductor1} onSelectedSevice={(value) => onSelectItem("CableOrConductor", value)} />
                        {
                            isCableOrConductor == "Cable" &&
                            <SingleValueDropdownListSetOldData oldIndex={TypeOfCable1?.indexOf(isTypeofCable)} title={"Type of Cable"} data={TypeOfCable1} onSelectedSevice={(value) => onSelectItem("TypeofCable", value)} />
                        }
                        {
                            isCableOrConductor == "Conductor" &&
                            <SingleValueDropdownListSetOldData oldIndex={TypeOfConductor1?.indexOf(isTypeofConductor)} title={"Type of Conductor"} data={TypeOfConductor1} onSelectedSevice={(value) => onSelectItem("TypeofConductor", value)} />
                        }
                        {
                            isLine == "HT Line" &&
                            <SingleValueDropdownListSetOldData oldIndex={PoleStructur1?.indexOf(isPoleStructure)} title={"Pole Structure"} data={PoleStructur1} onSelectedSevice={(value) => onSelectItem("PoleStructure", value)} />
                        }
                        {
                            isLine == "LT Line" &&
                            <SingleValueDropdownListSetOldData oldIndex={SinglePhaseThreePhase1?.indexOf(isSinglePhaseThreePhase)} title={"Single Phase / Three Phase"} data={SinglePhaseThreePhase1} onSelectedSevice={(value) => onSelectItem("SinglePhaseThreePhase", value)} />
                        }

                        <SingleValueDropdownListSetOldData oldIndex={CircuitType1?.indexOf(isCircuitType)} title={"Circuit Type"} data={CircuitType1} onSelectedSevice={(value) => onSelectItem("CircuitType", value)} />


                    </View>

                    <TouchableOpacity onPress={() => { onApply() }} style={ModalViewStyle.btnSave}>
                        <Text style={ModalViewStyle.btnLoginText}>{"Apply"}</Text>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>

            </View>

        </Modal>
    );
};

// define your styles
const ModalViewStyle = StyleSheet.create({

    container: {
        backgroundColor: Colors.primaryBackground, borderRadius: 10, width: "90%",
        marginVertical: "5%",
        marginHorizontal: "5%",
        alignSelf: "center",
        padding: AppUtil.getHP(3),
        borderWidth: 1,
        borderColor: Colors.lightGray,
    },

    header: { flexDirection: "row", },
    headerLeft: { flex: 1, justifyContent: "center", alignItems: "flex-start", },
    headerRight: { justifyContent: "center", alignItems: "flex-end", },
    fields: {
        width: "100%",
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.darkBlack,
    },


    marginTop: {
        paddingHorizontal: 2,
        marginTop: AppUtil.getHP(2),
    },
    headerText: {
        fontSize: AppUtil.getHP(1.75),
        color: Colors.darkBlack,
        marginBottom: AppUtil.getHP(0.7),
        fontFamily: Fonts.RobotoMedium
    },
    inpView: {
        width: '100%',
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.white,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: AppUtil.getWP(3),
    },
    btnSave: {
        marginTop: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        backgroundColor: Colors.orange,
    },
    btnLoginText: {
        fontSize: AppUtil.getHP(2),
        fontFamily: Fonts.RobotoMedium,
        color: Colors.white,
    },
});

//make this component available to the app
export default React.memo(FeederLtHtLineFilter);
