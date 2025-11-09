//import liraries
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image, TextInput, } from "react-native";
import React, { memo, useState, useRef, useEffect, } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Labels } from "../../utils/Labels";
import { AppUtil, PhotoQualityOptions } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { useRoute } from "@react-navigation/native";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import Geolocation from "@react-native-community/geolocation";
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import { onLoading } from "../../../App";
import * as ImagePicker from "react-native-image-picker";
import { UserManager } from "../../manager/UserManager";
import { SqlData } from "../../database/SqlData";
import { StackActions } from '@react-navigation/native';
import LocationPopupOffline from "../../components/LocationPopupOffline";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
const OffLineGeneralAssetDetail = () => {

    const route = useRoute();
    const { parentData, selectedDistricts, geotagModule, geotagType, selectedDistrictsName, sessionType } = route.params;

    const navigation = useNavigation();
    const mapRef = React.useRef(null);
    let watchID = null;

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [isMapview, setMapview] = useState("standard");

    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);
    const [isImagesUrl, setImageUploadUrl] = useState([]);
    const [isRemark, setRemark] = useState("");

    useEffect(() => {
        SqlData.createTablex("SaveDtrGeotagTable");
        Geolocation.clearWatch(watchID);
        subscribeLocationLocation()
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);


    const onGetLocation = () => {
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
    }
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
            enableHighAccuracy: false,
            interval: 100,
            distanceFilter: 0.1,
            // useSignificantChanges:true,
        }
        );
    };
    const onGetCurrentLocation = (currentLatitude, currentLongitude) => {

        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);

        mapRef.current?.animateToRegion({
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });

        setTimeout(() => {
            onLoading(false);
        }, 1000);
    };
    const onPressCapture = () => {
        if (isImagesUrl.length < 3) {
            ImagePicker.launchCamera(PhotoQualityOptions, (res) => {
                var response = null;
                if (res.didCancel) {
                } else if (res.error) {
                    Alert.alert(res.error);
                } else if (res.customButton) {
                } else if (res.errorCode == "camera_unavailable") {
                } else {
                    response = res.assets[0];
                    let images = [...isImagesUrl, response];
                    setImageUploadUrl(images);
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
    const handleSubmit = () => {
        if (isCurrentLatitude == -1 || isCurrentLongitude == -1) {
            Alert.alert("Alert", "Please add Location");
        } else if (isImagesUrl?.length < 1) {
            Alert.alert("Alert", "Please add image");
        } else if (isRemark == "") {
            Alert.alert("alert", "Please add remarks.")
        } else {
            var obj = {
                form_id: 33,
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                remark: isRemark,
                latitude: isCurrentLatitude,
                longitude: isCurrentLongitude,
                images: isImagesUrl,
                itemSummary: parentData?.item_summary,
                parentData: parentData,
                selectedDistrictsName,
                selectedDistricts,
                geotagModule,
                geotagType,
                sessionType
            };

            SqlData.setDatax('SaveDtrGeotagTable', false, obj, (response) => {
                const popAction = StackActions.pop(1);
                navigation.dispatch(popAction);
            }, (error) => {
                Alert.alert("Alert", "something wrong try again later")
            });
        }

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onLeftPress={() => navigation.goBack()}
                title="DTR Geotag"
                leftIcon={<IcnBack />}
            />

            <KeyboardAwareScrollView>
                <ScrollView>
                    <View style={styles.title}>
                        <Text style={styles.text}>{parentData?.major_components + " " + parentData?.sub_components} </Text>
                    </View>
                    {/* <View style={styles.subHeader}>
                        <Text style={styles.subHeaderText}>{indexCode}</Text>
                    </View> */}

                    <View style={styles.modifySearch}>
                        <Text style={styles.modifySearchText}>
                            {Labels.generalDetails}
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <SingleDropdownList data={list} onSelectedSevice={(value) => { onSelectValue(value) }} />
                    </View> */}

                    <View style={{ marginTop: 10, paddingHorizontal: 10, flexDirection: "row"}}>

                        <View style={styles.textInput11}>
                            <Text style={styles.txtLet}>Latitude</Text>
                            <View style={styles.textInput1}>
                                <Text style={styles.text}>{isCurrentLatitude == -1 ? "" : isCurrentLatitude}</Text>
                            </View>
                        </View>

                        <View style={styles.textInput22}>
                            <Text style={styles.txtLet}>Longitude</Text>
                            <View style={styles.textInput2}>
                                <Text style={styles.text}>{isCurrentLongitude == -1 ? "" : isCurrentLongitude}</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => onGetLocation()}
                            style={styles.buttonIcon}>
                            <IcnAddress />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.remarkCantainer}>

                        <Text style={styles.fieldTitle}>Remarks*</Text>
                        <View style={styles.container}>
                            <TextInput
                                multiline={true}
                                maxLength={500}
                                value={isRemark}
                                editable={true}
                                style={styles.enabledField}
                                onChangeText={(text) => setRemark(text)}
                            />
                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 10, marginTop: AppUtil.getHP(2), }}>
                        <View style={{ width: '100%', height: AppUtil.getHP(30), borderWidth: 0.5, borderColor: Colors.orange, }}>
                            <MapView style={{ width: '100%', height: '100%' }}
                                ref={mapRef}
                                initialRegion={isInitialRegion}
                                mapType={isMapview == "satellite" ? "satellite" : "standard"}>
                                <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
                                    <IcnDTR1 />
                                </Marker>
                            </MapView>
                            <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
                                onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                                <IcnAddress />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <SubmitBtn
                            onPress={() => onPressCapture()}
                            backColor={isImagesUrl.length < 3 ? Colors.orange : Colors.disableViewColor}
                            title={isImagesUrl.length == 0 ? "Capture Photo" : "Capture Another Photo"}
                        />
                    </View>

                    {isImagesUrl.length > 0 && (
                        <>
                            <View style={styles.imageContainer}>
                                {isImagesUrl.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.imagebtn} onPress={() => handlePressImage(index)}>
                                            <Image source={{ uri: item?.uri }} style={styles.image} />
                                            <TouchableOpacity onPress={() => removeImage(index)} style={styles.ImageRemove}>
                                                <Text style={{ color: Colors.white }}>X</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <View style={{ paddingHorizontal: 10, marginBottom: 30 }}>
                                <SubmitBtn title="Save" onPress={() => handleSubmit()} />
                            </View>
                        </>
                    )}

                </ScrollView>
            </KeyboardAwareScrollView>

            <LocationPopupOffline
                isVisible={isLocationPopupVisible}
                handleClose={() => setLocationPopupVisible(false)}
                lett={isDefultLatitude}
                long={isDefultLongitude}
                finalPont={(data) => onGetCurrentLocation(data?.latitude, data?.longitude)}
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({

    remarkCantainer: { paddingHorizontal: 10 },
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        width: "100%",
        alignSelf: "center",
        borderRadius: 5,
    },

    enabledField: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 90,
        color: Colors.darkBlack,
        width: "100%",
        paddingHorizontal: AppUtil.getWP(3),
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    fieldTitle: {
        fontSize: AppUtil.getHP(1.8),
        color: Colors.darkBlack,
        fontWeight: "500",
        alignSelf: "flex-start",
        marginTop: AppUtil.getHP(1),
        marginBottom: AppUtil.getHP(1),
    },

    txtLet: { borderRadius: 5, height: 25, color: Colors.darkBlack, },

    textInput11: { width: "42%", },

    textInput1: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 45,
        color: Colors.darkBlack,
        justifyContent: 'center',
        paddingStart: 5,
    },

    textInput22: { width: "42%", marginLeft: "2%" },

    textInput2: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 45,
        color: Colors.darkBlack,
        justifyContent: 'center',
        paddingStart: 5,
    },
    buttonIcon: {
        width: 45,
        height: 45,
        marginStart: 10,
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: Colors.disableViewColor,
    },
    text: { color: Colors.secondary, fontSize: 14, fontWeight: "500", },
    subHeader: {
        width: "100%",
        height: AppUtil.getHP(3),
        backgroundColor: Colors.white,
        justifyContent: "center",
        paddingHorizontal: AppUtil.getWP(4),
    },

    subHeaderText: { fontSize: AppUtil.getHP(1.7), color: Colors.darkBlack, fontFamily: Fonts.RobotoBold, },

    modifySearch: {
        flexDirection: "row",
        padding: AppUtil.getHP(1.5),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.disableViewColor,
    },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(1) },
    imageContainer: { flexDirection: "row", marginVertical: AppUtil.getHP(2), paddingHorizontal: 10, },
    imagebtn: {
        marginHorizontal: AppUtil.getWP(1),
        width: "31%",
        height: AppUtil.getHP(10),
        borderRadius: 10,
        backgroundColor: Colors.white,
    },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
    ImageRemove: {
        height: 25,
        width: 25,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.orange,
        right: -5,
        top: -5,
        borderRadius: 15,
    }



});

//make this component available to the app
export default memo(OffLineGeneralAssetDetail);
