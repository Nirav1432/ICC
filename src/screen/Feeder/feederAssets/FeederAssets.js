import { View, Text, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { act, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, useIsFocused, useRoute } from "@react-navigation/native";
import { FeederAssetsStyle } from "./FeederAssetsStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Labels } from "../../../utils/Labels";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import IcnAddress from "../../../assets/svg/powerTransformersSvgs/IcnAddress";
import IcnDetails from "../../../assets/svg/IcnDetails";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import { onLoading } from "../../../../App";
import { EndPoints } from "../../../service/Endpoints";
import { ImageUploadAPI, Service, postFormDataAPI } from "../../../service/Service";
import LocationBar from "../../../components/locationBar/LocationBar";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { requestMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import * as ImagePicker from "react-native-image-picker";
import { GOOGLE_API_KEY, image_base_url } from "../../../service/appConfig";
import moment from "moment";
import { UserManager } from "../../../manager/UserManager";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { Colors } from "../../../utils/Colors";
import IcnMap from "../../../assets/svg/IcnMap";
import SingleDropdownListWithIcn from "../../../components/singleselectlist/SingleDropdownListWithIcn";
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import DTRDetailePopup from "../../Approval/DTRDetailePopup";
import PolDetailePopup from "../../Approval/PolDetailePopup";
import { AppUtil, PhotoQualityOptions } from "../../../utils/AppUtil";
import MapView, { Marker, Polyline } from "react-native-maps";
import IcnFeeder from "../../../assets/svg/IcnFeeder";
import IcnPowerTransformers from "../../../assets/svg/IcnPowerTransformers";
import IcnDTR1 from "../../../assets/svg/IcnDTR1";
import IcnPole from "../../../assets/svg/IcnPole";
import IcnSubstations from "../../../assets/svg/IcnSubstations";
import LocationPopup from "../../../components/LocationPopup";
import { AssetType, LTHToptions } from "../../../utils/CardData";
import LTLinePopup from "../../../components/LTLinePopup";
import DtrRdssData from "../../../model/DtrRdssData";
import PollDetails from "../../../components/PollDetails";
import DtrModalView from "../../../components/dtrModal/DtrModalView";
import { TextInput } from "react-native-gesture-handler";
import HTLinePopupSingaleValue from "../../../components/HTLinePopupSingaleValue";
import AssetDropDown from "../../../components/dde/dropdownNewList/assetDropDown";
import OtherSubAssetPop from "../../../components/OtherSubAssetPop";
import InputFields3 from "../../../components/inputFields/InputFields3";
import IcnRoutPointMarker from "../../../assets/svg/IcnRoutPointMarker";
import GeotagThreeImageOptimazeModule from "../../../components/GeotagThreeImageOptimazeModule";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import IncFeederPillar from "../../../assets/svg/IncFeederPillar";
import { Loger } from "../../../utils/Loger";
import IcnLTDB from "../../../assets/svg/IcnLTDB";


var _lastFeederIndexNum = 0;
var _typeItemDetails = "";
let watchID = null;

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

function FeederAssets(props) {

  const route = useRoute();
  const { feederDetails, feederData, selectedDistricts, selctOP, achievementButtonState, selectedDistrictsName, backJump } = route.params;

  const [isLastGeotagAssetList, setLastGeotagAssetList] = useState([]);

  const [isLocationDetail, setLocationDetail] = useState(null);
  const [isImagesUrl, setImageUploadUrl] = useState([]);
  const [isSelectedAssesId, setSelectedAssesId] = useState(null);
  const [isDropVisible, setDropVisible] = useState(false);
  const [isDropDownList, setDropDownList] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isGenratName, setGenratName] = useState("");
  const [isList, setList] = useState([]);
  const [isAddress, setAddress] = useState("");

  const [isDTRpopupVisible, setDTRpopupVisible] = useState(false);
  const [isPolPopupVisible, setPolPopupVisible] = useState(false);

  const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
  const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
  const [isMapview, setMapview] = useState("standard");
  const mapRef = React.useRef(null);

  const [isInitialRegion, setInitialRegion] = useState(
    {
      latitude: 23,
      longitude: 79,
      latitudeDelta: 30,
      longitudeDelta: 30,
    }
  );
  const [isPolylineArr, setPolylineArr] = useState([]);
  const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
  const [isDefultLongitude, setDefultLongitude] = useState(-1);
  const [isDefultLatitude, setDefultLatitude] = useState(-1);

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

  // useEffect(() => {
  //   const { routes } = props.navigation.getState();
  //   const filteredRoutes = routes.filter(route => route.name !== 'FeederGeneralAssetOptions');

  //   props.navigation.dispatch(
  //     CommonActions.reset({
  //       index: filteredRoutes.length - 1,
  //       routes: filteredRoutes,
  //     }),
  //   )
  // }, []);

  useEffect(() => {
    subscribeLocationLocation();
    return () => {
      mapRef.current = null;
      Geolocation.clearWatch(watchID);
    };
  }, []);

  useEffect(() => {
    onFetchFeeder();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        onFatchDtrRdssData();
        onFatchOtherRdssData();
      }, 500);
    }
  }, [isFocused])

  const onFetchFeeder = () => {
    onLoading(true);
    let data = {
      "role_id": UserManager.role_id,
      "user_id": UserManager.id,
      "discom_id": UserManager.discom_id,
      "district_id": JSON.stringify(selectedDistricts),
      "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
      "taging_for": selctOP,
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
      "district_id": JSON.stringify(selectedDistricts),
      "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
      "taging_for": selctOP,
      "fedeer_id": feederDetails?.id,
      "fedeer_code": feederDetails?.feeder_code
    }

    Service.post(EndPoints.getGeoTagList, data, (response) => {
      onLoading(false);
      if (response._resultflag == 1) {
        setList(response?.data);
        onLocationPress()
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

  const onLocationPress = async () => {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization((info) => {
        watchPosition();
      })
      watchPosition();
    }
    else {
      requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then((statuses) => {

        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted") {
          watchPosition();
        }
        else {
          Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
            [
              {
                text: 'OKAY', onPress: () => {
                  openSettings().catch(() => { null });
                }
              },
              { text: 'CANCEL', onPress: () => { } },
            ]);
        }

      });
    }
  }

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition((position) => { }, (error) => { }, {
      enableHighAccuracy: true,
      maximumAge: 100,
      distanceFilter: 0.5
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
    onLoading(true);
    Geolocation.getCurrentPosition(info => {
      onLoading(false);
      setDefultLatitude(JSON.stringify(info.coords.latitude));
      setDefultLongitude(JSON.stringify(info.coords.longitude));
      setLocationPopupVisible(true)
    }, (error) => {
      onWatchPositionLowAccuracy();
    }, {
      enableHighAccuracy: true,
      timeout: 1000,
      interval: 1000,
      distanceFilter: 0.5,
    });
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

      if (currentLatitude && currentLongitude && isSelectedAssesId?.obj?.latitude && isSelectedAssesId?.obj?.longitude) {
        setEstimatedDistance(AppUtil.getDistance(currentLatitude, currentLongitude, isSelectedAssesId?.obj?.latitude, isSelectedAssesId?.obj?.longitude))
      }

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


        if ((selectedDistrictsName.toLowerCase()) == (addressComponent3?.toLowerCase()) ||
          (selectedDistrictsName.toLowerCase()) == (addressComponent4?.toLowerCase())) {
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
        ]);
      });
    }

    setTimeout(() => { onLoading(false); }, 2000)

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
        } else {

          var response = null;
          response = res?.assets[0];

          onLoading(true);
          var data = { uri: response.uri, name: response.fileName, type: response.type, };

          let formData = new FormData();
          formData.append("image", data);

          ImageUploadAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];

            setImageUploadUrl(images);
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

  

  const removeImage = (index) => {
    setImageUploadUrl(oldValues => {
      return oldValues.filter((_, i) => i !== index)
    })
  };

  const onclickViewAll = () => {
    props.navigation.navigate("FeederViewMoreAssetScreen", {
      selectedDistricts,
      achievementButtonState,
      selectedOption: selctOP,
      feeder_id: feederDetails?.id,
      feeder_code: feederDetails?.feeder_code,
      feederDetails: feederDetails,
      feederData,
      selectedDistrictsName
    });

  }

  const onTypeTextClick = (obj) => {

    _typeItemDetails = obj?.poleDetails;


    if (obj.asset_type == "DTR") {
      setDTRpopupVisible(true);
    }
    else if (obj.asset_type == "Pole") {
      setPolPopupVisible(true);
    }
  }

  const onTestCommonCardPress = (dt) => {

    let obj = {
      title: dt?.title,
      index_id: dt?.index_id,
      tag_by: dt?.tag_by,
      item: dt,

      taging_for: selctOP,
      fedeer_id: feederDetails?.id,
      fedeer_code: feederDetails?.feeder_code,
      district_id: selectedDistricts,
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
    };
    props.navigation.navigate("FeederDdeDetailsDetailsScreen", { obj });
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
      if (isCurrentLatitude != -1 && isCurrentLongitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
        setEstimatedDistance(AppUtil.getDistance(isCurrentLatitude, isCurrentLongitude, value?.obj?.latitude, value?.obj?.longitude))
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
      selectedDistricts: selectedDistricts,
      selectedDistrictsName: selectedDistrictsName,
      selectedOption: selctOP,
      achievementButtonState: achievementButtonState,
      selectedImageOption: "DTR",
      geotagType: "Achievement",
      sessionType: "Feeder",
    });
  }

  const onSaveGeotag = (action) => {

    let obj = null;

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
      else if (isImagesUrl.length == 0) {
        Alert.alert("alert", "Please add Image.")
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
        "form_id": 33,

        "role_id": UserManager.role_id,
        "user_id": UserManager.id,
        "discom_id": UserManager.discom_id,
        "district_id": JSON.stringify(selectedDistricts),
        "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
        "taging_for": selctOP,
        "task": action,
        "item_no": "00" + _lastFeederIndexNum,

        "geotagData": {
          "fedeer_id": [feederData?.id],
          "fedeer_code": [feederData?.feeder_code],

          "sl_lattitude": {
            "item_no": "00" + _lastFeederIndexNum,
            estimatedDistance: isEstimatedDistance,
            actualDistance: isActualDistance,
            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
            "remark": isRemark,
            "index_id": isGenratName + AppUtil.generateUniqueKey(),
            "asset_type": isAssetTypePopup,
            "title": feederData?.feeder_name,
            created_at: isLocationDetail?.currentdate,
            "latitude": isLocationDetail?.latitude,
            "longitude": isLocationDetail?.longitude,
            "address": isLocationDetail?.address,
            "block": isLocationDetail?.block,
            "village": isLocationDetail?.village,
            "tag_by": UserManager.first_name + " " + UserManager.last_name,
            "images": isImagesUrl,
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
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        "item_no": "00" + _lastFeederIndexNum,
        "task": action,

        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            "item_no": "00" + _lastFeederIndexNum,
            estimatedDistance: isEstimatedDistance,
            actualDistance: isActualDistance,

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
            preceding_geotagged_asset_ID: isSelectedAssesId?.title,
            remark: isRemark,
            asset_type: isAssetTypePopup,
            type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            dtr_existing: isSelectedDtrGeotag?.dtr_details,

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
      else if (isLocationDetail == null) {
        Alert.alert("alert", "Please add Location.")
        return
      }
      else if (isImagesUrl.length == 0) {
        Alert.alert("alert", "Please add Image.")
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
        "form_id": 33,

        "role_id": UserManager.role_id,
        "user_id": UserManager.id,
        "discom_id": UserManager.discom_id,
        "district_id": JSON.stringify(selectedDistricts),
        "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
        "taging_for": selctOP,
        "task": action,
        "item_no": "00" + _lastFeederIndexNum,
        "geotagData": {
          "fedeer_id": [feederData?.id],
          "fedeer_code": [feederData?.feeder_code],

          "sl_lattitude": {
            "item_no": "00" + _lastFeederIndexNum,
            estimatedDistance: isEstimatedDistance,
            actualDistance: isActualDistance,

            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
            "remark": isRemark,
            "index_id": isGenratName + AppUtil.generateUniqueKey(),
            "asset_type": isAssetTypePopup,
            "title": feederData?.feeder_name,
            created_at: isLocationDetail?.currentdate,
            "latitude": isLocationDetail?.latitude,
            "longitude": isLocationDetail?.longitude,
            "address": isLocationDetail?.address,
            "block": isLocationDetail?.block,
            "village": isLocationDetail?.village,
            "tag_by": UserManager.first_name + " " + UserManager.last_name,
            "images": isImagesUrl,

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
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        "task": action,
        "item_no": "00" + _lastFeederIndexNum,

        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            "item_no": "00" + _lastFeederIndexNum,
            preceding_geotagged_asset_ID: isSelectedAssesId?.title,
            estimatedDistance: isEstimatedDistance,
            actualDistance: isActualDistance,

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
            remark: isRemark,
            asset_type: isAssetTypePopup,
            type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
            selected_asset_type: isAssetTypePopup,
            // otherExistingAssetType: isOthersExisting,

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
      else if (isLocationDetail == null) {
        Alert.alert("alert", "Please add Location.")
        return;
      }
      else if (isImagesUrl.length == 0) {
        Alert.alert("alert", "Please add Image.")
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
        form_id: 33,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        "task": action,
        "item_no": "00" + _lastFeederIndexNum,

        geotagData: {
          fedeer_id: [feederData?.id],
          fedeer_code: [feederData?.feeder_code],

          sl_lattitude: {
            "item_no": "00" + _lastFeederIndexNum,
            estimatedDistance: isEstimatedDistance,
            actualDistance: isActualDistance,

            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
            "remark": isRemark,
            "index_id": isGenratName + AppUtil.generateUniqueKey(),
            "asset_type": isAssetTypePopup,
            "title": feederData?.feeder_name,

            "latitude": isLocationDetail?.latitude,
            "longitude": isLocationDetail?.longitude,
            "address": isLocationDetail?.address,
            "block": isLocationDetail?.block,
            "village": isLocationDetail?.village,
            "tag_by": UserManager.first_name + " " + UserManager.last_name,
            "images": isImagesUrl,
            created_at: isLocationDetail?.currentdate,

            actualDistance: isActualDistance,
            preceding_geotagged_asset_ID: isSelectedAssesId?.title,
            remark: isRemark,
            asset_type: isAssetTypePopup,
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
    // Rout Point / Marker , LTDB , Feeder Pillar
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
        "district_id": JSON.stringify(selectedDistricts),
        "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
        "taging_for": selctOP,
        "task": action,
        "item_no": "00" + _lastFeederIndexNum,

        "geotagData": {
          "fedeer_id": [feederData?.id],
          "fedeer_code": [feederData?.feeder_code],

          "sl_lattitude": {
            "item_no": "00" + _lastFeederIndexNum,
            estimatedDistance: isEstimatedDistance,
            actualDistance: isActualDistance,
            "preceding_geotagged_asset_ID": isSelectedAssesId?.title,
            "remark": isRemark,
            "index_id": isGenratName + AppUtil.generateUniqueKey(),
            "asset_type": isAssetTypePopup,
            "title": feederData?.feeder_name,
            created_at: isLocationDetail?.currentdate,
            "latitude": isLocationDetail?.latitude,
            "longitude": isLocationDetail?.longitude,
            "address": isLocationDetail?.address,
            "block": isLocationDetail?.block,
            "village": isLocationDetail?.village,
            "tag_by": UserManager.first_name + " " + UserManager.last_name,
            "images": isImagesUrl,
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

    onLoading(true);
    Service.post(EndPoints.saveFeeder, obj, (res) => {
      onLoading(false);
      if (res._resultflag) {

        Alert.alert('Alert', res.message, [
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


              if (backJump) {
                const popAction = StackActions.pop(2);
                props.navigation.dispatch(popAction);
              }
              else {
                props.navigation.goBack();
              }

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

  const onPressOther = () => {
    props.navigation.navigate("OtherListScreen", {
      selectedDistricts: { "title": selectedDistrictsName, "value": selectedDistricts },
      selectedOption: selctOP,
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

  const handlePressImage = (index) => {
    var img = [];
    isImagesUrl.forEach(element => {
      const obj = { uri: image_base_url + element.imagepath };
      img.push(obj);
    });
    setImages(img);
    setImgIndex(index)
    setIsVisible(true)
  }

  return (
    <SafeAreaView style={[FeederAssetsStyle.mainView,]}>

      <Header title="HT Line / LT Line Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => { props.navigation.goBack() }}
        rightIcon={<IcnMap />}
        onRightPress={() => props.navigation.navigate("MapScreen", { type: "Feeder", district_id: selectedDistricts, feeder_id: feederDetails?.id })}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
      
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled" >

          <View style={FeederAssetsStyle.title}>
            <Text style={[FeederAssetsStyle.text, { color: "black" }]}>
              {feederData.feeder_name}
            </Text>
          </View>

          <View style={FeederAssetsStyle.container}>

            <View style={FeederAssetsStyle.modifySearch}>
              <Text style={FeederAssetsStyle.modifySearchText}>
                {Labels.generalDetails}
              </Text>
            </View>

            <View style={FeederAssetsStyle.innerContainer}>
              <Text style={FeederAssetsStyle.dropSelectText}>{Labels.HtLtLineTitle}</Text>
              <TouchableOpacity style={FeederAssetsStyle.modifySearch2} onPress={() => setDropVisible(!isDropVisible)}>
                <Text style={FeederAssetsStyle.modifySearchText2}>
                  {isSelectedLTHTOption}
                </Text>
                <IcnGreyDown />
              </TouchableOpacity>

              {isDropVisible && (
                <View style={FeederAssetsStyle.options}>
                  {LTHToptions.map((option, index) => (
                    <TouchableOpacity key={index} onPress={() => onSelectDropdownItem(option.label)} style={[FeederAssetsStyle.optionButton, index === LTHToptions.length - 1 && FeederAssetsStyle.lastOptionButton,]}>
                      <Text style={FeederAssetsStyle.btnTxt}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {isSelectedLTHTOption != "Select" &&
                <TouchableOpacity style={FeederAssetsStyle.heading} onPress={() => isSelectedLTHTOption == "LT Line" ? onSelectDropdown("LT Line") : onSelectDropdown("HT Line")}>
                  <View style={FeederAssetsStyle.textView}>
                    <Text style={FeederAssetsStyle.headingText}>{isSelectedLTHTOption}</Text>
                  </View>
                  <View style={FeederAssetsStyle.icnView}>
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
                    <View style={FeederAssetsStyle.btnDTRSubmit}>
                      <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.AddAnotherDTRRDSS}</Text>
                      <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { onPressDTR() }}>
                        <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.AddDTR}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                  :
                  isAssetTypePopup === "DTR-RDSS" &&
                  <View style={FeederAssetsStyle.btnDTRSubmit}>
                    <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.AddDTRRDSS}</Text>
                    <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { onPressDTR() }}>
                      <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.AddDTR}</Text>
                    </TouchableOpacity>
                  </View>
              }

              {
                isAssetTypePopup === "DTR-Existing" &&
                <TouchableOpacity style={FeederAssetsStyle.heading} onPress={() => onGetDtrSettingListDetails("DTR-Existing")}>
                  <View style={FeederAssetsStyle.textView}>
                    <Text style={FeederAssetsStyle.headingText}>{"DTR-Existing Popup"}</Text>
                  </View>
                  <View style={FeederAssetsStyle.icnView}>
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
                <TouchableOpacity style={FeederAssetsStyle.heading} onPress={() => setSubAsetVisible(true)}>
                  <View style={FeederAssetsStyle.textView}>
                    <Text style={FeederAssetsStyle.headingText}>{"Select asset attributes"}</Text>
                  </View>
                  <View style={FeederAssetsStyle.icnView}>
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

                    <View style={FeederAssetsStyle.btnDTRSubmit}>
                      <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.AddOthersRDSS}</Text>
                      <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { onPressOther() }}>
                        <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.Others}</Text>
                      </TouchableOpacity>
                    </View>

                  </>
                  :
                  isAssetTypePopup === "Others-RDSS" &&
                  <View style={FeederAssetsStyle.btnDTRSubmit}>
                    <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.AddOthersRDSS}</Text>
                    <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { onPressOther() }}>
                      <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.Others}</Text>
                    </TouchableOpacity>
                  </View>
              }



              {isSelectedDtrGeotag != null && (isAssetTypePopup === "DTR-RDSS" || isAssetTypePopup === "Others-RDSS") &&
                <>
                  <Text style={[FeederAssetsStyle.txtAddDTRRDSS, { marginTop: 10 }]}>{Labels.GeotaggedDTRassetID}</Text>
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
                <View style={[FeederAssetsStyle.btnDTRSubmit, { marginTop: 15 }]}>
                  <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.ProvidePoleDetails}</Text>
                  <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { setPollDetailsVisible(true) }}>
                    <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.Details}</Text>
                  </TouchableOpacity>
                </View>
              }


              {/* -------------------------------------------------------- */}

              <View style={FeederAssetsStyle.dropSelect}>
                {
                  isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                  <>
                    <LocationBar
                      title="Complete Address*"
                      icon={<IcnAddress />}
                      getdata={isLocationDetail?.address}
                      setData={(text) => setAddress(text)}
                      handlePress={() => onFetchFeederList()}
                    />

                    <InputFields3
                      backgroundColor={true}
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

                      <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"} />

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

                  {/* {isLastGeotagAssetList.length > 0 && ((isAssetTypePopup === "DTR-RDSS" && isSelectedDtrGeotag != null) || isAssetTypePopup != "DTR-RDSS")&& */}
                  {isLastGeotagAssetList.length > 0 &&
                    <>
                      <SingleDropdownListWithIcn icn={""} title={"Select preceding geotagged asset ID"} data={isLastGeotagAssetList}
                        onSelectedSevice={(value) => { onSelectPrecendingID(value) }} />


                      {isSelectedAssesId != null &&
                        <>
                          <Text style={FeederAssetsStyle.fieldTitle}>Estimated aerial length of line from preceding geotagged asset ID (CMtrs.)</Text>
                          <Text style={FeederAssetsStyle.textInput}>{isEstimatedDistance}</Text>
                          <Text style={FeederAssetsStyle.fieldTitle}>Actual length of line from preceding geotagged asset ID (CMtrs.)*</Text>
                          <View style={FeederAssetsStyle.container1}>
                            <TextInput
                              maxLength={6}
                              value={isActualDistance}
                              editable={true}
                              style={FeederAssetsStyle.enabledField}
                              keyboardType="numeric"
                              onChangeText={(text) => setActualDistance(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",<> \{\}\[\]\\\/]/gi, ''))}
                            />
                          </View>
                        </>
                      }

                    </>
                  }

                  <Text style={FeederAssetsStyle.fieldTitle}>Remarks</Text>
                  <View style={FeederAssetsStyle.container1}>
                    <TextInput
                      maxLength={70}
                      value={isRemark}
                      editable={true}
                      style={FeederAssetsStyle.enabledField}
                      onChangeText={(text) => setRemark(text)}
                    />
                  </View>
                </View>

                {
                  isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                  <SubmitBtn title="Capture Photo" onPress={() => { onPressCapture() }} />
                }

                {isImagesUrl.length > 0 &&
                  <GeotagThreeImageOptimazeModule item={isImagesUrl} handlePressImage={(index) => handlePressImage(index)} removeImage={(index) => removeImage(index)} />
                }

                <SubmitBtn title="Save" onPress={() => { onSaveGeotag("save") }} />
                <SubmitBtn title="Submit" onPress={() => { onSaveGeotag("submit") }} />

              </View>
            </View>
          </View>
        </ScrollView>
      
      </KeyboardAvoidingView>


      <LocationPopup
        isVisible={isLocationPopupVisible}
        handleClose={() => setLocationPopupVisible(false)}
        lett={isDefultLatitude}
        long={isDefultLongitude}
        finalPont={(data) => onGetCurrentLocation(data?.latitude, data?.longitude)}
      />

      <ImageViewer isVisible={visible} handleClose={() => setIsVisible(false)} images={images} index={imgIndex} />

      <DTRDetailePopup data={_typeItemDetails} isVisible={isDTRpopupVisible} handleClose={() => setDTRpopupVisible(false)} />
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
}
export default React.memo(FeederAssets);