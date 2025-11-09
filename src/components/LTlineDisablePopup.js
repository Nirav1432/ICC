//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PopupComonStype } from "./PopupComonStype";
import DisableView from "./disableView/DisableView";

// create a component
const LTlineDisablePopup = ({ handleClose, isVisible, data }) => {

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={PopupComonStype.container}>
                    <KeyboardAwareScrollView>
                        <View style={PopupComonStype.header}>
                            <View style={PopupComonStype.headerLeft}>
                                <Text style={PopupComonStype.title1}>LT Line Details</Text>
                            </View>
                            <View style={PopupComonStype.headerRight}>
                                <TouchableOpacity onPress={handleClose}>
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Scheme"} value={data?.scheme} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Major Component"} value={data?.majorComponent} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"UG or OH"} value={data?.UGorOH} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Whether cable or conductor"} value={data?.WhetherCableOrConductor} />
                        </View>
                        {
                            data?.TypeOfCable &&
                            <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"Type of Cable"} value={data?.TypeOfCable} />
                            </View>
                        }
                         <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Single Phase / Three Phase"} value={data?.SinglePhaseThreePhase} />
                        </View>
                        {
                            data?.CableSize &&
                             <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"Cable Size"} value={data?.CableSize} />
                            </View>
                        }
                        {
                            data?.SpecifyTypeOfCable &&
                            <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"If Others, specify Type of Cable"} value={data?.SpecifyTypeOfCable} />
                            </View>}
                        {
                            data?.TypeOfConductor &&
                            <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"Type of Conductor"} value={data?.TypeOfConductor} />
                            </View>}
                        {
                            data?.SpecifyTypeOfConductor &&
                            <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"If Others, specify Type of Conductor"} value={data?.SpecifyTypeOfConductor} />
                            </View>
                        }

                       
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Circuit Type"} value={data?.CircuitType} />
                        </View>



                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
};

//make this component available to the app
export default memo(LTlineDisablePopup);