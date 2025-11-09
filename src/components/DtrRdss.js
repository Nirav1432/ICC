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

// create a component
const DtrRdss = ({    handleClose,    isModalVisible, list1,    getDTRType, oldDTR,}) => {
    return (
        <Modal animationType="slide" visible={isModalVisible} transparent={true}>

            <View style={ModalViewStyle.container}>
                <KeyboardAwareScrollView>

                    <View style={ModalViewStyle.header}>
                        <View style={ModalViewStyle.headerLeft}>
                            <Text style={ModalViewStyle.title}>Select Geotagged DTR under RDSS*</Text>
                        </View>

                        <View style={ModalViewStyle.headerRight}>
                            <TouchableOpacity onPress={handleClose}>
                                <Text style={{ color: "black" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={ModalViewStyle.fields}>
                        <SingleDropdownList oldIndex={list1?.dtr_types?.indexOf(oldDTR)} title={" "} data={list1?.dtr_types} onSelectedSevice={(value) => onClickDTRtype(value)} />
                    </View>
                    <TouchableOpacity onPress={() => { }} style={ModalViewStyle.btnSave}>
                        <Text style={ModalViewStyle.btnLoginText}>{"Save"}</Text>
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

    header: { flexDirection: "row",},
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
export default React.memo(DtrRdss);
