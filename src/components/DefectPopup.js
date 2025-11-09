import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { DefectPopupStyle } from "./DefectPopupStyle";
import IcnLock from "../assets/svg/IcnLock";
import SingleDropdownList from "../components/singleselectlist/SingleDropdownList";
import LocationBar from "../components/locationBar/LocationBar";
import IcnAddress from "../assets/svg/powerTransformersSvgs/IcnAddress";
export default function DefectPopup({ handleClose, modalVisible, button }) {
    const [address, setAddress] = useState("");

    const onClose = () => {
        handleClose();
    }

    const handleLocationEdit = (text) => {

    };
    const onLocationPress = () => {

    };

    return (
        <Modal animationType="slide" visible={modalVisible} transparent={true} statusBarTranslucent={false}>

            <View style={DefectPopupStyle.container}>

                <View style={DefectPopupStyle.header}>
                    <View style={DefectPopupStyle.headerLeft}>
                        <Text style={DefectPopupStyle.title}>Add Defect</Text>
                    </View>
                    <View style={DefectPopupStyle.headerRight}>
                        <TouchableOpacity onPress={onClose} >
                            <Text style={{ color: "black" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={DefectPopupStyle.dropdownview}>
                    <Text style={DefectPopupStyle.headText}>
                        Nature of defect
                    </Text>
                    <SingleDropdownList data={[]} onSelectedSevice={(value) => { setSelectedDistricts(value) }} />
                </View>

                <View style={DefectPopupStyle.view1}>
                    <View style={DefectPopupStyle.view2}>
                        <Text style={DefectPopupStyle.headText}>
                            Defect Qty
                        </Text>
                        <View style={DefectPopupStyle.view3}>
                            <Text style={DefectPopupStyle.inputTxt}>
                                50
                            </Text>
                        </View>
                    </View>
                    <View style={DefectPopupStyle.view2}>
                        <Text style={DefectPopupStyle.headText}>
                            Unit
                        </Text>
                        <View style={DefectPopupStyle.view3}>
                            <Text style={DefectPopupStyle.inputTxt}>
                                45
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={DefectPopupStyle.view4}>
                    <LocationBar
                        title="Complete Address"
                        icon={<IcnAddress />}
                        getdata={address}
                        setData={(text) => handleLocationEdit(text)}
                        handlePress={() => onLocationPress()}
                    />
                </View>

                <View style={DefectPopupStyle.view5}>
                    <View style={DefectPopupStyle.view2}>
                        <Text style={DefectPopupStyle.headText}>
                            Block
                        </Text>
                        <View style={DefectPopupStyle.view3}>
                            <Text style={DefectPopupStyle.inputTxt}>
                                Block No. 60
                            </Text>
                        </View>
                    </View>
                    <View style={DefectPopupStyle.view2}>
                        <Text style={DefectPopupStyle.headText}>
                            Town/City/State
                        </Text>
                        <View style={DefectPopupStyle.view3}>
                            <Text style={DefectPopupStyle.inputTxt}>
                                Gordhanpura
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    button &&
                    <TouchableOpacity style={DefectPopupStyle.view14} onPress={() => { null }}>
                        <Text style={DefectPopupStyle.txt6}>Submit</Text>
                    </TouchableOpacity>
                }
            </View>

        </Modal>
    );
}
