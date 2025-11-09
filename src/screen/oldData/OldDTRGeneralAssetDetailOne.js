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
import InputFields3 from "../../components/inputFields/InputFields3";
import LocationBarDisble from "../../components/locationBar/LocationBarDisble";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { SafeAreaView } from "react-native-safe-area-context";

var _itemNumber = ""

// create a component
const OldDTRGeneralAssetDetailOne = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { item, selectedDistricts, major_component, sub_component, items_specification, pacageList } = route.params;

    const mapRef = React.useRef(null);
    const [isLocationDetails, setLocationDetails] = useState("");
    const [isNewGeotagList, setNewGeotagList] = useState([]);
    const [isIndexCode, setIndexCode] = useState("");
    const [isIndex, setIndex] = useState("");
    const [isImages1, setImage1] = useState("");
    const [isImages2, setImage2] = useState("");
    const [isImages3, setImage3] = useState("");
    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    useEffect(() => {
        return () => {
            mapRef.current = null;
        };
    }, []);
    useEffect(() => {

        if (item?.images.length > 0)
            setImage1(item?.images[0]?.imageName);
        if (item?.images.length > 1)
            setImage2(item?.images[1]?.imageName);
        if (item?.images.length > 2)
            setImage3(item?.images[2]?.imageName);

        var data = {
            latitude: item?.latitude ? parseFloat(item?.latitude) : "",
            longitude: item?.longitude ? parseFloat(item?.longitude) : "",
            address: item?.address ? item?.address : "",
            block: item?.block ? item?.block : "",
            village: item?.village ? item?.village : "",
            date: item?.created_at ? moment(item?.created_at) : moment(new Date()),
            title: item?.title ? item?.title : "",
            subTitle: "",
        };
        setLocationDetails(data);

    }, []);

    useEffect(() => {

        onLoading(true);
        const body = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: selectedDistricts,
            major_component: major_component,
            sub_component: sub_component,
            items_specification: items_specification,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
        };

        Service.post(EndPoints.getgeotagData, body, (response) => {
            onLoading(false);
            if (response._resultflag) {
                setNewGeotagList(response?.data);
                setIndex(response?.index_code);
                onSetIndextCode(response?.data, response?.index_code);
            }
            else showErrorToast(response.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }, [])

    const onSetIndextCode = (newDataList, indexCode) => {

        if (newDataList.length) {
            let strToNum = parseInt(newDataList[0]?.item_no) || 0;
            _itemNumber = "000" + (strToNum + 1);
            setIndexCode(indexCode + "_" + _itemNumber + AppUtil.generateUniqueKey());
        }
        else {
            _itemNumber = "0001";
            setIndexCode(indexCode + "_" + _itemNumber + AppUtil.generateUniqueKey());
        }
    }

    const onNext = () => {
        if (isImages1 == "") {
            Alert.alert("Alert", "Images Missing!");
        } else if (isIndexCode == "") {
            Alert.alert("Alert", "Index Missing!");
        } else {
            navigation.navigate("OldLineGeneralAssetDetailTwo",
                {
                    indexCode: isIndexCode,
                    itemNumber: _itemNumber,
                    major_component,
                    sub_component,
                    items_specification,

                    item: item,
                    pacageList: pacageList,
                    selectedDistricts: selectedDistricts,
                })
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="DTR Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={styles.title}>
                    <Text style={styles.text}>{item?.title} </Text>
                </View>

                <View style={styles.modifySearch}>
                    <Text style={styles.modifySearchText}>
                        {Labels.generalDetails}
                    </Text>
                </View>

                <View style={styles.commaonMargin}>
                    <LocationBarDisble
                        title="Complete Address*"
                        icon={<IcnAddress />}
                        getdata={isLocationDetails?.address}
                    />

                    <InputFields3
                        title1="Block"
                        value1={isLocationDetails?.block}
                        title2="Town/City/State"
                        value2={isLocationDetails?.village}
                    />

                    <View style={styles.mapContener}>
                        <MapView style={styles.mapView}
                            ref={mapRef}
                            initialRegion={isInitialRegion}>
                            <Marker coordinate={{ latitude: parseFloat(isLocationDetails?.latitude), longitude: parseFloat(isLocationDetails?.longitude) }} pinColor={"purple"}>
                                <IcnDTR1 />
                            </Marker>
                        </MapView>
                    </View>

                    <View style={styles.imageContainer}>
                        {isImages1 &&
                            <View style={styles.imagebtn}>
                                <Image source={{ uri: image_base_url + UserManager.image_path + isImages1 }} style={styles.image} />
                            </View>
                        }
                        {isImages2 &&

                            <View style={styles.imagebtn}>
                                <Image source={{ uri: image_base_url + UserManager.image_path + isImages2 }} style={styles.image} />
                            </View>
                        }
                        {isImages3 &&
                            <View style={styles.imagebtn}>
                                <Image source={{ uri: image_base_url + UserManager.image_path + isImages3 }} style={styles.image} />
                            </View>
                        }
                    </View>
                </View>


                <View style={styles.commaonMargin}>
                    <SubmitBtn title="Next" onPress={() => onNext()} />

                </View>

                <View style={styles.commaonMargin} />
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    commaonMargin: { marginTop: 10, paddingHorizontal: 10 },
    mapContener: { width: '100%', height: AppUtil.getHP(30), marginTop: 10, borderWidth: 0.5, borderColor: Colors.orange, },
    container: { flex: 1, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(1), },
    text: { color: Colors.secondary, fontSize: 16, fontWeight: 500, },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    titleText: { color: Colors.darkBlack, fontSize: 14, fontWeight: 500, marginVertical: 5, },
    textInput: { width: "100%", padding: 10, backgroundColor: Colors.disableViewColor, borderRadius: 5, color: Colors.darkBlack, },
    mapView: { width: '100%', height: '100%' },
    imageContainer: { flexDirection: "row", marginTop: 10, },
    imageUpload: { height: AppUtil.getHP(10), width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: Colors.whaiteTansColor, position: 'absolute' },
    imagebtn: { marginHorizontal: AppUtil.getWP(1), width: "31%", height: AppUtil.getHP(10), borderRadius: 10, backgroundColor: Colors.white, },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
});

//make this component available to the app
export default memo(OldDTRGeneralAssetDetailOne);
