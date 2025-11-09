//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, Alert, } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useEffect, useState } from "react";
import SingleDropdownList from "./singleselectlist/SingleDropdownListSetOldData";
import { Colors } from "../utils/Colors";
import { Fonts } from "../utils/Fonts";
import { AppUtil } from "../utils/AppUtil";
import SingleValueDropdownListSetOldData from "./singleselectlist/SingleValueDropdownListSetOldData";
import { otherAssetAtributesCapacitorBankLinePosition, otherAssetAtributesCapacitorBankLocation, otherAssetAtributesCircuitBreakerType, otherAssetAtributesCircuitBreakerVoltage, otherAssetAtributesProtocolSupported, otherAssetAtributesRMU, otherAssetAtributesRMUCBtype, otherAssetAtributesScadaCompatibility } from "../utils/CardData";

// create a component
const OtherSubAssetPop = ({ handleClose, isModalVisible, substationList, type, oldData, newData }) => {

    const [isSubstationName, setSubstationName] = React.useState("");
    const [isCircuitType, setCircuitType] = React.useState("");
    const [isVoltage, setVoltage] = React.useState("");
    const [isMake, setMake] = React.useState("");
    const [isRating, setRating] = React.useState("");
    const [isLocation, setLocation] = React.useState("");
    const [isLinePosition, setLinePosition] = React.useState("");
    const [isRMUtype, setRMUtype] = React.useState("");
    const [isRMUCBtype, setRMUCBtype] = React.useState("");
    const [isScadaCompatibility, setScadaCompatibility] = React.useState("");
    const [isRMULocationName, setRMULocationName] = React.useState("");
    const [isRTULocationName, setRTULocationName] = React.useState("");
    const [isProtocolSupported, setProtocolSupported] = React.useState("");
    const [isFRTULocationName, setFRTULocationName] = React.useState("");

    useEffect(() => {

        if (oldData != null && oldData != undefined) {
            setSubstationName(oldData?.SubstationName || "");
            setCircuitType(oldData?.CircuitType || "");
            setVoltage(oldData?.Voltage || "");
            setMake(oldData?.Make || "");
            setRating(oldData?.Rating || "");
            setLocation(oldData?.Location || "");
            setLinePosition(oldData?.LinePosition || "");
            setRMUtype(oldData?.RMUType || "");
            setRMUCBtype(oldData?.RMUCBType || "");
            setScadaCompatibility(oldData?.ScadaCompatibility || "");
            setRMULocationName(oldData?.RMULocationName || "");
            setRTULocationName(oldData?.RTULocationName || "");
            setProtocolSupported(oldData?.ProtocolSupported || "");
            setFRTULocationName(oldData?.FRTULocationName || "");
        }
        else {


        }
    }, [isModalVisible, handleClose]);

    const onSelectLocation = (value) => {
        setLocation(value);
    }

    const onSelectLinePosition = (value) => {
        setLinePosition(value);
    }

    const saveObj = () => {
        if (type == "Capacitor Bank") {
            if (isLocation == "" || isLocation == undefined) {
                Alert.alert("Alert", "Please select Location");
                return;
            }
            else if (isMake == "" || isMake == undefined) {
                Alert.alert("Alert", "Please enter Make");
                return;
            }
            else if (isRating == "" || isRating == undefined) {
                Alert.alert("Alert", "Please enter Rating");
                return;
            }
            else if (isLinePosition == "" || isLinePosition == undefined) {
                Alert.alert("Alert", "Please select Line Position");
                return;
            }

            var obj = { Location: isLocation, Make: isMake, Rating: isRating, LinePosition: isLinePosition };
            newData(obj);
            handleClose();
        }
        else if (type == "Capacitor Banks") {
            if (isLocation == "" || isLocation == undefined) {
                Alert.alert("Alert", "Please select Location");
                return;
            }
            else if (isMake == "" || isMake == undefined) {
                Alert.alert("Alert", "Please enter Make");
                return;
            }
            else if (isRating == "" || isRating == undefined) {
                Alert.alert("Alert", "Please enter Rating");
                return;
            }
            else if (isLinePosition == "" || isLinePosition == undefined) {
                Alert.alert("Alert", "Please select Line Position");
                return;
            }

            var obj = { Location: isLocation, Make: isMake, Rating: isRating, LinePosition: isLinePosition };
            newData(obj);
            handleClose();
        }
        else if (type == "Circuit Breaker") {
            if (isSubstationName == "" || isSubstationName == undefined) {
                Alert.alert("Alert", "Please select Substation Name");
                return;
            }
            else if (isMake == "" || isMake == undefined) {
                Alert.alert("Alert", "Please enter Make");
                return;
            }
            else if (isCircuitType == "" || isCircuitType == undefined) {
                Alert.alert("Alert", "Please select Circuit Type");
                return;
            }
            else if (isVoltage == "" || isVoltage == undefined) {
                Alert.alert("Alert", "Please select Voltage");
                return;
            }

            var obj = { SubstationName: isSubstationName, Make: isMake, CircuitType: isCircuitType, Voltage: isVoltage };
            newData(obj);
            handleClose();
        }
        else if (type == "RMU") {
            if (isRMUtype == "" || isRMUtype == undefined) {
                Alert.alert("Alert", "Please select RMU Type");
                return;
            }
            else if (isRMUCBtype == "" || isRMUCBtype == undefined) {
                Alert.alert("Alert", "Please select RMU CB Type");
                return;
            }
            else if (isMake == "" || isMake == undefined) {
                Alert.alert("Alert", "Please enter Make");
                return;
            }
            else if (isScadaCompatibility == "" || isScadaCompatibility == undefined) {
                Alert.alert("Alert", "Please select Scada Compatibility");
                return;
            }
            else if (isRMULocationName == "" || isRMULocationName == undefined) {
                Alert.alert("Alert", "Please enter RMU Location Name");
                return;
            }

            var obj = {
                RMUType: isRMUtype, RMUCBType: isRMUCBtype, Make: isMake, ScadaCompatibility: isScadaCompatibility, RMULocationName: isRMULocationName,
            };
            newData(obj);
            handleClose();
        }
        else if (type == "RTU") {
            if (isRTULocationName == "" || isRTULocationName == undefined) {
                Alert.alert("Alert", "Please enter RTU Location Name");
                return;
            }
            else if (isMake == "" || isMake == undefined) {
                Alert.alert("Alert", "Please enter Make");
                return;
            }
            else if (isProtocolSupported == "" || isProtocolSupported == undefined) {
                Alert.alert("Alert", "Please select Protocol Supported");
                return;
            }

            var obj = {
                RTULocationName: isRTULocationName, Make: isMake, ProtocolSupported: isProtocolSupported
            };
            newData(obj);
            handleClose();
        }
        else if (type == "FRTU") {
            if (isFRTULocationName == "" || isFRTULocationName == undefined) {
                Alert.alert("Alert", "Please enter FRTU Location Name");
                return;
            }
            else if (isMake == "" || isMake == undefined) {
                Alert.alert("Alert", "Please enter Make");
                return;
            }
            else if (isProtocolSupported == "" || isProtocolSupported == undefined) {
                Alert.alert("Alert", "Please select Protocol Supported");
                return;
            }

            var obj = { FRTULocationName: isFRTULocationName, Make: isMake, ProtocolSupported: isProtocolSupported };
            newData(obj);
            handleClose();
        }
        else {
            // if (isMake == "" || isMake == undefined) {
            //     Alert.alert("Alert", "Please enter Make");
            //     return;
            // }
            // var obj = { Make: isMake };
            // newData(obj);
            // handleClose();
        }
    }

    return (
        <Modal animationType="slide" visible={isModalVisible} transparent={true}  >

            <View style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={ModalViewStyle.container}>
                    <KeyboardAwareScrollView extraHeight={10} scrollEnabled={false}>

                        <View style={ModalViewStyle.header}>
                            <View style={ModalViewStyle.headerLeft}>
                                <Text style={ModalViewStyle.title}>Asset Attributes details</Text>
                            </View>

                            <View style={ModalViewStyle.headerRight}>
                                <TouchableOpacity onPress={handleClose}>
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            type == "Circuit Breaker" ?
                                <View style={ModalViewStyle.fields}>
                                    <SingleDropdownList oldIndex={substationList?.indexOf(isSubstationName)} title={"Name of Substation*"} data={substationList} onSelectedSevice={(item) => setSubstationName(item)} />
                                    <View style={ModalViewStyle.marginTop} >
                                        <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                        <TextInput
                                            maxLength={70}
                                            value={isMake}
                                            style={ModalViewStyle.inpView}
                                            onChangeText={(txt) => { setMake(txt) }}
                                        />
                                    </View>
                                    <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesCircuitBreakerType?.indexOf(isCircuitType)} title={"Type*"} data={otherAssetAtributesCircuitBreakerType} onSelectedSevice={(value) => setCircuitType(value)} />
                                    <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesCircuitBreakerVoltage?.indexOf(isVoltage)} title={"Voltage*"} data={otherAssetAtributesCircuitBreakerVoltage} onSelectedSevice={(value) => setVoltage(value)} />
                                </View>
                                :
                                type == "Capacitor Bank" ?
                                    <View style={ModalViewStyle.fields}>
                                        <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesCapacitorBankLocation?.indexOf(isLocation)} title={"Location*"} data={otherAssetAtributesCapacitorBankLocation} onSelectedSevice={(value) => onSelectLocation(value)} />
                                        <View style={ModalViewStyle.marginTop} >
                                            <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                            <TextInput
                                                maxLength={70}
                                                value={isMake}
                                                style={ModalViewStyle.inpView}
                                                onChangeText={(txt) => { setMake(txt) }}
                                            />
                                        </View>
                                        <View style={ModalViewStyle.marginTop} >
                                            <Text style={ModalViewStyle.headerText}>{"Rating (KVAR)*"}</Text>
                                            <TextInput
                                                maxLength={70}
                                                value={isRating}
                                                style={ModalViewStyle.inpView}
                                                onChangeText={(txt) => { setRating(txt) }}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesCapacitorBankLinePosition?.indexOf(isLinePosition)} title={"Line Position*"} data={otherAssetAtributesCapacitorBankLinePosition} onSelectedSevice={(value) => onSelectLinePosition(value)} />
                                    </View>
                                    :
                                    type == "Capacitor Banks" ?
                                        <View style={ModalViewStyle.fields}>
                                            <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesCapacitorBankLocation?.indexOf(isLocation)} title={"Location*"} data={otherAssetAtributesCapacitorBankLocation} onSelectedSevice={(value) => onSelectLocation(value)} />
                                            <View style={ModalViewStyle.marginTop} >
                                                <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                                <TextInput
                                                    maxLength={70}
                                                    value={isMake}
                                                    style={ModalViewStyle.inpView}
                                                    onChangeText={(txt) => { setMake(txt) }}
                                                />
                                            </View>
                                            <View style={ModalViewStyle.marginTop} >
                                                <Text style={ModalViewStyle.headerText}>{"Rating (KVAR)*"}</Text>
                                                <TextInput
                                                    maxLength={70}
                                                    value={isRating}
                                                    style={ModalViewStyle.inpView}
                                                    onChangeText={(txt) => { setRating(txt) }}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                            <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesCapacitorBankLinePosition?.indexOf(isLinePosition)} title={"Line Position*"} data={otherAssetAtributesCapacitorBankLinePosition} onSelectedSevice={(value) => onSelectLinePosition(value)} />
                                        </View>
                                        :
                                        type == "RMU" ?
                                            <View style={ModalViewStyle.fields}>
                                                <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesRMU?.indexOf(isRMUtype)} title={"RMU Type*"} data={otherAssetAtributesRMU} onSelectedSevice={(value) => setRMUtype(value)} />


                                                <View style={ModalViewStyle.marginTop} >
                                                    <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                                    <TextInput
                                                        maxLength={70}
                                                        value={isMake}
                                                        style={ModalViewStyle.inpView}
                                                        onChangeText={(txt) => { setMake(txt) }}
                                                    />
                                                </View>
                                                <View style={ModalViewStyle.marginTop} >
                                                    <Text style={ModalViewStyle.headerText}>{"RMU Location Name*"}</Text>
                                                    <TextInput
                                                        maxLength={70}
                                                        value={isRMULocationName}
                                                        style={ModalViewStyle.inpView}
                                                        onChangeText={(txt) => { setRMULocationName(txt) }}
                                                    />
                                                </View>
                                                <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesRMUCBtype?.indexOf(isRMUCBtype)} title={"RMU CB type*"} data={otherAssetAtributesRMUCBtype} onSelectedSevice={(value) => setRMUCBtype(value)} />
                                                <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesScadaCompatibility?.indexOf(isScadaCompatibility)} title={"Scada Compatibility*"} data={otherAssetAtributesScadaCompatibility} onSelectedSevice={(value) => setScadaCompatibility(value)} />

                                            </View>
                                            :
                                            type == "RTU" ?
                                                <View style={ModalViewStyle.fields}>
                                                    <View style={ModalViewStyle.marginTop} >
                                                        <Text style={ModalViewStyle.headerText}>{"RTU Location Name*"}</Text>
                                                        <TextInput
                                                            maxLength={70}
                                                            value={isRTULocationName}
                                                            style={ModalViewStyle.inpView}
                                                            onChangeText={(txt) => { setRTULocationName(txt) }}
                                                        />
                                                    </View>

                                                    <View style={ModalViewStyle.marginTop} >
                                                        <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                                        <TextInput
                                                            maxLength={70}
                                                            value={isMake}
                                                            style={ModalViewStyle.inpView}
                                                            onChangeText={(txt) => { setMake(txt) }}
                                                        />
                                                    </View>

                                                    <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesProtocolSupported?.indexOf(isProtocolSupported)} title={"Protocol Supported*"} data={otherAssetAtributesProtocolSupported} onSelectedSevice={(value) => setProtocolSupported(value)} />

                                                </View>
                                                :
                                                type == "FRTU" ?
                                                    <View style={ModalViewStyle.fields}>
                                                        <View style={ModalViewStyle.marginTop} >
                                                            <Text style={ModalViewStyle.headerText}>{"FRTU Location Name*"}</Text>
                                                            <TextInput
                                                                maxLength={70}
                                                                value={isFRTULocationName}
                                                                style={ModalViewStyle.inpView}
                                                                onChangeText={(txt) => { setFRTULocationName(txt) }}
                                                            />
                                                        </View>

                                                        <View style={ModalViewStyle.marginTop} >
                                                            <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                                            <TextInput
                                                                maxLength={70}
                                                                value={isMake}
                                                                style={ModalViewStyle.inpView}
                                                                onChangeText={(txt) => { setMake(txt) }}
                                                            />
                                                        </View>

                                                        <SingleValueDropdownListSetOldData oldIndex={otherAssetAtributesProtocolSupported?.indexOf(isProtocolSupported)} title={"Protocol Supported*"} data={otherAssetAtributesProtocolSupported} onSelectedSevice={(value) => setProtocolSupported(value)} />

                                                    </View>
                                                    :
                                                    <View style={ModalViewStyle.fields}>
                                                        <View style={ModalViewStyle.marginTop} >
                                                            <Text style={ModalViewStyle.headerText}>{"Make*"}</Text>
                                                            <TextInput
                                                                maxLength={70}
                                                                value={isMake}
                                                                style={ModalViewStyle.inpView}
                                                                onChangeText={(txt) => { setMake(txt) }}
                                                            />
                                                        </View>
                                                    </View>

                        }

                        <TouchableOpacity onPress={() => { saveObj() }} style={ModalViewStyle.btnSave}>
                            <Text style={ModalViewStyle.btnLoginText}>{"Save"}</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>

                </View>
            </View>
        </Modal>
    );
};

// define your styles
const ModalViewStyle = StyleSheet.create({
    container: {
        maxHeight: "80%",
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
    fields: { width: "100%", },
    title: { fontSize: 16, fontWeight: "bold", color: Colors.darkBlack, },
    marginTop: { paddingHorizontal: 2, marginTop: AppUtil.getHP(2), },
    headerText: { fontSize: 12, color: Colors.darkBlack, marginBottom: AppUtil.getHP(0.7), fontFamily: Fonts.RobotoMedium },
    inpView: { width: '100%', height: AppUtil.getHP(6.16), backgroundColor: Colors.white, borderRadius: 5, justifyContent: "space-between", alignItems: "center", flexDirection: 'row', paddingHorizontal: AppUtil.getWP(3), },
    btnSave: { marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center", height: 40, backgroundColor: Colors.orange, },
    btnLoginText: { fontSize: AppUtil.getHP(2), fontFamily: Fonts.RobotoMedium, color: Colors.white, },
});

//make this component available to the app
export default React.memo(OtherSubAssetPop);
