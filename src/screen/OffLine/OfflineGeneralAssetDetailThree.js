// Other by Khasiya Sagar.

//import liraries
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Alert, Image, ActivityIndicator, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { SqlData } from "../../database/SqlData";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserManager } from "../../manager/UserManager";
import { onLoading } from "../../../App";
import { postFormDataAPI, Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import DisableView from "../../components/disableView/DisableView";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { StackActions } from '@react-navigation/native';
import { Labels } from "../../utils/Labels";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
const OffLineGeneralAssetDetailThree = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item, dropDownList, itemIndex, indexCode, locationDetail, images, packege, dtrCapacity, dtrVoltage, make, manufacturingDate, installationDate, dtrMounting, nomberOfFeeder } = route.params;

    const [isFeederList, setFeederList] = React.useState([]);
    const [isFeederNameList, setFeederNameList] = React.useState();
    const [isExistingScheme, setExistingScheme] = React.useState(null)
    const [isFeederErected, setFeederErected] = React.useState(null)

    const [isSubstationList, setSubstationList] = useState([]);
    const [isSelectSubstation, setSelectSubstation] = React.useState(null);

    useEffect(() => {
        getSubstationList();
    }, [])

    const getSubstationList = () => {
        onLoading(true);

        var data = { district_id: JSON.stringify(item?.selectedDistricts) };

        Service.post(EndPoints.getSubstationByDistrict, data, (success) => {

            const transformedDistricts = success.data.map((district) => ({
                title: district?.substation_name,
                value: district?.id,
            }));

            setSubstationList(transformedDistricts.reverse());
            onLoading(false);
        },
            (error) => {
                onLoading(false);
            }
        );
    }
    const onGetFeederList = (obj) => {

        setSelectSubstation(obj);
        setFeederList([]);
        setFeederErected(null)
        setFeederNameList(null);

        onLoading(true);
        const data = { district_id: JSON.stringify(item?.selectedDistricts), substation_id: obj?.value, };

        Service.post(EndPoints.getFeederbydistrict, data, (response) => {
            onLoading(false);
            if (response.resultflag == 1) {
                setFeederList(response?.data);
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    const onFeederNameList = (item) => {
        setFeederErected(item);

        onLoading(true);
        Service.post(EndPoints.getFeederDetails, { feeder_id: item.id }, (res) => {
            onLoading(false);

            if (res.resultflag == "1" && res.data)
                setFeederNameList(res.data);
            else
                showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    function onSave() {
        if (isExistingScheme == null) {
            Alert.alert("Alert", "Please add Mention the scheme")
            return
        }

        var data = {

            item_no: itemIndex,
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
            district_id: item?.selectedDistricts,
            task: "save",

            geotagData: {
                sl_district_major_component: [item?.parentData?.major_component_id],
                sl_district_sub_component: [item?.parentData?.sub_component_id],
                sl_district_items_specification: [item?.parentData?.item_specification_id],

                sl_lattitude: {
                    title: item?.parentData?.major_components + " " + item?.parentData?.sub_components,
                    tag_by: UserManager.first_name + " " + UserManager.last_name,
                    index_id: indexCode,
                    item_no: itemIndex,
                    latitude: locationDetail.latitude,
                    longitude: locationDetail.longitude,
                    address: locationDetail.address,
                    block: locationDetail.block,
                    village: locationDetail.village,
                    images: images,

                    dtr_details: {
                        dtr_Package: packege,
                        dtr_capacity: dtrCapacity?.id,
                        dtr_voltage_ratio: dtrVoltage?.id,
                        dtr_model: make,
                        dtr_manufacturing_month_year: manufacturingDate,
                        dtr_year_installation: installationDate,
                        dtr_mounting: dtrMounting?.id,
                        dtr_number_of_dtr: nomberOfFeeder,
                        if_existing_mention_scheme: isExistingScheme?.id,
                        "if_existing_mention_scheme_name": isExistingScheme?.title,

                        "feeder_name_on_which_dtr_is_erected": isFeederErected?.feeder_name,
                        "11_feeder_name_on_which_dtr_is_erected": isFeederErected?.feeder_name,
                        "11_feeder_code_on_which_dtr_is_erected": isFeederErected?.feeder_code,
                        feeder_id_is_erected: isFeederNameList?.id,
                        emanating_ss_name: isFeederNameList?.substation_code,
                        emanating_ss_code: isFeederNameList?.substation_code,
                        "substaion_value": isSelectSubstation?.value,
                        "substaion_title": isSelectSubstation?.title,

                    },
                },
            },
            remarks: item?.remarks,
        };

        onLoading(true);

        Service.post(EndPoints.addgeotag, data, (res) => {
            onLoading(false);
            if (res._resultflag) {
                Alert.alert("", res.message, [
                    {
                        text: "OK",
                        onPress: () => {

                            SqlData.DeleteData(item?.id, `DELETE FROM SaveDtrGeotagTable WHERE id = ?;`, (response) => {
                                const popAction = StackActions.pop(3);
                                navigation.dispatch(popAction);
                            }, (error) => {
                                const popAction = StackActions.pop(3);
                                navigation.dispatch(popAction);
                            });
                        },
                    },
                ]);
            }
            else {
                Alert.alert("Alert", res.message)
            }
        },
            (err) => {
                onLoading(false);
                Alert.alert("Alert", "something wrong try again later")
            }
        );
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
                        <SingleDropdownList title={"If existing, mention the scheme*"} data={dropDownList?.the_schemes} onSelectedSevice={(value) => setExistingScheme(value)} />
                    </View>

                    <View style={styles.commaonMargin}>
                        <SingleDropdownList title={Labels.SelectFilterbySubstationName + "*"} data={isSubstationList} onSelectedSevice={(item) => onGetFeederList(item)} />
                    </View>
                    {
                        isFeederList.length > 0 &&
                        <View style={styles.commaonMargin}>
                            <SingleDropdownList title={"11 kV Feeder Name on which DTR is Erected*"} data={isFeederList} onSelectedSevice={(item) => onFeederNameList(item)} />
                        </View>
                    }
                    <View style={styles.commaonMargin}>
                        <DisableView title={"11 kV Feeder code on which DTR is Erected"} value={isFeederNameList?.feeder_code} />
                    </View>
                    <View style={styles.commaonMargin}>
                        <DisableView title={"Emanating SS Name"} value={isFeederNameList?.substation_name} />
                    </View>
                    <View style={styles.commaonMargin}>
                        <DisableView title={"Emanating SS Code"} value={isFeederNameList?.substation_code} />
                    </View>

                    <View style={styles.commaonMargin}>
                        <SubmitBtn title="Save" onPress={() => onSave()} />
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
});

//make this component available to the app
export default memo(OffLineGeneralAssetDetailThree);
