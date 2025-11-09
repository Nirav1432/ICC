// Other by Khasiya Sagar.
//import liraries
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Alert, Image, ActivityIndicator, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fonts } from "../../utils/Fonts";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import SingleValueDropdownListSetOldData from "../../components/singleselectlist/SingleValueDropdownListSetOldData";
import CalendarViewSecond from "../../components/calendarView/CalendarViewSecond";
import CalendarView from "../../components/calendarView/CalendarView";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { EndPoints } from "../../service/Endpoints";
import { Service } from "../../service/Service";
import { onLoading } from "../../../App";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { SafeAreaView } from "react-native-safe-area-context";


// create a component
const OldLineGeneralAssetDetailTwo = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item, itemNumber, indexCode, locationDetail, images, pacageList, selectedDistricts, major_component, sub_component, items_specification, } = route.params;

    const [isPackege, setPackege] = React.useState(null);
    const [isDropDownList, setDropDownList] = React.useState(null);
    const [isDtrCapacity, setDtrCapacity] = React.useState(null);
    const [isDtrVoltage, setDtrVoltage] = React.useState(null);
    const [isMake, setMake] = React.useState(item?.remark);
    const [isManufacturingDate, setManufacturingDate] = React.useState(null);
    const [isInstallationDate, setInstallationDate] = React.useState(null);
    const [isDtrMounting, setDtrMounting] = React.useState(null);
    const [isNomberOfFeeder, setNomberOfFeeder] = React.useState(null);

    useEffect(() => {
        onGetListData();

        setDtrCapacity(item?.dtr_details?.dtr_capacity);
        setDtrVoltage(item?.dtr_details?.dtr_voltage_ratio)
        setMake(item?.dtr_details?.dtr_model);
        setDtrMounting(item?.dtr_details?.dtr_mounting);
        setNomberOfFeeder(item?.dtr_details?.dtr_number_of_dtr);
    }, []);

    const onGetListData = () => {
        onLoading(true);

        Service.post(EndPoints.getSettingListData, {}, (res) => {
            onLoading(false);
            if (res.data) {
                setDropDownList(res.data);

                if (res.data.length < 1) {
                    Alert.alert("Alert", "Setting Data is Empty. try some time later", [
                        {
                            text: "OK",

                        },
                    ]);
                }

            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
                Alert.alert("Alert", "Setting Data is Empty. try some time later --" + err, [
                    {
                        text: "OK",

                    },

                ]);
            }
        );
    };

    const onNext = () => {

        if (isDtrCapacity == null) {
            Alert.alert("Alert", "Please add DTR capacity")
            return
        }
        else if (isDtrVoltage == null) {
            Alert.alert("Alert", "Please add Voltage")
            return
        }
        else if (isMake == null) {
            Alert.alert("Alert", "Please add make/model of DTR")
            return
        }
        else if (isDtrMounting == null) {
            Alert.alert("Alert", "Please add Mounting")
            return
        }
        else if (isNomberOfFeeder == null) {
            Alert.alert("Alert", "Please add No of feeder")
            return
        }
        navigation.navigate("OldLineGeneralAssetDetailThree",
            {
                itemNumber: itemNumber,
                indexCode: indexCode,
                major_component, sub_component, items_specification,

                item: item,
                dropDownList: isDropDownList,
                locationDetail: locationDetail,
                images: images,

                packege: isPackege,
                
                dtrCapacity: isDtrCapacity?.id ? isDtrCapacity?.id : isDtrCapacity,
                dtrVoltage: isDtrVoltage?.id ? isDtrVoltage?.id : isDtrVoltage,
                dtrMounting: isDtrMounting?.id ? isDtrMounting?.id : isDtrMounting,

                make: isMake,
                manufacturingDate: isManufacturingDate,
                installationDate: isInstallationDate,
                nomberOfFeeder: isNomberOfFeeder,
                selectedDistricts: selectedDistricts,


            }
        )

    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="DTR Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View style={styles.commaonMargin}>
                        <SingleValueDropdownListSetOldData title={"Package No."} data={pacageList} onSelectedSevice={(value) => setPackege(value)} />
                        <Text style={styles.asaText}>*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”</Text>
                    </View>

                    {isDropDownList?.dtr_capacity &&
                        <View style={styles.commaonMargin}>
                            <SingleDropdownList title={"DTR Capacity (KVA)*"} defoultVaule={item?.dtr_details?.dtr_capacity} data={isDropDownList?.dtr_capacity} onSelectedSevice={(selectState) => setDtrCapacity(selectState)} />
                            <Text style={styles.asaText}>*(6/15/25/…)</Text>
                        </View>
                    }

                    {isDropDownList?.dtr_voltage_ratio &&
                        <View style={styles.commaonMargin}>
                            <SingleDropdownList title={"DTR Voltage Ratio*"} defoultVaule={item?.dtr_details?.dtr_voltage_ratio} data={isDropDownList?.dtr_voltage_ratio} onSelectedSevice={(selectState) => setDtrVoltage(selectState)} />
                        </View>
                    }

                    <View style={styles.commaonMargin}>
                        <Text style={styles.headerText}>{"Make/Model / S.No of DTR*"}</Text>
                        <TextInput
                            maxLength={70}
                            value={isMake}
                            style={styles.inpView}
                            onChangeText={(txt) => setMake(txt.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))}

                        />
                    </View>

                    <View style={styles.commaonMargin}>
                        <CalendarView oldDate={item?.dtr_details?.dtr_manufacturing_month_year} title={"Manufacturing month and year of DTR*"} maximumDate={new Date()} onChange={(value) => setManufacturingDate(value)} />
                    </View>

                    <View style={styles.commaonMargin}>
                        <CalendarViewSecond oldDate={item?.dtr_details?.dtr_year_installation} title={"Month/Year of Installation*"} maximumDate={new Date()} minimumDate={isManufacturingDate} onChange={(value) => setInstallationDate(value)} />
                    </View>

                    {isDropDownList?.dtr_mounting &&
                        <View style={styles.commaonMargin}>
                            <SingleDropdownList title={"DTR Mounting*"} defoultVaule={item?.dtr_details?.dtr_mounting} data={isDropDownList?.dtr_mounting} onSelectedSevice={(value) => setDtrMounting(value)} />
                            <Text style={styles.asaText}>*(Single Pole/ Double Pole, Plinth….)</Text>
                        </View>
                    }

                    <View style={styles.commaonMargin}>
                        <Text style={styles.headerText}>{"No of Feeders Emanating from DTR*"}</Text>
                        <TextInput
                            maxLength={70}
                            value={isNomberOfFeeder}
                            style={styles.inpView}
                            onChangeText={(txt) => setNomberOfFeeder(txt.replace(/[^0-9]/g, ''))}
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={styles.commaonMargin}>
                        <SubmitBtn title="Next" onPress={() => onNext()} />
                    </View>

                    <View style={styles.commaonMargin} />

                </ScrollView>
            </KeyboardAwareScrollView>

        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commaonMargin: {
        marginTop: 10, paddingHorizontal: 10
    },
    headerText: {
        fontSize: AppUtil.getHP(1.75),
        color: Colors.darkBlack,
        marginBottom: AppUtil.getHP(0.7),
        fontFamily: Fonts.RobotoMedium
    },
    inpView: {
        width: '100%',
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.white,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: AppUtil.getWP(3),
    },
    asaText: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: AppUtil.getHP(1.5),
        color: Colors.mediumGray,
        marginTop: 3,
    },
});

//make this component available to the app
export default memo(OldLineGeneralAssetDetailTwo);

