import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import DisableView from "../../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from "moment";

export default function DTRDetailePopup({ handleClose, isVisible, data }) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAwareScrollView>
                <View style={ApprovalHomeScreenStyle.container}>
                    <View style={ApprovalHomeScreenStyle.header}>
                        <View style={ApprovalHomeScreenStyle.headerLeft}>
                            <Text style={ApprovalHomeScreenStyle.title1}>DTR Details</Text>
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
                        <DisableView title={"DTR type"} value={data?.dtr_details?.dtr_type} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"DTR Capacity(MVA)"} value={data?.dtr_details?.dtr_capacity} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"DTR Voltage Ratio"} value={data?.dtr_details?.dtr_voltage_ratio} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Make/Model of DTR"} value={data?.dtr_details?.dtr_model} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Manufacturing Month & Year of DTR"} value={moment(data?.dtr_details?.dtr_manufacturing_month_year).format("MM/YYYY")} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Month/Year of installation"} value={moment(data?.dtr_details?.dtr_year_installation).format("MM/YYYY")} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"DTR Mounting"} value={data?.dtr_details?.dtr_mounting} />
                    </View>
                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"No of Feeders Emanating from DTR"} value={data?.dtr_details?.number_of_feeder} />
                    </View> */}

                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
}
