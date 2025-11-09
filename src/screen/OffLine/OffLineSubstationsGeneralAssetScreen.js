// Other by Khasiya Sagar.
//import liraries
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Alert, Image, ActivityIndicator, } from "react-native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnUpload from "../../assets/svg/IcnUpload";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Labels } from "../../utils/Labels";
import { Fonts } from "../../utils/Fonts";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import { image_base_url } from "../../service/appConfig";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { UserManager } from "../../manager/UserManager";
import { EndPoints } from "../../service/Endpoints";
import { onLoading } from "../../../App";
import { postFormDataAPI, Service } from "../../service/Service";
import Geocoder from "react-native-geocoding";
import moment from "moment";
import { SqlData } from "../../database/SqlData";
import LocationPopup from "../../components/LocationPopup";
import LocationBar from "../../components/locationBar/LocationBar";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import InputFields3 from "../../components/inputFields/InputFields3";
import { SafeAreaView } from "react-native-safe-area-context";

var _selectedIndex = ""
var _indexCode = ""
var _notSubmitedIndex = "";

// create a component
const OffLineSubstationsGeneralAssetScreen = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { item } = route.params;

    const mapRef = React.useRef(null);
    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [isAddress, setAddress] = useState("");
    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);

    const [isIndexCodeLable, setIndexCodeLable] = useState("");
    const [isLocationDetail, setLocationDetail] = useState(null);
    const [isImagesUrl, setImageUploadUrl] = useState([]);
    const [isImages1, setImage1] = useState("");
    const [isImages2, setImage2] = useState("");
    const [isImages3, setImage3] = useState("");
    const [isLoader1, setLoader1] = useState(false);
    const [isLoader2, setLoader2] = useState(false);
    const [isLoader3, setLoader3] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        const body = {
            form_id: 33,
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: item?.selectedDistricts,
            major_component: item?.parentData?.major_component_id,
            sub_component: item?.parentData?.sub_component_id,
            items_specification: item?.parentData?.item_specification_id,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
        };

        onLoading(true);
        Service.post(EndPoints.getSsGeoTagData, body, (response) => {
            if (response._resultflag) {
                _indexCode = response?.index_code;
                onSetDropdowanValue(response?.submitted_item ? response?.submitted_item : []);
                // onRecentList();
                onLoading(false);
            } else {
                Alert.alert("Alert", response.message);
                onLoading(false);
            }
        },
            (error) => {
                onLoading(false);
            }
        );
    };

    function onSetDropdowanValue(submittedItem) {
        var arr = [];
        for (let i = 0; i < 99; i++) {
            if (i < 9)
                arr.push({ title: "00" + (i + 1) });
            else
                arr.push({ title: "0" + (i + 1) });
        }

        _notSubmitedIndex = findCommonValues(arr, submittedItem)
        _selectedIndex = _notSubmitedIndex[0]?.title;

        setTimeout(() => {
            onRecentList();
        }, 100)
    }

    const findCommonValues = (arr1, arr2) => {
        let commonValues = [];

        if (arr1 && arr2 && arr1.length > 0 && arr2.length > 0) {

            arr1.forEach((value) => {
                if (arr2.includes(value?.title)) {
                }
                else {
                    commonValues.push(value);
                }
            });
        }
        else {
            commonValues = arr1;
        }

        return commonValues;
    };

    const onRecentList = () => {

        const body = {
            form_id: 33,
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: item?.selectedDistricts,
            major_component: item?.parentData?.major_component_id,
            sub_component: item?.parentData?.sub_component_id,
            items_specification: item?.parentData?.item_specification_id,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
        };

        onLoading(true);
        Service.post(EndPoints.getSsGeoTagData, body, (response) => {
            if (response._resultflag) {
                let arr = [];

                for (let disObj of response?.data) {
                    if (disObj?.item_no == _selectedIndex) {
                        arr.push(disObj)
                    }
                }
                onIndexUpdate(arr.length + 1);
                onLoading(false);
            } else {
                Alert.alert("Alert", response.message);
                onLoading(false);
            }
        },
            (error) => {
                onLoading(false);
            }
        );

    }

    const onIndexUpdate = (PendingLen) => {
        setIndexCodeLable(_indexCode + "_" + _selectedIndex + "_sr00" + PendingLen + "_" + AppUtil.generateUniqueKey());
        onFindLocation();
    }

    function onSave() {


        if (isLocationDetail == null) {
            Alert.alert("Alert", "Please add Location");
        }
        else if (isImagesUrl?.length == 0) {
            Alert.alert("Alert", "Please add image");
        }

        else {
            var data = {
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                form_id: 33,
                district_id: item?.selectedDistricts,
                geotag_type: "Achievement",
                taging_for: "LossReduction",

                geotagData: {
                    sl_district_major_component: [item?.parentData?.major_component_id],
                    sl_district_sub_component: [item?.parentData?.sub_component_id],
                    sl_district_items_specification: [item?.parentData?.item_specification_id],
                    sl_lattitude: {
                        index_id: isIndexCodeLable,
                        item_no: _selectedIndex,
                        title: item?.parentData?.major_components + " " + item?.parentData?.sub_components,
                        latitude: isLocationDetail.latitude,
                        longitude: isLocationDetail.longitude,
                        address: isLocationDetail.address,
                        block: isLocationDetail.block,
                        village: isLocationDetail.village,
                        images: isLocationDetail,
                        tag_by: UserManager.first_name + " " + UserManager.last_name,
                        images: isImagesUrl,
                    }
                }
            }

            onLoading(true);
            Service.post(EndPoints.saveSsGeoTagData, data, (success) => {
                onLoading(false);
                if (success._resultflag) {
                    Alert.alert("", success.message, [
                        {
                            text: "OK",
                            onPress: () => {

                                SqlData.DeleteData(item?.id, `DELETE FROM SaveSubstationGeotagTable WHERE id = ?;`, (response) => {
                                    navigation.goBack()
                                }, (error) => {
                                    navigation.goBack()
                                });
                            },
                        },
                    ]);
                } else {
                    Alert.alert("Alert", success.message);
                    onLoading(false);
                }
            },
                (error) => {
                    onLoading(false);
                }
            );
        }
    }
    //------------------------------------------------------------ IMAGE & LOCATION FUNCTION  ----------------------------------------------------------------------//

    function onFindLocation() {
        onLoading(true);
        Geocoder.from(item?.latitude, item?.longitude).then((json) => {
            var addressComponent = json.results[0]?.address_components[0]?.long_name;
            var addressComponent1 = json.results[0]?.address_components[1]?.long_name;
            var addressComponent2 = json.results[0]?.address_components[2]?.long_name;
            var addressComponent3 = json.results[0]?.address_components[3]?.long_name;
            var addressComponent4 = json.results[0]?.address_components[4]?.long_name;
            var addressComponent5 = json.results[0]?.address_components[5]?.long_name;

            var data = {
                latitude: parseFloat(item?.latitude),
                longitude: parseFloat(item?.longitude),
                address: addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5,
                block: addressComponent,
                village: addressComponent3,
                date: moment(new Date()),
            };

            setTimeout(() => {
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(item?.latitude),
                    longitude: parseFloat(item?.longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }, 1000)

            setLocationDetail(data);
            setAddress(data?.address);
            setDefultLatitude(parseFloat(item?.latitude));
            setDefultLongitude(parseFloat(item?.longitude));

            if (item?.images.length > 0)
                onUploadImage1();
            if (item?.images.length > 1)
                onUploadImage2();
            if (item?.images.length > 3)
                onUploadImage3();

            onLoading(false);
        }).catch((error) => {
            Alert.alert(error.message);
            onLoading(false);
        });
    }

    const onGetUpdateLocation = (currentLatitude, currentLongitude) => {

        onLoading(true);
        Geocoder.from(currentLatitude, currentLongitude).then((json) => {
            var addressComponent = json.results[0]?.address_components[0]?.long_name;
            var addressComponent1 = json.results[0]?.address_components[1]?.long_name;
            var addressComponent2 = json.results[0]?.address_components[2]?.long_name;
            var addressComponent3 = json.results[0]?.address_components[3]?.long_name;
            var addressComponent4 = json.results[0]?.address_components[4]?.long_name;
            var addressComponent5 = json.results[0]?.address_components[5]?.long_name;

            var data = {
                latitude: parseFloat(currentLatitude),
                longitude: parseFloat(currentLongitude),
                address: addressComponent1 + ", " + addressComponent2 + ", " + addressComponent3 + ", " + addressComponent4 + ", " + addressComponent5,
                block: addressComponent,
                village: addressComponent3,
                date: moment(new Date()),
            };

            setTimeout(() => {
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }, 1000)

            setDefultLatitude(parseFloat(currentLatitude));
            setDefultLongitude(parseFloat(currentLongitude));
            setLocationDetail(data);
            setAddress(data?.address);

            onLoading(false);
        }).catch((error) => {
            Alert.alert(error.message);
            onLoading(false);
        });
    };

    function onUploadImage1() {

        var data = {
            uri: item?.images[0]?.uri,
            name: item?.images[0]?.fileName,
            type: item?.images[0]?.type,
        };

        let formData = new FormData();
        formData.append("image", data);
        setLoader1(true);

        postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];
            setImageUploadUrl(images);
            setImage1(resp?.data?.imagepath);
            setLoader1(false);
        },
            (error) => {
                setLoader1(false);
            }
        );
    }

    function onUploadImage2() {

        var data = {
            uri: item?.images[1]?.uri,
            name: item?.images[1]?.fileName,
            type: item?.images[1]?.type,
        };

        let formData = new FormData();
        formData.append("image", data);
        setLoader2(true);

        postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];
            setImageUploadUrl(images);
            setImage2(resp?.data?.imagepath);
            setLoader2(false);
        },
            (error) => {
                setLoader2(false);
            }
        );
    }

    function onUploadImage3() {

        var data = {
            uri: item?.images[2]?.uri,
            name: item?.images[2]?.fileName,
            type: item?.images[2]?.type,
        };

        let formData = new FormData();
        formData.append("image", data);
        setLoader3(true);

        postFormDataAPI(EndPoints.imageUpload, formData, (resp) => {
            let images = [...isImagesUrl, resp.data];
            setImageUploadUrl(images);
            setImage3(resp?.data?.imagepath);
            setLoader3(false);
        },
            (error) => {
                setLoader3(false);
            }
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Substation Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View style={styles.title}>
                        <Text style={styles.text}>{item?.parentData?.major_components + " " + item?.parentData?.sub_components} </Text>
                    </View>
                    <View style={styles.modifySearch}>
                        <Text style={styles.modifySearchText}>
                            {Labels.generalDetails}
                        </Text>
                        <IcnGreyDown />
                    </View>

                    <View style={styles.commaonMargin}>

                        <LocationBar
                            title="Complete Address*"
                            icon={<IcnAddress />}
                            getdata={isAddress}
                            setData={(text) => null}
                            handlePress={() => setLocationPopupVisible(true)}
                        />

                        <InputFields3
                            title1="Block"
                            value1={isLocationDetail?.block}
                            title2="Town/City/State"
                            value2={isLocationDetail?.village}
                        />

                        <View style={styles.mapContener}>
                            <MapView style={styles.mapView}
                                ref={mapRef}
                                initialRegion={isInitialRegion}>
                                <Marker coordinate={{ latitude: parseFloat(isDefultLatitude), longitude: parseFloat(isDefultLongitude) }} pinColor={"purple"}>
                                    <IcnDTR1 />
                                </Marker>
                            </MapView>
                        </View>

                        <View style={styles.imageContainer}>

                            {isImages1 ? (

                                <View style={styles.imagebtn}>
                                    <Image source={{ uri: image_base_url + isImages1 }} style={styles.image} />
                                </View>
                            )
                                :
                                item?.images.length > 0 &&
                                <View style={styles.imagebtn}>
                                    <Image source={{ uri: item?.images[0]?.uri }} style={styles.image} />

                                    <TouchableOpacity style={styles.imageUpload} onPress={() => onUploadImage1()}>
                                        {isLoader1 ?
                                            <ActivityIndicator size={"large"} />
                                            :
                                            <IcnUpload />
                                        }
                                    </TouchableOpacity>
                                </View>

                            }
                            {isImages2 ? (

                                <View style={styles.imagebtn}>
                                    <Image source={{ uri: image_base_url + isImages2 }} style={styles.image} />
                                </View>
                            )
                                :
                                item?.images.length > 1 &&
                                <View style={styles.imagebtn}>
                                    <Image source={{ uri: item?.images[1]?.uri }} style={styles.image} />
                                    <TouchableOpacity style={styles.imageUpload} onPress={() => onUploadImage2()}>
                                        {isLoader2 ?
                                            <ActivityIndicator size={"large"} />
                                            :
                                            <IcnUpload />
                                        }
                                    </TouchableOpacity>
                                </View>
                            }
                            {isImages3 ? (

                                <View style={styles.imagebtn}>
                                    <Image source={{ uri: image_base_url + isImages3 }} style={styles.image} />
                                </View>
                            )
                                :
                                item?.images.length > 2 &&
                                <View style={styles.imagebtn}>
                                    <Image source={{ uri: item?.images[2]?.uri }} style={styles.image} />
                                    <TouchableOpacity style={styles.imageUpload} onPress={() => onUploadImage3()}>
                                        {isLoader3 ?
                                            <ActivityIndicator size={"large"} />
                                            :
                                            <IcnUpload />
                                        }
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>


                    <View style={styles.commaonMargin}>
                        <SubmitBtn title="Save" onPress={() => onSave()} />
                    </View>

                    <View style={styles.commaonMargin} />

                </ScrollView>
            </KeyboardAwareScrollView>

            <LocationPopup
                isVisible={isLocationPopupVisible}
                handleClose={() => setLocationPopupVisible(false)}
                lett={isDefultLatitude}
                long={isDefultLongitude}
                finalPont={(data) => onGetUpdateLocation(data?.latitude, data?.longitude)}
            />

        </SafeAreaView>
    )
};

// define your styles
const styles = StyleSheet.create({
    commaonMargin: { marginTop: 10, paddingHorizontal: 10 },
    mapContener: { width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), borderWidth: 0.5, borderColor: Colors.orange, },
    container: { flex: 1, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(1), },
    text: { color: Colors.secondary, fontSize: 16, fontWeight: 500, },
    subHeader: { width: "100%", height: AppUtil.getHP(3), backgroundColor: Colors.white, justifyContent: "center", paddingHorizontal: AppUtil.getWP(4), },
    subHeaderText: { fontSize: AppUtil.getHP(1.7), color: Colors.darkBlack, fontFamily: Fonts.RobotoBold, },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    titleText: { color: Colors.darkBlack, fontSize: 14, fontWeight: 500, marginVertical: 5, },
    textInput: { width: "100%", padding: 10, backgroundColor: Colors.disableViewColor, borderRadius: 5, color: Colors.darkBlack, },
    mapView: { width: '100%', height: '100%' },
    imageContainer: { flexDirection: "row", marginVertical: AppUtil.getHP(2), },
    imageUpload: { height: AppUtil.getHP(10), width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: Colors.whaiteTansColor, position: 'absolute' },
    imagebtn: { marginHorizontal: AppUtil.getWP(1), width: "31%", height: AppUtil.getHP(10), borderRadius: 10, backgroundColor: Colors.white, },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
});

//make this component available to the app
export default memo(OffLineSubstationsGeneralAssetScreen);
