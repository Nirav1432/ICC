//import liraries

import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo, useEffect, useState } from "react";
import DisableView from "../components/disableView/DisableView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from "moment";
import { Colors } from "../utils/Colors";
import { AppUtil } from "../utils/AppUtil";
import { Fonts } from "../utils/Fonts";

// create a component
const OthersAssetAttributesPopup = ({ handleClose, isVisible, data, type }) => {

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.popcontainer}>
                    <KeyboardAwareScrollView>
                        <View >
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <Text style={styles.title1}>Asset Attributes: {type}</Text>
                                </View>
                                <View style={styles.headerRight}>
                                    <TouchableOpacity onPress={handleClose}>
                                        <Text style={{ color: "black", fontSize:14 }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <>
                                {data?.SubstationName &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Name of Substation"} value={data?.SubstationName?.title} />
                                    </View>
                                }

                                {data?.Make &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Make"} value={data?.Make} />
                                    </View>
                                }

                                {data?.CircuitType &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Type"} value={data?.CircuitType} />
                                    </View>
                                }

                                {data.Voltage &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Voltage"} value={data?.Voltage} />
                                    </View>}

                                {data?.Location &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Location"} value={data?.Location} />
                                    </View>
                                }

                                {data?.Rating &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Rating (KVAR)"} value={data?.Rating} />
                                    </View>
                                }

                                {data?.LinePosition &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Line Position"} value={data?.LinePosition} />
                                    </View>
                                }

                                {data?.RMUType &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"RMU Type"} value={data?.RMUType} />
                                    </View>
                                }

                                {data?.RMUCBType &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"RMU CB type"} value={data?.RMUCBType} />
                                    </View>
                                }

                                {data?.ScadaCompatibility &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Scada Compatibility"} value={data?.ScadaCompatibility} />
                                    </View>
                                }

                                {data?.RMULocationName &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"RMU Location Name"} value={data?.RMULocationName} />
                                    </View>
                                }

                                {data?.RTULocationName &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"RTU Location Name"} value={data?.RTULocationName} />
                                    </View>
                                }

                                {data?.ProtocolSupported &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"Protocol Supported"} value={data?.ProtocolSupported} />
                                    </View>
                                }

                                {data?.FRTULocationName &&
                                    <View style={styles.ViewmarginTop}>
                                        <DisableView title={"FRTU Location Name"} value={data?.FRTULocationName} />
                                    </View>
                                }

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
    header: { flexDirection: "row",justifyContent: "space-between", },
    headerLeft: { width: "70%", justifyContent: "center", alignItems: "flex-start", },
    headerRight: { width: "20%",justifyContent: "center", alignItems: "flex-end", justifyContent:"center", alignItems:'center'},
    title1: { fontSize: 16, fontWeight: "bold", color: Colors.darkBlack, },
    ViewmarginTop: { paddingHorizontal: 10, marginTop: AppUtil.getHP(2), },

});

//make this component available to the app
export default memo(OthersAssetAttributesPopup);
