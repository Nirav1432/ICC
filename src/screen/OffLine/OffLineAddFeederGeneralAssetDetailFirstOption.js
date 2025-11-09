// Other by Khasiya Sagar.

// React
import React, { useState, useEffect, memo } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnDetails from "../../assets/svg/IcnDetails";
import { Labels } from "../../utils/Labels";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import LTlineOfflineEditPopup from "../../components/LTlineOfflineEditPopup";
import { postFormDataAPI, Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { onLoading } from "../../../App";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import HTlineOfflineEditPopup from "../../components/HTlineOfflineEditPopup";
import PollOfflineEditDetails from "../../components/PollOfflineEditDetails";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import DtrRdssData from "../../model/DtrRdssData";
import { useFocusEffect } from '@react-navigation/native';
import TestCommonCard from "../../components/commonCards/TestCommonCard";
import SingleDropdownListWithIcn from "../../components/singleselectlist/SingleDropdownListWithIcn";
import { UserManager } from "../../manager/UserManager";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import Geocoder from "react-native-geocoding";
import moment from "moment";
import IcnUpload from "../../assets/svg/IcnUpload";
import { image_base_url } from "../../service/appConfig";
import InputFields2 from "../../components/inputFields/InputFields2";
import { Fonts } from "../../utils/Fonts";
import { SqlData } from "../../database/SqlData";
import DtrModalView from "../../components/dtrModal/DtrModalView";
import AssetDropDown from "../../components/dde/dropdownNewList/assetDropDown";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import LocationBar from "../../components/locationBar/LocationBar";
import LocationPopup from "../../components/LocationPopup";
import { AssetType } from "../../utils/CardData";
import InputFields3 from "../../components/inputFields/InputFields3";
import OtherSubAssetPop from "../../components/OtherSubAssetPop";

var _lastFeederIndexNum = 0;

// LT line and HT line var
var _scheme = "";
var _majorComponent = "";
var _oldUGorOH = "";
var _oldWhetherCableOrConductor = "";
var _oldSinglePhaseThreePhase = "";
var _oldCircuitType = "";
var _oldCableSize = "";
var _oldLTLineVoltage = "";
var _oldSpecifyTypeVoltage = "";
var _oldTypeOfCable = "";
var _olsSpecifyTypeOfCable = "";
var _oldTypeOfConductor = "";
var _olsSpecifyTypeOfConductor = "";
var _oldPoleStructur = "";

//POLE VAR
var _poleType = "";
var _poleHeight = "";
var _poleSpecifyType = "";
var _existingPole = "";
var _branchPoint = "";

// DTR VAR
var _dtrCapacity = null;
var _dtrVoltage = null;
var _modelofdtr = "";
var _manufacturingDT = null
var _installationDT = null
var _dtrMounting = null;
var _EngravedUnderRDSS = null;
var _noOffeeder = "";

// Other-RDSS and Other-Existing VAR
var _popdata = {
    Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "", ScadaCompatibility: "", RMULocationName: "",
    RTULocationName: "", ProtocolSupported: "", FRTULocationName: "",
};

// create a component
const OffLineAddFeederGeneralAssetDetailFirstOption = (props) => {

    const route = useRoute();
    const { data } = route.params;

    const mapRef = React.useRef(null);
    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [isAddress, setAddress] = useState("");
    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isLocationDetail, setLocationDetail] = useState();
    const [isImagesUrl, setImageUploadUrl] = useState([]);
    const [isImages1, setImage1] = useState("");
    const [isImages2, setImage2] = useState("");
    const [isImages3, setImage3] = useState("");
    const [isLoader1, setLoader1] = useState(false);
    const [isLoader2, setLoader2] = useState(false);
    const [isLoader3, setLoader3] = useState(false);
    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
    const [isGenratName, setGenratName] = useState("");
    const [isActualDistance, setActualDistance] = useState("");
    const [isRemark, setRemark] = useState(data?.remark);

    const [isHTModalVisible, setHTModalVisible] = useState(false);
    const [isLTModalVisible, setLTModalVisible] = useState(false);
    const [isMajorComponents, setMajorComponents] = useState([]);
    const [isPollDetailsVisible, setPollDetailsVisible] = useState(false);

    const [isAssetTypePopup, setAssetTypePopup] = useState(null);
    const [isDtrRdssData, setDtrRdssData] = useState([]);
    const [isSelectedDtrGeotag, setSelectedDtrGeotagList] = useState(null);
    const [isEstimatedDistance, setEstimatedDistance] = useState("");
    const [isSelectedAssesId, setSelectedAssesId] = useState(null);
    const [isLastGeotagAssetList, setLastGeotagAssetList] = useState([]);

    const [isDTRModalVisible, setDTRModalVisible] = useState(false);
    const [isDropDownList, setDropDownList] = useState(null);
    const [isOthersExisting, setOthersExisting] = useState(null);

    const [isOtherRdssData, setOtherRdssData] = useState([]);
    const [isSubAsetVisible, setSubAsetVisible] = React.useState(false);
    const [isSubstationList, setSubstationList] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                onFatchDtrRdssData();
                onFatchOtherRdssData();
            }, 500);
        }
    }, [isFocused])

    useEffect(() => {
        onSetAssetPopup();
    }, [])

    const onFetchFeeder = () => {
        onLoading(true);
        let _data = {
            "form_id": 33,
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": data?.selectedDistricts,
            "geotag_type": "Achievement",
            "taging_for": data?.geotagModule,

            "fedeer_id": data?.parentData?.id,
            "fedeer_code": data?.parentData?.feeder_code,
        }

        Service.post(EndPoints.getFedderGeoTagList, _data, (response) => {

            onLoading(false);

            if (response._resultflag == 1) {
                setGenratName(response?.index_code);
                let arr = [];

                let strToNum = parseInt(response?.data[0]?.item_no) || 0;
                _lastFeederIndexNum = strToNum + 1;

                response?.data.forEach(item => {
                    arr.push({ title: item?.index_id, obj: item })
                })

                setLastGeotagAssetList(arr);
            }
            else
                showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    function onSetAssetPopup() {

        _scheme = data?.segmet?.scheme;
        _majorComponent = data?.segmet?.majorComponent;
        _oldUGorOH = data?.segmet?.UGorOH;
        _oldWhetherCableOrConductor = data?.segmet?.WhetherCableOrConductor;
        _oldSinglePhaseThreePhase = data?.segmet?.SinglePhaseThreePhase;
        _oldCircuitType = data?.segmet?.CircuitType;

        _oldLTLineVoltage = data?.segmet?.HTLineVoltage;
        _oldSpecifyTypeVoltage = data?.segmet?.SpecifyTypeVoltage;

        _oldTypeOfCable = data?.segmet?.TypeOfCable;
        _oldCableSize = data?.segmet?.CableSize;
        _olsSpecifyTypeOfCable = data?.segmet?.SpecifyTypeOfCable;
        _oldTypeOfConductor = data?.segmet?.TypeOfConductor;
        _olsSpecifyTypeOfConductor = data?.segmet?.SpecifyTypeOfConductor;
        _oldPoleStructur = data?.segmet?.PoleStructur;

        _poleType = data?.poleDetails?.poleType;
        _poleHeight = data?.poleDetails?.poleHeight;
        _poleSpecifyType = data?.poleDetails?.poleSpecifyType;
        _existingPole = data?.poleDetails?.existingPole;
        _branchPoint = data?.poleDetails?.branchPoint;


        onFindLocation();
    }

    function onFindLocation() {
        onLoading(true);
        Geocoder.from(data?.latitude, data?.longitude).then((json) => {
            var addressComponent = json.results[0]?.address_components[0]?.long_name;
            var addressComponent1 = json.results[0]?.address_components[1]?.long_name;
            var addressComponent2 = json.results[0]?.address_components[2]?.long_name;
            var addressComponent3 = json.results[0]?.address_components[3]?.long_name;
            var addressComponent4 = json.results[0]?.address_components[4]?.long_name;
            var addressComponent5 = json.results[0]?.address_components[5]?.long_name;

            var _data = {
                latitude: parseFloat(data?.latitude),
                longitude: parseFloat(data?.longitude),
                address: addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5,
                block: addressComponent,
                village: addressComponent3,
                date: moment(new Date()),
            };

            setTimeout(() => {
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(data?.latitude),
                    longitude: parseFloat(data?.longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }, 1000)

            setLocationDetail(_data);
            setAddress(_data?.address);

            setCurrentLongitude(data?.longitude)
            setCurrentLatitude(data?.latitude)

            if (data?.images.length > 0)
                onUploadImage1();
            if (data?.images.length > 1)
                onUploadImage2();
            if (data?.images.length > 3)
                onUploadImage3();

            onLoading(false);
        }).catch((error) => {
            Alert.alert(error.message);
            onLoading(false);
        });
    }

    const onGetUpdateLocation = (currentLatitude, currentLongitude) => {

        onLoading(true);
        Geocoder.from(currentLatitude, currentLongitude).then((json) => {
            var addressComponent = json.results[0]?.address_components[0]?.long_name;
            var addressComponent1 = json.results[0]?.address_components[1]?.long_name;
            var addressComponent2 = json.results[0]?.address_components[2]?.long_name;
            var addressComponent3 = json.results[0]?.address_components[3]?.long_name;
            var addressComponent4 = json.results[0]?.address_components[4]?.long_name;
            var addressComponent5 = json.results[0]?.address_components[5]?.long_name;

            var data = {
                latitude: parseFloat(currentLatitude),
                longitude: parseFloat(currentLongitude),
                address: addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5,
                block: addressComponent,
                village: addressComponent3,
                date: moment(new Date()),
            };

            setTimeout(() => {
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }, 1000)

            setLocationDetail(data);
            setAddress(data?.address);

            setCurrentLongitude(currentLongitude)
            setCurrentLatitude(currentLatitude)

            // setDefultLatitude(parseFloat(currentLatitude));
            // setDefultLongitude(parseFloat(currentLongitude));

            onLoading(false);
        }).catch((error) => {
            Alert.alert(error.message);
            onLoading(false);
        });
    };

    const onSelectAssetType = (value) => {

        setSelectedAssesId(null);
        setLastGeotagAssetList([]);
        setEstimatedDistance("");

        // select Asset Name
        setAssetTypePopup(value?.feeder_name);

        //Reset DTR-RDSS selected item
        setSelectedDtrGeotagList(null);

        // //Reset Other-RDSS
        // setOthersRDSS(null);

        //Reset OtherExisting
        setOthersExisting(null)

        // Reset DTR_exidtingPopup
        _dtrCapacity = null;
        _dtrVoltage = null;
        _modelofdtr = "";
        _manufacturingDT = null
        _installationDT = null
        _dtrMounting = null;
        _EngravedUnderRDSS = null;
        _noOffeeder = "";

        onFetchFeeder();

        switch (value?.feeder_name) {
            case "Pole":
                break;
            case "DTR-RDSS":
                onFatchDtrRdssData();
                break;
            case "DTR-Existing":
                onGetDtrSettingListDetails("DTR-Existing");
                break;
            case "Others-RDSS":
                onFatchOtherRdssData(false);
                onGetDtrSettingListDetails("Others-RDSS");
                break;
            case "Others-Existing":
                onGetDtrSettingListDetails("Others-Existing");
                break;
            case "Rout Point / Marker":
                break;
            case "LTDB":
                break;
            case "Feeder Pillar":
                break;
            default:
                break;
        }
    }

    const onFatchDtrRdssData = () => {

        onLoading(true);
        var responseData = [];

        Service.post(EndPoints.getGeoTagbyDistrict, { district_id: JSON.stringify(data?.selectedDistricts), feeder_id: data?.parentData?.id, }, (response) => {
            onLoading(false);

            if (response?._resultflag == true) {
                let arry = response?.data;

                arry.forEach((element) => {
                    let model = new DtrRdssData(element);
                    responseData.push(model);
                });

                setDtrRdssData(responseData)
            }
            else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }
    //Other RDSS data
    const onFatchOtherRdssData = () => {

        onLoading(true);
        var responseData = [];
        try {
            const body = { district_id: JSON.stringify(data?.selectedDistricts), feeder_id: data?.parentData?.id, "discom_id": UserManager.discom_id, };

            Service.post(EndPoints.getOtherGeotagListbyDistict, body, (response) => {
                onLoading(false);

                if (response?._resultflag == true) {
                    let arry = response?.data;

                    arry.forEach((element) => {
                        let model = new DtrRdssData(element);
                        responseData.push(model);
                    });

                    setOtherRdssData(responseData)
                }
                else showErrorToast(res.message);

            },
                (err) => {
                    onLoading(false);
                }
            );
        } catch (error) {
        } finally {
            onLoading(false);
        }

    }

    const onPressDTR = () => {
        props.navigation.navigate("DtrGeoGagList", {
            selectedDistricts: data?.selectedDistricts,
            selectedDistrictsName: data?.selectedDistrictsName,
            selectedOption: data?.geotagModule,
            achievementButtonState: true,
            selectedImageOption: "DTR",
            geotagType: "Achievement",
            sessionType: "Feeder",
        });
    }

    const onPressOther = () => {
        props.navigation.navigate("OtherListScreen", {
            selectedDistricts: { "title": data?.selectedDistrictsName, "value": data?.selectedDistricts, },
            selectedOption: data?.geotagModule,
            achievementButtonState: "Achievement",
            geotagType: "Achievement",
            sessionType: "FeederScreen",
        });
    }

    const onSelectDTRRdssItem = (value) => {
        setSelectedDtrGeotagList(value)
        onSelectPrecendingID1(value);
    }

    const onSelectPrecendingID1 = (value) => {
        if (isAssetTypePopup == "DTR-RDSS" || isAssetTypePopup == "Others-RDSS") {
            if (value?.latitude && value?.longitude && isSelectedAssesId?.obj?.latitude, isSelectedAssesId?.obj?.longitude) {
                setEstimatedDistance(AppUtil.getDistance((value?.latitude).toString(), (value?.longitude).toString(), (isSelectedAssesId?.obj?.latitude).toString(), (isSelectedAssesId?.obj?.longitude).toString()))
            }
        }
    }

    const onSelectPrecendingID = (value) => {
        setSelectedAssesId(value);

        if (isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS") {

            if (isCurrentLatitude != -1 && isCurrentLongitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
                setEstimatedDistance(AppUtil.getDistance(isCurrentLatitude, isCurrentLongitude, value?.obj?.latitude, value?.obj?.longitude))
            }
        }
        else {
            if (isSelectedDtrGeotag && isSelectedDtrGeotag && isSelectedDtrGeotag?.latitude != -1 && isSelectedDtrGeotag?.longitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
                setEstimatedDistance(AppUtil.getDistance(isSelectedDtrGeotag?.latitude, isSelectedDtrGeotag?.longitude, value?.obj?.latitude, value?.obj?.longitude))
            }
        }
    }

    function onUploadImage1() {

        if (isImagesUrl?.length == 3)
            return;

        var data1 = {
            uri: data?.images[0]?.uri,
            name: data?.images[0]?.fileName,
            type: data?.images[0]?.type,
        };

        let formData = new FormData();
        formData.append("image", data1);
        setLoader1(true);

        postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];
            setImageUploadUrl(images);
            setImage1(resp?.data?.imagepath);
            setLoader1(false);
        },
            (error) => {
                setLoader1(false);
            }
        );
    }

    function onUploadImage2() {
        if (isImagesUrl?.length == 3)
            return;

        var data1 = {
            uri: data?.images[1]?.uri,
            name: data?.images[1]?.fileName,
            type: data?.images[1]?.type,
        };

        let formData = new FormData();
        formData.append("image", data1);
        setLoader2(true);

        postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];
            setImageUploadUrl(images);
            setImage2(resp?.data?.imagepath);
            setLoader2(false);
        },
            (error) => {
                setLoader2(false);
            }
        );
    }

    function onUploadImage3() {

        if (isImagesUrl?.length == 3)
            return;

        var data1 = {
            uri: data?.images[2]?.uri,
            name: data?.images[2]?.fileName,
            type: data?.images[2]?.type,
        };

        let formData = new FormData();
        formData.append("image", data1);
        setLoader3(true);

        postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];
            setImageUploadUrl(images);
            setImage3(resp?.data?.imagepath);
            setLoader3(false);
        },
            (error) => {
                setLoader3(false);
            }
        );
    }

    const onGetDtrSettingListDetails = (type) => {

        if (isDropDownList != null) {
            if (type == "DTR-Existing")
                setDTRModalVisible(true)
            return
        }

        onLoading(true);
        Service.post(EndPoints.getSettingListData, {}, (res) => {
            onLoading(false);

            if (res.resultflag == "1" && res.data) {
                setDropDownList(res.data);
                if (type == "DTR-Existing")
                    setDTRModalVisible(true)
            }
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    function onSubmitGeotag() {
        let obj = null;

        if (_majorComponent == "") {
            Alert.alert("alert", "Please fill major components in HT Line or LT Line details")
            return
        }
        else if (isAssetTypePopup == null) {
            Alert.alert("alert", "Please Select Asset Type.")
            return
        }
        else if (isSelectedAssesId != null && isActualDistance == "") {
            Alert.alert("alert", "Please add Actual Distance.")
            return
        }
        else {
            // Pole
            if (isAssetTypePopup == "Pole") {
                if (isLocationDetail == null) {
                    Alert.alert("alert", "Please add Location.")
                    return;
                }
                else if (isImagesUrl.length == 0) {
                    Alert.alert("alert", "Please add Image.")
                    return;
                }
                obj = {
                    "form_id": 33,
                    "role_id": UserManager.role_id,
                    "user_id": UserManager.id,
                    "discom_id": UserManager.discom_id,
                    "district_id": data?.selectedDistricts,
                    "geotag_type": "Achievement",
                    "taging_for": data?.geotagModule,
                    "item_no": "00" + _lastFeederIndexNum,
                    "task": "save",

                    "geotagData": {

                        "fedeer_id": [data?.parentData?.id],
                        "fedeer_code": [data?.parentData?.feeder_code],

                        "sl_lattitude": {
                            "item_no": "00" + _lastFeederIndexNum,
                            "s": isEstimatedDistance,
                            "estimatedDistance": isEstimatedDistance,
                            "actualDistance": isActualDistance,
                            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                            "remark": isRemark,

                            "index_id": isGenratName + AppUtil.generateUniqueKey(),
                            "asset_type": isAssetTypePopup,
                            "title": data?.parentData?.feeder_name,

                            "created_at": isLocationDetail?.date,
                            "latitude": isLocationDetail?.latitude,
                            "longitude": isLocationDetail?.longitude,
                            "address": isLocationDetail?.address,
                            "block": isLocationDetail?.block,
                            "village": isLocationDetail?.village,

                            "tag_by": UserManager.first_name + " " + UserManager.last_name,
                            "images": isImagesUrl,

                            type_of_segment: data?.selectedHtLtOption == "HT Line" ? "HTline" : "LTline",
                            selected_asset_type: isAssetTypePopup,

                            segmet: data?.selectedHtLtOption == "HT Line" ? {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                HTLineVoltage: _oldLTLineVoltage,
                                SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                PoleStructur: _oldPoleStructur,
                                CircuitType: _oldCircuitType,
                            } : {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                                CircuitType: _oldCircuitType,
                            },

                            poleDetails: {
                                poleType: _poleType,
                                poleHeight: _poleHeight,
                                poleSpecifyType: _poleSpecifyType,
                                existingPole: _existingPole,
                                branchPoint: _branchPoint,
                            },
                        },
                    },
                }
            }
            else if (isAssetTypePopup == "DTR-RDSS") {
                if (isDtrRdssData.length < 1) {
                    Alert.alert("alert", "Please add DTR.")
                    return
                }
                else if (isSelectedDtrGeotag == null) {
                    Alert.alert("alert", "Please Select Geotaged DTR under RDSS.")
                    return
                }

                obj = {
                    "form_id": 33,
                    "role_id": UserManager.role_id,
                    "user_id": UserManager.id,
                    "discom_id": UserManager.discom_id,
                    "district_id": data?.selectedDistricts,
                    "geotag_type": "Achievement",
                    "taging_for": data?.geotagModule,
                    "item_no": "00" + _lastFeederIndexNum,
                    "task": "save",

                    geotagData: {
                        "fedeer_id": [data?.parentData?.id],
                        "fedeer_code": [data?.parentData?.feeder_code],

                        sl_lattitude: {
                            "item_no": "00" + _lastFeederIndexNum,
                            "estimatedDistance": isEstimatedDistance,
                            "actualDistance": isActualDistance,
                            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                            "remark": isRemark,

                            title: isSelectedDtrGeotag?.title,
                            tag_by: isSelectedDtrGeotag?.tag_by,
                            "index_id": isGenratName + AppUtil.generateUniqueKey(),
                            latitude: isSelectedDtrGeotag?.latitude,
                            longitude: isSelectedDtrGeotag?.longitude,
                            address: isSelectedDtrGeotag?.address,
                            block: isSelectedDtrGeotag?.block,
                            village: isSelectedDtrGeotag?.village,
                            images: isSelectedDtrGeotag?.images,
                            created_at: isSelectedDtrGeotag?.created_at,
                            asset_type: isAssetTypePopup,
                            type_of_segment: data?.selectedHtLtOption == "HT Line" ? "HTline" : "LTline",
                            selected_asset_type: isAssetTypePopup,
                            dtr_existing: isSelectedDtrGeotag?.dtr_details,

                            segmet: data?.selectedHtLtOption == "HT Line" ? {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                HTLineVoltage: _oldLTLineVoltage,
                                SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                PoleStructur: _oldPoleStructur,
                                CircuitType: _oldCircuitType,
                            } : {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                                CircuitType: _oldCircuitType,
                            },

                            poleDetails: {
                                poleType: _poleType,
                                poleHeight: _poleHeight,
                                poleSpecifyType: _poleSpecifyType,
                                existingPole: _existingPole,
                                branchPoint: _branchPoint,
                            },
                        },
                    },
                }
            }
            else if (isAssetTypePopup == "DTR-Existing") {

                if (_dtrCapacity == null || _dtrVoltage == null || _modelofdtr == "" || _manufacturingDT == null || _installationDT == null || _dtrMounting == null || _EngravedUnderRDSS == null || _noOffeeder == "") {
                    // if (_dtrCapacity == null || _dtrVoltage == null) {
                    Alert.alert("alert", "Please add existing DTR details.")
                    return
                }
                else if (isLocationDetail == null) {
                    Alert.alert("alert", "Please add Location.")
                    return
                }
                else if (isImagesUrl.length == 0) {
                    Alert.alert("alert", "Please add Image.")
                    return
                }
                obj = {
                    "form_id": 33,
                    "role_id": UserManager.role_id,
                    "user_id": UserManager.id,
                    "discom_id": UserManager.discom_id,
                    "district_id": data?.selectedDistricts,
                    "geotag_type": "Achievement",
                    "taging_for": data?.geotagModule,
                    "item_no": "00" + _lastFeederIndexNum,
                    "task": "save",

                    "geotagData": {
                        "fedeer_id": [data?.parentData?.id],
                        "fedeer_code": [data?.parentData?.feeder_code],

                        "sl_lattitude": {
                            "item_no": "00" + _lastFeederIndexNum,
                            estimatedDistance: isEstimatedDistance,
                            actualDistance: isActualDistance,

                            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                            "remark": isRemark,
                            "index_id": isGenratName + AppUtil.generateUniqueKey(),
                            "asset_type": isAssetTypePopup,

                            "title": data?.parentData?.feeder_name,
                            "created_at": isLocationDetail?.date,
                            "latitude": isLocationDetail?.latitude,
                            "longitude": isLocationDetail?.longitude,
                            "address": isLocationDetail?.address,
                            "block": isLocationDetail?.block,
                            "village": isLocationDetail?.village,
                            "images": isImagesUrl,
                            "tag_by": UserManager.first_name + " " + UserManager.last_name,

                            type_of_segment: data?.selectedHtLtOption == "HT Line" ? "HTline" : "LTline",
                            selected_asset_type: isAssetTypePopup,

                            segmet: data?.selectedHtLtOption == "HT Line" ? {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                HTLineVoltage: _oldLTLineVoltage,
                                SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                PoleStructur: _oldPoleStructur,
                                CircuitType: _oldCircuitType,
                            } : {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                                CircuitType: _oldCircuitType,
                            },

                            poleDetails: {
                                poleType: _poleType,
                                poleHeight: _poleHeight,
                                poleSpecifyType: _poleSpecifyType,
                                existingPole: _existingPole,
                                branchPoint: _branchPoint,
                            },

                            dtr_existing: {
                                dtr_capacity: _dtrCapacity,
                                dtr_voltage_ratio: _dtrVoltage,
                                dtr_model: _modelofdtr,
                                dtr_manufacturing_month_year: _manufacturingDT,
                                dtr_year_installation: _installationDT,
                                dtr_mounting: _dtrMounting,
                                engravedUnderRDSS: _EngravedUnderRDSS,
                                dtr_number_of_dtr: _noOffeeder,
                            }
                        },
                    },
                }
            }
            //Other -RDSS
            else if (isAssetTypePopup == "Others-RDSS") {

                if (isDtrRdssData.length < 1) {
                    Alert.alert("alert", "Please add Others-RDSS.")
                    return
                }
                else if (isSelectedDtrGeotag == null) {
                    Alert.alert("alert", "Please Select Geotagged Other under RDSS.")
                    return
                }
                else if (isOthersExisting == null) {
                    Alert.alert("alert", "Please Select Existing Asset Type")
                    return
                }
                else if (_poleType == "" || _poleHeight == "" || _existingPole == "" || _branchPoint == "") {
                    Alert.alert("alert", "Please add Pole Details")
                    return
                }
                else if (_poleType == "Others" && _poleSpecifyType == "") {
                    Alert.alert("alert", "Please add Pole Details")
                    return
                }
                else if (isOthersExisting == "Circuit Breaker" && (_popdata.SubstationName == "" || _popdata.Make == "" || _popdata.CircuitType == "" || _popdata.Voltage == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "Capacitor Banks" && (_popdata.Location == "" || _popdata.Make == "" || _popdata.Rating == "" || _popdata.LinePosition == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "RMU" && (_popdata.RMUType == "" || _popdata.RMUCBType == "" || _popdata.Make == "" || _popdata.ScadaCompatibility == "" || _popdata.RMULocationName == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "RTU" && (_popdata.RMULocationName == "" || _popdata.Make == "" || _popdata.ProtocolSupported == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "FRTU" && (_popdata.FRTULocationName == "" || _popdata.Make == "" || _popdata.ProtocolSupported == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }

                obj = {
                    "role_id": UserManager.role_id,
                    "user_id": UserManager.id,
                    "discom_id": UserManager.discom_id,
                    "district_id": data?.selectedDistricts,
                    "geotag_type": "Achievement",
                    "taging_for": data?.geotagModule,
                    "item_no": "00" + _lastFeederIndexNum,
                    "task": "save",

                    geotagData: {
                        "fedeer_id": [data?.parentData?.id],
                        "fedeer_code": [data?.parentData?.feeder_code],

                        sl_lattitude: {
                            "item_no": "00" + _lastFeederIndexNum,
                            "estimatedDistance": isEstimatedDistance,
                            "actualDistance": isActualDistance,
                            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                            "remark": isRemark,

                            index_id: isGenratName + AppUtil.generateUniqueKey(),
                            asset_type: isAssetTypePopup,
                            title: isSelectedDtrGeotag?.title,
                            latitude: isSelectedDtrGeotag?.latitude,
                            longitude: isSelectedDtrGeotag?.longitude,
                            address: isSelectedDtrGeotag?.address,
                            block: isSelectedDtrGeotag?.block,
                            village: isSelectedDtrGeotag?.village,
                            tag_by: isSelectedDtrGeotag?.tag_by,
                            images: isSelectedDtrGeotag?.images,
                            created_at: isSelectedDtrGeotag?.created_at,
                            type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                            selected_asset_type: isAssetTypePopup,
                            otherExistingAssetType: isOthersExisting,
                            dtr_existing: isSelectedDtrGeotag?.dtr_details,

                            sub_asset_attributes: _popdata,
                            sub_asset_type: isOthersExisting,

                            segmet: isSelectedLTHTOption == "HT Line" ? {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                HTLineVoltage: _oldLTLineVoltage,
                                SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                PoleStructur: _oldPoleStructur,
                                CircuitType: _oldCircuitType,
                            } : {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                                CircuitType: _oldCircuitType,
                            },

                            poleDetails: {
                                poleType: _poleType,
                                poleHeight: _poleHeight,
                                poleSpecifyType: _poleSpecifyType,
                                existingPole: _existingPole,
                                branchPoint: _branchPoint,
                            },
                        },
                    },
                }

            }
            // Other-Existing
            else if (isAssetTypePopup == "Others-Existing") {
                if (isOthersExisting == null) {
                    Alert.alert("alert", "Please Select Existing Asset Type")
                    return
                }
                else if (isImagesUrl.length == 0) {
                    Alert.alert("alert", "Please add Image.")
                    return;
                }
                else if (isOthersExisting == "Circuit Breaker" && (_popdata.SubstationName == "" || _popdata.Make == "" || _popdata.CircuitType == "" || _popdata.Voltage == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "Capacitor Banks" && (_popdata.Location == "" || _popdata.Make == "" || _popdata.Rating == "" || _popdata.LinePosition == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "RMU" && (_popdata.RMUType == "" || _popdata.RMUCBType == "" || _popdata.Make == "" || _popdata.ScadaCompatibility == "" || _popdata.RMULocationName == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "RTU" && (_popdata.RMULocationName == "" || _popdata.Make == "" || _popdata.ProtocolSupported == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }
                else if (isOthersExisting == "FRTU" && (_popdata.FRTULocationName == "" || _popdata.Make == "" || _popdata.ProtocolSupported == "")) {
                    Alert.alert("Alert", "Please add Asset Attributes");
                    return
                }

                obj = {

                    "role_id": UserManager.role_id,
                    "user_id": UserManager.id,
                    "discom_id": UserManager.discom_id,
                    "district_id": data?.selectedDistricts,
                    "geotag_type": "Achievement",
                    "taging_for": data?.geotagModule,
                    "item_no": "00" + _lastFeederIndexNum,
                    "task": "save",

                    geotagData: {
                        "fedeer_id": [data?.parentData?.id],
                        "fedeer_code": [data?.parentData?.feeder_code],

                        sl_lattitude: {
                            "item_no": "00" + _lastFeederIndexNum,
                            "estimatedDistance": isEstimatedDistance,
                            "actualDistance": isActualDistance,

                            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                            "remark": isRemark,

                            "index_id": isGenratName + AppUtil.generateUniqueKey(),
                            "asset_type": isAssetTypePopup,
                            "title": data?.parentData?.feeder_name,
                            "latitude": isLocationDetail?.latitude,
                            "longitude": isLocationDetail?.longitude,
                            "address": isLocationDetail?.address,
                            "block": isLocationDetail?.block,
                            "village": isLocationDetail?.village,
                            "tag_by": UserManager.first_name + " " + UserManager.last_name,
                            "images": isImagesUrl,
                            created_at: isLocationDetail?.date,
                            type_of_segment: data?.selectedHtLtOption == "HT Line" ? "HTline" : "LTline",
                            selected_asset_type: isAssetTypePopup,
                            otherExistingAssetType: isOthersExisting,

                            sub_asset_attributes: _popdata,
                            sub_asset_type: isOthersExisting,

                            segmet: data?.selectedHtLtOption == "HT Line" ? {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                HTLineVoltage: _oldLTLineVoltage,
                                SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                PoleStructur: _oldPoleStructur,
                                CircuitType: _oldCircuitType,
                            } : {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                                CircuitType: _oldCircuitType,
                            },

                            poleDetails: {
                                poleType: _poleType,
                                poleHeight: _poleHeight,
                                poleSpecifyType: _poleSpecifyType,
                                existingPole: _existingPole,
                                branchPoint: _branchPoint,
                            },
                        },
                    },
                }
            }
            else if (isAssetTypePopup == "Rout Point / Marker" || isAssetTypePopup == "LTDB" || isAssetTypePopup == "Feeder Pillar") {
                if (isLocationDetail == null) {
                    Alert.alert("alert", "Please add Location.")
                    return;
                }
                else if (isImagesUrl.length == 0) {
                    Alert.alert("alert", "Please add Image.")
                    return;
                }
                obj = {
                    "form_id": 33,
                    "role_id": UserManager.role_id,
                    "user_id": UserManager.id,
                    "discom_id": UserManager.discom_id,
                    "district_id": data?.selectedDistricts,
                    "geotag_type": "Achievement",
                    "taging_for": data?.geotagModule,
                    "item_no": "00" + _lastFeederIndexNum,
                    "task": "save",

                    "geotagData": {

                        "fedeer_id": [data?.parentData?.id],
                        "fedeer_code": [data?.parentData?.feeder_code],

                        "sl_lattitude": {
                            "item_no": "00" + _lastFeederIndexNum,
                            "estimatedDistance": isEstimatedDistance,
                            "actualDistance": isActualDistance,
                            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                            "remark": isRemark,
                            "index_id": isGenratName + AppUtil.generateUniqueKey(),
                            "asset_type": isAssetTypePopup,
                            "title": data?.parentData?.feeder_name,
                            "created_at": isLocationDetail?.date,
                            "latitude": isLocationDetail?.latitude,
                            "longitude": isLocationDetail?.longitude,
                            "address": isLocationDetail?.address,
                            "block": isLocationDetail?.block,
                            "village": isLocationDetail?.village,
                            "tag_by": UserManager.first_name + " " + UserManager.last_name,
                            "images": isImagesUrl,

                            type_of_segment: data?.selectedHtLtOption == "HT Line" ? "HTline" : "LTline",
                            selected_asset_type: isAssetTypePopup,

                            segmet: data?.selectedHtLtOption == "HT Line" ? {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                HTLineVoltage: _oldLTLineVoltage,
                                SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                PoleStructur: _oldPoleStructur,
                                CircuitType: _oldCircuitType,
                            } : {
                                scheme: _scheme,
                                majorComponent: _majorComponent,
                                UGorOH: _oldUGorOH,
                                WhetherCableOrConductor: _oldWhetherCableOrConductor,
                                TypeOfCable: _oldTypeOfCable,
                                CableSize: _oldCableSize,
                                SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                                TypeOfConductor: _oldTypeOfConductor,
                                SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                                SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                                CircuitType: _oldCircuitType,
                            },
                        },
                    },
                }
            }
        }

        onSaveGeota(obj);
    }

    const onSaveGeota = (obj) => {

        onLoading(true);
        Service.post(EndPoints.saveFeeder, obj, (res) => {
            onLoading(false);
            if (res._resultflag) {

                Alert.alert('', res.message, [
                    {
                        text: 'OK', onPress: () => {
                            _scheme = "";
                            _majorComponent = "";
                            _oldUGorOH = "";
                            _oldWhetherCableOrConductor = "";
                            _oldSinglePhaseThreePhase = "";
                            _oldCircuitType = "";
                            _oldLTLineVoltage = "";
                            _oldSpecifyTypeVoltage = "";
                            _oldTypeOfCable = "";
                            _oldCableSize = "";
                            _olsSpecifyTypeOfCable = "";
                            _oldTypeOfConductor = "";
                            _olsSpecifyTypeOfConductor = "";
                            _oldPoleStructur = "";

                            _dtrCapacity = null;
                            _dtrVoltage = null;
                            _modelofdtr = "";
                            _manufacturingDT = null
                            _installationDT = null
                            _dtrMounting = null;
                            _EngravedUnderRDSS = null;
                            _noOffeeder = "";

                            _poleType = "";
                            _poleHeight = "";
                            _poleSpecifyType = "";
                            _existingPole = "";
                            _branchPoint = "";

                            setLastGeotagAssetList([]);
                            setLocationDetail(null);
                            setImageUploadUrl([]);
                            onFetchFeeder();
                            setSelectedAssesId(null);
                            setCurrentLongitude(-1);
                            setCurrentLatitude(-1);

                            SqlData.DeleteData(data?.id, `DELETE FROM SaveFeederGeotagTable WHERE id = ?;`, (response) => {
                                props.navigation.goBack()
                            }, (error) => {
                                props.navigation.goBack()
                            });
                            // props.navigation.goBack()

                        }
                    },
                ]);

            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );

    }

    return (
        <SafeAreaView style={PageStyle.mainView}>

            <Header
                title="HT Line / LT Line Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
            />

            <KeyboardAwareScrollView>
                <View style={PageStyle.title}>
                    <Text style={PageStyle.text}>
                        {data?.parentData?.feeder_name}
                    </Text>
                </View>

                <View style={PageStyle.modifySearch}>
                    <Text style={PageStyle.modifySearchText}>
                        {Labels.generalDetails}
                    </Text>
                </View>

                <View style={PageStyle.innerContainer}>
                    <Text style={PageStyle.dropSelectText}>{Labels.HtLtLineTitle}</Text>
                    <TouchableOpacity style={PageStyle.heading} onPress={() => data?.selectedHtLtOption == "HT Line" ? setHTModalVisible(true) : setLTModalVisible(true)}>
                        <View style={PageStyle.textView}>
                            <Text style={PageStyle.headingText}>{data?.selectedHtLtOption}</Text>
                        </View>
                        <View style={PageStyle.icnView}>
                            <IcnDetails />
                        </View>
                    </TouchableOpacity>

                    {isAssetTypePopup != "Rout Point / Marker" && isAssetTypePopup != "LTDB" && isAssetTypePopup != "Feeder Pillar" &&
                        <View style={PageStyle.btnDTRSubmit}>
                            <Text style={PageStyle.txtAddDTRRDSS}>{Labels.ProvidePoleDetails}</Text>
                            <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { setPollDetailsVisible(true) }}>
                                <Text style={PageStyle.txtAddDTR}>{Labels.Details}</Text>
                            </TouchableOpacity>
                        </View>}

                    <View style={{ marginTop: 10 }}>
                        <AssetDropDown title={"Asset Type*"} data={AssetType} onSelectedSevice={(value) => { onSelectAssetType(value); }} />
                    </View>

                    {
                        isAssetTypePopup === "DTR-Existing" &&
                        <TouchableOpacity style={PageStyle.heading} onPress={() => onGetDtrSettingListDetails("DTR-Existing")}>
                            <View style={PageStyle.textView}>
                                <Text style={PageStyle.headingText}>{"DTR-Existing Popup"}</Text>
                            </View>
                            <View style={PageStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }

                    {
                        (isAssetTypePopup === "Others-Existing" || isAssetTypePopup === "Others-RDSS") && isDropDownList != null &&
                        <View style={{ marginTop: 10 }}>
                            <SingleDropdownList title={"Select Asset Type*"} data={isDropDownList?.other_rdss_asset?.asset_type}
                                onSelectedSevice={(value) => { setOthersExisting(value.title) }} />
                        </View>
                    }

                    {
                        (isAssetTypePopup === "Others-Existing" || isAssetTypePopup === "Others-RDSS") && isDropDownList != null && isOthersExisting != null &&
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
                        isAssetTypePopup === "Others-RDSS" && isOtherRdssData.length > 0 ?
                            <>
                                <View style={{ marginTop: 10 }}>
                                    <SingleDropdownList title={"Others – RDSS Asset Details*"} data={isOtherRdssData} onSelectedSevice={(value) => { setSelectedDtrGeotagList(value) }} />
                                </View>

                                <View style={PageStyle.btnDTRSubmit}>
                                    <Text style={PageStyle.txtAddDTRRDSS}>{Labels.AddOthersRDSS}</Text>
                                    <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { onPressOther() }}>
                                        <Text style={PageStyle.txtAddDTR}>{Labels.Others}</Text>
                                    </TouchableOpacity>
                                </View>

                            </>
                            :
                            isAssetTypePopup === "Others-RDSS" &&
                            <View style={PageStyle.btnDTRSubmit}>
                                <Text style={PageStyle.txtAddDTRRDSS}>{Labels.AddOthersRDSS}</Text>
                                <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { onPressOther() }}>
                                    <Text style={PageStyle.txtAddDTR}>{Labels.Others}</Text>
                                </TouchableOpacity>
                            </View>
                    }




                    {/* for DTR-RDSS */}
                    {
                        isAssetTypePopup === "DTR-RDSS" && isDtrRdssData.length > 0 ?
                            <>
                                <View style={{ marginTop: 10 }}>
                                    <SingleDropdownList title={"Select Geotagged DTR under RDSS*"} data={isDtrRdssData} onSelectedSevice={(value) => { onSelectDTRRdssItem(value) }} />
                                </View>
                                <View style={PageStyle.btnDTRSubmit}>
                                    <Text style={PageStyle.txtAddDTRRDSS}>{Labels.AddAnotherDTRRDSS}</Text>
                                    <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { onPressDTR() }}>
                                        <Text style={PageStyle.txtAddDTR}>{Labels.AddDTR}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            isAssetTypePopup === "DTR-RDSS" &&
                            <View style={PageStyle.btnDTRSubmit}>
                                <Text style={PageStyle.txtAddDTRRDSS}>{Labels.AddDTRRDSS}</Text>
                                <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { onPressDTR() }}>
                                    <Text style={PageStyle.txtAddDTR}>{Labels.AddDTR}</Text>
                                </TouchableOpacity>
                            </View>
                    }

                    {isSelectedDtrGeotag != null && (isAssetTypePopup === "DTR-RDSS" || isAssetTypePopup === "Others-RDSS") &&
                        <>
                            <Text style={[PageStyle.txtAddDTRRDSS, { marginTop: 10 }]}>{Labels.GeotaggedDTRassetID}</Text>
                            <TestCommonCard
                                key={0}
                                title={isSelectedDtrGeotag.title}
                                index_id={isSelectedDtrGeotag.index_id}
                                created_by_date={isSelectedDtrGeotag.created_at ? isSelectedDtrGeotag.created_at : isSelectedDtrGeotag.updated_at}
                                created_by_time={isSelectedDtrGeotag.created_at ? isSelectedDtrGeotag.created_at : isSelectedDtrGeotag.updated_at}
                                address={isSelectedDtrGeotag.block + " " + isSelectedDtrGeotag.address}
                                latitude={isSelectedDtrGeotag.latitude}
                                longitude={isSelectedDtrGeotag.longitude}
                                tag_by={isSelectedDtrGeotag.tag_by}
                                images={isSelectedDtrGeotag.images}
                                imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                                status={"false"}
                            />
                        </>
                    }

                    {
                        isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                        <>
                            <LocationBar
                                title="Complete Address*"
                                icon={<IcnAddress />}
                                getdata={isAddress}
                                setData={(text) => null}
                                handlePress={() => setLocationPopupVisible(true)}
                            />

                            <InputFields3
                                title1="Block"
                                value1={isLocationDetail?.block}
                                title2="Town/City/State"
                                value2={isLocationDetail?.village}
                            />
                        </>
                    }

                    {
                        isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                        <View style={PageStyle.mapContener}>
                            <MapView style={PageStyle.mapView}
                                ref={mapRef}
                                initialRegion={isInitialRegion}>
                                <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
                                </Marker>
                            </MapView>
                        </View>
                    }

                    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    {isAssetTypePopup != null && isLastGeotagAssetList.length > 0 &&
                        <>
                            <View style={PageStyle.marginTop} />
                            <SingleDropdownListWithIcn icn={""} title={"Select preceding geotagged asset ID"} data={isLastGeotagAssetList}
                                onSelectedSevice={(value) => { onSelectPrecendingID(value) }} />


                            {isSelectedAssesId != null &&
                                <>
                                    <Text style={PageStyle.fieldTitle}>Estimated aerial length of line from preceding geotagged asset ID (CMtrs.)</Text>
                                    <Text style={PageStyle.textInput}>{isEstimatedDistance}</Text>
                                    <Text style={PageStyle.fieldTitle}>Actual length of line from preceding geotagged asset ID (CMtrs.)*</Text>
                                    <View style={PageStyle.container1}>
                                        <TextInput
                                            maxLength={3}
                                            value={isActualDistance}
                                            editable={true}
                                            style={PageStyle.enabledField}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setActualDistance(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",<> \{\}\[\]\\\/]/gi, ''))}
                                        />
                                    </View>
                                </>
                            }

                        </>
                    }

                    <Text style={PageStyle.fieldTitle}>Remarks</Text>
                    <View style={PageStyle.container1}>
                        <TextInput
                            maxLength={70}
                            value={isRemark}
                            editable={true}
                            style={PageStyle.enabledField}
                            onChangeText={(text) => setRemark(text)}
                        />
                    </View>

                    {isAssetTypePopup != null && isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                        <View style={PageStyle.imageContainer}>

                            {isImages1 ? (

                                <View style={PageStyle.imagebtn}>
                                    <Image source={{ uri: image_base_url + isImages1 }} style={PageStyle.image} />
                                </View>
                            )
                                :
                                data?.images.length > 0 &&
                                <View style={PageStyle.imagebtn}>
                                    <Image source={{ uri: data?.images[0]?.uri }} style={PageStyle.image} />

                                    <TouchableOpacity style={PageStyle.imageUpload} onPress={() => onUploadImage1()}>
                                        {isLoader1 ?
                                            <ActivityIndicator size={"large"} />
                                            :
                                            <IcnUpload />
                                        }
                                    </TouchableOpacity>
                                </View>

                            }
                            {isImages2 ? (

                                <View style={PageStyle.imagebtn}>
                                    <Image source={{ uri: image_base_url + isImages2 }} style={PageStyle.image} />
                                </View>
                            )
                                :
                                data?.images.length > 1 &&
                                <View style={PageStyle.imagebtn}>
                                    <Image source={{ uri: data?.images[1]?.uri }} style={PageStyle.image} />
                                    <TouchableOpacity style={PageStyle.imageUpload} onPress={() => onUploadImage2()}>
                                        {isLoader2 ?
                                            <ActivityIndicator size={"large"} />
                                            :
                                            <IcnUpload />
                                        }
                                    </TouchableOpacity>
                                </View>
                            }
                            {isImages3 ? (

                                <View style={PageStyle.imagebtn}>
                                    <Image source={{ uri: image_base_url + isImages3 }} style={PageStyle.image} />
                                </View>
                            )
                                :
                                data?.images.length > 2 &&
                                <View style={PageStyle.imagebtn}>
                                    <Image source={{ uri: data?.images[2]?.uri }} style={PageStyle.image} />
                                    <TouchableOpacity style={PageStyle.imageUpload} onPress={() => onUploadImage3()}>
                                        {isLoader3 ?
                                            <ActivityIndicator size={"large"} />
                                            :
                                            <IcnUpload />
                                        }
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    }

                    <SubmitBtn title="Submit" onPress={() => { onSubmitGeotag() }} />
                </View>



            </KeyboardAwareScrollView>


            <LTlineOfflineEditPopup
                handleClose={() => setLTModalVisible(false)}
                isModalVisible={isLTModalVisible}

                oldMajorComponent={_majorComponent}
                onSelectMajorComponent={(data) => _majorComponent = data}
                oldScheme={_scheme}
                oldUGorOH={_oldUGorOH}
                oldWhetherCableOrConductor={_oldWhetherCableOrConductor}
                oldTypeOfCable={_oldTypeOfCable}
                oldCableSize={_oldCableSize}
                olsSpecifyTypeOfCable={_olsSpecifyTypeOfCable}
                oldTypeOfConductor={_oldTypeOfConductor}
                olsSpecifyTypeOfConductor={_olsSpecifyTypeOfConductor}
                oldSinglePhaseThreePhase={_oldSinglePhaseThreePhase}
                oldCircuitType={_oldCircuitType}

                saveObj={() => { setLTModalVisible(false) }}
            />

            <HTlineOfflineEditPopup
                handleClose={() => setHTModalVisible(false)}
                isModalVisible={isHTModalVisible}
                oldMajorComponent={_majorComponent}
                oldScheme={_scheme}
                oldUGorOH={_oldUGorOH}
                oldLTLineVoltage={_oldLTLineVoltage}
                oldSpecifyTypeVoltage={_oldSpecifyTypeVoltage}
                oldWhetherCableOrConductor={_oldWhetherCableOrConductor}
                oldTypeOfCable={_oldTypeOfCable}
                oldCableSize={_oldCableSize}
                olsSpecifyTypeOfCable={_olsSpecifyTypeOfCable}
                oldTypeOfConductor={_oldTypeOfConductor}
                olsSpecifyTypeOfConductor={_olsSpecifyTypeOfConductor}
                oldPoleStructur={_oldPoleStructur}
                oldCircuitType={_oldCircuitType}
                saveObj={() => { setHTModalVisible(false); }}
            />

            <PollOfflineEditDetails
                handleClose={() => setPollDetailsVisible(false)}
                isModalVisible={isPollDetailsVisible}

                option={false}

                oldPolltype={_poleType}
                oldPoleHeight={_poleHeight}

                oldPoleSpecifyType={_poleSpecifyType}

                oldExistingPole={_existingPole}
                onSelectExistingPole={(data) => _existingPole = data}

                oldBranchPoint={_branchPoint}
                onSelectBranchPoint={(data) => _branchPoint = data}

            />
            <DtrModalView
                handleClose={() => setDTRModalVisible(false)}
                isModalVisible={isDTRModalVisible}
                list1={isDropDownList}

                oldCapacity={_dtrCapacity}
                getCapacitye={(data) => _dtrCapacity = data}

                oldVoltage={_dtrVoltage}
                getVoltage={(data) => _dtrVoltage = data}

                modelofDTR={_modelofdtr}
                getmodelofDTR={(data) => _modelofdtr = data}

                manufacturingDT={_manufacturingDT}
                getmanufacturingDT={(data) => _manufacturingDT = data}

                installationDT={_installationDT}
                getinstallationDT={(data) => { _installationDT = data; }}

                oldmounting={_dtrMounting}
                getMounying={(data) => { _dtrMounting = data }}

                oldEngravedUnderRDSS={_EngravedUnderRDSS}
                onEngravedUnderRDSS={(data) => { _EngravedUnderRDSS = data }}

                noonFeeder={_noOffeeder}
                getnoonFeeder={(data) => _noOffeeder = data}
            />

            <LocationPopup
                isVisible={isLocationPopupVisible}
                handleClose={() => setLocationPopupVisible(false)}
                lett={isCurrentLatitude}
                long={isCurrentLongitude}
                finalPont={(data) => onGetUpdateLocation(data?.latitude, data?.longitude)}
            />
            <OtherSubAssetPop handleClose={() => setSubAsetVisible(false)} isModalVisible={isSubAsetVisible}
                type={isOthersExisting}
                substationList={isSubstationList}
                newData={(data) => { _popdata = data }}
                oldData={_popdata} />
        </SafeAreaView>
    );
};

// define your styles
const PageStyle = StyleSheet.create({
    marginTop: {
        marginTop: 10,
    },
    mainView: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },
    title: {
        backgroundColor: Colors.white,
        padding: AppUtil.getHP(1.5),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: 500,
        color: "black"
    },
    btnSkip: { height: AppUtil.getHP(4), width: AppUtil.getWP(20), borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: Colors.orange },
    txtSkip: { fontSize: AppUtil.getHP(2), color: Colors.white },
    modifySearch: {
        flexDirection: "row",
        padding: AppUtil.getHP(1.5),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.disableViewColor,
    },
    modifySearchText: {
        color: "black",
        width: "90%",
        fontWeight: 500,
        fontSize: 16,
    },
    innerContainer: {
        marginHorizontal: AppUtil.getWP(5),
        borderRadius: 10,
        marginBottom: AppUtil.getHP(2),
    },
    dropSelectText: {
        fontSize: 14,
        color: Colors.darkBlack,
        fontWeight: "500",
        alignSelf: "flex-start", // Align the title to the left
        marginBottom: AppUtil.getHP(1),
        marginTop: AppUtil.getHP(1),
    },
    heading: {
        marginTop: AppUtil.getHP(2),
        paddingVertical: AppUtil.getHP(1.5),
        borderRadius: 5,
        backgroundColor: Colors.beige,
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    heading: {
        marginTop: AppUtil.getHP(2),
        paddingVertical: AppUtil.getHP(1.5),
        borderRadius: 5,
        backgroundColor: Colors.beige,
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textView: {
        width: "85%",
    },
    headingText: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.darkBlack,
        marginLeft: AppUtil.getWP(3),
    },
    icnView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
    },
    btnDTRSubmit: {
        height: AppUtil.getHP(7),
        padding: AppUtil.getHP(1),
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 10,
    },
    txtAddDTRRDSS: {
        fontSize: 14,
        color: Colors.darkBlack,
        fontWeight: "500",
    },
    btnDTRClick: {
        width: "25%",
        height: AppUtil.getHP(5),
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 2,
    },
    txtAddDTR: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: "500",
    },
    fieldTitle: {
        fontSize: 14,
        color: Colors.darkBlack,
        fontWeight: "500",
        alignSelf: "flex-start",
        marginTop: AppUtil.getHP(1),
        marginBottom: AppUtil.getHP(1),
    },
    enabledField: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 45,
        color: Colors.darkBlack,
        width: "100%",
        paddingHorizontal: AppUtil.getWP(3),
    },
    textInput: {
        backgroundColor: Colors.disableViewColor,
        borderRadius: 5,
        height: AppUtil.getHP(6),
        width: "100%",
        padding: AppUtil.getWP(2),
        color: Colors.darkBlack,
    },
    mapContener: { width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), marginBottom: AppUtil.getHP(1), borderWidth: 0.5, borderColor: Colors.orange, },
    mapView: { width: "100%", height: "100%" },
    imageContainer: {
        flexDirection: "row",
        marginVertical: AppUtil.getHP(2),
    },
    imageUpload: {
        height: AppUtil.getHP(10),
        width: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.whaiteTansColor,
        position: 'absolute'
    },
    imagebtn: {
        marginHorizontal: AppUtil.getWP(1),
        width: "31%",
        height: AppUtil.getHP(10),
        borderRadius: 10,
        backgroundColor: Colors.white,
    },
    image: {
        width: "100%",
        height: AppUtil.getHP(10),
        borderRadius: 10,

    },
    titleText: { fontSize: 14, color: Colors.darkBlack, marginTop: AppUtil.getHP(1), marginBottom: AppUtil.getHP(0.7), fontFamily: Fonts.RobotoMedium },
    textInput1: { width: "100%", padding: 10, backgroundColor: Colors.disableViewColor, borderRadius: 5, color: Colors.darkBlack, },

});

//make this component available to the app
export default memo(OffLineAddFeederGeneralAssetDetailFirstOption);
