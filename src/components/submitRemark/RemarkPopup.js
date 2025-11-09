import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SubmitBtn from "../clogin/commonButton/SubmitBtn";
import { RemarkPopupStyle } from "./RemarkPopupStyle";
import IcnFilter from "../../assets/svg/IcnFilterClose";


export default function RemarkPopup({ handleClose, isVisible, txtRemark, submit }) {

    const [isRemark, setRemark] = React.useState("");

    useEffect(() => {
    }, []);

    const onSubmit = () => {
        submit();
        setRemark("");
    }

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>

            <View style={RemarkPopupStyle.container}>

                <TouchableOpacity style={RemarkPopupStyle.closeSty} onPress={() => handleClose(false)}>
                    <IcnFilter width={40} height={40} />
                </TouchableOpacity>

                <View style={RemarkPopupStyle.fields}>
                    <View style={RemarkPopupStyle.marginTop}>
                        <Text style={RemarkPopupStyle.headerText}>{"Remarks"}</Text>
                        <TextInput
                        maxLength={70}
                            value={isRemark}
                            placeholder="Enter remarks before submission"
                            style={RemarkPopupStyle.inpView}
                            onChangeText={(txt) => { setRemark(txt), txtRemark(txt) }}
                        />
                    </View>

                </View>

                {/* {isRemark != "" ?
                    <SubmitBtn title={"Submit"} onPress={() => onSubmit()} />
                    :
                    <View style={[RemarkPopupStyle.btnLogin, { opacity: 0.7 }]}>
                        <Text style={RemarkPopupStyle.btnLoginText}>{"Submit"}</Text>
                    </View>
                } */}

                <SubmitBtn title={"Submit"} onPress={() => onSubmit()} />

            </View>

        </Modal>
    );
}
