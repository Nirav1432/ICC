// Other by Khasiya Sagar.
import React, { memo, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert, } from "react-native";
import { OldDataHOmeScreenStyle } from "./OldDataHOmeScreenStyle";
import Header from "../../components/header/Header";
import IcnLogout from "../../assets/svg/IcnLogout";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import RadioButton from "../../components/radioButton/RadioButton";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import RadioButtonImage from "../../components/radioButtonImage/RadioButtonImgae";
import IcnSubStations from "../../assets/svg/Substations";
import IcnFeeders from "../../assets/svg/IcnFeeders";
import IcnDTR from "../../assets/svg/IcnDTR";
import { onLoading } from "../../../App";
import { Colors } from "../../utils/Colors";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { useNavigation } from "@react-navigation/native";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import { UserManager } from "../../manager/UserManager";
import { SafeAreaView } from "react-native-safe-area-context";


const options = ["Substations", "Feeders", "DTR"];
const imageSource = [<IcnSubStations />, <IcnFeeders />, <IcnDTR />];
const lossReduction = ["Loss Reduction"];
const smartMetering = ["Smart Metering"];
const modernization = ["Modernization"];

const OldDataHomeScreen = () => {
    const navigation = useNavigation();

    const [districts, setDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState(null);
    const [selectedImageOption, setSelectedImageOption] = useState(null);

    const [selectedOption, setSelectedOption] = useState(lossReduction[0]);
    const [isBtnType, setBtnType] = useState("Achievement");



    useEffect(() => {

        onLoading(true);

        const user_id = UserManager.id;
        const dynamicEndpoint = `${EndPoints.OLD_getDistrictsbyusername}?user_id=${user_id}`;

        let arr = [];
        Service.post(dynamicEndpoint, {}, (response) => {
            onLoading(false);

            for (let disObj of response?.district) {
                arr.push({ title: disObj.district_name, value: disObj.id, })
            }
            setDistricts(arr);
        },
            (err) => {
                onLoading(false);
            }
        );
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

            navigation.navigate("OldSubstationsList", {
                selectedDistricts: selectedDistricts?.value,
                selectedDistrictsName: selectedDistricts?.title,
                selectedOption: selectedOption === "Loss Reduction" ? "LossReduction" : selectedOption,
                achievementButtonState: isBtnType == "Achievement" ? true : false,
                selectedImageOption,
                geotagType: "Achievement",
                sessionType: "Substations",
            });

        }
        else if (selectedImageOption === "Feeders") {

            navigation.navigate("OldFeederListScreen", { selectedDistricts: selectedDistricts });

        }
        else if (selectedImageOption === "DTR") {

            navigation.navigate("OldDtrGeoTagList", {
                selectedDistricts: selectedDistricts?.value,
                selectedDistrictsName: selectedDistricts?.title,
                selectedOption: "LossReduction",
                achievementButtonState: isBtnType == "Achievement" ? true : false,
                selectedImageOption,
                geotagType: "Achievement",
                sessionType: "DTR",
            });
        }
        else {
            showErrorToast("Please select substations or feeder or DTR or households or Other")
        }
    };

    return (
        <SafeAreaView style={OldDataHOmeScreenStyle.mainView}>
            <Header
                rightIcon={<IcnMpty />}
                leftIcon={<IcnLogout />}
                onLeftPress={() => { navigation.openDrawer() }}
                title="Old Data Manage of RDSS Assets"
            />
            <ScrollView style={OldDataHOmeScreenStyle.container}>
                <View style={OldDataHOmeScreenStyle.innerContainer}>
                    <View style={OldDataHOmeScreenStyle.dropdownview}>
                        <SingleDropdownList title={"Select District"} data={districts} onSelectedSevice={(value) => { setSelectedDistricts(value) }} />
                    </View>
                </View>

                <View style={OldDataHOmeScreenStyle.radioView}>
                    <View>
                        <RadioButton
                            options={lossReduction}
                            selectedOption={selectedOption}
                            disble={true}
                            onSelect={handleSelectOption}
                        />
                        {/* <RadioButton
                            options={smartMetering}
                            selectedOption={selectedOption}
                            onSelect={handleSelectOption}
                        />
                        <RadioButton
                            options={modernization}
                            selectedOption={selectedOption}
                            onSelect={handleSelectOption}
                        /> */}
                    </View>
                </View>

                <View style={OldDataHOmeScreenStyle.innerContainer}>

                    <View style={OldDataHOmeScreenStyle.bottomView}>

                        <View style={[OldDataHOmeScreenStyle.button1, { backgroundColor: isBtnType === "Survey" ? Colors.primary : Colors.disableViewColor, },]}>
                            {/* <TouchableOpacity onPress={() => onPressType("Survey")}> */}
                            <TouchableOpacity onPress={() => onPressType("Achievement")}>
                                <Text style={[OldDataHOmeScreenStyle.bottomText, { color: isBtnType === "Survey" ? Colors.white : Colors.black, },]}>
                                    Survey
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[OldDataHOmeScreenStyle.button2, { backgroundColor: isBtnType === "Achievement" ? Colors.primary : Colors.disableViewColor, },]}>
                            <TouchableOpacity onPress={() => onPressType("Achievement")}>
                                <Text style={[OldDataHOmeScreenStyle.bottomText, { color: isBtnType === "Achievement" ? Colors.white : Colors.black, },]}>
                                    Achievement
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={OldDataHOmeScreenStyle.imageButtonView}>
                    <RadioButtonImage
                        options={options}
                        selectedOption={selectedImageOption}
                        onSelect={(option) => setSelectedImageOption(option)}
                        imageSource={imageSource}
                    />
                </View>
                <View style={[OldDataHOmeScreenStyle.innerContainer, { marginBottom: 20 }]}>
                    <SubmitBtn title="Geotag" onPress={handlePress} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default memo(OldDataHomeScreen);
