// Other by Khasiya Sagar.

import React, { useEffect, useState, memo } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ApprovalHomeScreenStyle } from "../Approval/ApprovalHomeScreenStyle";
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
import SubstationDetailsCards from "../Approval/SubstationDetailsCards";
import { onLoading } from "../../../App";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import SubstationViewDetailePopup from "../Approval/SubstationViewDetailePopup";
import IcnToFrom from "../../assets/svg/IcnToFrom";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { SafeAreaView } from "react-native-safe-area-context";

var _path = ""
var _status = ""

const UserSubstationsDetailsScreen = (props) => {

    const route = useRoute();
    const { obj, type } = route.params;
    const [isPreviousData, setPreviousData] = useState(obj);

    const [isSelectTab, setSelectTab] = useState(1);
    const [isData, setData] = useState(null);
    const [isList, setList] = useState([]);
    const [isHistoreList, setHistoreList] = useState([]);
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

            "item_no": obj?.item_no,
            "district_id": isPreviousData?.district_id,
            "geotag_type": isPreviousData.geotag_type,
            "taging_for": isPreviousData?.taging_for,
            "major_component_id": isPreviousData?.major_component_id,
            "sub_component_id": isPreviousData?.sub_component_id,
            "items_specification_id": isPreviousData?.items_specification_id,
            "asset_type": "substation"
        };

        onLoading(true);
        Service.post(EndPoints.getAssetDetails, data, (res) => {
            if (res._resultflag) {

                _path = res?.data?.image_path;
                _status = res?.data?.status;
                var geptagList = res?.data?.geotagData;

                geptagList.map((details) => {
                    details.showFlag = false;
                })

                setList(geptagList);
                setData((res?.data?.substations_data)[geptagList[0]?.item_no]);
                onLoading(false);

                if (geptagList.length == 0) {
                    // props.navigation.goBack()
                }
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
            "asset_type": "substation"
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
    const handleDeletePress = (id) => {
        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => {
                    onDelet(id)

                }
            },
            {
                text: 'No', onPress: () => { }
            }
        ]);
    }
    const onDelet = (id) => {
        onLoading(true);
        const data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,

            district_id: isPreviousData?.district_id,
            major_component_id: isPreviousData?.major_component_id,
            sub_component_id: isPreviousData?.sub_component_id,
            items_specification_id: isPreviousData?.items_specification_id,
            geotag_type: isPreviousData.geotag_type,
            taging_for: isPreviousData?.taging_for,
            remove_id: id,
        };

        Service.post(EndPoints.deleteSSGeoTagbyId, data, (res) => {
            if (res._resultflag) {
                onFetchGeotag();
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    };
    const onEdit = (item) => {
        props.navigation.navigate("EditSubstationsGeoTaggedCapturePhoto", {
            selectedOption: isPreviousData?.taging_for,
            achievementButtonState: isPreviousData?.geotag_type == "Achievement" ? true : false,
            selectedItem: item?.title,

            indexCode: isPreviousData?.indexCode,
            selectedDistricts: isPreviousData?.district_id,
            selectedMajorComponent: isPreviousData?.major_component_id,
            selectedSubComponent: isPreviousData?.sub_component_id,
            sl_district_items_specification: isPreviousData?.items_specification_id,
            sl_district_major_component: isPreviousData?.sl_district_major_component,
            sl_district_sub_component: isPreviousData?.sl_district_sub_component,
            substationData: isPreviousData?.substationData,
            item,
        });
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
    const substationList = (item, index) => {

        var show = false;


        if (type != "History") {
            if (_status == "" && _status == "Returned")
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
                    <SubstationDetailsCards
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
                        imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                        innerbutton={item?.status}
                        editIconPress={() => onEdit(item)}
                        deletIconPress={(id) => handleDeletePress(id)}
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
                title="Substation"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("MapScreen",
                    {
                        type: "Substation", district_id: isPreviousData?.district_id,
                        major_component_id: isPreviousData?.major_component_id,
                        sub_component_id: isPreviousData?.sub_component_id,
                        items_specification_id: isPreviousData?.items_specification_id
                    })}
            />

            <KeyboardAwareScrollView>

                <View style={ApprovalHomeScreenStyle.cardTitles}>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{isList[0]?.title}</Text>
                    <Text style={ApprovalHomeScreenStyle.cardSr}>{isList[0]?.index_id}</Text>

                    <View style={ApprovalHomeScreenStyle.cardView1}>
                        <Text style={ApprovalHomeScreenStyle.rightBottomText}>Tagged By - </Text>
                        <Text style={ApprovalHomeScreenStyle.taggedByName}>{isList[0]?.tag_by}</Text>
                    </View>
                    <View style={ApprovalHomeScreenStyle.cardView2}>
                        <Text style={ApprovalHomeScreenStyle.rightBottomText}>Status - </Text>
                        {isList[0]?.status == "" && <Text style={ApprovalHomeScreenStyle.status1}>{"Pending for Submission"}</Text>}
                        {isList[0]?.status == "Pending" && <Text style={ApprovalHomeScreenStyle.status3}>{isList[0]?.status}</Text>}
                        {isList[0]?.status == "Return" && <Text style={ApprovalHomeScreenStyle.status1}>{isList[0]?.status}</Text>}
                        {isList[0]?.status == "Returned" && <Text style={ApprovalHomeScreenStyle.status1}>{isList[0]?.status}</Text>}
                        {isList[0]?.status == "Approved" && <Text style={ApprovalHomeScreenStyle.status2}>{isList[0]?.status}</Text>}
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
                        {isSelectTab == 1 && isList?.map((item, index) => (substationList(item, index)))}
                    </View>
                }

                {isSelectTab == 2 &&
                    <View style={ApprovalHomeScreenStyle.recentMainView1}>
                        {isSelectTab == 2 && isHistoreList?.map((item, index) => (actionList(item, index)))}
                    </View>
                }

            </KeyboardAwareScrollView>

            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <SubstationViewDetailePopup data={isData} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />
        </SafeAreaView>
    );
};

export default memo(UserSubstationsDetailsScreen);



