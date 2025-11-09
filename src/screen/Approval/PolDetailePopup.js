import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import DisableView from "../../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from "moment";

export default function PolDetailePopup({ handleClose, isVisible, data }) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAwareScrollView>
                <View style={ApprovalHomeScreenStyle.container}>
                    <View style={ApprovalHomeScreenStyle.header}>
                        <View style={ApprovalHomeScreenStyle.headerLeft}>
                            <Text style={ApprovalHomeScreenStyle.title1}>Pole Details</Text>
                        </View>
                        <View style={ApprovalHomeScreenStyle.headerRight}>
                            <TouchableOpacity onPress={handleClose}>
                                <Text style={{ color: "black" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Pole type"} value={data?.poleType} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Pole Height (Meters)"} value={data?.poleHeight} />
                    </View>

                    {
                        data?.poleSpecifyType &&
                        <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                            <DisableView title={"if others,specift type"} value={data?.poleSpecifyType} />
                        </View>
                    }
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"RDSS or existing pole"} value={data?.existingPole} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Is this a branch point"} value={data?.branchPoint} />
                    </View>
                    {/* <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Pol Name"} value={data?.pole_details?.pole_name} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Pole Type"} value={data?.pole_details?.pole_type} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Pole Length (Metres)"} value={data?.pole_details?.pole_length} />
                    </View> */}


                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
}
