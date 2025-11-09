import React, { memo, useEffect, useState } from "react";
import { View, Text,  Image, TouchableOpacity, TextInput, FlatList, Alert, } from "react-native";
import { useRoute } from "@react-navigation/native";
import DTRViewDetailePopup from "../Approval/DTRViewDetailePopup";
import { ApprovalHomeScreenStyle } from "../Approval/ApprovalHomeScreenStyle";
import Header from "../../components/header/Header";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../assets/svg/IcnMap";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { UserManager } from "../../manager/UserManager";
import IcnDetails from "../../assets/svg/IcnDetails";
import { onLoading } from "../../../App";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import moment from "moment";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";
import IcnToFrom from "../../assets/svg/IcnToFrom";
import { BASE_URL, image_base_url } from "../../service/appConfig";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from "../../components/imageViewr/ImageViewer";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";

var _path = ""

const UserDTRDetailsScreen = (props) => {

    const route = useRoute();
    const { obj } = route.params;
    const [isCurrentData, setCurrentData] = useState(null);
    const [isHistoreList, setHistoreList] = useState([]);
    const [isViewDetailsPopupVisible, setViewDetailsPopupVisible] = useState(false);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);
    const [isPacageList, setPacageList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            onGetDtrGeotagDetails();
        }, [])
    );

    useEffect(() => {
        onFetchUpdateList();
    }, []);

    const onFetchUpdateList = () => {

        onLoading(true);
        const body = {
            district_id: JSON.stringify(obj?.district_id),
            discom_id: UserManager.discom_id,
            majorcomponent_id: obj?.major_component_id,
            subcomp_id: obj?.sub_component_id,
            searchText: "",
            asset_type: 'DTR'
        };

        Service.post(EndPoints.getItemsUpdateList, body, (response) => {
            onLoading(false);
            if (response.data) {
                for (let disObj of response?.data) {
                    if (disObj?.item_specification_id == obj?.items_specification_id)
                        setPacageList(disObj?.package_data);
                }
            }

        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onGetDtrGeotagDetails = () => {

        let data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": obj?.district_id,
            "major_component_id": obj?.major_component_id,
            "sub_component_id": obj?.sub_component_id,
            "items_specification_id": obj?.items_specification_id,
            "geo_tag_id": obj?.index_id
        }

        onLoading(true);
        Service.post(EndPoints.getGeoTagbyId, data, (res) => {
            if (res._resultflag) {
                _path = res?.data?.image_path;
                setCurrentData(res?.data?.geotagData);
                onFetchActionHistory();
                onLoading(false);
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }
    const onFetchActionHistory = () => {
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,

            "district_id": obj?.district_id,
            "geotag_type": obj.geotag_type,
            "taging_for": obj?.taging_for,
            "major_component_id": obj?.major_component_id,
            "sub_component_id": obj?.sub_component_id,
            "items_specification_id": obj?.items_specification_id,
            "asset_type": "dtr"
        };


        onLoading(true);
        Service.post(EndPoints.ssactionHistory, data, (res) => {
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
            <View style={ApprovalHomeScreenStyle.actionMainView} >
                <View style={ApprovalHomeScreenStyle.actionMainInnerView}>

                    <View style={ApprovalHomeScreenStyle.roundView}>
                        <Text style={ApprovalHomeScreenStyle.txt1}>{isHistoreList.length - index}</Text>
                    </View>

                    <View style={ApprovalHomeScreenStyle.centerView}>

                        <View>
                            <View style={ApprovalHomeScreenStyle.view1}>
                                <IcnClock width={15} height={15} />
                                <Text style={ApprovalHomeScreenStyle.txt2}>{item.timestamp}</Text>
                            </View>

                            <View style={ApprovalHomeScreenStyle.view1}>
                                <Text style={ApprovalHomeScreenStyle.txt3}>{item.sender}</Text>
                                <IcnToFrom />
                                <Text style={ApprovalHomeScreenStyle.txt4}>{item.receiver}</Text>
                            </View>

                        </View>
                        <Text style={ApprovalHomeScreenStyle.txt5}>{item.remarks}</Text>
                    </View>

                    <View style={ApprovalHomeScreenStyle.view2}>
                        {item?.action == "Pending" && <Text style={ApprovalHomeScreenStyle.status3}>{item?.action}</Text>}
                        {item?.action == "Return" && <Text style={ApprovalHomeScreenStyle.status1}>{item?.action}</Text>}
                        {item?.action == "Returned" && <Text style={ApprovalHomeScreenStyle.status1}>{item?.action}</Text>}
                        {item?.action == "Approved" && <Text style={ApprovalHomeScreenStyle.status2}>{item?.action}</Text>}
                    </View>

                </View>
                <View style={ApprovalHomeScreenStyle.line} />
            </View>

        )
    }
    const onDelet = () => {
        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => {
                    onLoading(true);
                    const data = {
                        "role_id": UserManager.role_id,
                        "user_id": UserManager.id,
                        "discom_id": UserManager.discom_id,
                        "district_id": obj?.district_id,
                        "major_component_id": obj?.major_component_id,
                        "sub_component_id": obj?.sub_component_id,
                        "items_specification_id": obj?.items_specification_id,
                        "geotag_type": obj.geotag_type,
                        "taging_for": obj?.taging_for,
                        "remove_id": obj?.index_id,
                    };

                    Service.post(EndPoints.deleteDtrGeoTagbyId, data, (res) => {
                        if (res._resultflag) {
                            props.navigation.goBack();
                        } else {
                            Alert.alert("Alert", res.message);
                            onLoading(false);
                        }
                    }, (err) => {
                        onLoading(false);
                    })
                }
            },
            {
                text: 'No', onPress: () => { }
            }
        ]);
    }
    const onEdit = () => {

        props.navigation.navigate("EditGeneralAssetDetail", {
            feederList: obj?.feederList,
            selectedDistricts: obj?.district_id,
            selectedOption: obj?.taging_for,
            achievementButtonState: obj.geotag_type == "Achievement" ? true : false,
            pacageList: isPacageList,
            sl_district_major_component: [obj?.major_component_id],
            sl_district_sub_component: [obj?.sub_component_id],
            sl_district_items_specification: [obj?.items_specification_id],

            item: isCurrentData,
        });
    }

    const handlePressImage = (index, image) => {
        var img = [];
        image.forEach((element) => {
            const obj = { uri: image_base_url + UserManager.image_path + element.imageName };
            img.push(obj);
        });
        setImages(img);
        setImageIndex(index);
        setImageVisible(true);
    };

    return (
        <SafeAreaView style={ApprovalHomeScreenStyle.mainView}>
            <Header
                title="DTR"
                leftIcon={<IcnBack />}
                rightIcon={<IcnMap />}
                onLeftPress={() => props.navigation.goBack()}
                onRightPress={() => props.navigation.navigate("MapScreen",
                    {
                        type: "DTR",
                        district_id: obj?.district_id,
                        major_component_id: obj?.major_component_id,
                        sub_component_id: obj?.sub_component_id,
                        items_specification_id: obj?.items_specification_id
                    })}
            />

            <KeyboardAwareScrollView>

                <View style={ApprovalHomeScreenStyle.cardTitles}>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.title}</Text>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.index_id}</Text>
                </View>

                <View style={ApprovalHomeScreenStyle.imageList}>
                    {isCurrentData && isCurrentData?.images && isCurrentData?.images[0]?.imageName &&
                        <TouchableOpacity style={ApprovalHomeScreenStyle.imagestyle} onPress={() => handlePressImage(0, isCurrentData?.images)}>
                            {/* <Image style={ApprovalHomeScreenStyle.imagestyle} source={{ uri: image_base_url + _path + isCurrentData?.images[0].imageName }} /> */}
                            <FastImage
                                style={ApprovalHomeScreenStyle.imagestyle}
                                source={{
                                    uri: image_base_url + _path + isCurrentData?.images[0].imageName,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.low,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                    }

                    {isCurrentData && isCurrentData?.images && isCurrentData?.images[1]?.imageName &&
                        <TouchableOpacity style={ApprovalHomeScreenStyle.imagestyle2} onPress={() => handlePressImage(1, isCurrentData?.images)}>
                            {/* <Image style={ApprovalHomeScreenStyle.imagestyle} source={{ uri: image_base_url + _path + isCurrentData?.images[1].imageName }} /> */}
                             <FastImage
                                style={ApprovalHomeScreenStyle.imagestyle}
                                source={{
                                    uri: image_base_url + _path + isCurrentData?.images[1].imageName,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.low,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                    }
                    {isCurrentData && isCurrentData?.images && isCurrentData?.images[2]?.imageName &&
                        <TouchableOpacity style={ApprovalHomeScreenStyle.imagestyle} onPress={() => handlePressImage(2, isCurrentData?.images)}>
                            {/* <Image style={ApprovalHomeScreenStyle.imagestyle} source={{ uri: image_base_url + _path + isCurrentData?.images[2].imageName }} /> */}

                             <FastImage
                                style={ApprovalHomeScreenStyle.imagestyle}
                                source={{
                                    uri: image_base_url + _path + isCurrentData?.images[2].imageName,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.low,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />

                        </TouchableOpacity>
                    }
                </View>

                <View style={ApprovalHomeScreenStyle.detailsView}>
                    <Text>{"Geotagged Date and Time"}</Text>
                    <View style={ApprovalHomeScreenStyle.cardRightTop}>
                        <Text style={ApprovalHomeScreenStyle.rightDate}>
                            <IcnCalendar />
                            <Text>{" "}{moment(isCurrentData?.created_at).format("DD/MM/YYYY")}</Text>
                        </Text>
                        <Text style={ApprovalHomeScreenStyle.rightTime}>
                            <IcnClock />
                            <Text style={{ marginLeft: "20" }}>{" "}{moment(isCurrentData?.created_at).format("hh:mm a")}</Text>
                        </Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.line} />
                    <Text style={ApprovalHomeScreenStyle.rightAddress}>{isCurrentData?.block + " " + isCurrentData?.address}</Text>
                    <View style={ApprovalHomeScreenStyle.line} />

                    <View style={ApprovalHomeScreenStyle.cardLatLong}>
                        <Text style={ApprovalHomeScreenStyle.long}>Latitude</Text>
                        <Text style={ApprovalHomeScreenStyle.lat}>Logitude</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.cardLatsLongs}>
                        <Text style={ApprovalHomeScreenStyle.longs}>{isCurrentData?.latitude}</Text>
                        <Text style={ApprovalHomeScreenStyle.lats}>{isCurrentData?.longitude}</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.line} />

                    <View style={ApprovalHomeScreenStyle.cardRightBottom}>
                        <Text style={ApprovalHomeScreenStyle.rightBottomText}>Tagged By -</Text>
                        <Text style={ApprovalHomeScreenStyle.taggedByName}>{isCurrentData?.tag_by}</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.cardRightBottom}>
                        <Text style={ApprovalHomeScreenStyle.rightBottomText}>Status </Text>
                        {isCurrentData?.status == "Pending" && <Text style={ApprovalHomeScreenStyle.status3}>{isCurrentData?.status}</Text>}
                        {isCurrentData?.status == "Return" && <Text style={ApprovalHomeScreenStyle.status1}>{isCurrentData?.status}</Text>}
                        {isCurrentData?.status == "Returned" && <Text style={ApprovalHomeScreenStyle.status1}>{isCurrentData?.status}</Text>}
                        {isCurrentData?.status == "Approved" && <Text style={ApprovalHomeScreenStyle.status2}>{isCurrentData?.status}</Text>}

                    </View>

                </View>

                <TouchableOpacity style={ApprovalHomeScreenStyle.heading} onPress={() => setViewDetailsPopupVisible(true)}>
                    <View style={ApprovalHomeScreenStyle.textView}>
                        <Text style={ApprovalHomeScreenStyle.headingText}>{"View Details"}</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.icnView}>
                        <IcnDetails />
                    </View>
                </TouchableOpacity>

                <View style={ApprovalHomeScreenStyle.descriptiontabView1}>
                    <Text style={ApprovalHomeScreenStyle.txt6}>Action History</Text>
                </View>

                <View style={ApprovalHomeScreenStyle.recentMainView1}>
                    {isHistoreList?.map((item, index) => (actionList(item, index)))}
                </View>


            </KeyboardAwareScrollView>
            {
                (isCurrentData?.status == "" || isCurrentData?.status == "Return" || isCurrentData?.status == "Returned") &&
                <View style={ApprovalHomeScreenStyle.buttomBtnView}>
                    <TouchableOpacity style={ApprovalHomeScreenStyle.buttomBtn5} onPress={() => onEdit()}>
                        <Text style={ApprovalHomeScreenStyle.txtBtn1}>EDIT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ApprovalHomeScreenStyle.buttomBtn6} onPress={() => onDelet()}>
                        <Text style={ApprovalHomeScreenStyle.txtBtn1}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            }


            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <DTRViewDetailePopup data={isCurrentData?.dtr_details} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />
        </SafeAreaView >
    );
};

export default memo(UserDTRDetailsScreen);



