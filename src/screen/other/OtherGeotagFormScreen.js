// Other by Khasiya Sagar.

//import liraries
import React, { useState, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, TextInput, } from 'react-native';
import PageStyle from "../other/OtherStyle";
import { Labels } from '../../utils/Labels';
import Header from '../../components/header/Header';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import { StackActions, useRoute } from "@react-navigation/native";
import { onLoading } from '../../../App';
import { Colors } from '../../utils/Colors';
import { Service } from '../../service/Service';
import { EndPoints } from '../../service/Endpoints';
import { useNavigation } from "@react-navigation/native";
import SubmitButton from '../../components/submit button/SubmitButton';
import SingleDropdownList from '../../components/singleselectlist/SingleDropdownList';
import DisableView from '../../components/disableView/DisableView';
import { UserManager } from '../../manager/UserManager';
import OtherSubAssetPop from '../../components/OtherSubAssetPop';
import IcnDetails from "../../assets/svg/IcnDetails";
import { Fonts } from '../../utils/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

var _popdata = {
    Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "", ScadaCompatibility: "", RMULocationName: "",
    RTULocationName: "", ProtocolSupported: "", FRTULocationName: "",
};

var _click = true;

// create a component
const OtherGeotagFormScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { selectedDistricts, parentData, imagesUrl, locationDetail, otherPackage, indexCode, sessionType, codeIndex } = route.params;

    const [isFeederNameList, setFeederNameList] = React.useState(null);
    const [isSubstationList, setSubstationList] = useState(null);
    const [isSubstationName, setSubstationName] = useState("");
    const [isFeederList, setFeederList] = React.useState([]);
    const [isFidderName, setFidderName] = React.useState("");
    const [isRemark, setRemark] = React.useState("");
    const [isSubAsetVisible, setSubAsetVisible] = React.useState(false);

    var _attributes = false;
    _attributes = (parentData?.sub_asset_type == "Capacitor Bank") || (parentData?.sub_asset_type == "Capacitor Banks") || (parentData?.sub_asset_type == "Circuit Breaker") || (parentData?.sub_asset_type == "RMU") || (parentData?.sub_asset_type == "RTU") || (parentData?.sub_asset_type == "FRTU")

    useEffect(() => {
        getSubstationList();
    }, [])

    const getSubstationList = () => {
        onLoading(true);

        var data = { district_id: JSON.stringify(selectedDistricts?.value) };

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

    const onGetFeederList = (item) => {

        setFeederList([]);

        setFidderName(null);
        setSubstationName(item);
        onLoading(true);
        const data = { district_id: JSON.stringify(selectedDistricts?.value), substation_id: item?.value, };

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

    const onGetListData = (item) => {

        setFidderName(item);
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
    }

    const onSubmit = (action) => {

        if (parentData?.sub_asset_type == "Circuit Breaker" && (_popdata.SubstationName == "" || _popdata.Make == "" || _popdata.CircuitType == "" || _popdata.Voltage == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "Capacitor Bank" && (_popdata.Location == "" || _popdata.Make == "" || _popdata.Rating == "" || _popdata.LinePosition == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "Capacitor Banks" && (_popdata.Location == "" || _popdata.Make == "" || _popdata.Rating == "" || _popdata.LinePosition == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "RMU" && (_popdata.RMUType == "" || _popdata.RMUCBType == "" || _popdata.Make == "" || _popdata.ScadaCompatibility == "" || _popdata.RMULocationName == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "RTU" && (_popdata.RMULocationName == "" || _popdata.Make == "" || _popdata.ProtocolSupported == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "FRTU" && (_popdata.FRTULocationName == "" || _popdata.Make == "" || _popdata.ProtocolSupported == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (isSubstationName == "") {
            Alert.alert("Alert", "Please add substation")
            return
        }
        else if (isFidderName == null) {
            Alert.alert("Alert", "Please add Feeder")
            return
        }

        var data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            geotag_type: "Achievement",
            district_id: JSON.stringify(selectedDistricts?.value),
            remarks: isRemark,
            item_no: codeIndex,
            task: action,

            geotagData: {

                sl_district_major_component: parentData?.major_component_id,
                sl_district_sub_component: parentData?.sub_component_id,
                sl_district_items_specification: parentData?.item_specification_id,

                sl_lattitude: {
                    title: parentData?.major_components + " " + parentData?.sub_components,
                    item_no: codeIndex,
                    index_id: indexCode,
                    package: otherPackage,
                    tag_by: UserManager.first_name + " " + UserManager.last_name,
                    latitude: locationDetail.latitude,
                    longitude: locationDetail.longitude,
                    address: locationDetail.address,
                    block: locationDetail.block,
                    village: locationDetail.village,
                    images: imagesUrl,

                    dtr_details: {
                        package: otherPackage,
                        "substation": isSubstationName,
                        "feeder": isFidderName,
                        "feeder_name": isFeederNameList?.feeder_name,
                        "feeder_category": isFeederNameList?.feeder_category,
                        "feeder_code": isFeederNameList?.feeder_code,
                        "feeder_voltage": isFeederNameList?.feeder_voltage,
                        "feeder_length": isFeederNameList?.feeder_length,
                        "substation_name": isFeederNameList?.substation_name,
                    },
                    sub_asset_attributes: _popdata,
                    sub_asset_type: parentData?.sub_asset_type,
                },
            },

        };



        if (_click) {
            _click = false;
            onLoading(true);
            Service.post(EndPoints.addOtherGeotag, data, (res) => {
                _click = true;
                onLoading(false);
                if (res._resultflag) {
                    Alert.alert("", res.message, [
                        {
                            text: "OK",
                            onPress: () => {
                                if (sessionType == "Other") {
                                    const popAction = StackActions.pop(2);
                                    navigation.dispatch(popAction);
                                }
                                else {
                                    const popAction = StackActions.pop(4);
                                    navigation.dispatch(popAction);
                                }
                            },
                        },
                    ]);
                }
                else {
                    Alert.alert("Alert", res.message)
                }
            },
                (err) => {
                     _click = true;
                    onLoading(false);
                    Alert.alert("Alert", "something wrong try again later")
                }
            );
        }

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Header
                onLeftPress={() => navigation.goBack()}
                title="Other Assets Geotag"
                leftIcon={<IcnBack />}
            />

            <View style={PageStyle.formContainer}>
                {
                    _attributes &&
                    <TouchableOpacity style={PageStyle.heading} onPress={() => setSubAsetVisible(true)}>
                        <View style={PageStyle.textView}>
                            <Text style={PageStyle.headingText}>{"Select asset attributes"}</Text>
                        </View>
                        <View style={PageStyle.icnView}>
                            <IcnDetails />
                        </View>
                    </TouchableOpacity>
                }

                <View style={PageStyle.marginTop}>
                    <SingleDropdownList title={Labels.SelectFilterbySubstationName + "*"} data={isSubstationList} onSelectedSevice={(item) => onGetFeederList(item)} />
                </View>
                {
                    isFeederList.length > 0 &&
                    <View style={PageStyle.marginTop}>
                        <SingleDropdownList title={"11 kV Feeder Name on which DTR is Erected*"} data={isFeederList} onSelectedSevice={(item) => onGetListData(item)} />
                    </View>
                }

                <View style={PageStyle.marginTop}>
                    <DisableView title={"11 kV feeder code on which the asset was erected"} value={isFeederNameList?.feeder_code} />
                </View>
                <View style={PageStyle.marginTop}>
                    <DisableView title={"Emanating SS Name"} value={isFeederNameList?.substation_name} />
                </View>
                <View style={PageStyle.marginTop}>
                    <DisableView title={"Emanating SS Code"} value={isFeederNameList?.substation_code} />
                </View>

                <View style={PageStyle.marginTop} >
                    <Text style={PageStyle.headerText}>{"Remarks"}</Text>
                    <TextInput
                        maxLength={70}
                        value={isRemark}
                        style={PageStyle.inpView}
                        onChangeText={(txt) => { setRemark(txt) }}
                    />
                </View>


                {/* <View style={PageStyle.btnFormSubmit}>
                    <SubmitButton
                        textColor={Colors.white}
                        borderColor={Colors.transparent}
                        handlePress={() => onSubmit()}
                        buttonColor={Colors.orange}
                        buttonText={Labels.submit}
                    />
                </View> */}

                <View style={PageStyle.marginTop}>
                    <View style={PageStyle.twobtn}>
                        <TouchableOpacity style={{ width: "48%", padding: 12, borderRadius: 10, backgroundColor: Colors.primary, alignItems: "center" }} onPress={() => { onSubmit("save") }}>
                            <Text style={{ color: "#fff", fontSize: 14, fontFamily: Fonts.RobotoMedium, }}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: "48%", padding: 12, borderRadius: 10, backgroundColor: Colors.primary, alignItems: "center" }} onPress={() => { onSubmit("submit") }}>
                            <Text style={{ color: "#fff", fontSize: 14, fontFamily: Fonts.RobotoMedium, }}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </View>



            </View>
            <OtherSubAssetPop handleClose={() => setSubAsetVisible(false)} isModalVisible={isSubAsetVisible}
                type={parentData?.sub_asset_type}
                substationList={isSubstationList}
                newData={(data) => { _popdata = data }}
                oldData={_popdata} />

        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(OtherGeotagFormScreen);
