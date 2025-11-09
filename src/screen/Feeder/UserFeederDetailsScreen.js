import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, } from "react-native";
import { useRoute } from "@react-navigation/native";

import FeederViewDetailePopup from "../Approval/FeederViewDetailePopup";
import FeederDetailsCards from "../../components/FeederCard/FeederDetailsCards";
import { ApprovalHomeScreenStyle } from "../Approval/ApprovalHomeScreenStyle";

import Header from "../../components/header/Header";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IcnToFrom from "../../assets/svg/IcnToFrom";
import IcnMap from "../../assets/svg/IcnMap";
import { Service, postFormDataAPI } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { UserManager } from "../../manager/UserManager";
import IcnDetails from "../../assets/svg/IcnDetails";
import { Colors } from "../../utils/Colors";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { onLoading } from "../../../App";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from "../../components/imageViewr/ImageViewer";
import DTRDetailePopup from "../Approval/DTRDetailePopup";
import PolDetailePopup from "../Approval/PolDetailePopup";
import { SafeAreaView } from "react-native-safe-area-context";

var _path = ""
var _status = ""
var _typeItemDetails = "";
const UserFeederDetailsScreen = (props) => {

    const route = useRoute();
    const { obj, type } = route.params;
    const [isPreviousData, setPreviousData] = useState(obj);

    const [isSelectTab, setSelectTab] = useState(1);
    const [isList, setList] = useState([]);
    const [isHistoreList, setHistoreList] = useState([]);
    const [isViewDetailsPopupVisible, setViewDetailsPopupVisible] = useState(false);
    const [feederDetail, setFeederDetail] = useState([]);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    const [isDTRpopupVisible, setDTRpopupVisible] = useState(false);
    const [isPolPopupVisible, setPolPopupVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            onFetchGeotag();
        }, [])
    );
    useEffect(() => {
        onFetchGeotag();
    }, []);

    const onFetchGeotag = () => {
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": isPreviousData?.district_id,
            "geotag_type": isPreviousData.geotag_type,
            "taging_for": isPreviousData?.taging_for,
            "fedeer_id": isPreviousData?.fedeer_id,
            "fedeer_code": isPreviousData?.fedeer_code,
        };

        onLoading(true);
        Service.post(EndPoints.ddrGetFeederAssetDetails, data, (res) => {
            if (res._resultflag) {

                _path = res?.data?.image_path;
                _status = res?.data?.status;

                if (res?.data?.geotagData) {
                    var geptagList = res?.data?.geotagData;
                    geptagList.map((details) => {
                        details.showFlag = false;
                    })

                    setList(geptagList);
                }
                else {
                    setList([]);
                }

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
            "fedeer_id": isPreviousData?.fedeer_id,
            "district_id": isPreviousData?.district_id,
            "geotag_type": isPreviousData.geotag_type,
            "taging_for": isPreviousData?.taging_for,
        };


        onLoading(true);
        Service.post(EndPoints.federHActionHistory, data, (res) => {
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

    const onSelectTab = (btn) => {

        if (btn !== isSelectTab) {

            setSelectTab(btn);
            if (btn == 1) {
                onFetchGeotag()
            }
            else if (btn == 2) {
                onFetchActionHistory()
            }

        }

    }
    const onOpenitem = (index) => {

        var list = [...isList];
        if (list[index].showFlag)
            list[index].showFlag = false;
        else
            list[index].showFlag = true;
        setList(list);
    }

    const onOpenPopup = () => {
        var formData = new FormData();
        formData.append("feeder_id", isPreviousData?.fedeer_id);

        onLoading(true);
        postFormDataAPI(EndPoints.getFeederDetails, formData, (success) => {

            setFeederDetail(success.data);
            setViewDetailsPopupVisible(true)
            onLoading(false);
        }
            , (error) => {
                onLoading(false);
            }
        );
    }

    const onDelet = (delteItem) => {

        Alert.alert("Alert", "Are you sure you want to delete?",
            [
                {
                    text: 'Yes', onPress: () => {

                        var obj = {
                            "role_id": UserManager.role_id,
                            "user_id": UserManager.id,
                            "discom_id": UserManager.discom_id,
                            "district_id": isPreviousData?.district_id,
                            "geotag_type": isPreviousData.geotag_type,
                            "taging_for": isPreviousData?.taging_for,
                            "fedeer_id": isPreviousData?.fedeer_id,
                            "fedeer_code": isPreviousData?.fedeer_code,
                            "remove_id": delteItem,
                        }

                        onLoading(true);

                        Service.post(EndPoints.deleteGeoTagbyId, obj, (response) => {
                            onLoading(false);
                            if (response._resultflag) {
                                onFetchGeotag();
                            }
                            else showErrorToast(res.message);
                        },
                            (err) => {
                                onLoading(false);
                            }
                        );

                    }
                },
                { text: 'No', onPress: () => { } },
            ]);


    }

    const onEdit = (item) => {

        if (item.asset_type == "Substation" || item.asset_type == "Feeder") {
            props.navigation.navigate("EditeFeederGeneralAssetOptions", {
                oldItem: item,
                feederData: obj?.feederData,
                feederDetails: obj?.feederDetails,
                selectedDistricts: isPreviousData?.district_id,
                selectedOption: isPreviousData?.taging_for,
                achievementButtonState: isPreviousData.geotag_type == "Achievement" ? true : false,
                selectedDistrictsName: obj?.selectedDistrictsName,
            });
        }
        else {
            props.navigation.navigate("EditFeederAssets", {
                oldItem: item,
                feederDetails: obj?.feederDetails,
                feederData: obj?.feederData,
                selectedDistricts: isPreviousData?.district_id,
                selctOP: isPreviousData?.taging_for,
                achievementButtonState: isPreviousData.geotag_type == "Achievement" ? true : false,
                selectedDistrictsName: obj?.selectedDistrictsName,
            });
        }

    };

    const handlePressImage = (index, image) => {
        var img = [];
        image.forEach((element) => {
            const obj = { uri: element };
            img.push(obj);
        });
        setImages(img);
        setImageIndex(index);
        setImageVisible(true);
    };

    const onTypeTextClick = (obj) => {

        _typeItemDetails = obj?.poleDetails;

        if (obj.asset_type == "DTR") {
            setDTRpopupVisible(true);
        }
        else if (obj.asset_type == "Pole") {
            setPolPopupVisible(true);
        }
    }
    const feederList = (item, index) => {
        var show = false;

        if (type != "History") {
            if (_status == "" || _status == "Returned")
                show = true;
        }
        return (
            <>
                <TouchableOpacity style={ApprovalHomeScreenStyle.showView} onPress={() => onOpenitem(index)}>
                    <Text style={ApprovalHomeScreenStyle.headingText1}>{item.index_id}</Text>
                    <IcnGreyDown />
                </TouchableOpacity>
                {
                    item.showFlag == true &&
                    <FeederDetailsCards
                        key={index}
                        title={item.title}
                        index_id={item.index_id}
                        created_by_date={item.updated_at ? item.updated_at : item.created_at}
                        created_by_time={item.updated_at ? item.updated_at : item.created_at}
                        address={item.block + " " + item.address}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        tag_by={item.tag_by}
                        images={item.images}
                        midalPath={_path}
                        othersAssetType={item.sub_asset_type}
                        onPressImage={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                        innerbutton={show}
                        type={item?.asset_type}
                        editIconPress={() => onEdit(item)}
                        deletIconPress={(id) => onDelet(id)}
                        typeClick={() => onTypeTextClick(item)}
                        moreDetails={true}
                        onDetails={() => props.navigation.navigate("FeederDdeInnerDetailsScreen", { obj: item })}
                    />
                }
            </>
        )
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

    return (
        <SafeAreaView style={ApprovalHomeScreenStyle.mainView}>
            <Header
                title="Feeder"
                leftIcon={<IcnBack />}
                rightIcon={<IcnMap />}
                onLeftPress={() => props.navigation.goBack()}
                onRightPress={() => props.navigation.navigate("MapScreen", { type: "Feeder", district_id: isPreviousData?.district_id, feeder_id: isPreviousData?.fedeer_id })}
            />

            <KeyboardAwareScrollView>

                <View style={ApprovalHomeScreenStyle.cardTitles}>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.geotag_list?.title}</Text>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.geotag_list?.index_id}</Text>

                    <View style={ApprovalHomeScreenStyle.cardView1}>
                        <Text style={ApprovalHomeScreenStyle.rightBottomText}>Tagged By - </Text>
                        <Text style={ApprovalHomeScreenStyle.taggedByName}>{obj?.geotag_list?.tag_by}</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.cardView2}>
                        <Text style={ApprovalHomeScreenStyle.rightBottomText}>Status - </Text>

                        {_status == "Pending" && <Text style={ApprovalHomeScreenStyle.status3}>{_status}</Text>}
                        {_status == "Return" && <Text style={ApprovalHomeScreenStyle.status1}>{_status}</Text>}
                        {_status == "Returned" && <Text style={ApprovalHomeScreenStyle.status1}>{_status}</Text>}
                        {_status == "Approved" && <Text style={ApprovalHomeScreenStyle.status2}>{_status}</Text>}
                    </View>
                </View>


                <TouchableOpacity style={ApprovalHomeScreenStyle.heading} onPress={() => onOpenPopup()}>
                    <View style={ApprovalHomeScreenStyle.textView}>
                        <Text style={ApprovalHomeScreenStyle.headingText}>{"View Details"}</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.icnView}>
                        <IcnDetails />
                    </View>
                </TouchableOpacity>


                <View style={ApprovalHomeScreenStyle.descriptiontabView}>
                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[ApprovalHomeScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 1 ? Colors.white : "#000" }]}>Geotags</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[ApprovalHomeScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 2 ? Colors.white : "#000" }]}>Action History</Text>
                    </TouchableOpacity>
                </View>

                {isSelectTab == 1 &&
                    <View style={ApprovalHomeScreenStyle.recentMainView}>
                        {isSelectTab == 1 && isList?.map((item, index) => (feederList(item, index)))}
                    </View>
                }
                {isSelectTab == 2 &&
                    <View style={ApprovalHomeScreenStyle.recentMainView1}>
                        {isSelectTab == 2 && isHistoreList?.map((item, index) => (actionList(item, index)))}
                    </View>
                }
            </KeyboardAwareScrollView>

            <DTRDetailePopup data={_typeItemDetails} isVisible={isDTRpopupVisible} handleClose={() => setDTRpopupVisible(false)} />
            <PolDetailePopup data={_typeItemDetails} isVisible={isPolPopupVisible} handleClose={() => setPolPopupVisible(false)} />

            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <FeederViewDetailePopup data={feederDetail} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />
        </SafeAreaView>
    );
};

export default memo(UserFeederDetailsScreen);



