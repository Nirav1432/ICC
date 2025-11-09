import { View, Text, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRoute } from "@react-navigation/native";
import { FeederAssetsStyle } from "./FeederAssetsStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Labels } from "../../../utils/Labels";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import IcnAddress from "../../../assets/svg/powerTransformersSvgs/IcnAddress";
import IcnDetails from "../../../assets/svg/IcnDetails";
import InputFields2 from "../../../components/inputFields/InputFields2";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import AddressCard from "../../../components/addressCard/AddressCard";
import DtrModalView from "../../../components/dtrModal/DtrModalView";
import PoleModalView from "../../../components/poleModal/PoleModalView";
import { onLoading } from "../../../../App";
import { EndPoints } from "../../../service/Endpoints";
import { ImageUploadAPI, Service, postFormDataAPI } from "../../../service/Service";
import LocationBar from "../../../components/locationBar/LocationBar";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { useFocusEffect } from '@react-navigation/native';
import { requestMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import * as ImagePicker from "react-native-image-picker";
import { GOOGLE_API_KEY, image_base_url } from "../../../service/appConfig";
import moment from "moment";
import { UserManager } from "../../../manager/UserManager";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { CommonActions, Link } from '@react-navigation/native';
import { Colors } from "../../../utils/Colors";
import LocationPopup from "../../../components/LocationPopup";
import HTLinePopupSingaleValue from "../../../components/HTLinePopupSingaleValue";
import LTLinePopup from "../../../components/LTLinePopup";
import PollDetails from "../../../components/PollDetails";
import { AppUtil, PhotoQualityOptions } from "../../../utils/AppUtil";
import DtrRdssData from "../../../model/DtrRdssData";
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import { Loger } from "../../../utils/Loger";
import AssetDropDown from "../../../components/dde/dropdownNewList/assetDropDown";
import MapView, { Marker, Polyline } from "react-native-maps";
import IcnFeeder from "../../../assets/svg/IcnFeeder";
import IcnSubstations from "../../../assets/svg/IcnSubstations";
import IcnDTR1 from "../../../assets/svg/IcnDTR1";
import IcnPole from "../../../assets/svg/IcnPole";
import IcnPowerTransformers from "../../../assets/svg/IcnPowerTransformers";
import DtrRdssDropdown from "../../../components/singleselectlist/DtrRdssDropdown";
import OtherSubAssetPop from "../../../components/OtherSubAssetPop";
import { AssetType } from "../../../utils/CardData";
import InputFields3 from "../../../components/inputFields/InputFields3";
import GeotagThreeImageOptimazeModule from "../../../components/GeotagThreeImageOptimazeModule";
import SingleDropdownListWithIcn from "../../../components/singleselectlist/SingleDropdownListWithIcn";

var _latitude = "";
var _longitude = "";
var _block = "";
var _village = "";
var _address = "";
var _currentdate = moment(new Date());

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

let watchID = null;

// Other-RDSS and Other-Existing VAR
var _popdata = {
  Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "", ScadaCompatibility: "", RMULocationName: "",
  RTULocationName: "", ProtocolSupported: ""
};

var _attributes = false;

const EditFeederAssets = (props) => {

  const route = useRoute();
  const mapRef = React.useRef(null);
  const { feederDetails, feederData, selectedDistricts, selctOP, achievementButtonState, oldItem, selectedDistrictsName } = route.params;
  const [isAssetList, setAssetList] = useState([]);
  const [isSelectedPrecedingId, setSelectedPrecedingId] = useState(null);
  const [isOldSelectedPrecedingId, setOldSelectedPrecedingId] = useState(null);
  const [isImagesUrl, setImageUploadUrl] = useState([]);
  const [isDropVisible, setDropVisible] = useState(false);
  const [isDropDownList, setDropDownList] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isAddress, setAddress] = useState("");
  const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
  const [isDefultLongitude, setDefultLongitude] = useState(-1);
  const [isDefultLatitude, setDefultLatitude] = useState(-1);
  const [isMajorComponents, setMajorComponents] = useState([]);
  const [isSelectedLTHTOption, setSelectedLTHTOption] = useState("Select");
  const [isHTModalVisible, setHTModalVisible] = useState(false);
  const [isLTModalVisible, setLTModalVisible] = useState(false);
  const [isAssetTypePopup, setAssetTypePopup] = useState(null);
  const [isPollDetailsVisible, setPollDetailsVisible] = useState(false);
  const [isEstimatedDistance, setEstimatedDistance] = useState("");
  const [isActualDistance, setActualDistance] = useState("");
  const [isRemark, setRemark] = useState("");
  const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
  const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
  const [isDtrRdssData, setDtrRdssData] = useState([]);
  const [isSelectedDtrGeotag, setSelectedDtrGeotagList] = useState(null);
  const [isSelectGeotagedDTRunderRDSS, setSelectGeotagedDTRunderRDSS] = useState(null);
  const [isOthersRDSS, setOthersRDSS] = useState(null);
  const [isDTRModalVisible, setDTRModalVisible] = useState(false);
  const [isOthersExisting, setOthersExisting] = useState(null);
  const [isOtherRdssData, setOtherRdssData] = useState([]);

  const [isSubAsetVisible, setSubAsetVisible] = React.useState(false);
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

    var img = [];

    if (oldItem?.images) {
      oldItem?.images.forEach((element) => {
        const obj = { imagepath: element?.imageName, imageName: element?.imageName };
        img.push(obj);
      });
      setImageUploadUrl(img);
    }


    setEstimatedDistance(oldItem?.estimatedDistance);
    setActualDistance(oldItem?.actualDistance);


    setCurrentLongitude(oldItem?.longitude);
    setCurrentLatitude(oldItem?.latitude);

    _latitude = oldItem?.latitude;
    _longitude = oldItem?.longitude;
    _block = oldItem?.block;
    _village = oldItem?.village;
    _address = oldItem?.address;
    _currentdate = oldItem?.created_at;
    setAddress(oldItem?.address)

    setRemark(oldItem?.remark);

    _scheme = oldItem?.segmet?.scheme;
    _majorComponent = oldItem?.segmet?.majorComponent;
    _oldUGorOH = oldItem?.segmet?.UGorOH;
    _oldWhetherCableOrConductor = oldItem?.segmet?.WhetherCableOrConductor;
    _oldCableSize = oldItem?.segmet?.CableSize;
    _oldSinglePhaseThreePhase = oldItem?.segmet?.SinglePhaseThreePhase;
    _oldCircuitType = oldItem?.segmet?.CircuitType;
    _oldLTLineVoltage = oldItem?.segmet?.HTLineVoltage;
    _oldSpecifyTypeVoltage = oldItem?.segmet?.SpecifyTypeVoltage;
    _oldTypeOfCable = oldItem?.segmet?.TypeOfCable;
    _olsSpecifyTypeOfCable = oldItem?.segmet?.SpecifyTypeOfCable;
    _oldTypeOfConductor = oldItem?.segmet?.TypeOfConductor;
    _olsSpecifyTypeOfConductor = oldItem?.segmet?.SpecifyTypeOfConductor;
    _oldPoleStructur = oldItem?.segmet?.PoleStructur;

    _poleType = oldItem?.poleDetails?.poleType;
    _poleHeight = oldItem?.poleDetails?.poleHeight;
    _poleSpecifyType = oldItem?.poleDetails?.poleSpecifyType;
    _existingPole = oldItem?.poleDetails?.existingPole;
    _branchPoint = oldItem?.poleDetails?.branchPoint;

    // _dtrCapacity = oldItem?.dtr_existing?.dtrCapacity;
    // _dtrVoltage = oldItem?.dtr_existing?.dtrVoltage;
    // _modelofdtr = oldItem?.dtr_existing?.dtr_model;
    // _manufacturingDT = oldItem?.dtr_existing?.manufacturingDT;
    // _installationDT = oldItem?.dtr_existing?.installationDT;
    // _dtrMounting = oldItem?.dtr_existing?.dtrMounting;
    // _EngravedUnderRDSS = oldItem?.dtr_existing?.engravedUnderRDSS;
    // _noOffeeder = oldItem?.dtr_existing?.noOffeeder;

    _dtrCapacity = oldItem?.dtr_existing?.dtr_capacity;
    _dtrVoltage = oldItem?.dtr_existing?.dtr_voltage_ratio;
    _modelofdtr = oldItem?.dtr_existing?.dtr_model;
    _manufacturingDT = oldItem?.dtr_existing?.dtr_manufacturing_month_year;
    _installationDT = oldItem?.dtr_existing?.dtr_year_installation;
    _dtrMounting = oldItem?.dtr_existing?.dtr_mounting;
    _EngravedUnderRDSS = oldItem?.dtr_existing?.engravedUnderRDSS;
    _noOffeeder = oldItem?.dtr_existing?.dtr_number_of_dtr;

    _popdata = oldItem?.sub_asset_attributes || {
      Location: "", Make: "", Rating: "", LinePosition: "", SubstationName: "", CircuitType: "", Voltage: "", RMUType: "", RMUCBType: "",
      ScadaCompatibility: "", RMULocationName: "", RTULocationName: "", ProtocolSupported: ""
    }

    setSelectedLTHTOption(oldItem?.type_of_segment == "LTline" ? "LT Line" : "HT Line");
    setAssetTypePopup(oldItem?.asset_type);
    setSelectGeotagedDTRunderRDSS(oldItem?.title);
    setOldSelectedPrecedingId(oldItem?.preceding_geotagged_asset_ID);

    if (oldItem?.selected_asset_type == "Others-RDSS")
      onGetDtrSettingListDetails("Others-RDSS");
    else if (oldItem?.selected_asset_type == "Others-Existing")
      onGetDtrSettingListDetails("Others-Existing");

    if (oldItem?.preceding_geotagged_asset_ID)
      onFetchFeeder(true);
    else
      onFetchFeeder(false);

    _attributes = ((oldItem?.otherExistingAssetType == "Capacitor Bank") || (oldItem?.otherExistingAssetType == "Capacitor Banks") || (oldItem?.otherExistingAssetType == "Circuit Breaker") || (oldItem?.otherExistingAssetType == "RMU") || (oldItem?.otherExistingAssetType == "RTU") || (oldItem?.otherExistingAssetType == "FRTU"))

    onGetListData();
    onFatchDtrRdssData(true);
    // onFetchMajorData();

  }, [oldItem]);

  useEffect(() => {

    if (isDropDownList != null) {
      let a1 = isDropDownList;

      a1?.dtr_types?.forEach(element => {
        if (oldItem?.dtr_existing?.dtr_type == element.title) {
          _dtrType = element.title;
        }
      });

      a1?.dtr_capacity?.forEach(element => {
        if (oldItem?.dtr_existing?.dtr_capacity == element.title) {
          _dtrCapacity = element.title;
        }
      });

      a1?.dtr_voltage_ratio?.forEach(element => {
        if (oldItem?.dtr_existing?.dtr_voltage_ratio == element.title) {
          _dtrVoltage = element.title;
        }
      });

      a1?.dtr_mounting?.forEach(element => {
        if (oldItem?.dtr_existing?.dtr_mounting == element.title) {
          _dtrMounting = element.title;
        }
      });

    }

  }, [isDropDownList])

  useEffect(() => {
    const { routes } = props.navigation.getState();
    const filteredRoutes = routes.filter(route => route.name !== 'FeederGeneralAssetOptions');

    props.navigation.dispatch(
      CommonActions.reset({
        index: filteredRoutes.length - 1,
        routes: filteredRoutes,
      }),
    )

  }, []);


  useFocusEffect(
    React.useCallback(() => {
      onFatchDtrRdssData(true);
      onFatchOtherRdssData(true);
    }, [])
  );

  const onFetchFeeder = (status) => {
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

    Service.post(EndPoints.getFedderGeoTagList, data, (response) => {
      onLoading(false);
      if (response._resultflag == 1) {

        let arr = [];
        response?.data.forEach(item => {
          arr.push({ title: item?.index_id, obj: item })
        })

        setAssetList(arr);

        arr.forEach(element => {
          if (oldItem?.index_id == element.title && status) {
            setSelectedPrecedingId(element);
          }
        });

        //-------Manage map Point & PolyLine---------//
        // setPolylineArr(response?.data);
        // let a = response?.data[0].latitude;
        // let b = response?.data[0].longitude;
        // mapRef.current?.animateToRegion({
        //   latitude: parseFloat(a),
        //   longitude: parseFloat(b),
        //   latitudeDelta: 0.005,
        //   longitudeDelta: 0.005,
        // });

      } else {
        // Loger.onLog("error", res)
        // showErrorToast(res.message)
      };
    },
      (err) => {
        // Loger.onLog("error", err)
        // showErrorToast(err);
      }
    );
  }

  const onGetListData = () => {

    onLoading(true);

    Service.post(EndPoints.getSettingListData, {}, (res) => {
      onLoading(false);

      if (res.resultflag == "1" && res.data)
        setDropDownList(res.data);

      getSubstationList();
    },
      (err) => {
        // Loger.onLog("error", err)
        // showErrorToast(err);
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

  //DTR RDSS data
  const onFatchDtrRdssData = (old) => {

    onLoading(true);
    var responseData = [];

    Service.post(EndPoints.getGeoTagbyDistrict, { district_id: JSON.stringify(selectedDistricts), feeder_id: feederData?.id, }, (response) => {
      onLoading(false);

      if (response?._resultflag == true && response?.data) {
        let arry = response?.data;

        if (old) {
          arry.forEach((element) => {
            let model = new DtrRdssData(element);

            if (model?.title == oldItem?.title) {
              setSelectedDtrGeotagList(model)
            }
          });
        }

        arry.forEach((element) => {
          let model = new DtrRdssData(element);
          responseData.push(model);
        });
        setDtrRdssData(responseData)
      }
      else {
        // showErrorToast(res.message)
      };
    },
      (err) => {
        // Loger.onLog("error==", err);
      }
    );
  }

  //Other RDSS data
  const onFatchOtherRdssData = (old) => {

    onLoading(true);
    var responseData = [];
    try {
      const body = { district_id: JSON.stringify(selectedDistricts), feeder_id: feederData?.id, }

      Service.post(EndPoints.getOtherGeotagListbyDistict, body, (response) => {
        onLoading(false);

        if (response?._resultflag == true && response?.data) {
          let arry = response?.data;

          if (old) {
            arry.forEach((element) => {
              let model = new DtrRdssData(element);

              if (model?.title == oldItem?.title) {
                setSelectedDtrGeotagList(model)
              }
            });
          }

          arry.forEach((element) => {
            let model = new DtrRdssData(element);
            responseData.push(model);
          });
          setOtherRdssData(responseData)
        }
        else {
          // showErrorToast(res)
        };

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

  const onGetDtrSettingListDetails = (type) => {

    onLoading(true);
    Service.post(EndPoints.getSettingListData, {}, (res) => {
      onLoading(false);

      if (res.resultflag == "1" && res.data) {
        setDropDownList(res.data);
        if (type == "DTR-Existing")
          setDTRModalVisible(true)
        else if (type == "Others-RDSS" && isOthersRDSS == null) {
          setOthersExisting(oldItem?.otherExistingAssetType)
          setOthersRDSS(oldItem?.OthersRDSS);
        }
        else if (type == "Others-Existing") {
          setOthersExisting(oldItem?.otherExistingAssetType)
        }

      }
    },
      (err) => {
        // showErrorToast(err);
      }
    );
  };

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
      enableHighAccuracy: false,
      maximumAge: 100,
      distanceFilter: 0.1,
    }
    );
  };

  const watchPosition = () => {
    onLoading(true);
    Geolocation.clearWatch(watchID);
    subscribeLocationLocation()

    setTimeout(() => {
      watchPosition1();
    }, 2000);
  }

  const watchPosition1 = () => {
    onLoading(true);

    Geolocation.getCurrentPosition(info => {

      onLoading(false);
      setDefultLatitude(JSON.stringify(info.coords.latitude));
      setDefultLongitude(JSON.stringify(info.coords.longitude));

      setLocationPopupVisible(true)

    }, (error) => {
      Alert.alert(
        "Alert",
        "This App needs access to your phone's location. Please enable location permissions in settings.",
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
      enableHighAccuracy: true,
      interval: 1000,
      distanceFilter: 0.1,

    });
  };

  const onGetCurrentLocation = (currentLatitude, currentLongitude) => {

    onLoading(true)

    if (currentLatitude == "" || currentLongitude == "") {
      Alert.alert("Please allow access of device location and turn on device location from setting.")
    } else {

      setCurrentLongitude(currentLongitude);
      setCurrentLatitude(currentLatitude);

      if (currentLatitude && currentLongitude && isSelectedPrecedingId?.obj?.latitude && isSelectedPrecedingId?.obj?.longitude) {
        setEstimatedDistance(AppUtil.getDistance(currentLatitude, currentLongitude, isSelectedPrecedingId?.obj?.latitude, isSelectedPrecedingId?.obj?.longitude))
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
        var addressComponent4 = json.results[0]?.address_components[5]?.long_name;

        _latitude = currentLatitude;
        _longitude = currentLongitude;
        _block = addressComponent;
        _village = addressComponent3;
        _address = json.results[0].formatted_address;
        _currentdate = moment(new Date());
        setAddress(json.results[0].formatted_address);

      })
        .catch((error) => {

          Alert.alert('Alert', Labels.getOnlyPoint, [
            {
              text: 'Yes', onPress: () => {
                _latitude = currentLatitude;
                _longitude = currentLongitude;
                _block = ".";
                _village = ".";
                _address = ".";
                _currentdate = moment(new Date());
                setAddress(".");
              }
            },
            {
              text: 'No', onPress: () => {
                setAddress(".");
                mapRef.current?.animateToRegion({
                  latitude: parseFloat(currentLatitude),
                  longitude: parseFloat(currentLongitude),
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                });
              }
            }
          ]);
        });
    }
    setTimeout(() => { onLoading(false); }, 1000)

  };

  const onSetAddressMenusl = (text) => {
    _address = text;
    _currentdate = moment(new Date());
  }

  const onPressCapture = () => {
    if (isImagesUrl.length < 3) {

      ImagePicker.launchCamera(PhotoQualityOptions, (res) => {

        if (res?.errorCode == "camera_unavailable") {
          Alert.alert("Alert", "Camera not available in your device");
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
            a = { imagepath: resp?.data?.imageName, imageName: resp?.data?.imageName }
            let images = [...isImagesUrl, a];

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

  const onSelectDTRRdssItem = (value) => {
    setSelectedDtrGeotagList(value)
    onSelectPrecendingID1(value);
  }

  const onSelectPrecendingID1 = (value) => {
    if (isAssetTypePopup == "DTR-RDSS" || isAssetTypePopup == "Others-RDSS") {
      if (value?.latitude && value?.longitude && isSelectedPrecedingId?.obj?.latitude, isSelectedPrecedingId?.obj?.longitude) {
        setEstimatedDistance(AppUtil.getDistance((value?.latitude).toString(), (value?.longitude).toString(), (isSelectedPrecedingId?.obj?.latitude).toString(), (isSelectedPrecedingId?.obj?.longitude).toString()))
      }
    }
  }

  const onSelectPrecendingID = (value) => {
    setSelectedPrecedingId(value);

    if (isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS") {
      if (isCurrentLatitude != -1 && isCurrentLongitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
        setEstimatedDistance(AppUtil.getDistance(isCurrentLatitude, isCurrentLongitude, value?.obj?.latitude, value?.obj?.longitude))
      }
    }
    else {
      if (isSelectedDtrGeotag?.latitude != -1 && isSelectedDtrGeotag?.longitude != -1 && value?.obj?.latitude && value?.obj?.longitude) {
        setEstimatedDistance(AppUtil.getDistance(isSelectedDtrGeotag?.latitude, isSelectedDtrGeotag?.longitude, value?.obj?.latitude, value?.obj?.longitude))
      }
    }

  }

  const onSelectAssetType = (value) => {

    if (value?.feeder_name == isAssetTypePopup)
      return;

    // select Asset Name
    setAssetTypePopup(value?.feeder_name);

    // Reset DTR-RDSS selected item
    setSelectedDtrGeotagList(null);
    setSelectGeotagedDTRunderRDSS(null);

    // Reset Other-RDSS
    setOthersRDSS(null);

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

    //POLE VAR
    _poleType = "";
    _poleHeight = "";
    _poleSpecifyType = "";
    _existingPole = "";
    _branchPoint = "";

    //MAP VAR
    _latitude = "";
    _longitude = "";
    _block = "";
    _village = "";
    _address = "";

    setAssetList([])
    setImageUploadUrl([]);
    setImages([]);
    setRemark("");
    setOldSelectedPrecedingId(-1);
    setEstimatedDistance("");
    setActualDistance("");
    onFetchFeeder(false);
    setSelectedPrecedingId(null);

    switch (value?.feeder_name) {
      case "Others-Existing":
        onGetDtrSettingListDetails("Others-Existing");
        break;
      case "Others-RDSS":
        onFatchDtrRdssData(false);
        onGetDtrSettingListDetails("Others-RDSS");
        break;
      case "DTR-Existing":
        onGetDtrSettingListDetails("DTR-Existing");
        break;
      case "DTR-RDSS":
        onFatchDtrRdssData(false);
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

  const onPressSubmit = () => {

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
    else if (isSelectedPrecedingId != null && isActualDistance == "") {
      Alert.alert("alert", "Please add Actual Distance.")
      return
    }
    onSelectFeederForSubmit()
  };

  const onSelectFeederForSubmit = () => {
    let obj = {}


    if (isAssetTypePopup == "Pole") {

      if (_latitude == "" && _longitude == "") {
        Alert.alert("Alert", "Please add Location")
        return
      }
      else if (isImagesUrl.length < 1) {
        Alert.alert("Alert", "Please add image")
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
        taging_for: selctOP,
        fedeer_id: feederData?.id,
        fedeer_code: feederData?.feeder_code,
        index_id: oldItem?.index_id,

        geotagData: {
          preceding_geotagged_asset_ID: isSelectedPrecedingId?.title,
          index_id: oldItem?.index_id,
          asset_type: isAssetTypePopup,
          title: oldItem?.title,
          latitude: _latitude,
          longitude: _longitude,
          address: _address,
          block: _block,
          village: _village,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          remark: isRemark,
          images: isImagesUrl,
          created_at: _currentdate,

          selected_asset_type: isAssetTypePopup,
          type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
          estimatedDistance: isEstimatedDistance,
          actualDistance: isActualDistance,

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
        }
      }
      onSaveGeotag(obj);
    }
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
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        fedeer_id: feederData?.id,
        fedeer_code: feederData?.feeder_code,
        index_id: oldItem?.index_id,

        geotagData: {
          preceding_geotagged_asset_ID: isSelectedPrecedingId?.title,
          index_id: oldItem?.index_id,
          asset_type: isAssetTypePopup,
          title: isSelectedDtrGeotag?.title,
          latitude: isSelectedDtrGeotag?.latitude,
          longitude: isSelectedDtrGeotag?.longitude,
          address: isSelectedDtrGeotag?.address,
          block: isSelectedDtrGeotag?.block,
          village: isSelectedDtrGeotag?.village,
          images: isSelectedDtrGeotag?.images,
          dtr_existing: isSelectedDtrGeotag?.dtr_details,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          remark: isRemark,
          created_at: _currentdate,

          selected_asset_type: isAssetTypePopup,
          type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
          estimatedDistance: isEstimatedDistance,
          actualDistance: isActualDistance,

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
        }
      }

      onSaveGeotag(obj);
    }
    else if (isAssetTypePopup == "DTR-Existing") {

      // if (_dtrCapacity == null || _dtrVoltage == null || _modelofdtr == "" || _manufacturingDT == null || _installationDT == null || _dtrMounting == null || _EngravedUnderRDSS == null || _noOffeeder == "") {
      if (_dtrCapacity == null || _dtrVoltage == null) {
        Alert.alert("alert", "Please add existing DTR details.")
        return
      }
      else if (_latitude == "" && _longitude == "") {
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
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        fedeer_id: feederData?.id,
        fedeer_code: feederData?.feeder_code,
        index_id: oldItem?.index_id,

        geotagData: {
          index_id: oldItem?.index_id,
          title: oldItem?.title,
          asset_type: isAssetTypePopup,
          latitude: _latitude,
          longitude: _longitude,
          address: _address,
          block: _block,
          village: _village,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          remark: isRemark,
          images: isImagesUrl,
          created_at: _currentdate,
          type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
          selected_asset_type: isAssetTypePopup,
          preceding_geotagged_asset_ID: isSelectedPrecedingId?.title,
          estimatedDistance: isEstimatedDistance,
          actualDistance: isActualDistance,

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
        }
      }

      onSaveGeotag(obj);
    }
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

        fedeer_id: feederData?.id,
        fedeer_code: feederData?.feeder_code,
        index_id: oldItem?.index_id,

        geotagData: {
          preceding_geotagged_asset_ID: isSelectedPrecedingId?.title,
          estimatedDistance: isEstimatedDistance,
          actualDistance: isActualDistance,

          title: isSelectedDtrGeotag?.title,
          tag_by: isSelectedDtrGeotag?.tag_by,
          index_id: oldItem?.index_id,
          latitude: isSelectedDtrGeotag?.latitude,
          longitude: isSelectedDtrGeotag?.longitude,
          address: isSelectedDtrGeotag?.address,
          block: isSelectedDtrGeotag?.block,
          village: isSelectedDtrGeotag?.village,
          images: isSelectedDtrGeotag?.images,
          created_at: _currentdate,
          dtr_existing: isSelectedDtrGeotag?.dtr_details,
          remark: isRemark,
          asset_type: isAssetTypePopup,
          type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
          selected_asset_type: isAssetTypePopup,
          otherExistingAssetType: isOthersExisting,

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
        }
      }

      onSaveGeotag(obj);
    }
    else if (isAssetTypePopup == "Others-Existing") {

      if (isOthersExisting == null) {
        Alert.alert("alert", "Please Select Existing Asset Type")
        return
      }
      else if (_latitude == "" && _longitude == "") {
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
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        fedeer_id: feederData?.id,
        fedeer_code: feederData?.feeder_code,
        index_id: oldItem?.index_id,

        geotagData: {
          index_id: oldItem?.index_id,
          asset_type: isAssetTypePopup,
          title: oldItem?.title,
          latitude: _latitude,
          longitude: _longitude,
          address: _address,
          block: _block,
          village: _village,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          remark: isRemark,
          images: isImagesUrl,
          created_at: _currentdate,
          type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
          selected_asset_type: isAssetTypePopup,
          preceding_geotagged_asset_ID: isSelectedPrecedingId?.title,
          estimatedDistance: isEstimatedDistance,
          actualDistance: isActualDistance,
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
        }
      }

      onSaveGeotag(obj);
    }
    else if (isAssetTypePopup == "Rout Point / Marker" || isAssetTypePopup == "LTDB" || isAssetTypePopup == "Feeder Pillar") {

      if (_latitude == "" && _longitude == "") {
        Alert.alert("Alert", "Please add Location")
        return
      }
      else if (isImagesUrl.length < 1) {
        Alert.alert("Alert", "Please add image")
        return
      }

      obj = {
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: JSON.stringify(selectedDistricts),
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selctOP,
        fedeer_id: feederData?.id,
        fedeer_code: feederData?.feeder_code,


        index_id: oldItem?.index_id,

        geotagData: {
          title: oldItem?.title,
          preceding_geotagged_asset_ID: isSelectedPrecedingId?.title,
          index_id: oldItem?.index_id,
          asset_type: isAssetTypePopup,
          latitude: _latitude,
          longitude: _longitude,
          address: _address,
          block: _block,
          village: _village,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          remark: isRemark,
          images: isImagesUrl,
          created_at: _currentdate,

          selected_asset_type: isAssetTypePopup,
          type_of_segment: isSelectedLTHTOption == "LT Line" ? "LTline" : "HTline",
          estimatedDistance: isEstimatedDistance,
          actualDistance: isActualDistance,

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
        }
      }
      onSaveGeotag(obj);
    }
  }

  const onSaveGeotag = (obj) => {
    onLoading(true);
    Service.post(EndPoints.ddeUpdateGeotag, obj, (res) => {
      onLoading(false);
      if (res._resultflag) {
        Alert.alert("", res.message, [
          {
            text: "OK",
            onPress: () => props.navigation.goBack()
          },
        ]);
      } else {
        showErrorToast(res.message)
      };
    },
      (err) => {
        onLoading(false);
      }
    );
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

  const onPressOther = () => {
    props.navigation.navigate("OtherListScreen", {
      selectedDistricts: { "title": selectedDistrictsName, "value": selectedDistricts },
      selectedOption: selctOP,
      achievementButtonState: "Achievement",
      geotagType: "Achievement",
      sessionType: "FeederScreen",
    });
  }

  const onBack = () => {
    _scheme = "";
    _majorComponent = "";
    _oldUGorOH = "";
    _oldWhetherCableOrConductor = "";
    _oldCableSize = "";
    _oldSinglePhaseThreePhase = "";
    _oldCircuitType = "";
    _oldLTLineVoltage = "";
    _oldSpecifyTypeVoltage = "";
    _oldTypeOfCable = "";
    _olsSpecifyTypeOfCable = "";
    _oldTypeOfConductor = "";
    _olsSpecifyTypeOfConductor = "";
    _oldPoleStructur = "";

    props.navigation.goBack();
  }

  const onOtherExisting = (value) => {
    _attributes = (value == "Capacitor Bank") || (value == "Capacitor Banks") || (value == "Circuit Breaker") || (value == "RMU") || (value == "RTU") || (value == "FRTU")
    setOthersExisting(value);
    setSubAsetVisible(_attributes);
  }

  return (
    <SafeAreaView style={[FeederAssetsStyle.mainView,]}>

      <Header title="HT Line / LT Line Geotag" leftIcon={<IcnBack />} onLeftPress={() => { onBack() }
      } />

      <KeyboardAwareScrollView>
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

          {/* //-------------LT and HT line popup---------------// */}
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
                  <TouchableOpacity key={index} onPress={() => onSelectDropdownItem(option.label)}
                    style={[FeederAssetsStyle.optionButton, index === LTHToptions.length - 1 && FeederAssetsStyle.lastOptionButton,]}>
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
              <AssetDropDown defoultEliment={isAssetTypePopup} title={"Asset Type*"} data={AssetType} onSelectedSevice={(value) => { onSelectAssetType(value) }} />
            </View>
            {
              isAssetTypePopup === "DTR-RDSS" && isDtrRdssData.length > 0 ?
                <View style={{ marginTop: 10 }}>
                  <DtrRdssDropdown defoultTitle={isSelectGeotagedDTRunderRDSS} title={"Select Geotagged DTR under RDSS*"} data={isDtrRdssData}
                    onSelectedSevice={(value) => { onSelectDTRRdssItem(value) }} />
                </View>
                :
                isAssetTypePopup === "DTR-RDSS" &&
                <View style={FeederAssetsStyle.btnDTRSubmit}>
                  <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.AddDTRRDSS}</Text>
                  <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { onPressDTR() }}>
                    <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.AddDTR}</Text>
                  </TouchableOpacity>
                </View>
            }

            {/* ------------------ Existing-RDS View --------------------- */}
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
            {/* ------------------ Others-RDS View --------------------- */}


            {
              (isAssetTypePopup === "Others-Existing") && isDropDownList != null &&
              <View style={{ marginTop: 10 }}>
                <SingleDropdownList defoultTitle={isOthersExisting} title={"Select Other Asset Type*"} data={isDropDownList?.other_rdss_asset?.asset_type}
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
                    <SingleDropdownList title={"Others – RDSS Asset Details*"} defoultTitle={isSelectGeotagedDTRunderRDSS} data={isOtherRdssData} onSelectedSevice={(value) => { setSelectedDtrGeotagList(value) }} />
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


            {/* for POLE */}
            {isAssetTypePopup != "Rout Point / Marker" && isAssetTypePopup != "LTDB" && isAssetTypePopup != "Feeder Pillar" &&
              <View style={[FeederAssetsStyle.btnDTRSubmit, { marginTop: 15 }]}>
                <Text style={FeederAssetsStyle.txtAddDTRRDSS}>{Labels.ProvidePoleDetails}</Text>
                <TouchableOpacity style={FeederAssetsStyle.btnDTRClick} onPress={() => { setPollDetailsVisible(true) }}>
                  <Text style={FeederAssetsStyle.txtAddDTR}>{Labels.Details}</Text>
                </TouchableOpacity>
              </View>}

            <View style={FeederAssetsStyle.dropSelect}>

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

              {isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                <>
                  <LocationBar
                    title="Complete Address*"
                    icon={<IcnAddress />}
                    getdata={_address}
                    setData={(text) => onSetAddressMenusl(text)}
                    handlePress={() => onLocationPress()}
                  />

                  <InputFields3
                    backgroundColor={true}
                    title1="Block"
                    value1={_block}
                    title2="Town/City/State"
                    value2={_village}
                  />

                  <View style={{ width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(2), borderWidth: 0.5, borderColor: Colors.orange, }}>
                    <MapView style={{ width: '100%', height: '100%' }} ref={mapRef} initialRegion={isInitialRegion}>
                      <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"} />
                    </MapView>
                  </View>
                </>
              }
              <View style={{ marginTop: 10 }}>

                <>
                  {/* <SingleDropdownList title={"Select preceding geotagged asset ID"} defoultTitle={oldItem?.preceding_geotagged_asset_ID}
                    data={isAssetList} onSelectedSevice={(value) => { onSelectPrecendingID(value) }} /> */}

                  <SingleDropdownListWithIcn icn={""} title={"Select preceding geotagged asset ID"} defoultTitle={oldItem?.preceding_geotagged_asset_ID}
                    data={isAssetList}
                    onSelectedSevice={(value) => { onSelectPrecendingID(value) }} />


                  {isSelectedPrecedingId != null &&
                    <>
                      <Text style={FeederAssetsStyle.fieldTitle}>Estimated aerial length of line from preceding geotagged asset ID (CMtrs.)*</Text>
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

              {isAssetTypePopup != "DTR-RDSS" && isAssetTypePopup != "Others-RDSS" &&
                <>
                  <SubmitBtn title="Capture Photo" onPress={() => { onPressCapture() }} />
                  {isImagesUrl.length > 0 && <GeotagThreeImageOptimazeModule type="DTR" item={isImagesUrl} handlePressImage={(index) => null} removeImage={(index) => removeImage(index)} />}
                </>}

              <SubmitBtn title="Update Geotag" onPress={() => { onPressSubmit() }} />

            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
export default memo(EditFeederAssets);

