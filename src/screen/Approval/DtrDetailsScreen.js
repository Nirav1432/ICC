import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import Header from "../../components/header/Header";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../assets/svg/IcnMap";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { UserManager } from "../../manager/UserManager";
import IcnDetails from "../../assets/svg/IcnDetails";
import { Colors } from "../../utils/Colors";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import SubstationDetailsCards from "./SubstationDetailsCards";
import { onLoading } from "../../../App";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import moment from "moment";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";
import SubstationViewDetailePopup from "./SubstationViewDetailePopup";
import IcnToFrom from "../../assets/svg/IcnToFrom";
import { image_base_url } from "../../service/appConfig";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import DTRViewDetailePopup from "./DTRViewDetailePopup";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { SafeAreaView } from "react-native-safe-area-context";

var _path = ""
var _status = ""
var _remark = "";
var _action = "";

const DtrDetailsScreen = (props) => {

    const route = useRoute();
    const { obj } = route.params;
    const [isPreviousData, setPreviousData] = useState(obj);

    const [isData, setData] = useState(null);
    const [isCurrentData, setCurrentData] = useState(null);
    const [isHistoreList, setHistoreList] = useState([]);
    const [isSubstationRemarkVisible, setSubstationRemarkVisible] = useState(false);
    const [isViewDetailsPopupVisible, setViewDetailsPopupVisible] = useState(false);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    useEffect(() => {
        onFetchGeotag();
    }, []);

    const onFetchGeotag = () => {
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,

            "district_id": obj?.district_id,
            "item_no": obj?.geotag_list?.item_no,
            "geotag_type": obj.geotag_type,
            "taging_for": obj?.taging_for,
            "major_component_id": obj?.major_component_id,
            "sub_component_id": obj?.sub_component_id,
            "items_specification_id": obj?.items_specification_id,
            "asset_type": "DTR"
        };

        onLoading(true);
        Service.post(EndPoints.getAssetDetails, data, (res) => {
            if (res._resultflag) {

                _path = res?.data?.image_path;
                _status = res?.data?.status;


                setCurrentData(res?.data?.geotagData[res?.data?.geotagData.length - 1]);
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

            "district_id": isPreviousData?.district_id,
            "geotag_type": isPreviousData.geotag_type,
            "taging_for": isPreviousData?.taging_for,
            "major_component_id": isPreviousData?.major_component_id,
            "sub_component_id": isPreviousData?.sub_component_id,
            "items_specification_id": isPreviousData?.items_specification_id,
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

    const onSubstationActionClick = (action) => {
        _action = action;
        setSubstationRemarkVisible(true);
    }
    const onSubStationPrecess = () => {

        setSubstationRemarkVisible(false);
        onLoading(true);

        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": isPreviousData?.district_id,
            "asset_type": "Dtr",

            "item_no": obj?.geotag_list?.item_no,
            "major_component_id": isPreviousData?.major_component_id,
            "sub_component_id": isPreviousData?.sub_component_id,
            "items_specification_id": isPreviousData?.items_specification_id,

            "geotag_type": isPreviousData?.geotag_type,
            "taging_for": isPreviousData?.taging_for,

            "remarks": _remark,
            "status": _action

        };
        Service.post(EndPoints.dtrAction, data, (res) => {
            if (res._resultflag) {
                _action = "";
                onFetchGeotag();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

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
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("ApprovarMapScreen",
                    {
                        type: "DTR",
                        district_id: isPreviousData?.district_id,
                        major_component_id: isPreviousData?.major_component_id,
                        sub_component_id: isPreviousData?.sub_component_id,
                        items_specification_id: obj?.items_specification_id
                    })}
            />

            <KeyboardAwareScrollView>

                <View style={ApprovalHomeScreenStyle.cardTitles}>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.geotag_list?.title}</Text>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.geotag_list?.index_id}</Text>
                </View>

                <View style={ApprovalHomeScreenStyle.imageList}>
                    {isCurrentData && isCurrentData?.images && isCurrentData?.images[0]?.imageName &&
                        <TouchableOpacity style={ApprovalHomeScreenStyle.imagestyle} onPress={() => handlePressImage(0, isCurrentData?.images)}>
                            <Image style={ApprovalHomeScreenStyle.imagestyle} source={{ uri: image_base_url + _path + isCurrentData?.images[0].imageName }} />
                        </TouchableOpacity>
                    }

                    {isCurrentData && isCurrentData?.images && isCurrentData?.images[1]?.imageName &&
                        <TouchableOpacity style={ApprovalHomeScreenStyle.imagestyle2} onPress={() => handlePressImage(1, isCurrentData?.images)}>
                            <Image style={ApprovalHomeScreenStyle.imagestyle} source={{ uri: image_base_url + _path + isCurrentData?.images[1].imageName }} />
                        </TouchableOpacity>
                    }
                    {isCurrentData && isCurrentData?.images && isCurrentData?.images[2]?.imageName &&
                        <TouchableOpacity style={ApprovalHomeScreenStyle.imagestyle} onPress={() => handlePressImage(2, isCurrentData?.images)}>
                            <Image style={ApprovalHomeScreenStyle.imagestyle} source={{ uri: image_base_url + _path + isCurrentData?.images[2].imageName }} />
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
                isCurrentData?.status == "Pending" &&
                <View style={ApprovalHomeScreenStyle.buttomBtnView}>
                    <TouchableOpacity style={ApprovalHomeScreenStyle.buttomBtn1} onPress={() => onSubstationActionClick("Returned")}>
                        <Text style={ApprovalHomeScreenStyle.txtBtn1}>Return</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ApprovalHomeScreenStyle.buttomBtn2} onPress={() => onSubstationActionClick("Approved")}>
                        <Text style={ApprovalHomeScreenStyle.txtBtn1}>Approve</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                isCurrentData?.status == "Returned" &&
                <View style={ApprovalHomeScreenStyle.buttomBtn3}>
                    <Text style={ApprovalHomeScreenStyle.txtBtn1}>{isCurrentData?.status}</Text>
                </View>
            }
            {
                isCurrentData?.status == "Approved" &&
                <View style={ApprovalHomeScreenStyle.buttomBtn4}>
                    <Text style={ApprovalHomeScreenStyle.txtBtn1}>{isCurrentData?.status}</Text>
                </View>
            }
            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <DTRViewDetailePopup data={isCurrentData?.dtr_details} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />
            <RemarkPopup handleClose={() => setSubstationRemarkVisible(false)} isVisible={isSubstationRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubStationPrecess()} />
        </SafeAreaView >
    );
};

export default memo(DtrDetailsScreen);



