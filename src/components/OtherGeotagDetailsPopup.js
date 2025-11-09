//import liraries

import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo, useEffect, useState } from "react";
import DisableView from "../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from "moment";
import { Colors } from "../utils/Colors";
import { AppUtil } from "../utils/AppUtil";

// create a component
const OtherGeotagDetailsPopup = ({ handleClose, isVisible, data }) => {

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.popcontainer}>
                    <KeyboardAwareScrollView>
                        <View >
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <Text style={styles.title1}>Dtr Details</Text>
                                </View>
                                <View style={styles.headerRight}>
                                    <TouchableOpacity onPress={handleClose}>
                                        <Text style={{ color: "black" }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <>
                                <View style={styles.ViewmarginTop}>
                                    <DisableView title={"Package No."} value={data?.package} />
                                </View>
                                <View style={styles.ViewmarginTop}>
                                    <DisableView title={"substation name"} value={data?.substation?.title} />
                                </View>
                                <View style={styles.ViewmarginTop}>
                                    <DisableView title={"Emanating SS code"} value={data?.substation?.value} />
                                </View>

                                <View style={styles.ViewmarginTop}>
                                    <DisableView title={"11 kV Feeder name"} value={data?.feeder?.feeder_code} />
                                </View>

                                <View style={styles.ViewmarginTop}>
                                    <DisableView title={"11 kV Feeder code"} value={data?.feeder?.feeder_name} />
                                </View>
                                
                            </>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    popcontainer: { backgroundColor: Colors.primaryBackground, maxHeight: "80%", borderRadius: 10, width: "95%", marginVertical: "10%", marginHorizontal: "5%", alignSelf: "center", padding: AppUtil.getHP(3), borderWidth: 1, borderColor: Colors.lightGray, },
    header: { flexDirection: "row" },
    headerLeft: { flex: 1, justifyContent: "center", alignItems: "flex-start", },
    headerRight: { justifyContent: "center", alignItems: "flex-end", },
    title1: { fontSize: 20, fontWeight: "bold", color: Colors.darkBlack, },
      ViewmarginTop: {    paddingHorizontal: 10,    marginTop: AppUtil.getHP(2),  },

});

//make this component available to the app
export default memo(OtherGeotagDetailsPopup);
