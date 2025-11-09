// Other by Khasiya Sagar.
//import liraries
import React, { Component, memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Alert } from 'react-native';
import { AppUtil, PhotoQualityOptions } from '../../utils/AppUtil';
import { Colors } from '../../utils/Colors';
import { useRoute } from '@react-navigation/native';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import IcnGreyDown from '../../assets/svg/IcnGreyDown';
import IcnAddress from '../../assets/svg/powerTransformersSvgs/IcnAddress';
import InputFields3 from '../../components/inputFields/InputFields3';
import LocationBar from "../../components/locationBar/LocationBar";
import MapView, { Marker } from 'react-native-maps';
import IcnSubstations from '../../assets/svg/IcnSubstations';
import SubmitBtn from '../../components/clogin/commonButton/SubmitBtn';
import AddressCard from '../../components/addressCard/AddressCard';
import DropCard from '../../components/dropCard/DropCard';
import ImageViewer from '../../components/imageViewr/ImageViewer';
import LocationPopup from '../../components/LocationPopup';
import Header from '../../components/header/Header';
import Geolocation from '@react-native-community/geolocation';
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import Geocoder from "react-native-geocoding";

import * as ImagePicker from "react-native-image-picker";
import moment from "moment";
import { onLoading } from '../../../App';
import { ImageUploadAPI, Service } from '../../service/Service';
import { EndPoints } from '../../service/Endpoints';
import { image_base_url } from '../../service/appConfig';
import { UserManager } from '../../manager/UserManager';
import GeotagThreeImageOptimazeModule from '../../components/GeotagThreeImageOptimazeModule';
import { SafeAreaView } from 'react-native-safe-area-context';

var _codeIndex = ""
let _recentList = ""

// create a component
const SubstationsGeneralAssetScreen = (props) => {

    const route = useRoute();
    const { selectedOption, achievementButtonState, geotagType, indexCode, selectedDistricts, selectedItem,
        sl_district_items_specification,
        selectedMajorComponent,
        selectedSubComponent,
        selectedDistrictsName, list, recentList, isDTRList, pacageList } = route.params;



    let watchID = null;
    const mapRef = React.useRef(null);
    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [currentLongitude, setCurrentLongitude] = useState(-1);
    const [currentLatitude, setCurrentLatitude] = useState(-1);
    const [address, setAddress] = useState("");
    const [blockNo, setBlockNo] = useState("");
    const [village, setVillage] = useState("");
    const [imagesUrl, setImageUploadUrl] = useState([]);
    const [recordDetail, setRecordDetail] = useState(null);
    const [savedData, setSavedData] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [isIndexCode, setIndexCode] = useState(null);
    const [isMapview, setMapview] = useState("standard");

    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);

    const data = [
        { label: "Option 1", value: "option1" },
    ];
    const [expandedStates, setExpandedStates] = useState(
        Array(data.length).fill(false)
    );

    const toggleExpandedState = (index) => {
        const updatedStates = [...expandedStates];
        updatedStates[index] = !updatedStates[index];
        setExpandedStates(updatedStates);
    };

    useEffect(() => {
        _recentList = recentList;
        let title = list.length == 0 ? "000" : list[0]?.title;
        setIndexCode(indexCode + "_" + title + "_sr00" + (_recentList + 1) + "_" + AppUtil.generateUniqueKey());
        _codeIndex = title;
        onRecentList();
    }, []);

    const onRecentList = () => {

        const body = {
            form_id: 33,
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,

            major_component: selectedMajorComponent,
            sub_component: selectedSubComponent,

            district_id: selectedDistricts,
            items_specification: sl_district_items_specification,
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
            taging_for: selectedOption,
        };

        onLoading(true);
        Service.post(EndPoints.getSsGeoTagData, body, (response) => {
            if (response._resultflag) {
                let arr = [];
                for (let disObj of response?.data) {
                    if (disObj?.item_no == _codeIndex) {
                        arr.push(disObj)
                    }
                }

                setSavedData(arr);
                onIndexUpdate(_codeIndex, arr.length + 1);

                onLoading(false);
            } else {
                Alert.alert("Alert", response.message);
                onLoading(false);
            }
        },
            (error) => {
                // Alert.alert("Alert", error.message);
                onLoading(false);
            }
        );

    }

    const onIndexUpdate = (value2, value3) => {
        setIndexCode(indexCode + "_" + value2 + "_sr00" + value3 + "_" + AppUtil.generateUniqueKey());
    }

    const saveGotage = () => {
        if (recordDetail == null) {
            Alert.alert("Alert", "Please add Location");
        }
        else if (imagesUrl?.length == 0) {
            Alert.alert("Alert", "Please add image");
        } else {

            const data = {
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                form_id: 33,
                district_id: selectedDistricts,
                geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
                taging_for: selectedOption,
                geotagData: {
                    sl_district_major_component: [selectedMajorComponent],
                    sl_district_sub_component: [selectedSubComponent],
                    sl_district_items_specification: [sl_district_items_specification],
                    sl_lattitude: {
                        index_id: isIndexCode,
                        item_no: _codeIndex,
                        title: selectedItem,
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        address: address,
                        block: blockNo,
                        village: village,
                        tag_by: UserManager.first_name + " " + UserManager.last_name,
                        images: imagesUrl,
                    },
                },
            };

            onLoading(true);
            Service.post(EndPoints.saveSsGeoTagData, data, (success) => {
                if (success._resultflag) {
                    setImageUploadUrl([]);
                    setRecordDetail(null);
                    setBlockNo("");
                    setVillage("");
                    setAddress(null);
                    onLoading(false);
                    onRecentList();
                } else {
                    Alert.alert("Alert", success.message);
                    onLoading(false);
                }
            },
                (error) => {
                    // Alert.alert("Alert", error.message);
                    onLoading(false);
                }
            );
        }
    }

    handleClick = () => {
        props.navigation.navigate("SubstationsDetails", {
            geotagType,
            indexCode,
            selectedDistricts,
            selectedItem,
            sl_district_items_specification,
            sl_district_major_component: selectedMajorComponent,
            sl_district_sub_component: selectedSubComponent,
            selectedOption,
            achievementButtonState,
            item_no: _codeIndex,
            pacageList: pacageList
        });
    };
    //------------------------------------------------------------ IMAGE & LOCATION FUNCTION  ----------------------------------------------------------------------//

    useEffect(() => {

        subscribeLocationLocation();
        return () => {
            mapRef.current = null;
            Geolocation.clearWatch(watchID);
        };
    }, []);

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition((position) => { }, (error) => { }, {
            enableHighAccuracy: true,
            maximumAge: 100,
            distanceFilter: 0.5
        }
        );
    };

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
        Geolocation.getCurrentPosition((info) => {
            onLoading(false);
            setDefultLatitude(JSON.stringify(info.coords.latitude));
            setDefultLongitude(JSON.stringify(info.coords.longitude));
            setLocationPopupVisible(true)
        },
            (error) => {
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
                    address: json.results[0].formatted_address,
                    block: addressComponent,
                    date: moment(new Date()),
                    title: selectedItem,
                    subTitle: isIndexCode,
                    village: addressComponent3,
                };

                if ((selectedDistrictsName.toLowerCase()) == (addressComponent3.toLowerCase()) ||
                    (selectedDistrictsName.toLowerCase()) == (addressComponent4.toLowerCase())) {
                    setBlockNo(addressComponent);
                    setVillage(addressComponent3);
                    setAddress(json.results[0].formatted_address);
                    setRecordDetail(data);
                }
                else {
                    Alert.alert('Alert', "Seems you are not on the location, Do like to proceed with current location?", [
                        {
                            text: 'Yes', onPress: () => {
                                setBlockNo(addressComponent);
                                setVillage(addressComponent3);
                                setAddress(json.results[0].formatted_address);
                                setRecordDetail(data);
                            }
                        },
                        {
                            text: 'No', onPress: () => {

                                setAddress(null);
                                setBlockNo("");
                                setVillage("");

                                setCurrentLongitude(-1);
                                setCurrentLatitude(-1);

                                mapRef.current?.animateToRegion({
                                    latitude: 23,
                                    longitude: 79,
                                    latitudeDelta: 30,
                                    longitudeDelta: 30,
                                });
                                // }
                            }
                        }
                    ]);
                }

                onLoading(false);
            }).catch((error) => {
                var data = {
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    address: ".",
                    block: ".",
                    date: moment(new Date()),
                    title: selectedItem,
                    subTitle: isIndexCode,
                    village: ".",
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

                            setAddress(null);
                            setBlockNo("");
                            setVillage("");

                            setCurrentLongitude(-1);
                            setCurrentLatitude(-1);

                            mapRef.current?.animateToRegion({
                                latitude: 23,
                                longitude: 79,
                                latitudeDelta: 30,
                                longitudeDelta: 30,
                            });
                            // }
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
                } else if (res.errorCode == "camera_unavailable") {
                    let images = [...imagesUrl, Labels?.data];
                    setImageUploadUrl(images);
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
            Alert.alert("You can upload only 5 images");
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

    return (
        <SafeAreaView style={styles.mainView}>
            <Header title="Substation Geotag" leftIcon={<IcnBack />} onLeftPress={() => props.navigation.goBack()} />

            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.text}>
                            {selectedItem}
                        </Text>
                    </View>
                    <View style={styles.modifySearch}>
                        <Text style={styles.modifySearchText}>
                            General Assets Details
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerContainer}>

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

                        <View style={{ width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(2), borderWidth: 0.5, borderColor: Colors.orange, }}>

                            <MapView style={{ width: '100%', height: '100%' }}
                                ref={mapRef}
                                initialRegion={isInitialRegion}
                                mapType={isMapview == "satellite" ? "satellite" : "standard"}>

                                {isDTRList && isDTRList.map((data, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), }}
                                        pinColor={"red"}
                                    >
                                        <IcnSubstations width={20} height={5} />
                                    </Marker>
                                ))}

                                <Marker coordinate={{ latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude) }} pinColor={"purple"}>
                                    <IcnSubstations />
                                </Marker>
                            </MapView>

                            <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
                                onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                                <IcnAddress />
                            </TouchableOpacity>
                        </View>

                        <SubmitBtn onPress={() => onPressCapture()} backColor={imagesUrl.length < 5 ? Colors.orange : Colors.disableViewColor} title="Capture Photo" />

                        {imagesUrl.length > 0 &&
                            <GeotagThreeImageOptimazeModule item={imagesUrl} handlePressImage={(index) => handlePressImage(index)} removeImage={(index) => removeImage(index)} />
                        }
                        {/* {imagesUrl.length > 0 && (
                            <>
                                <View style={styles.imageContainer}>
                                    {imagesUrl.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={styles.imagebtn} onPress={() => handlePressImage(index)}>
                                                <Image source={{ uri: image_base_url + item.imagepath }} style={styles.image} />
                                                <TouchableOpacity onPress={() => removeImage(index)}
                                                    style={styles.imgStyle}                        >
                                                    <Text style={{ color: Colors.white }}>X</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                {recordDetail != null && <AddressCard data={recordDetail} />}

                            </>
                        )} */}

                        <SubmitBtn onPress={() => { saveGotage(); }} title="Save" />

                        {savedData.length > 0 &&
                            savedData.map((item, index) => (
                                <DropCard
                                    isExpanded={expandedStates[index]}
                                    onPress={() => toggleExpandedState(index)}
                                    key={index}
                                    title={item.index_id}
                                    addressCard={<AddressCard data={item} />}
                                />
                            ))}

                        {savedData.length > 0 && (<SubmitBtn title="Submit" onPress={() => { handleClick() }} />)}
                    </View>
                </View >
            </ScrollView >
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

        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    mainView: { marginBottom: AppUtil.getHP(8), },
    container: { flex: 1, marginBottom: AppUtil.getHP(1), backgroundColor: Colors.primaryBackground, },
    text: { color: Colors.secondary, fontSize: 16, fontWeight: 500, },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(2), },
    innerContainer: { marginHorizontal: AppUtil.getWP(5), },
    imageContainer: { width: "100%", flexDirection: "row", marginTop: 10, flexWrap: "wrap", },
    imagebtn: { marginHorizontal: AppUtil.getWP(1), width: "30%", height: AppUtil.getHP(10), borderRadius: 10, backgroundColor: Colors.white, marginBottom: AppUtil.getHP(1) },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
    expandableCard: { flexDirection: "row", borderRadius: 10, marginTop: AppUtil.getHP(1), backgroundColor: Colors.white, padding: AppUtil.getHP(1), },
    cardText: { width: "95%", marginHorizontal: AppUtil.getWP(1), },
    expandableCardText: { color: Colors.black, fontSize: AppUtil.getHP(1.8), fontWeight: "bold", },
    cardBtn: { width: "5%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", flex: 1, },
    imgStyle: { height: 25, width: 25, position: "absolute", alignItems: "center", justifyContent: "center", backgroundColor: Colors.orange, right: -5, top: -5, borderRadius: 15, },
});

//make this component available to the app
export default memo(SubstationsGeneralAssetScreen);
