//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SubmitBtn from "./clogin/commonButton/SubmitBtn";
import SingleDropdownList from "./singleselectlist/SingleDropdownListSetOldData";
import CalendarView from "./calendarView/CalendarViewTherd";
import CalendarViewfour from "./calendarView/CalendarViewfour";
import { Colors } from "../utils/Colors";
import { Fonts } from "../utils/Fonts";
import { AppUtil } from "../utils/AppUtil";
import SingleValueDropdownListSetOldData from "./singleselectlist/SingleValueDropdownListSetOldData";
import DisableView from "./disableView/DisableView";

// create a component
const LTlineOfflineEditPopup = ({ handleClose, isModalVisible,

    oldScheme,
    oldMajorComponent,
    oldUGorOH,

    oldLTLineVoltage,
    oldSpecifyTypeVoltage,

    oldCableSize,
    oldTypeOfCable,
    olsSpecifyTypeOfCable,

    oldTypeOfConductor,
    olsSpecifyTypeOfConductor,

    oldWhetherCableOrConductor,
    oldPoleStructur,
    oldCircuitType,
    saveObj,

}) => {


    return (
        <Modal animationType="slide" visible={isModalVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <View style={ModalViewStyle.container}>
                    <KeyboardAwareScrollView>

                        <View style={ModalViewStyle.header}>
                            <View style={ModalViewStyle.headerLeft}>
                                <Text style={ModalViewStyle.title}>HT Line segment asset details</Text>
                            </View>

                            <View style={ModalViewStyle.headerRight}>
                                <TouchableOpacity onPress={handleClose}>
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={ModalViewStyle.fields}>
                            {/* <SingleValueDropdownListSetOldData oldIndex={majorComponentList?.indexOf(oldMajorComponent)} title={"Major Component*"} data={majorComponentList} onSelectedSevice={(value) => onSelectMajorComponent(value)} /> */}

                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"Major Component"} value={oldMajorComponent} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"Scheme"} value={oldScheme} />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"UG or OH"} value={oldUGorOH} />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"HT Line Voltage"} value={oldLTLineVoltage} />
                            </View>


                            {oldSpecifyTypeVoltage &&
                                <View style={{ marginTop: 10 }}>
                                    <DisableView title={"If Others, specify Type"} value={oldSpecifyTypeVoltage} />
                                </View>
                            }

                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"Whether cable or conductor"} value={oldWhetherCableOrConductor} />
                            </View>


                            {oldTypeOfCable &&
                                <View style={{ marginTop: 10 }}>
                                    <DisableView title={"Type of Cable"} value={oldTypeOfCable} />
                                </View>
                            }
                            {
                                oldCableSize &&
                                <View style={{ marginTop: 10 }}>
                                    <DisableView title={"Cable Size"} value={oldCableSize} />
                                </View>
                            }

                            {olsSpecifyTypeOfCable &&
                                <View style={{ marginTop: 10 }}>
                                    <DisableView title={"If Others, specify Type of Cable"} value={olsSpecifyTypeOfCable} />
                                </View>
                            }

                            {oldTypeOfConductor &&
                                <View style={{ marginTop: 10 }}>
                                    <DisableView title={"Type of Conductor"} value={oldTypeOfConductor} />
                                </View>
                            }

                            {olsSpecifyTypeOfConductor &&
                                <View style={{ marginTop: 10 }}>
                                    <DisableView title={"If Others, specify Type of Conductor"} value={olsSpecifyTypeOfConductor} />
                                </View>
                            }
                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"Pole Structure"} value={oldPoleStructur} />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <DisableView title={"Circuit Type"} value={oldCircuitType} />
                            </View>
                        </View>

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
export default React.memo(LTlineOfflineEditPopup);
