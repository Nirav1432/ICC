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
import { SafeAreaView } from "react-native-safe-area-context";


// create a component
const OffLineGeneralAssetDetailTwo = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item, dropDownList, itemIndex, indexCode, locationDetail, images } = route.params;

    const [isPackege, setPackege] = React.useState(null);
    const [isDtrCapacity, setDtrCapacity] = React.useState(null);
    const [isDtrVoltage, setDtrVoltage] = React.useState(null);
    const [isMake, setMake] = React.useState(item?.remark);
    const [isManufacturingDate, setManufacturingDate] = React.useState(null);
    const [isInstallationDate, setInstallationDate] = React.useState(null);
    const [isDtrMounting, setDtrMounting] = React.useState(null);
    const [isNomberOfFeeder, setNomberOfFeeder] = React.useState(null);

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
        navigation.navigate("OffLineGeneralAssetDetailThree",
            {
                item: item,
                dropDownList: dropDownList,
                itemIndex: itemIndex,
                indexCode: indexCode,
                locationDetail: locationDetail,
                images: images,

                packege: isPackege,
                dtrCapacity: isDtrCapacity,
                dtrVoltage: isDtrVoltage,
                make: isMake,
                manufacturingDate: isManufacturingDate,
                installationDate: isInstallationDate,
                dtrMounting: isDtrMounting,
                nomberOfFeeder: isNomberOfFeeder,
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
                        <SingleValueDropdownListSetOldData title={"Package No."} data={item?.parentData?.package_data} onSelectedSevice={(value) => setPackege(value)} />
                        <Text style={styles.asaText}>*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”</Text>
                    </View>

                    <View style={styles.commaonMargin}>
                        <SingleDropdownList title={"DTR Capacity (KVA)*"} data={dropDownList?.dtr_capacity} onSelectedSevice={(selectState) => setDtrCapacity(selectState)} />
                        <Text style={styles.asaText}>*(6/15/25/…)</Text>
                    </View>

                    <View style={styles.commaonMargin}>
                        <SingleDropdownList title={"DTR Voltage Ratio*"} data={dropDownList?.dtr_voltage_ratio} onSelectedSevice={(selectState) => setDtrVoltage(selectState)} />
                    </View>

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
                        <CalendarView title={"Manufacturing month and year of DTR*"} maximumDate={new Date()} onChange={(value) => setManufacturingDate(value)} />
                    </View>

                    <View style={styles.commaonMargin}>
                        <CalendarViewSecond title={"Month/Year of Installation*"} maximumDate={new Date()} minimumDate={isManufacturingDate} onChange={(value) => setInstallationDate(value)} />
                    </View>

                    <View style={styles.commaonMargin}>
                        <SingleDropdownList title={"DTR Mounting*"} data={dropDownList?.dtr_mounting} onSelectedSevice={(value) => setDtrMounting(value)} />
                        <Text style={styles.asaText}>*(Single Pole/ Double Pole, Plinth….)</Text>
                    </View>

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
export default memo(OffLineGeneralAssetDetailTwo);
