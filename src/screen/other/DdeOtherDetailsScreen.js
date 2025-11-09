// Other by Khasiya Sagar.
//import liraries
import React, { Component, memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/header/Header';
import { useRoute } from '@react-navigation/native';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import { Labels } from '../../utils/Labels';
import { Colors } from '../../utils/Colors';
import { Images } from '../../utils/Images';
import { image_base_url } from '../../service/appConfig';
import { UserManager } from '../../manager/UserManager';
import { AppUtil } from '../../utils/AppUtil';
import moment from 'moment';
import IcnClock from '../../assets/svg/powerTransformersSvgs/IcnClock';
import IcnCalendar from '../../assets/svg/dtrSvgs/IcnCalendar';
import IcnDetails from "../../assets/svg/IcnDetails";
import { Fonts } from '../../utils/Fonts';
import OtherGeotagDetailsPopup from '../../components/OtherGeotagDetailsPopup';
import { onLoading } from '../../../App';
import { Service } from '../../service/Service';
import { EndPoints } from '../../service/Endpoints';
import IcnToFrom from "../../assets/svg/IcnToFrom";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OthersAssetAttributesPopup from '../../components/OthersAssetAttributesPopup';
import ImageViewer from '../../components/imageViewr/ImageViewer';
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component

const DdeOtherDetailsScreen = (props) => {

    var _attributes = false;
    const route = useRoute();
    const { obj, majorComponent, subComponent, itemsSpecification } = route.params;

    const [isImageUrls, setImageUrls] = useState([]);
    const [isViewDetailsPopupVisible, setViewDetailsPopupVisible] = useState(false);
    const [isHistoreList, setHistoreList] = useState([]);

    const [isOthersAssetAttributePopupVisible, setOthersAssetAttributePopupVisible] = useState(false);
    const [isAttributes, setAttributes] = useState(false);

    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [isImages, setImages] = useState([]);


    useEffect(() => {
        var arr = [];

        if (obj?.images) {
            arr = [];
        }

        obj?.images &&
            obj?.images.map((item) => {
                if (item?.imageName)
                    arr.push(image_base_url + UserManager.image_path + item?.imageName);
                else
                    arr.push(image_base_url + UserManager.image_path + item);
            });
        setImageUrls(arr);

        onFetchActionHistory();


        setAttributes((obj?.sub_asset_type == "Capacitor Bank") || (obj?.sub_asset_type == "Capacitor Banks") || (obj?.sub_asset_type == "Circuit Breaker") || (obj?.sub_asset_type == "RMU") || (obj?.sub_asset_type == "RTU") || (obj?.sub_asset_type == "FRTU"))

    }, []);

    const onFetchActionHistory = () => {
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,

            "geotag_type": "Achievement",
            "taging_for": "LossReduction",
            "district_id": obj?.dtr_details?.feeder?.district_id,

            "major_component_id": majorComponent,
            "sub_component_id": subComponent,
            "items_specification_id": itemsSpecification,
            "asset_type": "others"
        };


        onLoading(true);
        Service.post(EndPoints.getOthersActionHeistory, data, (res) => {
            if (res._resultflag) {
                setHistoreList(res.data.list);
                onLoading(false);
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    }

    const actionList = (item, index) => {

        return (
            <View style={styles.actionMainView} >
                <View style={styles.actionMainInnerView}>

                    <View style={styles.roundView}>
                        <Text style={styles.txt1}>{isHistoreList.length - index}</Text>
                    </View>

                    <View style={styles.centerView}>

                        <View>
                            <View style={styles.view1}>
                                <IcnClock width={15} height={15} />
                                <Text style={styles.txt2}>{item.timestamp}</Text>
                            </View>

                            <View style={styles.view1}>
                                <Text style={styles.txt3}>{item.sender}</Text>
                                <IcnToFrom />
                                <Text style={styles.txt4}>{item.receiver}</Text>
                            </View>

                        </View>
                        <Text style={styles.txt5}>{item.remarks}</Text>
                    </View>

                    <View style={styles.view2}>
                        {item?.action == "Pending" && <Text style={styles.status3}>{item?.action}</Text>}
                        {item?.action == "Return" && <Text style={styles.status1}>{item?.action}</Text>}
                        {item?.action == "Returned" && <Text style={styles.status1}>{item?.action}</Text>}
                        {item?.action == "Approved" && <Text style={styles.status2}>{item?.action}</Text>}
                    </View>

                </View>
                <View style={styles.line} />
            </View>

        )
    }

    const handlePressImage = (index, image) => {

         var img = [];
         img.push({ uri: image });

        setImages(img);
        setImgIndex(index);
        setIsVisible(true);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title={Labels.OtherAssetsGeotag}
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()} />

            <KeyboardAwareScrollView>

                <View style={styles.cardTitles}>
                    <Text style={styles.cardSr}>{obj?.title}</Text>
                    <Text style={styles.cardSr}>{obj?.index_id}</Text>
                </View>

                {
                    isImageUrls.length > 0 &&
                    <View style={styles.imageList}>
                        {isImageUrls.length && isImageUrls.length == 1 &&
                            <TouchableOpacity style={styles.imagestyle} onPress={() => handlePressImage(0, isImageUrls[0])}>
                                <Image style={styles.imagestyle} source={{ uri: isImageUrls[0] }} />
                            </TouchableOpacity>
                        }

                        {isImageUrls.length && isImageUrls.length == 2 &&
                            <TouchableOpacity style={styles.imagestyle} onPress={() => handlePressImage(0, isImageUrls[0])}>
                                <Image style={styles.imagestyle} source={{ uri: isImageUrls[1] }} />
                            </TouchableOpacity>
                        }
                        {isImageUrls.length && isImageUrls.length == 3 &&
                            <TouchableOpacity style={styles.imagestyle} onPress={() => handlePressImage(0, isImageUrls[0])}>
                                <Image style={styles.imagestyle} source={{ uri: isImageUrls[2] }} />
                            </TouchableOpacity>
                        }
                    </View>
                }


                <View style={styles.detailsView}>
                    <Text>{"Geotagged Date and Time"}</Text>
                    <View style={styles.cardRightTop}>
                        <Text style={styles.rightDate}>
                            <IcnCalendar />
                            <Text>{" "}{moment(obj?.created_at).format("DD/MM/YYYY")}</Text>
                        </Text>
                        <Text style={styles.rightTime}>
                            <IcnClock />
                            <Text>{" "}{moment(obj?.created_at).format("hh:mm a")}</Text>
                        </Text>
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.rightAddress}>{obj?.block + " " + obj?.address}</Text>
                    <View style={styles.line} />

                    <View style={styles.cardLatLong}>
                        <Text style={styles.long}>Latitude</Text>
                        <Text style={styles.lat}>Logitude</Text>
                    </View>
                    <View style={styles.cardLatsLongs}>
                        <Text style={styles.longs}>{obj?.latitude}</Text>
                        <Text style={styles.lats}>{obj?.longitude}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.cardRightBottom}>
                        <Text style={styles.rightBottomText}>Tagged By -</Text>
                        <Text style={styles.taggedByName}>{obj?.tag_by}</Text>
                    </View>

                    <View style={styles.cardRightBottom}>
                        <Text style={styles.rightBottomText}>Status </Text>
                        {obj?.status == "Pending" && <Text style={styles.status3}>{obj?.status}</Text>}
                        {obj?.status == "Return" && <Text style={styles.status1}>{obj?.status}</Text>}
                        {obj?.status == "Returned" && <Text style={styles.status1}>{obj?.status}</Text>}
                        {obj?.status == "Approved" && <Text style={styles.status2}>{obj?.status}</Text>}

                    </View>



                </View>

                <TouchableOpacity style={styles.heading} onPress={() => setViewDetailsPopupVisible(true)}>
                    <View style={styles.textView}>
                        <Text style={styles.headingText}>{"View Details"}</Text>
                    </View>
                    <View style={styles.icnView}>
                        <IcnDetails />
                    </View>
                </TouchableOpacity>

                {isAttributes &&
                    <TouchableOpacity style={styles.heading} onPress={() => setOthersAssetAttributePopupVisible(true)}>
                        <View style={styles.textView}>
                            <Text style={styles.headingText}>{"View asset attibutes details"}</Text>
                        </View>
                        <View style={styles.icnView}>
                            <IcnDetails />
                        </View>
                    </TouchableOpacity>
                }

                <View style={styles.descriptiontabView1}>
                    <Text style={styles.txt6}>Action History</Text>
                </View>

                <View style={styles.recentMainView1}>
                    {isHistoreList?.map((item, index) => (actionList(item, index)))}
                </View>

                <View style={styles.commonMargin} />

            </KeyboardAwareScrollView>


            <OtherGeotagDetailsPopup data={obj?.dtr_details} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />
            {obj?.sub_asset_type &&
                <OthersAssetAttributesPopup type={obj?.sub_asset_type} data={obj?.sub_asset_attributes} handleClose={() => setOthersAssetAttributePopupVisible(false)} isVisible={isOthersAssetAttributePopupVisible} />
            }

            <ImageViewer isVisible={visible} handleClose={() => setIsVisible(false)} images={isImages} index={imgIndex} />

        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    commonMargin: { marginVertical: AppUtil.getHP(1), paddingVertical: AppUtil.getHP(1), },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50', },
    cardTitles: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: Colors.white, },
    cardSr: { width: "90%", color: Colors.secondary, fontSize: 14, fontWeight: "bold", marginBottom: 2, },
    imageList: { width: "90%", marginTop: AppUtil.getWP(3), flexDirection: 'row', alignSelf: 'center', },
    imagestyle: { width: AppUtil.getWP(25), height: AppUtil.getWP(25), borderRadius: 5 },
    detailsView: { width: "90%", marginTop: AppUtil.getWP(3), borderRadius: 5, alignSelf: 'center', backgroundColor: '#fff', padding: 12 },
    cardRightTop: { flexDirection: "row", marginTop: 8, alignItems: "center" },
    rightDate: { color: Colors.secondary, fontSize: 14, fontWeight: 500, },
    rightTime: { color: Colors.secondary, fontSize: 16, fontWeight: 500, marginLeft: 20 },
    rightAddress: { color: Colors.darkBlack, fontSize: 12, marginTop: 8 },
    line: { width: "100%", borderBottomWidth: 2, borderColor: "#EBEBEB", marginTop: AppUtil.getHP(1) },
    cardLatLong: { flexDirection: "row", marginTop: 2, marginLeft: AppUtil.getWP(2), },
    long: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    lat: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    cardLatsLongs: { flexDirection: "row", marginLeft: AppUtil.getWP(2), },
    longs: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", width: "50%", paddingRight: 15, },
    lats: { color: Colors.secondary, fontSize: 14, width: "50%", fontWeight: "bold", },
    cardRightBottom: { marginLeft: AppUtil.getWP(2), flexDirection: "row", marginTop: 5, },
    rightBottomText: { color: Colors.secondary, fontSize: 12, fontFamily: Fonts.RobotoRegular, },

    status1: { textAlign: 'center', backgroundColor: "#DFD592", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },
    status2: { textAlign: 'center', backgroundColor: "#B1E7D5", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },
    status3: { textAlign: 'center', backgroundColor: "#DCD4FF", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },

    heading: { backgroundColor: Colors.white, marginTop: AppUtil.getHP(2), marginHorizontal: 20, paddingVertical: AppUtil.getHP(2), borderRadius: 5, backgroundColor: Colors.beige, borderWidth: 1, borderColor: Colors.primary, flexDirection: "row", justifyContent: "space-between", },
    headingText: { fontSize: 16, fontWeight: "bold", color: Colors.darkBlack, marginLeft: AppUtil.getWP(3), },
    icnView: { width: "15%", justifyContent: "center", alignItems: "center", },
    descriptiontabView1: { height: AppUtil.getHP(6.5), borderBottomWidth: 2, borderBottomColor: "#EBEBEB", justifyContent: "center", paddingHorizontal: 20, backgroundColor: Colors.white, marginTop: AppUtil.getHP(1) },
    txt6: { color: Colors.black, fontWeight: 'bold', fontSize: 16 },
    recentMainView1: { marginBottom: AppUtil.getHP(6) },

    actionMainView: { width: "100%", paddingTop: AppUtil.getHP(2), backgroundColor: Colors.white, },
    roundView: { width: AppUtil.getHP(4), height: AppUtil.getHP(4), borderRadius: AppUtil.getHP(4), backgroundColor: 'rgba(232,234,241,255)', marginHorizontal: "4%", justifyContent: 'center', alignItems: 'center' },
    centerView: { width: "65%" },
    actionMainInnerView: { flexDirection: 'row' },
    view1: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
    view2: { marginTop: 5 },

    txt1: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", },
    txt2: { color: Colors.black, fontSize: 12, marginLeft: 5 },
    txt3: { color: Colors.black, fontSize: 12, fontWeight: "bold", },
    txt4: { color: Colors.black, fontSize: 12, fontWeight: "bold", },
    txt5: { color: "#8A8A8A", fontSize: 12, },

});

//make this component available to the app
export default memo(DdeOtherDetailsScreen);
