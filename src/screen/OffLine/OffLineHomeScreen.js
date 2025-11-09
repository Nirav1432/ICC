//import liraries
import React, { memo, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "../../components/header/Header";
import IcnLogout from "../../assets/svg/IcnLogout";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import DropDown from "./../../components/dropdown/DropDown";
import RadioButton from "../../components/radioButton/RadioButton";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import RadioButtonImage from "../../components/radioButtonImage/RadioButtonImgae";
import IcnSubStations from "../../assets/svg/Substations";
import { onLoading } from "../../../App";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { useNavigation } from "@react-navigation/native";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import IcnFeeders from "../../assets/svg/IcnFeeders";
import IcnDTR from "../../assets/svg/IcnDTR";
import IcnHouse from "../../assets/svg/IcnHouse";
import IcnOther from "../../assets/svg/IcnOther";
import { requestMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { SqlData } from "../../database/SqlData";
import { SafeAreaView } from "react-native-safe-area-context";

const options = ["Substations", "Feeders", "DTR", "Households", "Others"];
const imageSource = [<IcnSubStations />, <IcnFeeders />, <IcnDTR />, <IcnHouse />, <IcnOther />,];

// const options = ["Substations", "Feeders", "DTR"];
// const imageSource = [<IcnSubStations />, <IcnFeeders />, <IcnDTR />];

const lossReduction = ["Loss Reduction"];
const smartMetering = ["Smart Metering"];
const modernization = ["Modernization"];


// create a component
const OffLineHomeScreen = () => {

    const navigation = useNavigation();

    const [isDistricts, setDistricts] = useState([]);

    const [selectedDistricts, setSelectedDistricts] = useState(null);
    const [selectedImageOption, setSelectedImageOption] = useState(null);

    const [selectedOption, setSelectedOption] = useState(lossReduction[0]);
    const [isBtnType, setBtnType] = useState("Achievement");

    useEffect(() => {
        onLoading(true);
        SqlData.getdatax('SELECT * FROM districtsTable;', (response) => {
            onLoading(false);
            let res = JSON.parse(response.rows.item(0).list);
            setDistricts(res);
        }, (error) => {

        });

    }, []);

    const onPressType = (btnType) => {
        setBtnType(btnType)
    }

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handlePress = () => {

        if (selectedDistricts == null) {
            showErrorToast("Please select District")
            return
        }
        else if (selectedOption === null) {
            showErrorToast("Please select Loss Reduction")
            return
        }
        else if (selectedImageOption === "Substations") {

            var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
            var dist = str.replace(/[^a-zA-Z ]/g, "")

            navigation.navigate("OffLineSubstationList", {
                selectedDistricts: selectedDistricts?.value,
                selectedDistrictsName: selectedDistricts?.title,
                geotagModule: "LossReduction",
                geotagType: "Achievement",
                sessionType: "Substations",
                tableName: "Substations" + dist,
            });

        }
        else if (selectedImageOption === "Feeders") {

            var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
            var dist = str.replace(/[^a-zA-Z ]/g, "")

            navigation.navigate("OffLineFeederList", {
                selectedDistricts: selectedDistricts?.value,
                selectedDistrictsName: selectedDistricts?.title,
                geotagModule: "LossReduction",
                geotagType: "Achievement",
                sessionType: "Feeder",
                tableName: "Feeders" + dist,
            });

        }
        else if (selectedImageOption === "DTR") {

            var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
            var dist = str.replace(/[^a-zA-Z ]/g, "")

            navigation.navigate("OffLineDtrList", {
                selectedDistricts: selectedDistricts?.value,
                selectedDistrictsName: selectedDistricts?.title,
                geotagModule: "LossReduction",
                geotagType: "Achievement",
                sessionType: "DTR",
                tableName: "DTR" + dist,
            });
        }
        else if (selectedImageOption === "Households") {

        }
        else if (selectedImageOption === "Others") {
            var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
            var dist = str.replace(/[^a-zA-Z ]/g, "")

            navigation.navigate("OffLineOthersList", {
                selectedDistricts: selectedDistricts?.value,
                selectedDistrictsName: selectedDistricts?.title,
                geotagModule: "LossReduction",
                geotagType: "Achievement",
                sessionType: "Others",
                tableName: "Other" + dist,
            });
        }
        else {
            showErrorToast("Please select substations or feeder or DTR or households or Other")
        }
    };
    return (
        <SafeAreaView style={HomeScreenStyle.mainView}>
            <Header title="Geotagging of RDSS Assets" />

            <ScrollView style={HomeScreenStyle.container}>

                <View style={HomeScreenStyle.innerContainer}>
                    <View style={HomeScreenStyle.dropdownview}>
                        <SingleDropdownList title={"Select District"} data={isDistricts} onSelectedSevice={(value) => { setSelectedDistricts(value) }} />
                    </View>
                </View>

                <View style={HomeScreenStyle.radioView}>
                    <View>
                        <RadioButton
                            options={lossReduction}
                            selectedOption={selectedOption}
                            disble={true}
                            onSelect={handleSelectOption}
                        />

                        <RadioButton
                            options={smartMetering}
                            selectedOption={selectedOption}
                            onSelect={handleSelectOption}
                        />
                        <RadioButton
                            options={modernization}
                            selectedOption={selectedOption}
                            onSelect={handleSelectOption}
                        />
                    </View>
                </View>

                <View style={HomeScreenStyle.innerContainer}>

                    <View style={HomeScreenStyle.bottomView}>

                        <View style={[HomeScreenStyle.button1, { backgroundColor: isBtnType === "Survey" ? Colors.primary : Colors.disableViewColor, },]}>
                            <TouchableOpacity onPress={() => onPressType("Survey")}>
                                <Text style={[HomeScreenStyle.bottomText, { color: isBtnType === "Survey" ? Colors.white : Colors.black, },]}>
                                    Survey
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[HomeScreenStyle.button2, { backgroundColor: isBtnType === "Achievement" ? Colors.primary : Colors.disableViewColor, },]}>
                            <TouchableOpacity onPress={() => onPressType("Achievement")}>
                                <Text style={[HomeScreenStyle.bottomText, { color: isBtnType === "Achievement" ? Colors.white : Colors.black, },]}>
                                    Achievement
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={HomeScreenStyle.imageButtonView}>
                    <RadioButtonImage
                        options={options}
                        selectedOption={selectedImageOption}
                        onSelect={(option) => setSelectedImageOption(option)}
                        imageSource={imageSource}
                    />
                </View>
                <View style={HomeScreenStyle.innerContainer}>
                    <SubmitBtn title="Geotag" onPress={handlePress} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const HomeScreenStyle = StyleSheet.create({
    mainView: { flex: 1 },
    container: { flex: 1, backgroundColor: Colors.primaryBackground, },
    innerContainer: { marginHorizontal: AppUtil.getWP(5), },





    dropdownview: {
        marginTop: 20,
        marginBottom: 10,
    },
    radioView: {
        backgroundColor: Colors.disableViewColor,
        marginVertical: AppUtil.getHP(2),
        paddingVertical: AppUtil.getHP(3),
    },
    imageButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: AppUtil.getHP(2),
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.disableViewColor,
        borderRadius: 25,
    },
    button: {
        borderRadius: 25,
        paddingVertical: AppUtil.getHP(2),
        width: AppUtil.getWP(50),
    },
    selectedButton: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        width: AppUtil.getWP(40),
    },
    text: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    btnText1: {
        color: Colors.lightGray,
        fontSize: 16,
    },
    btnText2: {
        color: Colors.lightGray,
        fontSize: 16,
        marginRight: AppUtil.getWP(12),
    },
    selectedBtnTxt2: {
        color: Colors.white,
    },
    selectedBtnTxt1: {
        color: Colors.white,
    },
    bottomView: {
        marginTop: AppUtil.getHP(2),
        marginBottom: AppUtil.getHP(2),
        backgroundColor: Colors.disableViewColor,
        borderRadius: 25,
        flexDirection: "row",
    },
    bottomText: {
        color: Colors.lightGray,
        fontSize: 16,
        alignSelf: "center",
        width: AppUtil.getWP(45),
        justifyContent: "center",
        textAlign: "center",
    },
    button1: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: AppUtil.getHP(2),
        borderRadius: 25,
    },
    button2: {
        width: "50%",
        paddingVertical: AppUtil.getHP(2),
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: Colors.lightGray,
    },
});

//make this component available to the app
export default memo(OffLineHomeScreen);
