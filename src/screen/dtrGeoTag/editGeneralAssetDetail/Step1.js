import { View, Text, Image, Platform, Alert, TouchableOpacity, } from "react-native";
import React, { useState, useEffect } from "react";
import DtrGeoTaggedCapturePhotoStyle from "./EditGeneralAssetDetailStyle";
import InputFields2 from "../../../components/inputFields/InputFields2";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import AddressCard from "../../../components/addressCard/AddressCard";
import IcnAddress from "../../../assets/svg/powerTransformersSvgs/IcnAddress";
import LocationBar from "../../../components/locationBar/LocationBar";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import IcnDTR1 from "../../../assets/svg/IcnDTR1";
import * as ImagePicker from "react-native-image-picker";
import { ImageUploadAPI, postFormDataAPI } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import moment from "moment";
import { BASE_URL, GOOGLE_API_KEY, image_base_url } from "../../../service/appConfig";
import { Colors } from "../../../utils/Colors";
import { onLoading } from "../../../../App";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { UserManager } from "../../../manager/UserManager";
import LocationPopup from "../../../components/LocationPopup";
import { Labels } from "../../../utils/Labels";
import { AppUtil, PhotoQualityOptions } from "../../../utils/AppUtil";
import InputFields3 from "../../../components/inputFields/InputFields3";
import GeotagThreeImageOptimazeModule from "../../../components/GeotagThreeImageOptimazeModule";

export default function Step1({ handleButtonPress, item, cardData }) {
  const [isCurrentLongitude, setCurrentLongitude] = useState("");
  const [isCurrentLatitude, setCurrentLatitude] = useState("");
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

  const mapRef = React.useRef(null);
  const [isInitialRegion, setInitialRegion] = useState(
    {
      latitude: 23,
      longitude: 79,
      latitudeDelta: 30,
      longitudeDelta: 30,
    }
  );
  let watchID = null;

  useEffect(() => {

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

    setAddress(item.address);
    setBlockNo(item.block);
    setVillage(item.village);

    setImageUploadUrl(item.images);
    setCurrentLatitude(item.latitude);
    setCurrentLongitude(item.longitude);
    setRecordDetail(data);
    subscribeLocationLocation();

    if (item.latitude) {
      setTimeout(() => {
        mapRef.current?.animateToRegion({
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

      }, 100)
    }

    return () => {
      mapRef.current = null;
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
      timeout: 10000,
      interval: 1000,
      distanceFilter: 0.5,
    });
  };

  const onGetCurrentLocation = (currentLatitude, currentLongitude) => {
    if (currentLatitude == "" || currentLongitude == "") {
      Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
        [
          {
            text: "OKAY",
            onPress: () => {
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
        var addressComponent4 = json.results[0]?.address_components[5]?.long_name;

        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);

        setBlockNo(addressComponent);
        setVillage(addressComponent3);
        setAddress(addressComponent + ", " + addressComponent1 + "," + addressComponent2 + "," + addressComponent3 + " " + addressComponent4);

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
      })
        .catch((error) => {
          var data = {
            latitude: currentLatitude,
            longitude: currentLongitude,
            address: "",
            block: "",
            village: "",
            date: moment(new Date()),
            title: item.title,
            subTitle: item.index_id,
          };

          Alert.alert('Alert', Labels.getOnlyPoint, [
            {
              text: 'Yes', onPress: () => {
                setBlockNo(".");
                setVillage(".");
                setAddress(".");
                setRecordDetail(data);
              }
            },
            {
              text: 'No', onPress: () => {
                setCurrentLongitude(-1);
                setCurrentLatitude(-1);
              }
            }
          ]);
          onLoading(false);
        });
    }
    setTimeout(() => {
      onLoading(false);
    }, 1000);
  };

  const onPressCapture = () => {
    if (imagesUrl.length < 3) {
      ImagePicker.launchCamera(PhotoQualityOptions, (res) => {
        var response = null;

        if (res.didCancel) {
        } else if (res.error) {
          Alert.alert(res.error);
        } else if (res.customButton) {
        } else {
          onLoading(true);
          response = res.assets[0];

          var data = {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          };


          let formData = new FormData();
          formData.append("image", data);

          ImageUploadAPI(EndPoints.imageUpload, formData, (resp) => {
            a = { imagepath: resp?.data?.imageName, imageName: resp?.data?.imageName }
            let images = [...imagesUrl, a];
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
      Alert.alert("You can upload only 3 images");
    }
  };

  const removeImage = (index) => {
    setImageUploadUrl((oldValues) => {
      return oldValues.filter((_, i) => i !== index);
    });
  };

  const handleLocationEdit = (text) => {
    var obj = { ...recordDetail };
    obj.address = text;
    setRecordDetail(obj);
  };

  const handleSubmit = () => {
    if (recordDetail?.latitude == null) {
      Alert.alert("Alert", "Please add Location");
    } else if (imagesUrl?.length < 1) {
      Alert.alert("Alert", "Please add image");
    } else {
      handleButtonPress(recordDetail, imagesUrl);
    }
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>

      <LocationBar
        title="Complete Address*"
        icon={<IcnAddress />}
        getdata={address}
        setData={(text) => handleLocationEdit(text)}
        handlePress={() => onLocationPress()}
      />

      <InputFields3
        backgroundColor={true}
        title1="Block"
        value1={blockNo}
        title2="Town/City/State"
        value2={village}
      />

      <View style={{ width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), borderWidth: 0.5, borderColor: Colors.orange, }}>
        <MapView style={{ width: '100%', height: '100%' }}
          ref={mapRef} initialRegion={isInitialRegion}>
          <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
            <IcnDTR1 />
          </Marker>
        </MapView>
      </View>

      <SubmitBtn
        onPress={() => onPressCapture()}
        backColor={imagesUrl.length < 3 ? Colors.orange : Colors.disableViewColor}
        title={imagesUrl.length == 0 ? "Capture Photo" : "Capture Another Photo"}
      />

      {imagesUrl.length > 0 && (
        <>
          <GeotagThreeImageOptimazeModule type={"DTR"} item={imagesUrl} handlePressImage={(index) => null} removeImage={(index) => removeImage(index)} />
          {/* <View style={DtrGeoTaggedCapturePhotoStyle.imageContainer}>
            {imagesUrl.map((item, index) => {
              return (
                <View style={DtrGeoTaggedCapturePhotoStyle.imagebtn}>
                  <Image
                    source={{ uri: image_base_url + UserManager.image_path + item?.imageName }}
                    style={DtrGeoTaggedCapturePhotoStyle.image}
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    style={{
                      height: 25,
                      width: 25,
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Colors.orange,
                      right: -5,
                      top: -5,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ color: Colors.white }}>X</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View> */}

          {recordDetail?.latitude && <AddressCard data={recordDetail} />}

          <View style={{ marginBottom: 30 }}>
            <SubmitBtn title="Next" onPress={() => handleSubmit()} />
          </View>
        </>
      )}

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
    </View>
  );
}
