import { View, Text, TouchableOpacity, ScrollView, Alert, Image, TextInput, } from 'react-native';
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import Header from "../../components/header/Header";
import PageStyle from "../households/HosehodlsStyle";
import { onLoading } from "../../../App";
import { ImageUploadAPI, postFormDataAPI, Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { Labels } from "../../utils/Labels";
import moment from "moment";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { requestMultiple, PERMISSIONS, openSettings, request, requestLocationAccuracy, } from "react-native-permissions";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import * as ImagePicker from "react-native-image-picker";
import IcnGreyDown from '../../assets/svg/IcnGreyDown';
import IcnDetails from "../../assets/svg/IcnDetails";
import IcnAddress from '../../assets/svg/powerTransformersSvgs/IcnAddress';
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import LocationBar from "../../components/locationBar/LocationBar";
import InputFields2 from "../../components/inputFields/InputFields2";
import SubmitBtn from '../../components/clogin/commonButton/SubmitBtn';
import { Colors } from '../../utils/Colors';
import LocationPopup from '../../components/LocationPopup';
import { image_base_url } from '../../service/appConfig';
import AddressCard from '../../components/addressCard/AddressCard';
import HouseHoldDetailsPopup from '../../components/houseHold/HouseHoldDetailsPopup';
import { AppUtil, PhotoQualityOptions } from '../../utils/AppUtil';
import { UserManager } from '../../manager/UserManager';
import InputFields3 from '../../components/inputFields/InputFields3';
import { SafeAreaView } from 'react-native-safe-area-context';

const HouseholdsCreateGeotagScreen = (props) => {

    let item = null;
    let watchID = null;
    const mapRef = React.useRef(null);
    const route = useRoute();
    const navigation = useNavigation();
    const { taluka, village, scheme, data, selectedDistricts } = route.params;

    const [isLocationDetail, setLocationDetail] = useState(null);

    const [isRemark, setRemark] = useState("");
    const [imagesUrl, setImageUploadUrl] = useState([]);
    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
    const [isMapview, setMapview] = useState("standard");

    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);
    const [isPopUpVisible, setPopUpVisible] = useState(-1);

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

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

    const onWatchPosition = () => {
        onLoading(true);
        Geolocation.clearWatch(watchID);
        subscribeLocationLocation()

        setTimeout(() => {
            onWatchPosition1();
        }, 2000);
    }

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition((position) => { }, (error) => { }, {
            enableHighAccuracy: true,
            maximumAge: 100,
            distanceFilter: 0.5
        }
        );
    };

    const onWatchPosition1 = async () => {
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
                    block: addressComponent4,
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


            })
                .catch((error) => {
                    Alert.alert(error.message);
                    console.warn(error);
                    onLoading(false);
                });
        }
        setTimeout(() => {
            onLoading(false);
        }, 1000);
    };

    const onPressCapture = () => {
        if (imagesUrl.length < 30) {
            ImagePicker.launchCamera(PhotoQualityOptions, (res) => {
                var response = null;
                if (res.didCancel) {
                } else if (res.error) {
                    Alert.alert(res.error);
                } else if (res.customButton) {
                } else if (res.errorCode == "camera_unavailable") {
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
    const removeImage = (index) => {
        setImageUploadUrl(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })

    };

    const onSaveGeota = (action) => {
        if (isLocationDetail == null) {
            Alert.alert("alert", "Please add Location.")
            return
        }
        else if (imagesUrl.length == 0) {
            Alert.alert("alert", "Please add Image.")
            return
        }
        else if (isRemark == "") {
            Alert.alert("alert", "Please add remarks.")
            return
        }

        var data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            geotag_type: "Achievement",
            district_id: JSON.stringify(selectedDistricts?.value),
            taluka: taluka,
            village: village,
            scheme: scheme,
            remarks: isRemark,
            task: action,

            geotagData: {
                sl_lattitude: {
                    tag_by: UserManager.first_name + " " + UserManager.last_name,
                    latitude: isLocationDetail.latitude,
                    longitude: isLocationDetail.longitude,
                    address: isLocationDetail.address,
                    block: isLocationDetail.block,
                    village: isLocationDetail.village,
                    images: imagesUrl,
                },
                geotag: data,
            },

        };

        // onLoading(true);
        // Service.post(EndPoints.saveGeotagData, obj, (res) => {
        //     onLoading(false);
        //     if (res._resultflag) {
        //         Alert.alert('', res.message, [
        //             {
        //                 text: 'OK', onPress: () => {
        //                     props.navigation.goBack()
        //                 }
        //             },
        //         ]);

        //     } else showErrorToast(res.message);
        // },
        //     (err) => {
        //         onLoading(false);
        //     }
        // );

    }

    return (
        <SafeAreaView style={PageStyle.mainView}>
            <Header
                onLeftPress={() => navigation.goBack()}
                title="Household Geotag"
                leftIcon={<IcnBack />}
            />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View style={PageStyle.modifySearch}>
                        <Text style={PageStyle.modifySearchText}>
                            {Labels.generalDetails}
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>

                    {scheme?.title == "Additional Households" &&
                        <TouchableOpacity style={PageStyle.heading} onPress={() => setPopUpVisible(true)}>
                            <View style={PageStyle.textView}>
                                <Text style={PageStyle.headingText}>{"Enter Household Details"}</Text>
                            </View>
                            <View style={PageStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>

                    }
                    <View style={{ marginHorizontal: AppUtil.getWP(5), }}>
                        <LocationBar
                            title="Complete Address*"
                            icon={<IcnAddress />}
                            getdata={isLocationDetail?.address}
                            setData={(text) => null}
                            handlePress={() => onLocationPress()}
                        />
                        <InputFields3
                            backgroundColor={true}
                            title1="Block"
                            value1={isLocationDetail?.block}
                            title2="Town/City/State"
                            value2={isLocationDetail?.village}
                        />

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

                        <View style={PageStyle.mapConstainer}>

                            <MapView style={{ width: '100%', height: '100%' }}
                                ref={mapRef}
                                initialRegion={isInitialRegion}
                                mapType={isMapview == "satellite" ? "satellite" : "standard"}>

                                {/* {cardData && cardData.map((data, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), }}
                                        pinColor={"red"}
                                    >
                                        <IcnDTR1 />
                                    </Marker>
                                ))} */}

                                <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
                                    <IcnDTR1 />
                                </Marker>
                            </MapView>

                            <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
                                onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                                <IcnAddress />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: 10 }}>

                            <SubmitBtn
                                onPress={() => onPressCapture()}
                                backColor={imagesUrl.length < 30 ? Colors.orange : Colors.disableViewColor}
                                title={imagesUrl.length == 0 ? "Capture Photo" : "Capture Another Photo"}
                            />
                        </View>

                        {imagesUrl.length > 0 && (
                            <>
                                <View style={PageStyle.imageContainer}>
                                    {imagesUrl.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={PageStyle.imagebtn} onPress={() => null}>
                                                <Image
                                                    source={{ uri: image_base_url + item.imagepath }}
                                                    style={PageStyle.image}
                                                />
                                                <TouchableOpacity onPress={() => removeImage(index)} style={PageStyle.imageTouch} >
                                                    <Text style={{ color: Colors.white }}>X</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                        {isLocationDetail != null && isRemark != "" && imagesUrl.length > 0 &&

                            <View style={PageStyle.margintop}>
                                <View style={PageStyle.twobtn}>
                                    <TouchableOpacity style={PageStyle.btnSave} onPress={() => { onSaveGeota("save") }}>
                                        <Text style={PageStyle.txtSave}>Save</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={PageStyle.btnSave} onPress={() => { onSaveGeota("submit") }}>
                                        <Text style={PageStyle.txtSave}>Submit</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        }


                    </View>

                </ScrollView>
            </KeyboardAwareScrollView>

            <HouseHoldDetailsPopup
                isModalVisible={isPopUpVisible}
                handleClose={() => setPopUpVisible(false)}
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
};

export default React.memo(HouseholdsCreateGeotagScreen);


