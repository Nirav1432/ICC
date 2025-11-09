// Other by Khasiya Sagar.

//import liraries
import React, { useState, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, } from 'react-native';
import PageStyle from "../other/OtherStyle";
import { Labels } from '../../utils/Labels';
import Header from '../../components/header/Header';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import { StackActions, useRoute } from "@react-navigation/native";
import { onLoading } from '../../../App';
import { Colors } from '../../utils/Colors';
import { postFormDataAPI, Service } from '../../service/Service';
import { EndPoints } from '../../service/Endpoints';
import { useNavigation } from "@react-navigation/native";
import RemarkPopup from '../../components/submitRemark/RemarkPopup';
import SubmitButton from '../../components/submit button/SubmitButton';
import SingleDropdownList from '../../components/singleselectlist/SingleDropdownList';
import DisableView from '../../components/disableView/DisableView';
import { UserManager } from '../../manager/UserManager';
import IcnDetails from "../../assets/svg/IcnDetails";
import OtherSubAssetPop from '../../components/OtherSubAssetPop';
import { SafeAreaView } from 'react-native-safe-area-context';

var _popdata = {
    Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "",
    ScadaCompatibility: "", RMULocationName: "", FRTULocationName: "", ProtocolSupported: ""
};

var _click = true;

var Location = "";
var Make = "";
var Rating = "";
var LinePosition = "";
var SubstationName = "";
var CircuitType = "";
var Voltage = "";
var RMUType = "";
var RMUCBType = "";
var ScadaCompatibility = "";
var RMULocationName = "";
var FRTULocationName = "";
var ProtocolSupported = "";

// create a component
const EditOtherGeotagFormScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { selectedDistricts, parentData, imagesUrl, locationDetail, otherPackage, oldItem } = route.params;

    const [isSubAsetVisible, setSubAsetVisible] = React.useState(false);
    const [isFeederNameList, setFeederNameList] = React.useState(null);
    const [isSubstationList, setSubstationList] = useState([]);
    const [isSubstationName, setSubstationName] = useState("");
    const [isFeederList, setFeederList] = React.useState([]);
    const [isFidderName, setFidderName] = React.useState("");
    const [isRemark, setRemark] = React.useState("");

    var _attributes = false;
    _attributes = (parentData?.sub_asset_type == "Capacitor Bank") || (parentData?.sub_asset_type == "Capacitor Banks") || (parentData?.sub_asset_type == "Circuit Breaker") || (parentData?.sub_asset_type == "RMU") || (parentData?.sub_asset_type == "RTU") || (parentData?.sub_asset_type == "FRTU")

    useEffect(() => {
        Location = oldItem?.sub_asset_attributes?.Location ? oldItem?.sub_asset_attributes?.Location : "";
        Make = oldItem?.sub_asset_attributes?.Make ? oldItem?.sub_asset_attributes?.Make : "";
        Rating = oldItem?.sub_asset_attributes?.Rating ? oldItem?.sub_asset_attributes?.Rating : "";
        LinePosition = oldItem?.sub_asset_attributes?.LinePosition ? oldItem?.sub_asset_attributes?.LinePosition : "";
        SubstationName = oldItem?.sub_asset_attributes?.SubstationName ? oldItem?.sub_asset_attributes?.SubstationName : ""
        CircuitType = oldItem?.sub_asset_attributes?.CircuitType ? oldItem?.sub_asset_attributes?.CircuitType : "";
        Voltage = oldItem?.sub_asset_attributes?.Voltage ? oldItem?.sub_asset_attributes?.Voltage : "";
        RMUType = oldItem?.sub_asset_attributes?.RMUType ? oldItem?.sub_asset_attributes?.RMUType : "";
        RMUCBType = oldItem?.sub_asset_attributes?.RMUCBType?.RMUCBType ? oldItem?.sub_asset_attributes?.RMUCBType?.RMUCBType : "";
        ScadaCompatibility = oldItem?.sub_asset_attributes?.ScadaCompatibility ? oldItem?.sub_asset_attributes?.ScadaCompatibility : "";
        RMULocationName = oldItem?.sub_asset_attributes?.RMULocationName ? oldItem?.sub_asset_attributes?.RMULocationName : "";
        FRTULocationName = oldItem?.sub_asset_attributes?.FRTULocationName ? oldItem?.sub_asset_attributes?.FRTULocationName : "";
        ProtocolSupported = oldItem?.sub_asset_attributes?.ProtocolSupported ? oldItem?.sub_asset_attributes?.ProtocolSupported : "";
    }, [oldItem?.sub_asset_attributes]);


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
            onGetFeederList(oldItem?.dtr_details?.substation);
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

    const onSubmit = () => {

        if (parentData?.sub_asset_type == "Circuit Breaker" && (SubstationName == "" || Make == "" || CircuitType == "" || Voltage == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "Capacitor Bank" && (Location == "" || Make == "" || Rating == "" || LinePosition == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "Capacitor Banks" && (Location == "" || Make == "" || Rating == "" || LinePosition == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "RMU" && (RMUType == "" || RMUCBType == "" || Make == "" || ScadaCompatibility == "" || RMULocationName == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "RTU" && (RMULocationName == "" || Make == "" || ProtocolSupported == "")) {
            Alert.alert("Alert", "Please add Asset Attributes");
            return
        }
        else if (parentData?.sub_asset_type == "FRTU" && (FRTULocationName == "" || Make == "" || ProtocolSupported == "")) {
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
            item_no: oldItem?.item_no,
            update_id: oldItem?.index_id,
            task: "save",

            geotagData: {

                sl_district_major_component: parentData?.major_component_id,
                sl_district_sub_component: parentData?.sub_component_id,
                sl_district_items_specification: parentData?.item_specification_id,

                sl_lattitude: {
                    title: oldItem?.title,
                    item_no: oldItem?.item_no,
                    index_id: oldItem?.index_id,
                    package: otherPackage,
                    tag_by: oldItem?.tag_by,
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
                    sub_asset_attributes: { Location, Make, Rating, LinePosition, SubstationName, CircuitType, Voltage, RMUType, RMUCBType, ScadaCompatibility, RMULocationName, FRTULocationName, ProtocolSupported, },
                    sub_asset_type: parentData?.sub_asset_type,
                },
            },

        };

        if (_click) {

            _click = false;
            onLoading(true);

            Service.post(EndPoints.updateOtherGeotag, data, (res) => {
                onLoading(false);
                if (res._resultflag) {
                    Alert.alert("", res.message, [
                        {
                            text: "OK",
                            onPress: () => {
                                const popAction = StackActions.pop(2);
                                navigation.dispatch(popAction);
                            },
                        },
                    ]);
                }
                else {
                    Alert.alert("Alert", res.message)
                }
                _click = true;
            },
                (err) => {
                    onLoading(false);
                    _click = true;
                    Alert.alert("Alert", "something wrong try again later")
                }
            );
        }


    }






    return (
        <SafeAreaView >

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

                {
                    isSubstationList.length > 0 &&
                    <View style={PageStyle.marginTop}>
                        <SingleDropdownList defoultTitle={oldItem?.dtr_details?.substation?.title} title={Labels.SelectFilterbySubstationName + "*"} data={isSubstationList} onSelectedSevice={(item) => onGetFeederList(item)} />
                    </View>
                }
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

                <View style={PageStyle.btnFormSubmit}>
                    <SubmitButton
                        textColor={Colors.white}
                        borderColor={Colors.transparent}
                        handlePress={() => onSubmit()}
                        buttonColor={Colors.orange}
                        buttonText={Labels.save}
                    />
                </View>

            </View>

            <OtherSubAssetPop handleClose={() => setSubAsetVisible(false)} isModalVisible={isSubAsetVisible}
                type={parentData?.sub_asset_type}
                substationList={isSubstationList}
                newData={(data) => {
                    Location = data?.Location;
                    Make = data?.Make;
                    Rating = data?.Rating;
                    LinePosition = data?.LinePosition;
                    SubstationName = data?.SubstationName;
                    CircuitType = data?.CircuitType;
                    Voltage = data?.Voltage;
                    RMUType = data?.RMUType;
                    RMUCBType = data?.RMUCBType;
                    ScadaCompatibility = data?.ScadaCompatibility;
                    RMULocationName = data?.RMULocationName;
                    FRTULocationName = data?.FRTULocationName;
                    ProtocolSupported = data?.ProtocolSupported;
                }}
                oldData={{
                    Location,
                    Make,
                    Rating,
                    LinePosition,
                    SubstationName,
                    CircuitType,
                    Voltage,
                    RMUType,
                    RMUCBType,
                    ScadaCompatibility,
                    RMULocationName,
                    FRTULocationName,
                    ProtocolSupported,
                }} />
        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(EditOtherGeotagFormScreen);
