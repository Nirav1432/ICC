//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SingleDropdownList from "./singleselectlist/SingleDropdownListSetOldData";
import { Colors } from "../utils/Colors";
import { Fonts } from "../utils/Fonts";
import { AppUtil } from "../utils/AppUtil";
import { CircuitType, CircuitType1, Scheme, Scheme1, SinglePhaseThreePhase, SinglePhaseThreePhase1, TypeOfCable, TypeOfCable1, TypeOfCableSize1, TypeOfCableSize2, TypeOfCableSize3, TypeOfCableSize4, TypeOfConductor, TypeOfConductor1, UGorOH, UGorOH1, WhetherCableOrConductor, WhetherCableOrConductor1 } from "../utils/CardData";
import SingleValueDropdownListSetOldData from "./singleselectlist/SingleValueDropdownListSetOldData";

// create a component
const LTLinePopup = ({ handleClose, isModalVisible,

    oldScheme, onSelectScheme,
    majorComponentList,
    oldMajorComponent, onSelectMajorComponent,
    oldUGorOH, onSelectUGorOH,
    oldWhetherCableOrConductor, onSelectWhetherCableOrConductor,
    oldCableSize, onSelectCableSize,
    oldTypeOfCable, onSelectTypeOfCable,
    olsSpecifyTypeOfCable, onSelectSpecifyTypeOfCable,
    oldTypeOfConductor, onSelectTypeOfConductor,
    olsSpecifyTypeOfConductor, onSelectSpecifyTypeOfConductor,
    oldSinglePhaseThreePhase, onSelectSinglePhaseThreePhase,
    oldCircuitType, onSelectCircuitType,
    saveObj,

}) => {

    const [isTypeCableConductor, setTypeCableConductor] = React.useState(oldWhetherCableOrConductor);
    const [isSinglePhaseThreePhase, setSinglePhaseThreePhase] = React.useState(oldSinglePhaseThreePhase);
    const [isTypeOfCable, setTypeOfCable] = React.useState(oldTypeOfCable);
    const [isSpecifyTypeOfCable, setSpecifyTypeOfCable] = React.useState(olsSpecifyTypeOfCable);
    const [isTypeOfConductor, setTypeOfConductor] = React.useState(oldTypeOfConductor);
    const [isSpecifyTypeOfConductor, setSpecifyTypeOfConductor] = React.useState(olsSpecifyTypeOfConductor);

    useEffect(() => {
        setTypeCableConductor(oldWhetherCableOrConductor);
        setSinglePhaseThreePhase(oldSinglePhaseThreePhase);
        setTypeOfCable(oldTypeOfCable);
        setSpecifyTypeOfCable(olsSpecifyTypeOfCable);
        setTypeOfConductor(oldTypeOfConductor);
        setSpecifyTypeOfConductor(olsSpecifyTypeOfConductor);

    }, [oldWhetherCableOrConductor,oldSinglePhaseThreePhase, oldTypeOfCable, olsSpecifyTypeOfCable, oldTypeOfConductor, olsSpecifyTypeOfConductor]);

    const onSelectCableOrConductor = (value) => {
        onSelectWhetherCableOrConductor(value)
        setTypeCableConductor(value)

        setTypeOfCable("")
        onSelectTypeOfCable("");
        onSelectCableSize("");
    }

    const onCableClick = (value) => {
        if (value?.title != "Other") {
            setSpecifyTypeOfCable("");
            onSelectSpecifyTypeOfCable("");
            onSelectCableSize("");
        }
        onSelectTypeOfCable(value);
        setTypeOfCable(value)
    }

    const onConductorClick = (value) => {
        if (value?.title != "Other") {
            setSpecifyTypeOfConductor("")
            onSelectSpecifyTypeOfConductor("")
        }
        onSelectTypeOfConductor(value);
        setTypeOfConductor(value)
    }


    return (
        <Modal animationType="none" visible={isModalVisible} transparent={true} presentationStyle="overFullScreen">

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={ModalViewStyle.container}>
                    <KeyboardAwareScrollView>

                        <View style={ModalViewStyle.header}>
                            <View style={ModalViewStyle.headerLeft}>
                                <Text style={ModalViewStyle.title}>LT Line segment asset details</Text>
                            </View>

                            <View style={ModalViewStyle.headerRight}>
                                <TouchableOpacity onPress={handleClose}>
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={ModalViewStyle.fields}>

                            <SingleValueDropdownListSetOldData oldIndex={Scheme1?.indexOf(oldScheme)} title={"Scheme*"} data={Scheme1} onSelectedSevice={(value) => onSelectScheme(value)} />
                            <SingleValueDropdownListSetOldData oldIndex={majorComponentList?.indexOf(oldMajorComponent)} title={"Major Component*"} data={majorComponentList} onSelectedSevice={(value) => onSelectMajorComponent(value)} />

                            <SingleValueDropdownListSetOldData oldIndex={UGorOH1?.indexOf(oldUGorOH)} title={"UG or OH*"} data={UGorOH1} onSelectedSevice={(value) => onSelectUGorOH(value)} />
                            <SingleValueDropdownListSetOldData oldIndex={WhetherCableOrConductor1?.indexOf(oldWhetherCableOrConductor)} title={"Whether cable or conductor*"} data={WhetherCableOrConductor1} onSelectedSevice={(value) => onSelectCableOrConductor(value)} />

                            {
                                isTypeCableConductor == "Cable" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfCable1?.indexOf(oldTypeOfCable)} title={"Type of Cable*"} data={TypeOfCable1} onSelectedSevice={(value) => onCableClick(value)} />
                            }
                            {
                                isTypeCableConductor == "Cable" && isTypeOfCable == "Other" &&
                                <View style={ModalViewStyle.marginTop} >
                                    <Text style={ModalViewStyle.headerText}>{"If Others, specify Type of Cable*"}</Text>
                                    <TextInput
                                        maxLength={70}
                                        value={isSpecifyTypeOfCable}
                                        style={ModalViewStyle.inpView}
                                        onChangeText={(txt) => { setSpecifyTypeOfCable(txt), onSelectSpecifyTypeOfCable(txt) }}
                                    />
                                </View>
                            }

                            {
                                isTypeCableConductor == "Conductor" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfConductor1?.indexOf(oldTypeOfConductor)} title={"Type of Conductor*"} data={TypeOfConductor1} onSelectedSevice={(value) => onConductorClick(value)} />
                            }

                            {isTypeCableConductor == "Conductor" && isTypeOfConductor == "Other" &&
                                <View style={ModalViewStyle.marginTop} >
                                    <Text style={ModalViewStyle.headerText}>{"If Others, specify Type of Conductor*"}</Text>
                                    <TextInput
                                        maxLength={70}
                                        value={isSpecifyTypeOfConductor}
                                        style={ModalViewStyle.inpView}
                                        onChangeText={(txt) => { setSpecifyTypeOfConductor(txt), onSelectSpecifyTypeOfConductor(txt) }}
                                    />
                                </View>}

                            <SingleValueDropdownListSetOldData oldIndex={SinglePhaseThreePhase1?.indexOf(oldSinglePhaseThreePhase)} title={"Single Phase / Three Phase*"} data={SinglePhaseThreePhase1} onSelectedSevice={(value) => { setSinglePhaseThreePhase(value), onSelectSinglePhaseThreePhase(value) }} />

                            {
                                isTypeCableConductor == "Cable" && isTypeOfCable == "AB Cable" && isSinglePhaseThreePhase == "Single Phase" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfCableSize1?.indexOf(oldCableSize)} title={"Cable*"} data={TypeOfCableSize1} onSelectedSevice={(txt) => { onSelectCableSize(txt) }} />
                            }
                            {
                                isTypeCableConductor == "Cable" && isTypeOfCable == "AB Cable" && isSinglePhaseThreePhase == "Three Phase" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfCableSize2?.indexOf(oldCableSize)} title={"Cable*"} data={TypeOfCableSize2} onSelectedSevice={(txt) => { onSelectCableSize(txt) }} />
                            }
                            {
                                isTypeCableConductor == "Cable" && isTypeOfCable == "XLPE" && isSinglePhaseThreePhase == "Single Phase" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfCableSize3?.indexOf(oldCableSize)} title={"Cable*"} data={TypeOfCableSize3} onSelectedSevice={(txt) => { onSelectCableSize(txt) }} />
                            }
                            {
                                isTypeCableConductor == "Cable" && isTypeOfCable == "XLPE" && isSinglePhaseThreePhase == "Three Phase" &&
                                <SingleValueDropdownListSetOldData oldIndex={TypeOfCableSize4?.indexOf(oldCableSize)} title={"Cable*"} data={TypeOfCableSize4} onSelectedSevice={(txt) => { onSelectCableSize(txt) }} />
                            }
                            <SingleValueDropdownListSetOldData oldIndex={CircuitType1?.indexOf(oldCircuitType)} title={"Circuit Type*"} data={CircuitType1} onSelectedSevice={(value) => onSelectCircuitType(value)} />
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
        fontSize: 12,
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
export default React.memo(LTLinePopup);
