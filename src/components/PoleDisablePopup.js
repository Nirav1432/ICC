//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PopupComonStype } from "./PopupComonStype";
import DisableView from "./disableView/DisableView";

// create a component
const PoleDisablePopup = ({ handleClose, isVisible, data }) => {

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={PopupComonStype.CenterContainer}>
                    <KeyboardAwareScrollView>
                        <View style={PopupComonStype.header}>
                            <View style={PopupComonStype.headerLeft}>
                                <Text style={PopupComonStype.title1}>Pole Details</Text>
                            </View>
                            <View style={PopupComonStype.headerRight}>
                                <TouchableOpacity onPress={handleClose}>
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Pole type"} value={data?.poleType} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Pole Height (Meters)"} value={data?.poleHeight} />
                        </View>
                        {data?.poleSpecifyType != "" &&
                            <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"if others, specify type"} value={data?.poleSpecifyType} />
                            </View>
                        }
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"RDSS or existing pole"} value={data?.existingPole} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Is this a branch point"} value={data?.branchPoint} />
                        </View>

                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
};

//make this component available to the app
export default memo(PoleDisablePopup);