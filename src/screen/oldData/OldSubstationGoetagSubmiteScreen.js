// Other by Khasiya Sagar.
//import liraries
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Alert, Image, ActivityIndicator, } from "react-native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnUpload from "../../assets/svg/IcnUpload";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import React, { memo, useEffect, useState } from "react";
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
import moment from "moment";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import InputFields3 from "../../components/inputFields/InputFields3";
import LocationBarDisble from "../../components/locationBar/LocationBarDisble";
import { SafeAreaView } from "react-native-safe-area-context";

var _sameIndexList = [];

// create a component
const OldSubstationGoetagSubmiteScreen = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { item, list, recentList, indexCode, selectedDistricts, majorComponent, subComponent, items_specification } = route.params;



    const mapRef = React.useRef(null);

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );
    const [isLocationDetails, setLocationDetails] = useState("");
    const [isIndexCodeLable, setIndexCodeLable] = useState("");
    const [isImages1, setImage1] = useState("");
    const [isImages2, setImage2] = useState("");
    const [isImages3, setImage3] = useState("");

    useEffect(() => {
        return () => {
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {

        _sameIndexList = [];
        recentList.map((userData) => {
            if (userData?.item_no === item?.item_no)
                _sameIndexList.push(userData);
        });
        setIndexCodeLable(indexCode + "_" + item?.item_no + "_sr00" + (_sameIndexList.length) + "_" + AppUtil.generateUniqueKey());
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


    function onSave() {

        var data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: selectedDistricts,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
            geotag_version: "old",
            old_index_id: item?.index_id,
            geotagData: {
                sl_district_major_component: [majorComponent],
                sl_district_sub_component: [subComponent],
                sl_district_items_specification: [items_specification],

                sl_lattitude: {

                    index_id: isIndexCodeLable,
                    item_no: item?.item_no,
                    title: item?.title,
                    latitude: isLocationDetails.latitude,
                    longitude: isLocationDetails.longitude,
                    address: isLocationDetails.address,
                    block: isLocationDetails.block,
                    village: isLocationDetails.village,
                    images: item?.images,
                    tag_by: UserManager.first_name + " " + UserManager.last_name,
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
                            navigation.goBack()
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

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Substation Geotag"
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
                    <IcnGreyDown />
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


                <View style={styles.commaonPadding}>
                    <SubmitBtn title="RE-SUBMIT" onPress={() => onSave()} />
                </View>

                <View style={styles.commaonMargin} />

            </ScrollView>

        </SafeAreaView>
    )
};

// define your styles
const styles = StyleSheet.create({
    commaonMargin: { marginTop: 10, paddingHorizontal: 10 },
    commaonPadding: { paddingHorizontal: 10 },
    mapContener: { width: '100%', height: AppUtil.getHP(30), marginTop: 10, borderWidth: 0.5, borderColor: Colors.orange, },
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

    imagebtn: { width: "31%", height: AppUtil.getHP(13), marginRight: 10, borderRadius: 10, backgroundColor: Colors.white, },
    image: { width: "100%", height: AppUtil.getHP(13), borderRadius: 10, },
});

//make this component available to the app
export default memo(OldSubstationGoetagSubmiteScreen);
