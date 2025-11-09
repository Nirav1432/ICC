import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Platform, } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { EditSubstationsGeoTaggedCapturePhotoStyle } from "./EditSubstationsGeoTaggedCapturePhotoStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { Labels } from "../../../utils/Labels";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import AddressCard from "../../../components/addressCard/AddressCard";
import LocationBar from "../../../components/locationBar/LocationBar";
import IcnAddress from "../../../assets/svg/powerTransformersSvgs/IcnAddress";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import * as ImagePicker from "react-native-image-picker";
import moment from "moment";
import { onLoading } from "../../../../App";
import { Colors } from "../../../utils/Colors";
import { EndPoints } from "../../../service/Endpoints";
import { ImageUploadAPI, Service, postFormDataAPI } from "../../../service/Service";
import { GOOGLE_API_KEY, image_base_url } from "../../../service/appConfig";
import { UserManager } from "../../../manager/UserManager";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { PhotoQualityOptions } from "../../../utils/AppUtil";
import LocationPopup from "../../../components/LocationPopup";
import InputFields3 from "../../../components/inputFields/InputFields3";
import GeotagThreeImageOptimazeModule from "../../../components/GeotagThreeImageOptimazeModule";

function EditSubstationsGeoTaggedCapturePhoto(props) {
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [address, setAddress] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [village, setVillage] = useState("");
  const [imagesUrl, setImageUploadUrl] = useState([]);
  const [recordDetail, setRecordDetail] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);

  const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
  const [isDefultLongitude, setDefultLongitude] = useState(-1);
  const [isDefultLatitude, setDefultLatitude] = useState(-1);

  const route = useRoute();
  const { selectedOption, achievementButtonState, indexCode, selectedDistricts, selectedItem, sl_district_items_specification, selectedMajorComponent, selectedSubComponent, item, substationData, pacageList } = route.params;

  let watchID = null;

  useEffect(() => {
    subscribeLocationLocation();

    setAddress(item.address);
    setBlockNo(item.block);
    setVillage(item.village);
    setImageUploadUrl(item.images);
    setCurrentLatitude(item.latitude);
    setCurrentLongitude(item.longitude);
    var data = {
      latitude: item.latitude,
      longitude: item.longitude,
      address: item.address,
      block: item.block,
      date: moment(item.created_at),
      title: item.title,
      subTitle: item.index_id,
      village: item.village,
    };

    setRecordDetail(data);

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

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
        } else {
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
      watchPosition1();
    }, 2000);
  }

  const watchPosition1 = () => {
    onLoading(true);

    Geolocation.getCurrentPosition((info) => {
      try {
        onLoading(false);
        setDefultLatitude(JSON.stringify(info.coords.latitude));
        setDefultLongitude(JSON.stringify(info.coords.longitude));
        setLocationPopupVisible(true)
      }
      catch (err) {
        // Loger.onLog("error", err)
      }
    },
      (error) => {
        setLocationStatus(error.message);
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
      distanceFilter: 0.5,
    }
    );
  };

  const onGetCurrentLocation = (currentLatitude, currentLongitude) => {
    if (currentLatitude == "" || currentLongitude == "") {
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
    } else {
      Geocoder.from(currentLatitude, currentLongitude)
        .then((json) => {
          var addressComponent = json.results[0]?.address_components[0]?.long_name;
          var addressComponent1 = json.results[0]?.address_components[1]?.long_name;
          var addressComponent2 = json.results[0]?.address_components[2]?.long_name;
          var addressComponent3 = json.results[0]?.address_components[3]?.long_name;
          var addressComponent4 = json.results[0]?.address_components[5]?.long_name;


          setBlockNo(addressComponent);
          setVillage(addressComponent3);
          setAddress(json.results[0].formatted_address);

          var data = {
            latitude: currentLatitude,
            longitude: currentLongitude,
            address: json.results[0].formatted_address,
            block: addressComponent,
            date: moment(new Date()),
            title: item.title,
            subTitle: item.index_id,
            village: addressComponent3,
          };

          setRecordDetail(data);
          onLoading(false);
        }).catch((error) => {

          onLoading(false);

          var data = {
            latitude: currentLatitude,
            longitude: currentLongitude,
            address: ".",
            block: ".",
            date: moment(new Date()),
            title: item.title,
            subTitle: item.index_id,
            village: ".",
          };

          Alert.alert('Alert', Labels.getOnlyPoint, [
            {
              text: 'Yes', onPress: () => {
                setRecordDetail(data);
              }
            },
            {
              text: 'No', onPress: () => {


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
    if (imagesUrl.length < 5) {
      ImagePicker.launchCamera(PhotoQualityOptions, (res) => {
        var response = null;

        if (res.didCancel) {
        } else if (res.error) {
          Alert.alert(res.error);
        } else if (res.customButton) {
        } else {
          onLoading(true);
          response = res?.assets[0];
          var data = {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          };

          let formData = new FormData();
          formData.append("image", data);

          ImageUploadAPI(
            EndPoints.imageUpload,
            formData,
            (resp) => {
              let images = [...imagesUrl, resp.data];
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
      Alert.alert("You can upload only 5 images");
    }
  };

  const handleClick = () => {
    props.navigation.navigate("EditSubstationsDetails", {
      indexCode,
      selectedDistricts,
      selectedItem,
      sl_district_items_specification,
      sl_district_major_component: selectedMajorComponent,
      sl_district_sub_component: selectedSubComponent,
      selectedOption,
      achievementButtonState,
      item,
      substationData,
      pacageList,
    });
  };

  const handlePressGeoTag = () => {
    if (imagesUrl?.length == 0) {
      Alert.alert("Alert", "Please add image");
    } else if (recordDetail == null) {
      Alert.alert("Alert", "Please add Location");
    } else {
      var img = [];

      imagesUrl.forEach(element => {
        img.push(element);
      });

      const data = {
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        district_id: selectedDistricts,
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        "major_component_id": selectedMajorComponent,
        "sub_component_id": selectedSubComponent,
        "items_specification_id": sl_district_items_specification,
        "update_id": item.index_id,

        geotagData: {
          index_id: item.index_id,
          title: item.title,
          latitude: currentLatitude,
          longitude: currentLongitude,
          address: recordDetail.address,
          block: blockNo,
          village: village,
          tag_by: UserManager.first_name + " " + UserManager.last_name,
          images: img,
        },
      };
      onLoading(true);
      Service.post(EndPoints.updateSSGeoTagbyId, data, (success) => {
        if (success?._resultflag) {
          Alert.alert('Success', success.message, [
            {
              text: 'OK', onPress: () => {
                handleClick();
              }

            },
          ]);
        } else {
          Alert.alert("Alert", success.message)
        }
        onLoading(false);
      },
        (error) => {
          onLoading(false);
        }
      );
    }
  };

  // const handlePressImage = (index) => {
  //   var img = [];
  //   imagesUrl.forEach((element) => {
  //     im = element.imagepath ? element.imagepath : element
  //     const obj = { uri: image_base_url + im };
  //     img.push(obj);
  //   });
  //   setImages(img);
  //   setImgIndex(index);
  //   setIsVisible(true);
  // };

  const removeImage = (index) => {
    setImageUploadUrl((oldValues) => {
      return oldValues.filter((_, i) => i !== index);
    });
  };

  return (
    <SafeAreaView style={EditSubstationsGeoTaggedCapturePhotoStyle.mainView}>
      <Header
        title="Substation Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View style={EditSubstationsGeoTaggedCapturePhotoStyle.container}>
          <View style={EditSubstationsGeoTaggedCapturePhotoStyle.title}>
            <Text style={EditSubstationsGeoTaggedCapturePhotoStyle.text}>
              {item.title}
            </Text>
          </View>
          <View style={EditSubstationsGeoTaggedCapturePhotoStyle.modifySearch}>
            <Text style={EditSubstationsGeoTaggedCapturePhotoStyle.modifySearchText}            >
              General Assets Details
            </Text>
            <TouchableOpacity>
              <IcnGreyDown />
            </TouchableOpacity>
          </View>
          <View style={EditSubstationsGeoTaggedCapturePhotoStyle.innerContainer}>

            <LocationBar
              title="Complete Address*"
              icon={<IcnAddress />}
              getdata={address}
              setData={(text) => null}
              handlePress={() => onLocationPress()}
            />

            <InputFields3
              title1="Block"
              value1={blockNo}
              title2="Town/City/State"
              value2={village}
            />

            <SubmitBtn onPress={() => onPressCapture()} backColor={imagesUrl.length < 5 ? Colors.orange : Colors.disableViewColor} title="Capture Photo" />

            {imagesUrl.length > 0 && (
              <>
                <GeotagThreeImageOptimazeModule type="DTR" item={imagesUrl} handlePressImage={(index) => null} removeImage={(index) => removeImage(index)} />
                {recordDetail != null && <AddressCard data={recordDetail} />}
                <SubmitBtn onPress={() => { handlePressGeoTag() }} title="Update" />
              </>
            )}



          </View>
        </View>
      </ScrollView>
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

    </SafeAreaView>
  );
}
export default memo(EditSubstationsGeoTaggedCapturePhoto);