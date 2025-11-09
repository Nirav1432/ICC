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
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { SafeAreaView } from "react-native-safe-area-context";

var _clicked = true;
// create a component
const OldLineGeneralAssetDetailThree = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        itemNumber, indexCode, selectedDistricts, major_component, sub_component, items_specification,
        dtrCapacity, dtrVoltage, make, manufacturingDate, installationDate, dtrMounting, nomberOfFeeder, packege,
        item, dropDownList } = route.params;

    const [isExistingScheme, setExistingScheme] = React.useState(null)

    const [isFeederList, setFeederList] = React.useState([]);
    const [isFeederSelected, setFeederSeleced] = React.useState(null)
    const [isSelectedFeederDetails, setSelectedFeederDetails] = React.useState();

    const [isSubstationList, setSubstationList] = useState([]);
    const [isSelectSubstation, setSelectSubstation] = React.useState(null);

    useEffect(() => {
        // setExistingScheme(item?.dtr_details?.if_existing_mention_scheme);
        getSubstationList();
    }, [])

    const getSubstationList = () => {
        onLoading(true);
        var data = { district_id: selectedDistricts };
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
        setFeederSeleced(null)
        setSelectedFeederDetails(null);

        onLoading(true);
        const data = { district_id: selectedDistricts, substation_id: obj?.value, };

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
        setFeederSeleced(item);

        onLoading(true);
        Service.post(EndPoints.getFeederDetails, { feeder_id: item.id }, (res) => {
            onLoading(false);
            if (res.resultflag == "1" && res.data)
                setSelectedFeederDetails(res.data);
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
        else if (isSelectSubstation == null) {
            Alert.alert("Alert", "Please select substation")
            return
        }
        else if (isFeederSelected == null) {
            Alert.alert("Alert", "Please select Feeder")
            return
        }

        var data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            geotag_type: "Achievement",
            taging_for: "LossReduction",

            item_no: itemNumber,
            district_id: selectedDistricts,
            task: "save",

            geotag_version: "old",
            old_index_id: item?.index_id,
            old_item: item?.item_no,

            geotagData: {

                sl_district_major_component: [major_component],
                sl_district_sub_component: [sub_component],
                sl_district_items_specification: [items_specification],

                sl_lattitude: {
                    title: item?.title,
                    tag_by: UserManager.first_name + " " + UserManager.last_name,
                    index_id: indexCode,
                    item_no: itemNumber,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    address: item.address,
                    block: item.block,
                    village: item.village,
                    images: item?.images,

                    dtr_details: {
                        dtr_capacity: dtrCapacity,
                        dtr_voltage_ratio: dtrVoltage,
                        dtr_model: make,
                        dtr_manufacturing_month_year: manufacturingDate,
                        dtr_year_installation: installationDate,
                        dtr_mounting: dtrMounting,
                        dtr_number_of_dtr: nomberOfFeeder,
                        dtr_Package: packege,
                        if_existing_mention_scheme: isExistingScheme?.id ? isExistingScheme?.id : isExistingScheme,
                        "if_existing_mention_scheme_name": isExistingScheme?.title ? isExistingScheme?.title : isExistingScheme,
                        "substaion_value": isSelectSubstation?.value,
                        "substaion_title": isSelectSubstation?.title,
                        "feeder_name_on_which_dtr_is_erected": isFeederSelected?.feeder_name,
                        "11_feeder_name_on_which_dtr_is_erected": isFeederSelected?.feeder_name,
                        feeder_id_is_erected: isFeederSelected?.id,
                        emanating_ss_name: isSelectedFeederDetails?.substation_name,
                        emanating_ss_code: isSelectedFeederDetails?.substation_code,
                        "scheme_of_emanating_ss": isSelectedFeederDetails?.scheme_of_emanating_ss,
                        "emanating_ss_village_name": isSelectedFeederDetails?.ss_village_name,
                        "emanating_ss_census_code": isSelectedFeederDetails?.ss_village_census_code,
                        "feeder_code_on_which_dtr_is_erected": isSelectedFeederDetails?.feeder_code,
                        "scheme_11_kV_line": isSelectedFeederDetails?.scheme_of_11_kv_line,
                    },
                },
            },
        };

        if (_clicked) {
            _clicked = false;

            onLoading(true);
            Service.post(EndPoints.addgeotag, data, (res) => {

                _clicked = true;
                onLoading(false);
                if (res._resultflag) {
                    Alert.alert("", res.message, [
                        {
                            text: "OK",
                            onPress: () => {

                                const popAction = StackActions.pop(3);
                                navigation.dispatch(popAction);
                            },
                        },
                    ]);
                }
                else {
                    Alert.alert("Alert", res.message)
                }
            },
                (err) => {
                    _clicked = true;
                    onLoading(false);
                    Alert.alert("Alert", "something wrong try again later")
                }
            );

        }

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

                    {dropDownList?.the_schemes &&
                        <View style={styles.commaonMargin}>
                            <SingleDropdownList title={"If existing, mention the scheme*"} data={dropDownList?.the_schemes} onSelectedSevice={(value) => setExistingScheme(value)} />
                        </View>
                    }

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
                        <DisableView title={"11 kV Feeder code on which DTR is Erected"} value={isSelectedFeederDetails?.feeder_code} />
                    </View>
                    <View style={styles.commaonMargin}>
                        <DisableView title={"Emanating SS Name"} value={isSelectedFeederDetails?.substation_name} />
                    </View>
                    <View style={styles.commaonMargin}>
                        <DisableView title={"Emanating SS Code"} value={isSelectedFeederDetails?.substation_code} />
                    </View>

                    <View style={styles.commaonMargin}>
                        <SubmitBtn title="RE-SUBMIT" onPress={() => onSave()} />
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
export default memo(OldLineGeneralAssetDetailThree);
