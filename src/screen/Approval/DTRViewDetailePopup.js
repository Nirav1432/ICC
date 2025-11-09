import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import DisableView from "../../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from "moment";

export default function DTRViewDetailePopup({ handleClose, isVisible, data }) {


    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={ApprovalHomeScreenStyle.popcontainer}>
                    <KeyboardAwareScrollView>
                        <View >
                            <View style={ApprovalHomeScreenStyle.header}>
                                <View style={ApprovalHomeScreenStyle.headerLeft}>
                                    <Text style={ApprovalHomeScreenStyle.title1}>Dtr Details</Text>
                                </View>
                                <View style={ApprovalHomeScreenStyle.headerRight}>
                                    <TouchableOpacity onPress={handleClose}>
                                        <Text style={{ color: "black" }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"Package No."} value={data?.dtr_Package} />
                                </View>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"DTR Capacity (MVA)"} value={data?.dtr_capacity} />
                                </View>

                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"DTR Voltage Ratio"} value={data?.dtr_voltage_ratio} />
                                </View>

                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"Make/Model / S.No of DTR"} value={data?.dtr_model} />
                                </View>

                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"Manufacturing month and year of DTR"} value={moment(data?.dtr_manufacturing_month_year).format("DD/MM/YYYY")} />
                                </View>


                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"Month/Year of Installation"} value={moment(data?.dtr_year_installation).format("DD/MM/YYYY")} />
                                </View>

                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"DTR Mounting"} value={data?.dtr_mounting} />
                                </View>

                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"No of Feeders Emanating from DTR"} value={data?.dtr_number_of_dtr} />
                                </View>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"If existing, mention the scheme"} value={data?.if_existing_mention_scheme_name} />
                                </View>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"substation name"} value={data?.substaion_title} />
                                </View>

                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"11 kV Feeder Name on which DTR is Erected"} value={data?.feeder_name_on_which_dtr_is_erected} />
                                </View>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"11 kV Feeder code on which DTR is Erected"} value={data?.['11_feeder_code_on_which_dtr_is_erected']} />
                                </View>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"Emanating SS Name"} value={data?.emanating_ss_name} />
                                </View>
                                <View style={ApprovalHomeScreenStyle.ViewmarginTop}>
                                    <DisableView title={"Emanating SS Code"} value={data?.emanating_ss_code} />
                                </View>
                            </>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
}
