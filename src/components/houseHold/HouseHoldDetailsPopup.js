import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SubmitBtn from "../clogin/commonButton/SubmitBtn";
import SingleDropdownList from "../singleselectlist/SingleDropdownListSetOldData";
import CalendarViewfour from "../calendarView/CalendarViewfour";
import { EngravedUnderRDSS, EngravedUnderRDSS1 } from "../../utils/CardData";
import SingleValueDropdownListSetOldData from "../singleselectlist/SingleValueDropdownListSetOldData";
import PageStyle from "./HouseHoldDetailsPopupStaye";
import CalendarView from "../calendarView/CalendarViewTherd";
import Radio from "../../assets/svg/Radio";
import FillRadio from "../../assets/svg/FillRadio";

export default function HouseHoldDetailsPopup({ handleClose, isModalVisible, }) {


    const [isManufacturingDate, setManufacturingDate] = React.useState(null);

    const [isMake, setMake] = React.useState(null);
    const [isNomberOfFeeder, setNomberOfFeeder] = React.useState(null);
    const [isRadioButton, setRadioButton] = useState(false);

    useEffect(() => {
        
    }, [handleClose, isModalVisible]);


    const getinstallationDT =()=>{

    }

    const onSelectRadioBuuton = (value) => {
        setRadioButton(value);
    }

    return (
        <Modal animationType="slide" visible={isModalVisible} transparent={true} statusBarTranslucent={false}>

            <View style={PageStyle.container}>
                <KeyboardAwareScrollView>
                    <View style={PageStyle.header}>
                        <View style={PageStyle.headerLeft}>
                            <Text style={PageStyle.title}>DTR Details</Text>
                        </View>
                        <View style={PageStyle.headerRight}>
                            <TouchableOpacity onPress={handleClose}>
                                <Text style={{ color: "black" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={PageStyle.fields}>



                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"Taluka Name"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>
                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"Village Name Name"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>
                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"Village LGD Code"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>
                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"Beneficiary Name"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>

                        <CalendarView title={"Date of electrification"} oldDate={null} maximumDate={new Date()}  onChange={(value) => { getinstallationDT(value) }} />

                        <View style={PageStyle.btnRadioView}>
                            <TouchableOpacity style={PageStyle.btnRadioInnerView} onPress={() => onSelectRadioBuuton(!isRadioButton)}>
                                {isRadioButton ? <Radio /> : <FillRadio />}
                                <Text style={PageStyle.headText}>Ongrid</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[PageStyle.btnRadioInnerView, { marginLeft: 10 }]} onPress={() => onSelectRadioBuuton(!isRadioButton)}>
                                {isRadioButton ? <FillRadio /> : <Radio />}
                                <Text style={PageStyle.headText}>Offgrid</Text>
                            </TouchableOpacity>
                        </View>    

                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"UID"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>
                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"Address"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>
                        <View style={PageStyle.marginTop}>
                            <Text style={PageStyle.headerText}>{"Contact Details"}</Text>
                            <TextInput
                                maxLength={70}
                                value={isMake}
                                style={PageStyle.inpView}
                                onChangeText={(txt) => { setMake(txt), getmodelofDTR(txt) }}
                            />
                        </View>
                       
                    </View>
                    <SubmitBtn title={"Save"} onPress={handleClose} />
                </KeyboardAwareScrollView>

            </View>

        </Modal>
    );
}
