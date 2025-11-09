// Other by Khasiya Sagar.
//import liraries
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Alert, Image, ActivityIndicator, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnUpload from "../../assets/svg/IcnUpload";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import React, { memo, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserManager } from "../../manager/UserManager";
import { onLoading } from "../../../App";
import { postFormDataAPI, Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { Labels } from "../../utils/Labels";
import { Fonts } from "../../utils/Fonts";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import Geocoder from "react-native-geocoding";
import moment from "moment";
import InputFields2 from "../../components/inputFields/InputFields2";
import LocationBar from "../../components/locationBar/LocationBar";
import MapView, { Polyline, Marker, } from 'react-native-maps';
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import { image_base_url } from "../../service/appConfig";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import LocationPopup from "../../components/LocationPopup";
import DropdownList from "../../components/singleselectlist/DropdownList";
import { SafeAreaView } from "react-native-safe-area-context";

var _codeIndex = ""

// create a component
const OffLineOthersGeotagSaveScreen = () => {
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


    const [isPackage, setPackage] = useState("");
    const [isRecentGeotagList, setRecentGeotagList] = useState([]);
    const [isAddress, setAddress] = useState("");
    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);
    const [isIndexCodeLable, setIndexCodeLable] = useState("");
    const [isIndexCode, setIndexCode] = useState("");

    const [isSubmittedItem, setSubmittedItem] = useState([]);
    const [isLocationDetail, setLocationDetail] = useState();
    const [isList, setList] = useState([]);

    const [isImagesUrl, setImageUploadUrl] = useState([]);
    const [isImages1, setImage1] = useState("");
    const [isImages2, setImage2] = useState("");
    const [isImages3, setImage3] = useState("");
    const [isLoader1, setLoader1] = useState(false);
    const [isLoader2, setLoader2] = useState(false);
    const [isLoader3, setLoader3] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        onLoading(true);
        try {
            const body = {
                discom_id: UserManager.discom_id,
                district_id: item?.selectedDistricts,
                major_component_id: item?.parentData?.major_component_id,
                sub_component_id: item?.parentData?.sub_component_id,
                items_specification_id: item?.parentData?.item_specification_id,
            };

            Service.post(EndPoints.recentOtherGeotagList, body, (response) => {
                onLoading(false);
                if (response.data) {
                    setIndexCodeLable(response?.index_code);
                    setRecentGeotagList(response?.data);
                    setSubmittedItem(response?.submitted_item);
                    setDefultAsset(response?.data, response?.index_code);
                    // setAsetNumber(response?.submitted_item, response?.index_code)

                }
                else
                    showErrorToast(response?.message);
            },
                (err) => {
                    onLoading(false);
                }
            );
        } catch (error) {
        } finally {
            onLoading(false);
        }
    };

    // const setAsetNumber = (submittedItem, index_code) => {

    //     var arr = [];

    //     // for (let i = 0; i < (item?.parentData?.sanctioned); i++) {
    //     //     if (i < 9)
    //     //         arr.push({ title: "00" + (i + 1) });
    //     //     else
    //     //         arr.push({ title: "0" + (i + 1) });
    //     // }
    //     // setList(findCommonValues(arr, submittedItem));

    //     setDefultAsset(findCommonValues(arr, submittedItem), index_code);
    // }

    const setDefultAsset = (othersList, index_code) => {

        if (othersList.length) {
            let strToNum = parseInt(othersList[0]?.item_no) || 0;
            _codeIndex = "000" + (strToNum + 1);
            setIndexCode(index_code + "_" + _codeIndex + AppUtil.generateUniqueKey());
        }
        else {
            _codeIndex = "0001";
            setIndexCode(index_code + "_" + _codeIndex + AppUtil.generateUniqueKey());
        }


        // _codeIndex = list.length == 0 ? "000" : list[0].title;
        // setIndexCode(index_code + "_" + _codeIndex + "_00" + (isRecentGeotagList.length + 1));
        onFindLocation()

    }


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

        if (isImagesUrl?.length == 3)
            return;

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

        if (isImagesUrl?.length == 3)
            return;

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

        if (isImagesUrl?.length == 3)
            return;

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

    const onNext = () => {
        if (isImagesUrl?.length < 1)
            Alert.alert("Alert", "Please add image");
        else
            navigation.navigate("OffLineOtherGeotagFormScreen", {
                item: item,
                selectedDistricts: { value: item?.selectedDistricts },
                parentData: item?.parentData,
                imagesUrl: isImagesUrl,
                locationDetail: isLocationDetail,
                otherPackage: isPackage,
                indexCode: isIndexCode,
                codeIndex: _codeIndex
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Others Geotag"
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
                        {/* <SingleDropdownList defoultTitle={_codeIndex} data={isList} onSelectedSevice={(value) => { onSelectValue(value) }} /> */}

                        <View style={{ marginTop: 10 }}>
                            <DropdownList title={"Package No."} data={item?.parentData?.package_data} onSelectedSevice={(value) => { setPackage(value) }} />
                            <Text style={styles.asaText}>{'*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”'}</Text>
                        </View>

                        <LocationBar
                            title="Complete Address*"
                            icon={<IcnAddress />}
                            getdata={isAddress}
                            setData={(text) => null}
                            handlePress={() => setLocationPopupVisible(true)}
                        />

                        <InputFields2
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
                        <SubmitBtn title="Next" onPress={() => onNext()} />
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
    );
};

// define your styles
const styles = StyleSheet.create({

    commaonMargin: { marginTop: 10, paddingHorizontal: 10 },
    mapContener: { width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), borderWidth: 0.5, borderColor: Colors.orange, },
    container: { flex: 1, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(1), },
    text: { color: Colors.secondary, fontSize: 16, fontWeight: 500, },
    subHeader: { width: "100%", height: AppUtil.getHP(3), backgroundColor: Colors.white, justifyContent: "center", paddingHorizontal: AppUtil.getWP(4), },
    subHeaderText: { fontSize: 12, color: Colors.darkBlack, fontFamily: Fonts.RobotoBold, },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    titleText: { color: Colors.darkBlack, fontSize: 14, fontWeight: 500, marginVertical: 5, },
    textInput: { width: "100%", padding: 10, backgroundColor: Colors.disableViewColor, borderRadius: 5, color: Colors.darkBlack, },
    mapView: { width: '100%', height: '100%' },
    imageContainer: { flexDirection: "row", marginVertical: AppUtil.getHP(2), },
    imageUpload: { height: AppUtil.getHP(10), width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: Colors.whaiteTansColor, position: 'absolute' },
    imagebtn: { marginHorizontal: AppUtil.getWP(1), width: "31%", height: AppUtil.getHP(10), borderRadius: 10, backgroundColor: Colors.white, },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
    asaText: { fontFamily: Fonts.RobotoRegular, fontSize: AppUtil.getHP(1.5), color: Colors.mediumGray, marginTop: 3, },
});

//make this component available to the app
export default memo(OffLineOthersGeotagSaveScreen);

