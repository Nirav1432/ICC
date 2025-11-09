// Other by Khasiya Sagar

// React
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Style
import { PageStyle } from "./FeederGeneralAssetOptionsStyle";

//common
import Header from "../../../components/header/Header";
import InputFields2 from "../../../components/inputFields/InputFields2";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import AddressCard from "../../../components/addressCard/AddressCard2";

//Model
import { Colors } from "../../../utils/Colors";
import IcnAddress from "../../../assets/svg/powerTransformersSvgs/IcnAddress";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { onLoading } from "../../../../App";
import { Service, postFormDataAPI } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { UserManager } from "../../../manager/UserManager";


//Other
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import IcnDetails from "../../../assets/svg/IcnDetails";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import { Labels } from "../../../utils/Labels";
import FeederRadioButton from "../../../components/feederRadioButton/FeederRadioButton";
import LocationBar from "../../../components/locationBar/LocationBar";
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import Geocoder from "react-native-geocoding";
import * as ImagePicker from "react-native-image-picker";
import { image_base_url } from "../../../service/appConfig";
import moment from "moment";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import MapView, { Marker, } from 'react-native-maps';
import { AppUtil, PhotoQualityOptions } from "../../../utils/AppUtil";

import Geolocation from '@react-native-community/geolocation';
import LocationPopup from "../../../components/LocationPopup";
import LTLinePopup from "../../../components/LTLinePopup";
import HTLinePopup from "../../../components/HTLinePopup";
import PollDetails from "../../../components/PollDetails";
import { AssetType, LTHToptions } from "../../../utils/CardData";
import DtrRdssData from "../../../model/DtrRdssData";
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import DtrModalView from "../../../components/dtrModal/DtrModalView";
import { useFocusEffect } from '@react-navigation/native';
import AssetDropDown from "../../../components/dde/dropdownNewList/assetDropDown";
import InputFields3 from "../../../components/inputFields/InputFields3";
import OtherSubAssetPop from "../../../components/OtherSubAssetPop";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import GeotagThreeImageOptimazeModule from "../../../components/GeotagThreeImageOptimazeModule";


let _clicked = true;
let watchID = "";
var _lastFeederIndexNum = 0;

// LT line and HT line var
var _scheme = "";
var _majorComponent = "";
var _oldUGorOH = "";
var _oldWhetherCableOrConductor = "";
var _oldSinglePhaseThreePhase = "";
var _oldCircuitType = "";
var _oldLTLineVoltage = "";
var _oldSpecifyTypeVoltage = "";
var _oldTypeOfCable = "";
var _oldCableSize = "";
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
  RTULocationName: "", ProtocolSupported: ""
};

var _attributes = false;

function FeederGeneralAssetOptions(props) {
  const route = useRoute();
  const { feederData, feederDetails, selectedDistricts, selectedOption, achievementButtonState, isDTRList, selectedDistrictsName, backJump } = route.params;

  const mapRef = React.useRef(null);

  const [isLastGeotagAssetList, setLastGeotagAssetList] = useState([]);
  const [isSubAsetVisible, setSubAsetVisible] = React.useState(false);

  const [isLocationDetail, setLocationDetail] = useState(null);
  const [isExitingFeederOption, setExitingFeederOption] = useState(false);
  const [isFeederList, setFeederList] = useState([]);
  const [isSelectedFeeder, setSelectedFeeder] = useState(null);
  const [isRemark, setRemark] = useState("");
  const [isImagesUrl, setImageUploadUrl] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isGenratName, setGenratName] = useState("");
  const [isAddress, setAddress] = useState("");

  const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
  const [isDefultLongitude, setDefultLongitude] = useState(-1);
  const [isDefultLatitude, setDefultLatitude] = useState(-1);

  const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
  const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
  const [isMapview, setMapview] = useState("standard");

  const [isDropVisible, setDropVisible] = useState(false);
  const [isSelectedOption, setSelectedOption] = useState("Select");
  const [isHTModalVisible, setHTModalVisible] = useState(false);
  const [isLTModalVisible, setLTModalVisible] = useState(false);

  const [isAssetTypePopup, setAssetTypePopup] = useState(null);

  const [isDtrRdssData, setDtrRdssData] = useState([]);
  const [isSelectedDtrGeotag, setSelectedDtrGeotagList] = useState(null);

  const [isDTRModalVisible, setDTRModalVisible] = useState(false);
  const [isDropDownList, setDropDownList] = useState(null);
  const [isPollDetailsVisible, setPollDetailsVisible] = useState(false);

  const [isOtherRdssData, setOtherRdssData] = useState([]);
  const [isOthersExisting, setOthersExisting] = useState(null);

  const [isSelectSubstation, setSelectSubstation] = useState(null);
  const [isSubstationList, setSubstationList] = useState(null);


  const [isInitialRegion, setInitialRegion] = useState(
    {
      latitude: 23,
      longitude: 79,
      latitudeDelta: 30,
      longitudeDelta: 30,
    }
  );

  useEffect(() => {
    subscribeLocationLocation();
    return () => {
      mapRef.current = null;
      Geolocation.clearWatch(watchID);

    };
  }, []);

  useEffect(() => {
    let strToNum = parseInt(isDTRList[0]?.item_no) || 0;
    _lastFeederIndexNum = strToNum + 1;

    onGetGeoTagList();
    getSubstationList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      onFatchDtrRdssData();
      onFatchOtherRdssData();
    }, [])
  );

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

  function onSelectSubstation(obj) {
    setSelectSubstation(obj);
    setSelectedFeeder(null);
    setFeederList([])
    onFetchFeederComponentList(obj?.value);
  }

  const onFetchFeederComponentList = (id) => {

    onLoading(true);
    const data = { district_id: JSON.stringify(selectedDistricts), substation_id: id, };

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

  const onGetGeoTagList = () => {
    var data = {
      role_id: UserManager?.role_id,
      user_id: UserManager?.id,
      discom_id: UserManager?.discom_id,
      district_id: JSON.stringify(selectedDistricts),
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
      fedeer_id: feederData?.id,
      fedeer_code: feederData?.feeder_code,
    }
    onLoading(true);

    Service.post(EndPoints.getGeoTagList, data, (response) => {
      onLoading(false);
      if (response._resultflag == 1) {
        setGenratName(response?.index_code);
        setLastGeotagAssetList(response?.data);
      } else showErrorToast(res.message);
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
      const body = { district_id: JSON.stringify(selectedDistricts), feeder_id: feederData?.id, }

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

  //DTR RDSS data
  const onFatchDtrRdssData = () => {

    onLoading(true);
    var responseData = [];

    Service.post(EndPoints.getGeoTagbyDistrict, { district_id: JSON.stringify(selectedDistricts), feeder_id: feederData?.id, }, (response) => {
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

  const onSelectSubstationOrExistingFeeder = (value) => {
    setExitingFeederOption(value);
    setSelectedFeeder(null);
    setAssetTypePopup(null);
    setFeederList([]);

    _poleType = "";
    _poleHeight = "";
    _poleSpecifyType = "";
    _existingPole = "";
    _branchPoint = "";

    _dtrCapacity = null;
    _dtrVoltage = null;
    _modelofdtr = "";
    _manufacturingDT = null
    _installationDT = null
    _dtrMounting = null;
    _EngravedUnderRDSS = null;
    _noOffeeder = "";

    setRemark("")
    setLocationDetail(null);
    setImageUploadUrl([]);
    setCurrentLongitude(-1);
    setCurrentLatitude(-1);

    mapRef.current?.animateToRegion({
      latitude: 23,
      longitude: 79,
      latitudeDelta: 30,
      longitudeDelta: 30,
    });

  }

  const onLocationPress = async () => {

    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization((info) => {
        watchPosition();
      })
      watchPosition();

    } else {
      requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,]).then((statuses) => {


        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted") {
          watchPosition();
        }
        else {
          Alert.alert(
            "Alert",
            "This App needs access to your phone's location. Please enable location permissions in settings.",
            [
              {
                text: "OKAY",
                onPress: () => {
                  openSettings().catch(() => {
                    null;
                  });
                },
              },
            ]
          );
        }
      });
    }
  };

  const subscribeLocationLocation = () => {
    Geolocation.clearWatch(watchID);
    watchID = Geolocation.watchPosition((position) => { }, (error) => { }, {
      enableHighAccuracy: true,
      maximumAge: 100,
      distanceFilter: 0.5,

    }
    );
  };

  const watchPosition = () => {
    onLoading(true);

    Geolocation.clearWatch(watchID);
    subscribeLocationLocation()

    setTimeout(() => {
      onWatchPositionHighAccuracy();
    }, 2000);
  }

  const onWatchPositionHighAccuracy = () => {
    onLoading(false);
    Geolocation.getCurrentPosition((info) => {
      onLoading(false);
      setDefultLatitude(JSON.stringify(info.coords.latitude));
      setDefultLongitude(JSON.stringify(info.coords.longitude));
      setLocationPopupVisible(true)
    }, (error) => {
      onWatchPositionLowAccuracy();
    }, {
      enableHighAccuracy: true,
      timeout: 1000,
      interval: 10000,
      distanceFilter: 0.5,
    }
    );

  };

  const onWatchPositionLowAccuracy = async () => {
    onLoading(true);

    Geolocation.getCurrentPosition((info) => {
      onLoading(false);
      setDefultLatitude(JSON.stringify(info.coords.latitude));
      setDefultLongitude(JSON.stringify(info.coords.longitude));
      setLocationPopupVisible(true)
    }, (error) => {
      Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
        [
          {
            text: "OKAY",
            onPress: () => {
            },
          },
        ]
      );
      onLoading(false)
    }, {
      enableHighAccuracy: false,
      interval: 1000,
      distanceFilter: 0.5,
    }
    );
  };

  const onGetCurrentLocation = (currentLatitude, currentLongitude) => {

    onLoading(true);
    if (currentLatitude == "" || currentLongitude == "") {
      Alert.alert(
        "Alert",
        "This App needs access to your phone's location. Please enable location permissions in settings.",
        [
          {
            text: "OKAY",
            onPress: () => {
              // requestLocationPermission();
            },
          },
        ]
      );
    } else {

      setCurrentLatitude(currentLatitude);
      setCurrentLongitude(currentLongitude);

      mapRef.current?.animateToRegion({
        latitude: parseFloat(currentLatitude),
        longitude: parseFloat(currentLongitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      Geocoder.from(currentLatitude, currentLongitude).then((json) => {

        var addressComponent = json.results[0]?.address_components[0]?.long_name;
        var addressComponent1 = json.results[0]?.address_components[1]?.long_name;
        var addressComponent2 = json.results[0]?.address_components[2]?.long_name;
        var addressComponent3 = json.results[0]?.address_components[3]?.long_name;
        var addressComponent4 = json.results[0]?.address_components[4]?.long_name;
        var addressComponent5 = json.results[0]?.address_components[5]?.long_name;

        var data = {
          latitude: currentLatitude,
          longitude: currentLongitude,
          block: addressComponent,
          village: addressComponent3,
          address: json.results[0].formatted_address,
          currentdate: moment(new Date()),
        };

        if ((selectedDistrictsName.toLowerCase()) == (addressComponent3.toLowerCase()) || (selectedDistrictsName.toLowerCase()) == (addressComponent4.toLowerCase())) {
          setLocationDetail(data);
        }
        else {
          Alert.alert('Alert', "Seems you are not on the location, Do like to proceed with current location?", [
            {
              text: 'Yes', onPress: () => {
                setLocationDetail(data);
              }
            },
            {
              text: 'No', onPress: () => {
                if (isLocationDetail?.block == undefined) {
                  setCurrentLongitude(-1);
                  setCurrentLatitude(-1);

                  mapRef.current?.animateToRegion({
                    latitude: 23,
                    longitude: 79,
                    latitudeDelta: 30,
                    longitudeDelta: 30,
                  });
                }
              }
            }
          ]);
        }
      }).catch((error) => {
        var data = {
          latitude: currentLatitude,
          longitude: currentLongitude,
          block: ".",
          village: ".",
          address: ".",
          currentdate: moment(new Date()),
        };
        Alert.alert('Alert', Labels.getOnlyPoint, [
          {
            text: 'Yes', onPress: () => {
              setLocationDetail(data);
            }
          },
          {
            text: 'No', onPress: () => {
              if (isLocationDetail?.block == undefined) {
                setCurrentLongitude(-1);
                setCurrentLatitude(-1);

                mapRef.current?.animateToRegion({
                  latitude: 23,
                  longitude: 79,
                  latitudeDelta: 30,
                  longitudeDelta: 30,
                });
              }
            }
          }
        ]);
      });
    }
    setTimeout(() => {
      onLoading(false);
    }, 1000);
  };

  const onPressCapture = () => {

    if (isImagesUrl.length < 3) {
      ImagePicker.launchCamera(PhotoQualityOptions, (res) => {
        if (res?.errorCode == "camera_unavailable") {
          // Alert.alert("Alert", "Camera not available in your device");
          let images = [...isImagesUrl, Labels?.data];
          setImageUploadUrl(images);

        }
        else if (res?.didCancel) {
        }
        else if (res?.error) {
        }
        else if (res?.customButton) {
        }
        else {

          var response = null;
          response = res?.assets[0];
          onLoading(true);
          var data = {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          };

          let formData = new FormData();
          formData.append("image", data);

          postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            if (resp?.resultFlag == 1) {
              let images = [...isImagesUrl, resp.data];
              setImageUploadUrl(images);
            }
            else {
              Alert.alert("", resp?.message);
            }
            onLoading(false);
          },
            (err) => {
              onLoading(false);
            }
          );
        }
      }
      );
    } else {
      Alert.alert("Alert", "You can upload only 3 images");
    }
  };

  const handlePressImage = (index) => {
    var img = [];
    isImagesUrl.forEach((element) => {
      const obj = { uri: image_base_url + element.imagepath };
      img.push(obj);
    });
    setImages(img);
    setImgIndex(index);
    setIsVisible(true);
  };

  const removeImage = (index) => {
    setImageUploadUrl(oldValues => {
      return oldValues.filter((_, i) => i !== index)
    })

  };

  const onSelectDropdownItem = (selectedOption) => {

    if (selectedOption == isSelectedOption) {
      onSelectDropdown(selectedOption);
    }
    else {
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
      onSelectDropdown(selectedOption);
    }
  }

  const onSelectDropdown = (selectedOption) => {
    setSelectedOption(selectedOption);
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

    //Reset attribute Details
    _popdata = { Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "", ScadaCompatibility: "", RMULocationName: "", RTULocationName: "", ProtocolSupported: "" };

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
      selectedDistricts: selectedDistricts,
      selectedDistrictsName: selectedDistrictsName,
      selectedOption: selectedOption,
      achievementButtonState: achievementButtonState,
      selectedImageOption: "DTR",
      geotagType: "Achievement",
      sessionType: "Feeder",
    });
  }

  const onPressSubmit = (action) => {

    if (isSelectedOption == "Select") {
      Alert.alert("alert", "Please Select HT Line or an LT Line")
      return
    }
    else if (isSelectedOption == "HT Line" && (_scheme == "" || _majorComponent == "" || _oldUGorOH == "" || _oldLTLineVoltage == "" || _oldWhetherCableOrConductor == "" || _oldPoleStructur == "" || _oldCircuitType == "")) {
      Alert.alert("alert", "Please fill HT Line details")
      return
    }
    else if (isSelectedOption == "HT Line" && _oldLTLineVoltage?.title == "Other" && _oldSpecifyTypeVoltage == "") {
      Alert.alert("alert", "Please fill HT Line details")
      return
    }
    else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor?.title == "Cable" && _oldTypeOfCable == "" && _oldCableSize == "") {
      Alert.alert("alert", "Please fill HT Line details")
      return
    }
    else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor?.title == "Cable" && _oldTypeOfCable?.title == "Other" && _olsSpecifyTypeOfCable == "") {
      Alert.alert("alert", "Please fill HT Line details")
      return
    }
    else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor?.title == "Conductor" && _oldTypeOfConductor == "") {
      Alert.alert("alert", "Please fill HT Line details")
      return
    }
    else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor?.title == "Conductor" && _oldTypeOfConductor?.title == "Other" && _olsSpecifyTypeOfConductor == "") {
      Alert.alert("alert", "Please fill HT Line details")
      return
    }
    else if (isSelectedOption == "LT Line" && (_scheme == "" || _majorComponent == "" || _oldUGorOH == "" || _oldWhetherCableOrConductor == "" || _oldSinglePhaseThreePhase == "" || _oldCircuitType == "")) {
      Alert.alert("alert", "Please fill LT Line details")
      return
    }
    else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor?.title == "Cable" && _oldTypeOfCable == "" && _oldCableSize == "") {
      Alert.alert("alert", "Please fill LT Line details")
      return
    }
    else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor?.title == "Cable" && _oldTypeOfCable?.title == "Other" && _olsSpecifyTypeOfCable == "") {
      Alert.alert("alert", "Please fill LT Line details")
      return
    }
    else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor?.title == "Conductor" && _oldTypeOfConductor == "") {
      Alert.alert("alert", "Please fill LT Line details")
      return
    }
    else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor?.title == "Conductor" && _oldTypeOfConductor?.title == "Other" && _olsSpecifyTypeOfConductor == "") {
      Alert.alert("alert", "Please fill LT Line details")
      return
    }



    if (isExitingFeederOption == true)
      onSelectFeederForSubmit(action)
    else
      onSelectSubstationForSubmit(action)

  };

  const onSelectFeederForSubmit = (action) => {

    let obj = null;
    // common filed
    if (isSelectedFeeder == null) {
      Alert.alert("alert", "Please add Feeder.")
      return
    }
    else if (isAssetTypePopup == null) {
      Alert.alert("alert", "Please Select Asset Type.")
      return
    }

    // Pole
    if (isAssetTypePopup == "Pole") {
      if (isLocationDetail == null) {
        Alert.alert("alert", "Please add Location.")
        return
      }
      else if (isImagesUrl.length == 0) {
        Alert.alert("alert", "Please add Image.")
        return
      }
      else if (isExitingFeederOption == true && isSelectedFeeder == null) {
        Alert.alert("alert", "Please add Feeder.")
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
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        item_no: "00" + _lastFeederIndexNum,
        task: action,
        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            item_no: "00" + _lastFeederIndexNum,
            title: feederData?.feeder_name,
            tag_by: UserManager.first_name + " " + UserManager.last_name,
            // index_id: isGenratName + "-Sn00" + (isLastGeotagAssetList.length + 1) + AppUtil.generateUniqueKey(),
            index_id: isGenratName + AppUtil.generateUniqueKey(),
            latitude: isLocationDetail?.latitude,
            longitude: isLocationDetail?.longitude,
            address: isLocationDetail?.address,
            block: isLocationDetail?.block,
            village: isLocationDetail?.village,
            images: isImagesUrl,
            created_at: isLocationDetail?.currentdate,

            remark: isRemark,
            existing_feeder_id: isSelectedFeeder?.id,
            asset_type_geotag_type: "Feeder",
            asset_type: isExitingFeederOption ? isAssetTypePopup : "Substation",
            type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            selectSubstation: isSelectSubstation,


            segmet: isSelectedOption == "HT Line" ? {
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
      };

      onSave(obj);
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
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        item_no: "00" + _lastFeederIndexNum,
        task: action,
        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            item_no: "00" + _lastFeederIndexNum,
            title: isSelectedDtrGeotag?.title,
            tag_by: isSelectedDtrGeotag?.tag_by,
            // index_id: isGenratName + "-Sn00" + (isLastGeotagAssetList.length + 1) + AppUtil.generateUniqueKey(),
            index_id: isGenratName + AppUtil.generateUniqueKey(),
            latitude: isSelectedDtrGeotag?.latitude,
            longitude: isSelectedDtrGeotag?.longitude,
            address: isSelectedDtrGeotag?.address,
            block: isSelectedDtrGeotag?.block,
            village: isSelectedDtrGeotag?.village,
            images: isSelectedDtrGeotag?.images,
            created_at: isSelectedDtrGeotag?.created_at,
            dtr_existing: isSelectedDtrGeotag?.dtr_details,
            selectSubstation: isSelectSubstation,
            remark: isRemark,
            existing_feeder_id: isSelectedFeeder?.id,
            asset_type_geotag_type: "Feeder",
            asset_type: isExitingFeederOption ? isAssetTypePopup : "Substation",
            type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,

            segmet: isSelectedOption == "HT Line" ? {
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
      };

      onSave(obj);
    }
    // DTR-Existing
    else if (isAssetTypePopup == "DTR-Existing") {

      // if (_dtrCapacity == null || _dtrVoltage == null || _modelofdtr == "" || _manufacturingDT == null || _installationDT == null || _dtrMounting == null || _EngravedUnderRDSS == null || _noOffeeder == "") {
      if (_dtrCapacity == null || _dtrVoltage == null) {
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
      else if (isExitingFeederOption == true && isSelectedFeeder == null) {
        Alert.alert("alert", "Please add Feeder.")
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
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        item_no: "00" + _lastFeederIndexNum,
        task: action,
        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            item_no: "00" + _lastFeederIndexNum,
            title: feederData?.feeder_name,
            tag_by: UserManager.first_name + " " + UserManager.last_name,
            // index_id: isGenratName + "-Sn001" + AppUtil.generateUniqueKey(),
            index_id: isGenratName + AppUtil.generateUniqueKey(),
            latitude: isLocationDetail?.latitude,
            longitude: isLocationDetail?.longitude,
            address: isLocationDetail?.address,
            block: isLocationDetail?.block,
            village: isLocationDetail?.village,
            images: isImagesUrl,
            created_at: isLocationDetail?.currentdate,
            selectSubstation: isSelectSubstation,
            remark: isRemark,
            existing_feeder_id: isSelectedFeeder?.id,
            type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            asset_type_geotag_type: "Feeder",
            asset_type: isExitingFeederOption ? isAssetTypePopup : "Substation",

            segmet: isSelectedOption == "HT Line" ? {
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
      };

      onSave(obj);
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
      // else if (isOthersExisting == null) {
      //   Alert.alert("alert", "Please Select Existing Asset Type")
      //   return
      // }
      else if (_poleType == "" || _poleHeight == "" || _existingPole == "" || _branchPoint == "") {
        Alert.alert("alert", "Please add Pole Details")
        return
      }
      else if (_poleType == "Others" && _poleSpecifyType == "") {
        Alert.alert("alert", "Please add Pole Details")
        return
      }

      obj = {
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        item_no: "00" + _lastFeederIndexNum,
        task: action,

        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            item_no: "00" + _lastFeederIndexNum,
            title: isSelectedDtrGeotag?.title,
            tag_by: isSelectedDtrGeotag?.tag_by,
            index_id: isGenratName + AppUtil.generateUniqueKey(),
            latitude: isSelectedDtrGeotag?.latitude,
            longitude: isSelectedDtrGeotag?.longitude,
            address: isSelectedDtrGeotag?.address,
            block: isSelectedDtrGeotag?.block,
            village: isSelectedDtrGeotag?.village,
            images: isSelectedDtrGeotag?.images,
            created_at: isSelectedDtrGeotag?.created_at,
            dtr_existing: isSelectedDtrGeotag?.dtr_details,
            selectSubstation: isSelectSubstation,
            remark: isRemark,
            existing_feeder_id: isSelectedFeeder?.id,
            asset_type_geotag_type: "Feeder",
            asset_type: isExitingFeederOption ? isAssetTypePopup : "Substation",
            type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            OtherExistingAssetType: isOthersExisting,
            segmet: isSelectedOption == "HT Line" ? {
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
      };

      onSave(obj);
    }
    // Other-Existing
    else if (isAssetTypePopup == "Others-Existing") {
      if (isOthersExisting == null) {
        Alert.alert("alert", "Please Select Existing Asset Type")
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
      else if (isExitingFeederOption == true && isSelectedFeeder == null) {
        Alert.alert("alert", "Please add Feeder.")
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
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        item_no: "00" + _lastFeederIndexNum,
        task: action,
        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],
          sl_lattitude: {
            item_no: "00" + _lastFeederIndexNum,
            title: feederData?.feeder_name,
            tag_by: UserManager.first_name + " " + UserManager.last_name,
            index_id: isGenratName + AppUtil.generateUniqueKey(),
            latitude: isLocationDetail?.latitude,
            longitude: isLocationDetail?.longitude,
            address: isLocationDetail?.address,
            block: isLocationDetail?.block,
            village: isLocationDetail?.village,
            images: isImagesUrl,
            created_at: isLocationDetail?.currentdate,
            selectSubstation: isSelectSubstation,
            remark: isRemark,
            existing_feeder_id: isSelectedFeeder?.id,
            asset_type_geotag_type: "Feeder",
            asset_type: isExitingFeederOption ? isAssetTypePopup : "Substation",
            type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            OtherExistingAssetType: isOthersExisting,

            sub_asset_attributes: _popdata,
            sub_asset_type: isOthersExisting,

            segmet: isSelectedOption == "HT Line" ? {
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
      };
      onSave(obj)
    }
    //Rout Point Under-ground
    else if (isAssetTypePopup == "Rout Point / Marker" || isAssetTypePopup == "LTDB" || isAssetTypePopup == "Feeder Pillar") {
      if (isLocationDetail == null) {
        Alert.alert("alert", "Please add Location.")
        return
      }
      else if (isImagesUrl.length == 0) {
        Alert.alert("alert", "Please add Image.")
        return
      }
      else if (isExitingFeederOption == true && isSelectedFeeder == null) {
        Alert.alert("alert", "Please add Feeder.")
        return
      }

      obj = {
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        item_no: "00" + _lastFeederIndexNum,
        task: action,
        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            item_no: "00" + _lastFeederIndexNum,
            title: feederData?.feeder_name,
            tag_by: UserManager.first_name + " " + UserManager.last_name,
            index_id: isGenratName + AppUtil.generateUniqueKey(),
            latitude: isLocationDetail?.latitude,
            longitude: isLocationDetail?.longitude,
            address: isLocationDetail?.address,
            block: isLocationDetail?.block,
            village: isLocationDetail?.village,
            images: isImagesUrl,
            created_at: isLocationDetail?.currentdate,

            remark: isRemark,
            existing_feeder_id: isSelectedFeeder?.id,
            asset_type_geotag_type: "Feeder",
            asset_type: isExitingFeederOption ? isAssetTypePopup : "Substation",
            type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            selectSubstation: isSelectSubstation,

            segmet: isSelectedOption == "HT Line" ? {
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
      };

      onSave(obj);
    }
  }

  const onSelectSubstationForSubmit = (action) => {
    if (isRemark == "") {
      Alert.alert("alert", "Please add remarks.")
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
    else if (isExitingFeederOption == true && isSelectedFeeder == null) {
      Alert.alert("alert", "Please add Feeder.")
      return
    }

    let obj = {
      role_id: UserManager.role_id,
      user_id: UserManager.id,
      discom_id: UserManager.discom_id,
      district_id: JSON.stringify(selectedDistricts),
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
      item_no: "00" + _lastFeederIndexNum,
      task: action,

      geotagData: {
        fedeer_id: [feederData?.id],
        fedeer_code: [feederData?.feeder_code],

        sl_lattitude: {
          item_no: "00" + _lastFeederIndexNum,
          estimatedDistance: 0,
          actualDistance: 0,
          title: feederData?.feeder_name,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          index_id: isGenratName + AppUtil.generateUniqueKey(),
          latitude: isLocationDetail?.latitude,
          longitude: isLocationDetail?.longitude,
          address: isLocationDetail?.address,
          block: isLocationDetail?.block,
          village: isLocationDetail?.village,
          images: isImagesUrl,
          created_at: isLocationDetail?.currentdate,

          remark: isRemark,
          existing_feeder_id: isSelectedFeeder?.id,
          asset_type_geotag_type: "Substation",
          asset_type: "Substation",
          type_of_segment: isSelectedOption == "LT Line" ? "LTline" : "HTline",

          segmet: isSelectedOption == "HT Line" ? {
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
    };

    onSave(obj)

  }

  function onSave(obj) {

    if (_clicked) {
      _clicked = false;

      onLoading(true);
      Service.post(EndPoints.saveFeeder, obj, (res) => {

        if (res._resultflag) {
          Alert.alert("", res.message, [
            {
              text: "OK",
              onPress: () =>
                props.navigation.navigate("FeederAssets", {
                  feederDetails: feederDetails,
                  feederData: feederData,
                  selectedDistricts: selectedDistricts,
                  selctOP: selectedOption,
                  achievementButtonState,
                  isDTRList: isDTRList,
                  selectedDistrictsName,
                  backJump,
                }
                ),
            },
          ]);
        } else showErrorToast(res.message);
      },
        (err) => {
          onLoading(false);
        }
      );

      setTimeout(() => {
        _clicked = true;
        onLoading(false);
      }, 1000);
    }

  }

  const onPressOther = () => {
    props.navigation.navigate("OtherListScreen", {
      selectedDistricts: { "title": selectedDistrictsName, "value": selectedDistricts },
      selectedOption: selectedOption,
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

  return (
    <SafeAreaView style={PageStyle.mainView}>
      <Header
        title="Feeder Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ paddingBottom: AppUtil.getHP(5) }} >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled" >

          <View style={PageStyle.title}>
            <Text style={PageStyle.text}>
              {feederData.feeder_name}
            </Text>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate("FeederAssets",
                { feederDetails: feederDetails, feederData: feederData, selectedDistricts: selectedDistricts, selctOP: selectedOption, achievementButtonState, isDTRList: isDTRList, selectedDistrictsName, backJump, }
              )
            }}
              style={PageStyle.btnSkip}>
              <Text style={PageStyle.txtSkip}>{Labels.skip}</Text>
            </TouchableOpacity>
          </View>

          <View style={PageStyle.modifySearch}>
            <Text style={PageStyle.modifySearchText}>
              {Labels.generalDetails}
            </Text>
          </View>

          <View style={PageStyle.innerContainer}>

            <Text style={PageStyle.dropSelectText}>{Labels.HtLtLineTitle}</Text>

            <TouchableOpacity style={PageStyle.modifySearch2} onPress={() => setDropVisible(!isDropVisible)}>
              <Text style={PageStyle.modifySearchText2}>
                {isSelectedOption}
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

            {isSelectedOption != "Select" &&
              <TouchableOpacity style={PageStyle.heading} onPress={() => isSelectedOption == "LT Line" ? onSelectDropdown("LT Line") : onSelectDropdown("HT Line")}>
                <View style={PageStyle.textView}>
                  <Text style={PageStyle.headingText}>{isSelectedOption}</Text>
                </View>
                <View style={PageStyle.icnView}>
                  <IcnDetails />
                </View>
              </TouchableOpacity>
            }

            <View style={PageStyle.dropSelect}>

              <FeederRadioButton onPress={(value) => { onSelectSubstationOrExistingFeeder(value) }} title={"Feeder Starting Point (Substation/ Existing Feeder)"} />

              {isExitingFeederOption ? (
                <>
                  <View style={{ marginTop: 20 }}>
                    <SingleDropdownList title={Labels.SelectFilterbySubstationName} data={isSubstationList} onSelectedSevice={(value) => { onSelectSubstation(value); }} />
                  </View>

                  {isFeederList.length > 0 &&
                    <View style={{ marginTop: 10 }}>
                      <SingleDropdownList title={"Existing Feeder*"} data={isFeederList} onSelectedSevice={(value) => { setSelectedFeeder(value); }} />
                    </View>
                  }
                  <View style={{ marginTop: 10 }}>
                    <AssetDropDown title={"Asset Type*"} data={AssetType} onSelectedSevice={(value) => { onSelectAssetType(value); }} />
                  </View>

                  {
                    isAssetTypePopup === "DTR-RDSS" && isDtrRdssData.length > 0 ?
                      <>
                        <View style={{ marginTop: 10 }}>
                          <SingleDropdownList title={"Select Geotagged DTR under RDSS*"} data={isDtrRdssData} onSelectedSevice={(value) => { setSelectedDtrGeotagList(value) }} />
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
                      <SingleDropdownList title={"Select Other Asset Type*"} data={isDropDownList?.other_rdss_asset?.asset_type} onSelectedSevice={(value) => { onOtherExisting(value.title) }} />
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
                </>

              ) : (
                <Text style={PageStyle.textInput}>
                  {feederDetails.substation_name ? feederDetails?.substation_name : "no Name"}{" "}
                </Text>
              )}

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
                isExitingFeederOption && isAssetTypePopup != "Rout Point / Marker" && isAssetTypePopup != "LTDB" && isAssetTypePopup != "Feeder Pillar" &&
                <View style={[PageStyle.btnDTRSubmit, { marginTop: 15 }]}>
                  <Text style={PageStyle.txtAddDTRRDSS}>{Labels.ProvidePoleDetails}</Text>
                  <TouchableOpacity style={PageStyle.btnDTRClick} onPress={() => { setPollDetailsVisible(true) }}>
                    <Text style={PageStyle.txtAddDTR}>{Labels.Details}</Text>
                  </TouchableOpacity>
                </View>
              }
              <Text style={PageStyle.fieldTitle}>Remarks*</Text>

              <View style={PageStyle.container1}>
                <TextInput
                  maxLength={70}
                  value={isRemark}
                  editable={true}
                  style={PageStyle.enabledField}
                  placeholder="Enter Your Remarks"
                  placeholderTextColor="grey"
                  textAlign="center"
                  textAlignVertical="center"
                  onChangeText={(text) => setRemark(text)}
                />
              </View>
              {isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                <>
                  <LocationBar
                    title="Complete Address *"
                    icon={<IcnAddress />}
                    getdata={isLocationDetail?.address}
                    setData={(text) => setAddress(text)}
                    handlePress={() => onLocationPress()}
                  />

                  <InputFields3
                    title1="Block"
                    value1={isLocationDetail?.block}
                    title2="Town/City/State"
                    value2={isLocationDetail?.village}
                  />

                  <View style={{ width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), borderWidth: 0.5, borderColor: Colors.orange, }}>

                    <MapView style={{ width: '100%', height: '100%' }} ref={mapRef} initialRegion={isInitialRegion} mapType={isMapview == "satellite" ? "satellite" : "standard"}>
                      <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
                      </Marker>
                    </MapView>

                    <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
                      onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                      <IcnAddress />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <SubmitBtn title="Capture Photo" onPress={() => onPressCapture()} />
                  </View>


                  {isImagesUrl.length > 0 && <GeotagThreeImageOptimazeModule item={isImagesUrl} handlePressImage={(index) => handlePressImage(index)} removeImage={(index) => removeImage(index)} />}
                </>
              }

              <SubmitBtn title="Save & Next Geotag" onPress={() => { onPressSubmit("save") }} />
              <SubmitBtn title="Submit & Next Geotag" onPress={() => { onPressSubmit("submit") }} />

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ImageViewer
        isVisible={visible}
        handleClose={() => setIsVisible(false)}
        images={images}
        index={imgIndex}
      />

      <LocationPopup
        isVisible={isLocationPopupVisible}
        handleClose={() => setLocationPopupVisible(false)}
        lett={isDefultLatitude}
        long={isDefultLongitude}
        finalPont={(data) => onGetCurrentLocation(data?.latitude, data?.longitude)}
      />

      <HTLinePopup
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
    </SafeAreaView >
  );
}

export default React.memo(FeederGeneralAssetOptions);
