import { View, Text, Image, Platform, Alert, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import AddressCard from "../../../components/addressCard/AddressCard";
import IcnAddress from "../../../assets/svg/powerTransformersSvgs/IcnAddress";
import IcnDTR1 from "../../../assets/svg/IcnDTR1";
import LocationBar from "../../../components/locationBar/LocationBar";

import { requestMultiple, PERMISSIONS, openSettings, request, requestLocationAccuracy, } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

import * as ImagePicker from "react-native-image-picker";
import { ImageUploadAPI, postFormDataAPI } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import moment from "moment";
import { Colors } from "../../../utils/Colors";
import { onLoading } from "../../../../App";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import LocationPopup from "../../../components/LocationPopup";
import { image_base_url } from "../../../service/appConfig";
import { AppUtil, PhotoQualityOptions } from "../../../utils/AppUtil";
import { Labels } from "../../../utils/Labels";
import InputFields3 from "../../../components/inputFields/InputFields3";
import FastImage from "react-native-fast-image";
import GeotagThreeImageOptimazeModule from "../../../components/GeotagThreeImageOptimazeModule";

export default function Step1({ handleButtonPress, item, oldData, oldImg, cardData }) {
  const [address, setAddress] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [village, setVillage] = useState("");
  const [imagesUrl, setImageUploadUrl] = useState([]);
  const [recordDetail, setRecordDetail] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
  const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
  const [isMapview, setMapview] = useState("standard");
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
    var obj = { ...recordDetail };
    obj.subTitle = item?.subTitle;
    setRecordDetail(obj);
  }, [item]);

  useEffect(() => {
    if (oldData) {
      var data = {
        latitude: oldData?.latitude,
        longitude: oldData?.longitude,

        address: oldData?.address,
        block: oldData?.block,
        village: oldData?.village,

        date: moment(new Date(oldData?.date)),
        title: oldData?.title,
        subTitle: oldData?.subTitle,
      };
      setBlockNo(oldData?.block);
      setVillage(oldData?.village);
      setAddress(oldData?.address);
      setRecordDetail(data);
      setImageUploadUrl(oldImg);

      if (oldData?.latitude) {
        setTimeout(() => {
          mapRef.current?.animateToRegion({
            latitude: parseFloat(oldData?.latitude),
            longitude: parseFloat(oldData?.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setCurrentLatitude(oldData?.latitude);
          setCurrentLongitude(oldData?.longitude);
        }, 100)

      }
    }
  }, [oldData]);

  useEffect(() => {
    Geolocation.clearWatch(watchID);
    subscribeLocationLocation()
    return () => {
      Geolocation.clearWatch(watchID);
      mapRef.current = null;
    };
  }, []);

  const onLocationPress = async () => {

    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization((info) => {
        onWatchPosition();
      })
      onWatchPosition();
    } else {
      requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,]).then((statuses) => {
        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted") {
          onWatchPosition();
        } else {
          Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
            [{
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
  const onWatchPosition = () => {
    onLoading(true);
    Geolocation.clearWatch(watchID);
    subscribeLocationLocation()

    setTimeout(() => {
      onWatchPositionHighAccuracy();
    }, 2000);
  }

  const onWatchPositionHighAccuracy = async () => {
    onLoading(true);

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

          address: json.results[0].formatted_address,
          block: addressComponent,
          village: addressComponent3,

          date: moment(new Date()),
          title: item.title,
          subTitle: item.subTitle,
        };


        if ((item.selectedDistrictsName.toLowerCase()) == (addressComponent3.toLowerCase()) || (item.selectedDistrictsName.toLowerCase()) == (addressComponent4.toLowerCase())) {

          setBlockNo(addressComponent);
          setVillage(addressComponent3);
          setAddress(addressComponent + ", " + addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5);
          setRecordDetail(data);
          onLoading(false);
        }
        else {
          Alert.alert('Alert', "Seems you are not on the location, Do like to proceed with current location?", [
            {
              text: 'Yes', onPress: () => {
                setBlockNo(addressComponent);
                setVillage(addressComponent3);
                setAddress(addressComponent + ", " + addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5);
                setRecordDetail(data);
              }
            },
            {
              text: 'No', onPress: () => {
                if (blockNo == undefined) {
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
            subTitle: item.subTitle,
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

                mapRef.current?.animateToRegion({
                  latitude: 23,
                  longitude: 79,
                  latitudeDelta: 30,
                  longitudeDelta: 30,
                });
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
      try {
        ImagePicker.launchCamera(PhotoQualityOptions, (res) => {

          var response = null;

          if (res.didCancel) {
          } else if (res.error) {
            Alert.alert(res.error);
          } else if (res.customButton) {
          } else if (res.errorCode == "camera_unavailable") {
            let images = [...imagesUrl, Labels?.data];
            setImageUploadUrl(images);
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

            postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
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
      }
      catch (error) {
        console.error(error);
      }


    } else {
      Alert.alert("You can upload only 3 images");
    }
  };

  const handlePressImage = (index) => {
    var img = [];
    imagesUrl.forEach((element) => {
      const obj = { uri: image_base_url + element.imagepath };
      img.push(obj);
    });
    setImages(img);
    setImgIndex(index);
    setIsVisible(true);
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

      <View style={{ width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(2), borderWidth: 0.5, borderColor: Colors.orange, }}>

        <MapView style={{ width: '100%', height: '100%' }}
          ref={mapRef}
          initialRegion={isInitialRegion}
          mapType={isMapview == "satellite" ? "satellite" : "standard"}>

          {cardData && cardData.map((data, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), }}
              pinColor={"red"}
            >
              <IcnDTR1 />
            </Marker>
          ))}

          <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
            <IcnDTR1 />
          </Marker>
        </MapView>

        <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
          onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
          <IcnAddress />
        </TouchableOpacity>
      </View>

      <SubmitBtn
        onPress={() => onPressCapture()}
        backColor={imagesUrl.length < 3 ? Colors.orange : Colors.disableViewColor}
        title={imagesUrl.length == 0 ? "Capture Photo" : "Capture Another Photo"}
      />

      {imagesUrl.length > 0 && (
        <>

         <GeotagThreeImageOptimazeModule item={imagesUrl} handlePressImage={(index) => handlePressImage(index)} removeImage={(index) => removeImage(index)} />
           {/* <View style={DtrGeoTaggedCapturePhotoStyle.imageContainer}>
            {imagesUrl.map((item, index) => {

              return (
                <TouchableOpacity style={DtrGeoTaggedCapturePhotoStyle.imagebtn} onPress={() => handlePressImage(index)} >
                 
                  <FastImage
                    style={DtrGeoTaggedCapturePhotoStyle.image}
                    source={{
                      uri: image_base_url + item.imagepath,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />

                  <TouchableOpacity onPress={() => removeImage(index)} style={{ height: 25, width: 25, position: "absolute", alignItems: "center", justifyContent: "center", backgroundColor: Colors.orange, right: -5, top: -5, borderRadius: 15, }}                  >
                    <Text style={{ color: Colors.white }}>X</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
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

    </View >
  );
}
