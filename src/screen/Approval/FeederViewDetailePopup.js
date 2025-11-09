import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import DisableView from "../../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function FeederViewDetailePopup({ handleClose, isVisible, data }) {



    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAwareScrollView>
                <View style={ApprovalHomeScreenStyle.container}>
                    <View style={ApprovalHomeScreenStyle.header}>
                        <View style={ApprovalHomeScreenStyle.headerLeft}>
                            <Text style={ApprovalHomeScreenStyle.title1}>Feeder Details</Text>
                        </View>
                        <View style={ApprovalHomeScreenStyle.headerRight}>
                            <TouchableOpacity onPress={handleClose}>
                                <Text style={{ color: "black" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Feeder Code"} value={data?.feeder_code} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Voltage"} value={data?.feeder_voltage} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Feeder Type"} value={data?.feeder_type} />
                    </View>


                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Feeder length (CMtrs)"} value={data?.feeder_length} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"New Feeder/ Reconductoring"} value={data?.feeder_conduct} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Underground/ Overhead"} value={data?.feeder_area} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Type"} value={data?.type} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Cable Size"} value={data?.cable_size} />
                    </View>

                    <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                        <DisableView title={"Feeder Commissioning Date"} value={data?.commissioning_date} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
}
