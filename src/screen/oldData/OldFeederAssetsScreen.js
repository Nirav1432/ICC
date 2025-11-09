// Other by Khasiya Sagar.

// React
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import React, { act, memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, useIsFocused, useRoute } from "@react-navigation/native";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";

import { AssetType, LTHToptions } from "../../utils/CardData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Labels } from "../../utils/Labels";
import { onLoading } from "../../../App";
import { EndPoints } from "../../service/Endpoints";
import { Service } from "../../service/Service";
import { image_base_url } from "../../service/appConfig";
import { UserManager } from "../../manager/UserManager";
import { Colors } from "../../utils/Colors";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { AppUtil } from "../../utils/AppUtil";

import Header from "../../components/header/Header";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import IcnDetails from "../../assets/svg/IcnDetails";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import SingleDropdownListWithIcn from "../../components/singleselectlist/SingleDropdownListWithIcn";
import TestCommonCard from "../../components/commonCards/TestCommonCard";
import PolDetailePopup from "../Approval/PolDetailePopup";
import IcnFeeder from "../../assets/svg/IcnFeeder";
import IcnPowerTransformers from "../../assets/svg/IcnPowerTransformers";
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import IcnPole from "../../assets/svg/IcnPole";
import IcnSubstations from "../../assets/svg/IcnSubstations";
import LTLinePopup from "../../components/LTLinePopup";
import DtrRdssData from "../../model/DtrRdssData";
import PollDetails from "../../components/PollDetails";
import DtrModalView from "../../components/dtrModal/DtrModalView";
import HTLinePopupSingaleValue from "../../components/HTLinePopupSingaleValue";
import AssetDropDown from "../../components/dde/dropdownNewList/assetDropDown";
import OtherSubAssetPop from "../../components/OtherSubAssetPop";
import InputFields3 from "../../components/inputFields/InputFields3";
import IcnRoutPointMarker from "../../assets/svg/IcnRoutPointMarker";
import { Fonts } from "../../utils/Fonts";
import LocationBarDisble from "../../components/locationBar/LocationBarDisble";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import IcnLTDB from "../../assets/svg/IcnLTDB";
import IncFeederPillar from "../../assets/svg/IncFeederPillar";

var _lastFeederIndexNum = 0;
var _typeItemDetails = "";

// LT line and HT line var
var _scheme = "";
var _majorComponent = "";
var _oldUGorOH = "";
var _oldWhetherCableOrConductor = "";
var _oldCableSize = "";
var _oldSinglePhaseThreePhase = "";
var _oldCircuitType = "";
var _oldLTLineVoltage = "";
var _oldSpecifyTypeVoltage = "";
var _oldTypeOfCable = "";
var _olsSpecifyTypeOfCable = "";
var _oldTypeOfConductor = "";
var _olsSpecifyTypeOfConductor = "";
var _oldPoleStructur = "";

// DTR VAR
var _dtrCapacity = null;
var _dtrVoltage = null;
var _modelofdtr = "";
var _manufacturingDT = null
var _installationDT = null
var _dtrMounting = null;
var _EngravedUnderRDSS = null;
var _noOffeeder = "";

//POLE VAR
var _poleType = "";
var _poleHeight = "";
var _poleSpecifyType = "";
var _existingPole = "";
var _branchPoint = "";

// Other-RDSS and Other-Existing VAR
var _popdata = {
    Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "", ScadaCompatibility: "", RMULocationName: "",
    RTULocationName: "", ProtocolSupported: "", FRTULocationName: "",
};

var _attributes = false;
var _click = true;

// create a component
const OldFeederAssetsScreen = (props) => {

    const mapRef = React.useRef(null);
    const route = useRoute();
    const { data, feederDetails, feederData, selectedDistricts } = route.params;

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );
    const [isLocationDetail, setLocationDetail] = useState(null);
    const [isLastGeotagAssetList, setLastGeotagAssetList] = useState([]);
    const [isGenratName, setGenratName] = useState("");


    const [isImagesUrl, setImageUploadUrl] = useState([]);
    const [isSelectedAssesId, setSelectedAssesId] = useState(null);
    const [isDropVisible, setDropVisible] = useState(false);
    const [isDropDownList, setDropDownList] = useState(null);
    const [isList, setList] = useState([]);
    const [isPolPopupVisible, setPolPopupVisible] = useState(false);
    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
    const [isMapview, setMapview] = useState("standard");
    const [isPolylineArr, setPolylineArr] = useState([]);

    // new PARM
    const [isEstimatedDistance, setEstimatedDistance] = useState("");
    const [isActualDistance, setActualDistance] = useState("");
    const [isRemark, setRemark] = useState("");
    const [isSelectedLTHTOption, setSelectedLTHTOption] = useState("Select");
    const [isHTModalVisible, setHTModalVisible] = useState(false);
    const [isLTModalVisible, setLTModalVisible] = useState(false);
    const [isAssetTypePopup, setAssetTypePopup] = useState(null);
    const [isSelectedDtrGeotag, setSelectedDtrGeotagList] = useState(null);
    const [isOthersExisting, setOthersExisting] = useState(null);
    const [isDtrRdssData, setDtrRdssData] = useState([]);
    const [isDTRModalVisible, setDTRModalVisible] = useState(false);
    const [isPollDetailsVisible, setPollDetailsVisible] = useState(false);
    const [isOtherRdssData, setOtherRdssData] = useState([]);
    const [isSubAsetVisible, setSubAsetVisible] = React.useState(false);
    const [isSubstationList, setSubstationList] = useState(null);
    const isFocused = useIsFocused();


    useEffect(() => {
        return () => {
            mapRef.current = null;
        };
    }, []);
    useEffect(() => {

        var olditem = {
            latitude: data?.latitude ? parseFloat(data?.latitude) : "",
            longitude: data?.longitude ? parseFloat(data?.longitude) : "",
            address: data?.address ? data?.address : "",
            block: data?.block ? data?.block : "",
            village: data?.village ? data?.village : "",
            date: data?.created_at ? moment(data?.created_at) : moment(new Date()),
            created_at: data?.created_at ? moment(data?.created_at) : moment(new Date()),
            title: data?.title ? data?.title : "",
        };
        setLocationDetail(olditem)
    }, []);

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                onFatchDtrRdssData();
                onFatchOtherRdssData();
            }, 500);
        }
    }, [isFocused])

    useEffect(() => {
        onFetchFeeder();
    }, []);

    const onFetchFeeder = () => {
        onLoading(true);
        let data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": JSON.stringify(selectedDistricts.value),
            "geotag_type": "Achievement",
            "taging_for": "LossReduction",
            "fedeer_id": feederDetails?.id,
            "fedeer_code": feederDetails?.feeder_code
        }

        Service.post(EndPoints.getFedderGeoTagList, data, (response) => {
            onLoading(false);
            if (response._resultflag == 1) {
                setGenratName(response?.index_code);

                let arr = [];
                response?.data.forEach(item => {
                    arr.push({ title: item?.index_id, obj: item })
                })
                setLastGeotagAssetList(arr);

                let strToNum = parseInt(response?.data[0]?.item_no) || 0;
                _lastFeederIndexNum = strToNum + 1;

                var PopData = response?.data[0]?.segmet;
                _scheme = PopData?.scheme;
                _majorComponent = PopData?.majorComponent;
                _oldUGorOH = PopData?.UGorOH;
                _oldWhetherCableOrConductor = PopData?.WhetherCableOrConductor;
                _oldSinglePhaseThreePhase = PopData?.SinglePhaseThreePhase;
                _oldCircuitType = PopData?.CircuitType;
                _oldLTLineVoltage = PopData?.HTLineVoltage;
                _oldSpecifyTypeVoltage = PopData?.SpecifyTypeVoltage;
                _oldCableSize = PopData?.CableSize;
                _oldTypeOfCable = PopData?.TypeOfCable;
                _olsSpecifyTypeOfCable = PopData?.SpecifyTypeOfCable;
                _oldTypeOfConductor = PopData?.TypeOfConductor;
                _olsSpecifyTypeOfConductor = PopData?.SpecifyTypeOfConductor;
                _oldPoleStructur = PopData?.PoleStructur;

                setSelectedLTHTOption(response?.data[0].type_of_segment == "LTline" ? "LT Line" : "HT Line");

                var PopeData = response?.data[0]?.poleDetails;
                _poleType = PopeData?.poleType;
                _poleHeight = PopeData?.poleHeight;
                _poleSpecifyType = PopeData?.poleSpecifyType;
                _existingPole = PopeData?.existingPole;
                _branchPoint = PopeData?.branchPoint;

                //-------Manage map Point & PolyLine---------//
                setPolylineArr(response?.data);
                let a = response?.data[0].latitude;
                let b = response?.data[0].longitude;
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(a),
                    longitude: parseFloat(b),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });

            } else showErrorToast(res.message);

            onGetSettingData();
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onGetSettingData = () => {
        onLoading(true);
        Service.post(EndPoints.getSettingListData, {}, (res) => {
            onLoading(false);
            if (res.resultflag == "1" && res.data)
                setDropDownList(res.data);
            getSubstationList();
        },
            (err) => {
                onLoading(false);
            }
        );
    };

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

    const onFetchFeederList = () => {

        onLoading(true);
        let data = {
            "form_id": 33,
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": JSON.stringify(selectedDistricts?.value),
            "geotag_type": "Achievement",
            "taging_for": "LossReduction",
            "fedeer_id": feederDetails?.id,
            "fedeer_code": feederDetails?.feeder_code
        }

        Service.post(EndPoints.getGeoTagList, data, (response) => {
            onLoading(false);
            if (response._resultflag == 1) {
                setList(response?.data);
            }
            else
                showErrorToast(res.message);
        },
            (err) => {
                showErrorToast("Something went wrong try again?");
                onLoading(false);
            }
        );
    }

    const getPolylineArr = (obj) => {

        let latLon = [];
        isPolylineArr.forEach((condinate, index) => {
            if (obj?.preceding_geotagged_asset_ID == condinate?.index_id) {
                let obj1 = { "latitude": parseFloat(obj.latitude), longitude: parseFloat(obj.longitude) }
                let obj2 = { "latitude": parseFloat(condinate.latitude), longitude: parseFloat(condinate.longitude) }
                latLon.push(obj1)
                latLon.push(obj2)
            }

        });
        return latLon;
    }

    const getPolylineColor = (obj) => {
        return obj?.type_of_segment == "LTline" ? Colors.orange : Colors.mapblue;
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
            if (data?.latitude != -1 && data?.longitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
                setEstimatedDistance(AppUtil.getDistance(data?.latitude, data?.longitude, value?.obj?.latitude, value?.obj?.longitude))
            }
        }
        else {
            if (isSelectedDtrGeotag && isSelectedDtrGeotag?.latitude != -1 && isSelectedDtrGeotag && isSelectedDtrGeotag?.longitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
                setEstimatedDistance(AppUtil.getDistance(isSelectedDtrGeotag?.latitude, isSelectedDtrGeotag?.longitude, value?.obj?.latitude, value?.obj?.longitude))
            }
        }
    }
    //------------------------------new update --------------------------------//

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

    const onFatchDtrRdssData = () => {

        onLoading(true);
        var responseData = [];

        Service.post(EndPoints.getGeoTagbyDistrict, { district_id: JSON.stringify(selectedDistricts?.value), feeder_id: feederData?.id, }, (response) => {
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
            const body = { district_id: JSON.stringify(selectedDistricts?.value), feeder_id: feederData?.id, }

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

    const onSelectDropdownItem = (selectedOption) => {

        if (selectedOption !== isSelectedLTHTOption) {
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
        }
        onSelectDropdown(selectedOption);
    };

    const onSelectDropdown = (selectedOption) => {

        setSelectedLTHTOption(selectedOption);
        switch (selectedOption) {
            case "HT Line":
                setHTModalVisible(true);
                break;
            case "LT Line":
                setLTModalVisible(true);
                break;
            default:
                break;
        }

        setDropVisible(false);
    };

    const onSelectAssetType = (value) => {

        // select Asset Name
        setAssetTypePopup(value?.feeder_name);

        //Reset DTR-RDSS selected item
        setSelectedDtrGeotagList(null);

        //Reset OtherExisting
        setOthersExisting(null)

        //Reset DTR_exidtingPopup
        _dtrCapacity = null;
        _dtrVoltage = null;
        _modelofdtr = "";
        _manufacturingDT = null
        _installationDT = null
        _dtrMounting = null;
        _EngravedUnderRDSS = null;
        _noOffeeder = "";


        switch (value?.feeder_name) {
            case "Others-Existing":
                onGetDtrSettingListDetails("Others-Existing");
                break;
            case "Others-RDSS":
                onFatchOtherRdssData();
                onGetDtrSettingListDetails("Others-RDSS");
                break;
            case "DTR-Existing":
                onGetDtrSettingListDetails("DTR-Existing");
                break;
            case "DTR-RDSS":
                onFatchDtrRdssData();
                break;
            case "Pole":
                setPollDetailsVisible(true);
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

    const onPressDTR = () => {
        props.navigation.navigate("DtrGeoGagList", {
            selectedDistricts: selectedDistricts?.value,
            selectedDistrictsName: selectedDistricts?.title,
            selectedOption: "LossReduction",
            achievementButtonState: "Achievement",
            selectedImageOption: "DTR",
            geotagType: "Achievement",
            sessionType: "Feeder",
        });
    }

    const onPressOther = () => {
        props.navigation.navigate("OtherListScreen", {
            selectedDistricts: selectedDistricts,
            selectedOption: "LossReduction",
            achievementButtonState: "Achievement",
            geotagType: "Achievement",
            sessionType: "FeederScreen",
        });
    }

    const onOtherExisting = (value) => {
        _attributes = (value == "Capacitor Bank") || (value == "Capacitor Banks") || (value == "Circuit Breaker") || (value == "RMU") || (value == "RTU") || (value == "FRTU")
        setOthersExisting(value);
        setSubAsetVisible(_attributes);
    }

    const onSaveGeotag = (action) => {

        let obj = null;

        let index_id = isGenratName + AppUtil.generateUniqueKey();

        if (isSelectedLTHTOption == "Select") {
            Alert.alert("alert", "Please Select HT Line or an LT Line")
            return
        }
        else if (isSelectedLTHTOption == "HT Line" && (_scheme == "" || _majorComponent == "" || _oldUGorOH == "" || _oldLTLineVoltage == "" || _oldWhetherCableOrConductor == "" || _oldPoleStructur == "" || _oldCircuitType == "")) {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedLTHTOption == "HT Line" && _oldLTLineVoltage == "Other" && _oldSpecifyTypeVoltage == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedLTHTOption == "HT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "" && _oldCableSize == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedLTHTOption == "HT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "Other" && _olsSpecifyTypeOfCable == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedLTHTOption == "HT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedLTHTOption == "HT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "Other" && _olsSpecifyTypeOfConductor == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedLTHTOption == "LT Line" && (_scheme == "" || _majorComponent == "" || _oldUGorOH == "" || _oldWhetherCableOrConductor == "" || _oldSinglePhaseThreePhase == "" || _oldCircuitType == "")) {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedLTHTOption == "LT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "" && _oldCableSize == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedLTHTOption == "LT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "Other" && _olsSpecifyTypeOfCable == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedLTHTOption == "LT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedLTHTOption == "LT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "Other" && _olsSpecifyTypeOfConductor == "") {
            Alert.alert("alert", "Please fill LT Line details")
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

        // Pole
        if (isAssetTypePopup == "Pole") {
            if (isLocationDetail == null) {
                Alert.alert("alert", "Please add Location.")
                return;
            }
            else if (_poleType == "" || _poleHeight == "" || _existingPole == "" || _branchPoint == "") {
                Alert.alert("alert", "Please add Pole Details")
                return
            }
            else if (_poleType == "Others" && _poleSpecifyType == "") {
                Alert.alert("alert", "Please add Pole Details")
                return
            }

            obj = {

                "role_id": UserManager.role_id,
                "user_id": UserManager.id,
                "discom_id": UserManager.discom_id,
                "district_id": JSON.stringify(selectedDistricts?.value),
                "geotag_type": "Achievement",
                "taging_for": "LossReduction",
                "task": action,
                "item_no": "00" + _lastFeederIndexNum,
                geotag_version: "old",
                old_index_id: data?.index_id,

                "geotagData": {
                    "fedeer_id": [feederData?.id],
                    "fedeer_code": [feederData?.feeder_code],

                    "sl_lattitude": {
                        "item_no": "00" + _lastFeederIndexNum,
                        "estimatedDistance": isEstimatedDistance,
                        "actualDistance": isActualDistance,
                        "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                        "remark": isRemark,
                        "index_id": index_id,
                        "asset_type": isAssetTypePopup,
                        "title": feederData?.feeder_name,
                        "created_at": isLocationDetail?.created_at,
                        "latitude": isLocationDetail?.latitude,
                        "longitude": isLocationDetail?.longitude,
                        "address": isLocationDetail?.address,
                        "block": isLocationDetail?.block,
                        "village": isLocationDetail?.village,
                        "tag_by": UserManager.first_name + " " + UserManager.last_name,
                        "images": data?.images,
                        type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                        selected_asset_type: isAssetTypePopup,

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
        // DTR-RDSS filed
        else if (isAssetTypePopup == "DTR-RDSS") {
            if (isDtrRdssData.length < 0) {
                Alert.alert("alert", "Please add DTR.")
                return
            }
            else if (isSelectedDtrGeotag == null) {
                Alert.alert("alert", "Please Select Geotaged DTR under RDSS.")
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

            obj = {
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                district_id: JSON.stringify(selectedDistricts?.value),
                geotag_type: "Achievement",
                taging_for: "LossReduction",
                "item_no": "00" + _lastFeederIndexNum,
                "task": action,
                geotag_version: "old",
                old_index_id: data?.index_id,

                geotagData: {
                    fedeer_id: [feederData?.id],
                    fedeer_code: [feederData?.feeder_code],

                    sl_lattitude: {
                        "item_no": "00" + _lastFeederIndexNum,
                        estimatedDistance: isEstimatedDistance,
                        actualDistance: isActualDistance,

                        title: isSelectedDtrGeotag?.title,
                        tag_by: isSelectedDtrGeotag?.tag_by,
                        index_id: index_id,
                        latitude: isSelectedDtrGeotag?.latitude,
                        longitude: isSelectedDtrGeotag?.longitude,
                        address: isSelectedDtrGeotag?.address,
                        block: isSelectedDtrGeotag?.block,
                        village: isSelectedDtrGeotag?.village,
                        images: isSelectedDtrGeotag?.images,
                        created_at: isSelectedDtrGeotag?.created_at,
                        dtr_existing: isSelectedDtrGeotag?.dtr_details,

                        preceding_geotagged_asset_ID: isSelectedAssesId?.title,
                        remark: isRemark,
                        asset_type: isAssetTypePopup,
                        type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                        selected_asset_type: isAssetTypePopup,

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
        // DTR-Existing
        else if (isAssetTypePopup == "DTR-Existing") {

            // if (_dtrCapacity == null || _dtrVoltage == null || _modelofdtr == "" || _manufacturingDT == null || _installationDT == null || _dtrMounting == null || _EngravedUnderRDSS == null || _noOffeeder == "") {
            if (_dtrCapacity == null || _dtrVoltage == null) {
                Alert.alert("alert", "Please add existing DTR details.")
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

            obj = {
                "role_id": UserManager.role_id,
                "user_id": UserManager.id,
                "discom_id": UserManager.discom_id,
                "district_id": JSON.stringify(selectedDistricts?.value),
                "geotag_type": "Achievement",
                "taging_for": "LossReduction",
                "task": action,
                "item_no": "00" + _lastFeederIndexNum,
                geotag_version: "old",
                old_index_id: data?.index_id,

                "geotagData": {

                    "fedeer_id": [feederData?.id],
                    "fedeer_code": [feederData?.feeder_code],

                    "sl_lattitude": {

                        "item_no": "00" + _lastFeederIndexNum,
                        "estimatedDistance": isEstimatedDistance,
                        "actualDistance": isActualDistance,
                        "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                        "remark": isRemark,
                        "index_id": index_id,
                        "asset_type": isAssetTypePopup,
                        "title": feederData?.feeder_name,
                        "created_at": isLocationDetail?.created_at,
                        "latitude": isLocationDetail?.latitude,
                        "longitude": isLocationDetail?.longitude,
                        "address": isLocationDetail?.address,
                        "block": isLocationDetail?.block,
                        "village": isLocationDetail?.village,
                        "tag_by": UserManager.first_name + " " + UserManager.last_name,
                        "images": data?.images,
                        type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                        selected_asset_type: isAssetTypePopup,

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

            if (isDtrRdssData.length < 0) {
                Alert.alert("alert", "Please add Others-RDSS.")
                return
            }
            else if (isSelectedDtrGeotag == null) {
                Alert.alert("alert", "Please Select Geotagged Other under RDSS.")
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

            obj = {
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                district_id: JSON.stringify(selectedDistricts?.value),
                geotag_type: "Achievement",
                taging_for: "LossReduction",
                "task": action,
                "item_no": "00" + _lastFeederIndexNum,
                geotag_version: "old",
                old_index_id: data?.index_id,

                geotagData: {
                    fedeer_id: [feederData?.id],
                    fedeer_code: [feederData?.feeder_code],

                    sl_lattitude: {
                        "item_no": "00" + _lastFeederIndexNum,
                        index_id: index_id,
                        preceding_geotagged_asset_ID: isSelectedAssesId?.title,
                        estimatedDistance: isEstimatedDistance,
                        actualDistance: isActualDistance,

                        title: isSelectedDtrGeotag?.title,
                        tag_by: isSelectedDtrGeotag?.tag_by,
                        latitude: isSelectedDtrGeotag?.latitude,
                        longitude: isSelectedDtrGeotag?.longitude,
                        address: isSelectedDtrGeotag?.address,
                        block: isSelectedDtrGeotag?.block,
                        village: isSelectedDtrGeotag?.village,
                        images: isSelectedDtrGeotag?.images,
                        created_at: isSelectedDtrGeotag?.created_at,
                        dtr_existing: isSelectedDtrGeotag?.dtr_details,

                        remark: isRemark,
                        asset_type: isAssetTypePopup,
                        type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                        selected_asset_type: isAssetTypePopup,

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
            else if (isOthersExisting == "Capacitor Bank" && (_popdata.Location == "" || _popdata.Make == "" || _popdata.Rating == "" || _popdata.LinePosition == "")) {
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
                "district_id": JSON.stringify(selectedDistricts?.value),
                "geotag_type": "Achievement",
                "taging_for": "LossReduction",
                "task": action,
                "item_no": "00" + _lastFeederIndexNum,
                geotag_version: "old",
                old_index_id: data?.index_id,

                geotagData: {
                    fedeer_id: [feederData?.id],
                    fedeer_code: [feederData?.feeder_code],

                    sl_lattitude: {

                        "item_no": "00" + _lastFeederIndexNum,
                        "estimatedDistance": isEstimatedDistance,
                        "actualDistance": isActualDistance,
                        "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                        "remark": isRemark,
                        "index_id": index_id,
                        "asset_type": isAssetTypePopup,
                        "title": feederData?.feeder_name,
                        "created_at": isLocationDetail?.created_at,
                        "latitude": isLocationDetail?.latitude,
                        "longitude": isLocationDetail?.longitude,
                        "address": isLocationDetail?.address,
                        "block": isLocationDetail?.block,
                        "village": isLocationDetail?.village,
                        "tag_by": UserManager.first_name + " " + UserManager.last_name,
                        "images": data?.images,
                        type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                        selected_asset_type: isAssetTypePopup,
                        otherExistingAssetType: isOthersExisting,

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

        else if (isAssetTypePopup == "Rout Point / Marker" || isAssetTypePopup == "LTDB" || isAssetTypePopup == "Feeder Pillar") {

            if (isLocationDetail == null) {
                Alert.alert("alert", "Please add Location.")
                return;
            }
            obj = {

                "role_id": UserManager.role_id,
                "user_id": UserManager.id,
                "discom_id": UserManager.discom_id,
                "district_id": JSON.stringify(selectedDistricts?.value),
                "geotag_type": "Achievement",
                "taging_for": "LossReduction",
                "task": action,
                "item_no": "00" + _lastFeederIndexNum,
                geotag_version: "old",
                old_index_id: data?.index_id,

                "geotagData": {
                    "fedeer_id": [feederData?.id],
                    "fedeer_code": [feederData?.feeder_code],

                    "sl_lattitude": {
                        "item_no": "00" + _lastFeederIndexNum,
                        "estimatedDistance": isEstimatedDistance,
                        "actualDistance": isActualDistance,
                        "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
                        "remark": isRemark,
                        "index_id": index_id,
                        "asset_type": isAssetTypePopup,
                        "title": feederData?.feeder_name,
                        "created_at": isLocationDetail?.created_at,
                        "latitude": isLocationDetail?.latitude,
                        "longitude": isLocationDetail?.longitude,
                        "address": isLocationDetail?.address,
                        "block": isLocationDetail?.block,
                        "village": isLocationDetail?.village,
                        "tag_by": UserManager.first_name + " " + UserManager.last_name,
                        "images": data?.images,
                        type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
                        selected_asset_type: isAssetTypePopup,

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
                    },
                },
            }
        }
        onSaveGeotagData(obj);
    }

    const onSaveGeotagData = (obj) => {

        if (_click) {

            _click = false

            onLoading(true);
            Service.post(EndPoints.saveFeeder, obj, (res) => {

                _click = true;
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

                                setActualDistance("");
                                setRemark("");
                                setLastGeotagAssetList([]);
                                setLocationDetail(null);
                                setImageUploadUrl([]);
                                onFetchFeeder();
                                setSelectedAssesId(null);
                                setCurrentLongitude(-1);
                                setCurrentLatitude(-1);

                                props.navigation.goBack();

                            }
                        },
                    ]);

                } else showErrorToast(res.message);
            },
                (err) => {
                    _click = true;
                    onLoading(false);
                }
            );

        }


    }

    return (
        <SafeAreaView style={[PageStyle.mainView,]}>

            <Header title="Old HT Line / LT Line Geotag" leftIcon={<IcnBack />} onLeftPress={() => { props.navigation.goBack() }} />

            <KeyboardAwareScrollView>
                <View style={PageStyle.title}>
                    <Text style={[PageStyle.text, { color: "black" }]}>
                        {feederData.feeder_name}
                    </Text>
                </View>

                <View style={PageStyle.container}>

                    <View style={PageStyle.modifySearch}>
                        <Text style={PageStyle.modifySearchText}>
                            {Labels.generalDetails}
                        </Text>
                    </View>

                    <View style={PageStyle.innerContainer}>
                        <Text style={PageStyle.dropSelectText}>{Labels.HtLtLineTitle}</Text>
                        <TouchableOpacity style={PageStyle.modifySearch2} onPress={() => setDropVisible(!isDropVisible)}>
                            <Text style={PageStyle.modifySearchText2}>
                                {isSelectedLTHTOption}
                            </Text>
                            <IcnGreyDown />
                        </TouchableOpacity>

                        {isDropVisible && (
                            <View style={PageStyle.options}>
                                {LTHToptions.map((option, index) => (
                                    <TouchableOpacity key={index} onPress={() => onSelectDropdownItem(option.label)} style={[PageStyle.optionButton, index === LTHToptions.length - 1 && PageStyle.lastOptionButton,]}>
                                        <Text style={PageStyle.btnTxt}>
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {isSelectedLTHTOption != "Select" &&
                            <TouchableOpacity style={PageStyle.heading} onPress={() => isSelectedLTHTOption == "LT Line" ? onSelectDropdown("LT Line") : onSelectDropdown("HT Line")}>
                                <View style={PageStyle.textView}>
                                    <Text style={PageStyle.headingText}>{isSelectedLTHTOption}</Text>
                                </View>
                                <View style={PageStyle.icnView}>
                                    <IcnDetails />
                                </View>
                            </TouchableOpacity>
                        }
                        {/* ------------------ Assetdetails View --------------------- */}
                        <View style={{ marginTop: 10 }}>
                            <AssetDropDown title={"Asset Type*"} data={AssetType} onSelectedSevice={(value) => { onSelectAssetType(value); }} />
                        </View>

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
                            (isAssetTypePopup === "Others-Existing") && isDropDownList != null &&
                            <View style={{ marginTop: 10 }}>
                                <SingleDropdownList title={"Select Other Asset Type*"} data={isDropDownList?.other_rdss_asset?.asset_type}
                                    onSelectedSevice={(value) => { onOtherExisting(value.title) }} />
                            </View>
                        }
                        {
                            (isAssetTypePopup === "Others-Existing") && isDropDownList != null && isOthersExisting != null && isOthersExisting != "" && _attributes &&
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
                                    imagePressed={(index, imageUrl) => null}
                                    status={"false"}
                                />
                            </>
                        }

                        {/* for POLE */}
                        {
                            isAssetTypePopup != "Rout Point / Marker" && isAssetTypePopup != "LTDB" && isAssetTypePopup != "Feeder Pillar" &&
                            <View style={[PageStyle.btnDTRSubmit, { marginTop: 15 }]}>
                                <Text style={PageStyle.txtAddDTRRDSS}>{Labels.ProvidePoleDetails}</Text>
                                <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { setPollDetailsVisible(true) }}>
                                    <Text style={PageStyle.txtAddDTR}>{Labels.Details}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {/* -------------------------------------------------------- */}
                        <View>
                            {
                                isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                                <>
                                    <LocationBarDisble
                                        title="Complete Address*"
                                        icon={<IcnAddress />}
                                        getdata={isLocationDetail?.address}
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
                                <View style={{ width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(2), borderWidth: 0.5, borderColor: Colors.orange, }}>

                                    <MapView style={{ width: '100%', height: '100%' }}
                                        ref={mapRef}
                                        initialRegion={isInitialRegion}
                                        mapType={isMapview == "satellite" ? "satellite" : "standard"}>

                                        {isPolylineArr && isPolylineArr.map((data, index) => (
                                            data.latitude &&
                                            <Marker key={index} coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), }} pinColor={"red"}>
                                                {data.asset_type == "Feeder" && <IcnFeeder />}
                                                {data.asset_type == "Substation" && <IcnSubstations />}
                                                {data.asset_type == "Pole" && <IcnPole />}
                                                {data.asset_type == "DTR-RDSS" && <IcnDTR1 />}
                                                {data.asset_type == "DTR-Existing" && <IcnDTR1 />}
                                                {data.asset_type == "Others-Existing" && <IcnPowerTransformers />}
                                                {data.asset_type == "Others-RDSS" && <IcnPowerTransformers />}
                                                {data.asset_type == "Rout Point / Marker" && <IcnRoutPointMarker />}
                                                {data.asset_type == "LTDB" && <IcnLTDB />}
                                                {data.asset_type == "Feeder Pillar" && <IncFeederPillar />}
                                            </Marker>
                                        ))}

                                        <Marker coordinate={{ latitude: parseFloat(data?.latitude), longitude: parseFloat(data?.longitude) }} pinColor={"purple"} />

                                        {isPolylineArr && isPolylineArr.length > 1 && isPolylineArr.map((data, index) =>
                                            data?.preceding_geotagged_asset_ID && data.latitude && data.longitude && (<Polyline coordinates={getPolylineArr(data)} strokeColor={getPolylineColor(data)} strokeWidth={2} />)
                                        )}
                                    </MapView>

                                    <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
                                        onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                                        <IcnAddress />
                                    </TouchableOpacity>
                                </View>
                            }

                            <View style={{ marginTop: 10 }}>
                                {isLastGeotagAssetList.length > 0 &&
                                    <>
                                        <SingleDropdownListWithIcn icn={""} title={"Select preceding geotagged asset ID"} data={isLastGeotagAssetList}
                                            onSelectedSevice={(value) => { onSelectPrecendingID(value) }} />

                                        {isSelectedAssesId != null &&
                                            <>
                                                <Text style={PageStyle.fieldTitle}>Estimated aerial length of line from preceding geotagged asset ID (CMtrs.)</Text>
                                                <Text style={PageStyle.textInput}>{isEstimatedDistance}</Text>
                                                <Text style={PageStyle.fieldTitle}>Actual length of line from preceding geotagged asset ID (CMtrs.)*</Text>
                                                <View style={PageStyle.container1}>
                                                    <TextInput
                                                        maxLength={6}
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
                            </View>

                            {isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" && data?.images.length > 0 &&
                                <View style={PageStyle.imageContainer}>
                                    {
                                        data?.images.map((item, index) => {
                                            return (
                                                <View style={PageStyle.imagebtn} >
                                                    <Image source={{ uri: image_base_url + UserManager.image_path + item.imageName }} style={PageStyle.image} />
                                                </View>
                                            );
                                        })
                                    }
                                </View>
                            }
                            <SubmitBtn title="RE-SUBMIT" onPress={() => { onSaveGeotag("save") }} />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <PolDetailePopup data={_typeItemDetails} isVisible={isPolPopupVisible} handleClose={() => setPolPopupVisible(false)} />

            <HTLinePopupSingaleValue
                handleClose={() => setHTModalVisible(false)}
                isModalVisible={isHTModalVisible}

                oldScheme={_scheme}
                onSelectScheme={(data) => _scheme = data}

                majorComponentList={UserManager.majorComonentHT}
                oldMajorComponent={_majorComponent}
                onSelectMajorComponent={(data) => _majorComponent = data}

                oldUGorOH={_oldUGorOH}
                onSelectUGorOH={(data) => _oldUGorOH = data}

                oldLTLineVoltage={_oldLTLineVoltage}
                onSelectLTLineVoltage={(data) => _oldLTLineVoltage = data}
                oldSpecifyTypeVoltage={_oldSpecifyTypeVoltage}
                onSelectSpecifyTypeVoltage={(data) => _oldSpecifyTypeVoltage = data}

                oldWhetherCableOrConductor={_oldWhetherCableOrConductor}
                onSelectWhetherCableOrConductor={(data) => _oldWhetherCableOrConductor = data}

                oldCableSize={_oldCableSize}
                onSelectCableSize={(data) => _oldCableSize = data}

                oldTypeOfCable={_oldTypeOfCable}
                onSelectTypeOfCable={(data) => _oldTypeOfCable = data}
                olsSpecifyTypeOfCable={_olsSpecifyTypeOfCable}
                onSelectSpecifyTypeOfCable={(data) => _olsSpecifyTypeOfCable = data}

                oldTypeOfConductor={_oldTypeOfConductor}
                onSelectTypeOfConductor={(data) => _oldTypeOfConductor = data}
                olsSpecifyTypeOfConductor={_olsSpecifyTypeOfConductor}
                onSelectSpecifyTypeOfConductor={(data) => _olsSpecifyTypeOfConductor = data}

                oldPoleStructur={_oldPoleStructur}
                onSelectPoleStructur={(data) => _oldPoleStructur = data}

                oldCircuitType={_oldCircuitType}
                onSelectCircuitType={(data) => _oldCircuitType = data}

                saveObj={() => { setHTModalVisible(false); }}
            />

            <LTLinePopup
                handleClose={() => setLTModalVisible(false)}
                isModalVisible={isLTModalVisible}

                oldScheme={_scheme}
                onSelectScheme={(data) => _scheme = data}

                majorComponentList={UserManager.majorComonentLT}
                oldMajorComponent={_majorComponent}
                onSelectMajorComponent={(data) => _majorComponent = data}

                oldUGorOH={_oldUGorOH}
                onSelectUGorOH={(data) => _oldUGorOH = data}

                oldWhetherCableOrConductor={_oldWhetherCableOrConductor}
                onSelectWhetherCableOrConductor={(data) => _oldWhetherCableOrConductor = data}

                oldCableSize={_oldCableSize}
                onSelectCableSize={(data) => _oldCableSize = data}

                oldTypeOfCable={_oldTypeOfCable}
                onSelectTypeOfCable={(data) => _oldTypeOfCable = data}
                olsSpecifyTypeOfCable={_olsSpecifyTypeOfCable}
                onSelectSpecifyTypeOfCable={(data) => _olsSpecifyTypeOfCable = data}

                oldTypeOfConductor={_oldTypeOfConductor}
                onSelectTypeOfConductor={(data) => _oldTypeOfConductor = data}
                olsSpecifyTypeOfConductor={_olsSpecifyTypeOfConductor}
                onSelectSpecifyTypeOfConductor={(data) => _olsSpecifyTypeOfConductor = data}

                oldSinglePhaseThreePhase={_oldSinglePhaseThreePhase}
                onSelectSinglePhaseThreePhase={(data) => _oldSinglePhaseThreePhase = data}

                oldCircuitType={_oldCircuitType}
                onSelectCircuitType={(data) => _oldCircuitType = data}

                saveObj={() => { setLTModalVisible(false) }}
            />

            <PollDetails
                handleClose={() => setPollDetailsVisible(false)}
                isModalVisible={isPollDetailsVisible}

                option={false}

                oldPolltype={_poleType}
                onSelectPoleType={(data) => _poleType = data}

                oldPoleHeight={_poleHeight}
                onSelectPoleHeight={(data) => _poleHeight = data}

                oldPoleSpecifyType={_poleSpecifyType}
                onSelectPoleSpecifyType={(data) => _poleSpecifyType = data}

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
    blackBackgroundStyle: { backgroundColor: Colors.black, },
    mainView: { marginBottom: AppUtil.getHP(8), backgroundColor: Colors.primaryBackground, },
    mainView1: { marginBottom: AppUtil.getHP(8), backgroundColor: Colors.primaryBackground, opacity: 0.2, },
    container: { flex: 1, color: Colors.grey, },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    title: { backgroundColor: Colors.white, paddingLeft: AppUtil.getWP(4), paddingTop: AppUtil.getHP(1), paddingBottom: AppUtil.getHP(1), },
    text: { color: Colors.secondary, fontSize: 16, fontWeight: 500, },
    subHeader: { width: "100%", height: AppUtil.getHP(5), backgroundColor: Colors.white, justifyContent: "center", paddingHorizontal: AppUtil.getWP(4), },
    subHeaderText: { fontSize: AppUtil.getHP(1.7), color: Colors.darkBlack, fontFamily: Fonts.RobotoBold, },
    innerContainer: { marginHorizontal: AppUtil.getWP(5), borderRadius: 10, marginBottom: AppUtil.getHP(2), },
    dropSelectText: { fontSize: 14, color: Colors.darkBlack, fontWeight: "bold", alignSelf: "flex-start", marginBottom: AppUtil.getHP(1), marginTop: AppUtil.getHP(1), },
    modifySearch1: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.white, borderRadius: 5, },
    modifySearchText1: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    options: { backgroundColor: Colors.disableViewColor, borderBottomEndRadius: 10, borderBottomStartRadius: 10, },
    optionButton: { padding: AppUtil.getHP(1), borderBottomColor: Colors.lightGray, borderBottomWidth: 1, paddingVertical: AppUtil.getHP(1.5), },
    lastOptionButton: { borderBottomWidth: 0, },
    btnTxt: { fontSize: 14, color: Colors.darkBlack, fontWeight: "bold", marginLeft: AppUtil.getWP(3), },
    imageContainer: { flexDirection: "row", marginVertical: AppUtil.getHP(2), flexWrap: "wrap", },
    imagebtn: { marginHorizontal: AppUtil.getWP(1), width: "30%", height: AppUtil.getHP(10), borderRadius: 10, backgroundColor: Colors.white, },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
    heading: { marginTop: AppUtil.getHP(2), paddingVertical: AppUtil.getHP(1.5), borderRadius: 5, backgroundColor: Colors.beige, borderWidth: 1, borderColor: Colors.primary, flexDirection: "row", justifyContent: "space-between", },
    headingText: { fontSize: 14, fontWeight: "bold", fontFamily: Fonts.RobotoMedium, color: Colors.darkBlack, marginLeft: AppUtil.getWP(3), },
    textView: { width: "85%", },
    icnView: { width: "15%", justifyContent: "center", alignItems: "center", },
    modifySearch2: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.white, borderRadius: 5, },
    modifySearchText2: { color: "black", width: "90%", fontWeight: 500, fontSize: 14, },
    btnDTRSubmit: { width: "100%", height: AppUtil.getHP(7), marginTop: 10, padding: AppUtil.getHP(1), backgroundColor: Colors.white, alignItems: 'center', justifyContent: "space-between", borderRadius: 5, flexDirection: "row", },
    txtAddDTRRDSS: { fontSize: 14, color: Colors.darkBlack, fontWeight: "500", },
    btnDTRClick: { width: "25%", height: AppUtil.getHP(5), backgroundColor: Colors.orange, justifyContent: 'center', alignItems: "center", borderRadius: 2, },
    txtAddDTR: { fontSize: 14, color: Colors.white, fontWeight: "500", },
    container1: { backgroundColor: Colors.white, flex: 1, width: "100%", alignSelf: "center", borderRadius: 5, },
    fieldTitle: { fontSize: AppUtil.getHP(1.8), color: Colors.darkBlack, fontWeight: "500", alignSelf: "flex-start", marginTop: AppUtil.getHP(1), marginBottom: AppUtil.getHP(1), },
    enabledField: { backgroundColor: Colors.white, borderRadius: 5, height: 45, color: Colors.darkBlack, width: "100%", paddingHorizontal: AppUtil.getWP(3), },
    textInput: { backgroundColor: Colors.disableViewColor, borderRadius: 5, height: AppUtil.getHP(6), width: "100%", padding: AppUtil.getWP(2), color: Colors.darkBlack, },
    imageList: { height: 25, width: 25, position: "absolute", alignItems: "center", justifyContent: "center", backgroundColor: Colors.orange, right: -5, top: -5, borderRadius: 15, }

});

//make this component available to the app
export default memo(OldFeederAssetsScreen);
