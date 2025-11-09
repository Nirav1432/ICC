//import liraries
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from "moment";
import { PopupComonStype } from "./PopupComonStype";
import DisableView from "./disableView/DisableView";

// create a component
const DtrRdssDisablePopup = ({ handleClose, isVisible, data }) => {

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={PopupComonStype.CenterContainer}>
                    <KeyboardAwareScrollView>
                        <View style={PopupComonStype.header}>
                            <View style={PopupComonStype.headerLeft}>
                                <Text style={PopupComonStype.title1}>DTR-RDSS Details</Text>
                            </View>
                            <View style={PopupComonStype.headerRight}>
                                <TouchableOpacity onPress={handleClose}>
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"DTR Capacity (MVA)"} value={data?.dtr_capacity} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"DTR Voltage Ratio"} value={data?.dtr_voltage_ratio} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Make/Model / S.No of DTR"} value={data?.dtr_model} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Manufacturing month and year of DTR"} value={moment(data?.dtr_manufacturing_month_year).format("YYYY-MM")} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"Month/Year of Installation"} value={moment(data?.dtr_year_installation).format("YYYY-MM")} />
                        </View>
                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"DTR Mounting"} value={data?.dtr_mounting} />
                        </View>

                        {data?.engravedUnderRDSS &&
                            <View style={PopupComonStype.ViewmarginTop}>
                                <DisableView title={"Engraved under RDSS"} value={data?.engravedUnderRDSS} />
                            </View>
                        }

                        <View style={PopupComonStype.ViewmarginTop}>
                            <DisableView title={"No of Feeders Emanating from DTR"} value={data?.dtr_number_of_dtr} />
                        </View>

                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
};

//make this component available to the app
export default memo(DtrRdssDisablePopup);