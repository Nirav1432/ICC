import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import DisableView from "../../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SubstationViewDetailePopup({ handleClose, isVisible, data }) {

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={ApprovalHomeScreenStyle.popcontainer}>
                    <KeyboardAwareScrollView>
                        <View>
                            <View style={ApprovalHomeScreenStyle.header}>
                                <View style={ApprovalHomeScreenStyle.headerLeft}>
                                    <Text style={ApprovalHomeScreenStyle.title1}>Substation Details</Text>
                                </View>
                                <View style={ApprovalHomeScreenStyle.headerRight}>
                                    <TouchableOpacity onPress={handleClose}>
                                        <Text style={{ color: "black" }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Package No.s"} value={data?.substations_geotag_data?.Substation_Package} />
                            </View>
                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"SS Name"} value={data?.substations_geotag_data?.substations_name} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"SS Code"} value={data?.substations_geotag_data?.substations_code} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Voltage"} value={data?.substations_geotag_data?.substations_Voltage} />
                            </View>


                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Substation Type(New/AUG)"} value={data?.substations_geotag_data?.substations_type} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"SS Augmentation date"} value={data?.substations_geotag_data?.substations_augmentation_date} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Number of PTs Augmented"} value={data?.substations_geotag_data?.number_of_pts_Augmented} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Number of 11KV newly added outgoing feeders"} value={data?.substations_geotag_data?.number_of_11kv_outgoing_feeders} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"SS commissioning date"} value={data?.substations_geotag_data?.ss_commissioning_date} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Number of Power Transformers (Nos.)*"} value={data?.substations_geotag_data?.number_of_pts} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Total Capacity of PTs"} value={data?.substations_geotag_data?.total_capacity_of_pts} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Voltage of Incoming Feeder"} value={data?.substations_geotag_data?.substations_Voltage} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Voltage of Outgoing Feeder"} value={data?.substations_geotag_data?.voltage_of_incoming_feeder} />
                            </View>

                            <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                <DisableView title={"Number of 11kV Outgoing Feeders"} value={data?.substations_geotag_data?.voltage_of_outgoing_feeder} />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal >
    );
}
