// Other by Khasiya Sagar.

//import liraries
import React, { useState, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, } from 'react-native';
import PageStyle from "../other/OtherStyle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Labels } from '../../utils/Labels';
import Header from '../../components/header/Header';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import { useRoute } from "@react-navigation/native";
import IcnGreyDown from '../../assets/svg/IcnGreyDown';
import LocationBar from "../../components/locationBar/LocationBar";
import IcnAddress from '../../assets/svg/powerTransformersSvgs/IcnAddress';
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import { onLoading } from '../../../App';
import MapView, { Marker, } from 'react-native-maps';
import LocationPopup from '../../components/LocationPopup';
import { AppUtil, PhotoQualityOptions } from '../../utils/AppUtil';
import IcnDTR1 from "../../assets/svg/IcnDTR1"
import SubmitBtn from '../../components/clogin/commonButton/SubmitBtn';
import { Colors } from '../../utils/Colors';
import * as ImagePicker from "react-native-image-picker";
import { postFormDataAPI } from '../../service/Service';
import moment from 'moment';
import { EndPoints } from '../../service/Endpoints';
import { useNavigation } from "@react-navigation/native";
import AddressCard from '../../components/addressCard/AddressCard';
import { image_base_url } from '../../service/appConfig';
import DropdownList from '../../components/singleselectlist/DropdownList';
import InputFields3 from '../../components/inputFields/InputFields3';
import GeotagThreeImageOptimazeModule from '../../components/GeotagThreeImageOptimazeModule';
import { SafeAreaView } from 'react-native-safe-area-context';

var _codeIndex = ""
// create a component
const OtherGeotagScreen = () => {
    let item = null;
    let watchID = null;
    const mapRef = React.useRef(null);
    const route = useRoute();
    const navigation = useNavigation();
    const { selectedDistricts, parentData, indexCode, sessionType, othersList } = route.params;

    const [isPackage, setPackage] = useState("");
    const [imagesUrl, setImageUploadUrl] = useState([]);
    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
    const [isMapview, setMapview] = useState("standard");
    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);
    const [isIndexCode, setIndexCode] = useState(null);
    const [isLocationDetail, setLocationDetail] = useState(null);
    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    useEffect(() => {
        if (othersList.length) {
            let strToNum = parseInt(othersList[0]?.item_no) || 0;
            _codeIndex = "000" + (strToNum + 1);
            setIndexCode(indexCode + "_" + _codeIndex + AppUtil.generateUniqueKey());
        }
        else {
            _codeIndex = "0001";
            setIndexCode(indexCode + "_" + _codeIndex + AppUtil.generateUniqueKey());
        }
    }, []);

    useEffect(() => {
        Geolocation.clearWatch(watchID);
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
            interval: 1000,
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
                    address: addressComponent + ", " + addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5,
                    currentdate: moment(new Date()),
                };

                if (((selectedDistricts?.title).toLowerCase()) == (addressComponent3.toLowerCase()) || ((selectedDistricts?.title).toLowerCase()) == (addressComponent4.toLowerCase())) {
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
        if (imagesUrl.length < 3) {
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
        } else {
            Alert.alert("You can upload only 3 images");
        }
    };

    function onSubmit() {
        navigation.navigate("OtherGeotagFormScreen", { selectedDistricts, parentData, imagesUrl, locationDetail: isLocationDetail, otherPackage: isPackage, indexCode: isIndexCode, sessionType, codeIndex: _codeIndex })
    }

    const onRemoveImage = (index) => {
        setImageUploadUrl((oldValues) => {
            return oldValues.filter((_, i) => i !== index);
        });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onLeftPress={() => navigation.goBack()}
                title="Other Assets Geotag"
                leftIcon={<IcnBack />}
            />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View style={PageStyle.title1}>
                        <Text style={PageStyle.text}>{parentData?.major_components + " " + parentData?.sub_components} </Text>
                    </View>
                    <View style={PageStyle.modifySearch}>
                        <Text style={PageStyle.modifySearchText}>
                            {Labels.generalDetails}
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <DropdownList title={"Package No."} data={parentData?.package_data} onSelectedSevice={(value) => { setPackage(value) }} />
                        <Text style={PageStyle.asaText}>*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”</Text>
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <LocationBar
                            title="Complete Address *"
                            icon={<IcnAddress />}
                            getdata={isLocationDetail?.address}
                            setData={(text) => { null }}
                            handlePress={() => onLocationPress()}
                        />

                        <InputFields3
                            backgroundColor={true}
                            title1="Block"
                            value1={isLocationDetail?.block}
                            title2="Town/City/State"
                            value2={isLocationDetail?.village}
                        />
                        <View style={PageStyle.mapConstainer}>

                            <MapView style={{ width: '100%', height: '100%' }}
                                ref={mapRef}
                                initialRegion={isInitialRegion}
                                mapType={isMapview == "satellite" ? "satellite" : "standard"}>

                                {othersList && othersList.map((data, index) => (
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

                                <GeotagThreeImageOptimazeModule item={imagesUrl} handlePressImage={(index) => null} removeImage={(index) => onRemoveImage(index)} />

                                {/* <View style={PageStyle.imageContainer}>
                                    {imagesUrl.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={PageStyle.imagebtn} onPress={() => null}>
                                                <Image source={{ uri: image_base_url + item.imagepath }} style={PageStyle.image} />
                                                <TouchableOpacity onPress={() => onRemoveImage(index)} style={PageStyle.imageTouch} >
                                                    <Text style={{ color: Colors.white }}>X</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View> */}

                                {isLocationDetail?.latitude &&
                                    <AddressCard data={
                                        {
                                            title: parentData?.major_components + " " + parentData?.sub_components,
                                            subTitle: isIndexCode,
                                            selectedDistrictsName: selectedDistricts?.title,
                                            date: isLocationDetail?.date,
                                            address: isLocationDetail?.address,
                                            latitude: isLocationDetail?.latitude,
                                            longitude: isLocationDetail?.longitude,
                                            assetAttribut: parentData?.sub_asset_type,
                                        }
                                    } />}


                            </>
                        )}
                        {imagesUrl.length > 0 && isLocationDetail != null && isPackage != "" &&
                            <View style={{ marginBottom: 30 }}>
                                <SubmitBtn title="Next" onPress={() => onSubmit()} />
                            </View>
                        }
                    </View>

                </ScrollView>
            </KeyboardAwareScrollView>

            <LocationPopup
                isVisible={isLocationPopupVisible}
                handleClose={() => setLocationPopupVisible(false)}
                lett={isDefultLatitude}
                long={isDefultLongitude}
                finalPont={(data) => onGetCurrentLocation(data?.latitude, data?.longitude)}
            />
        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(OtherGeotagScreen);
