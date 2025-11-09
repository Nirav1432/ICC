import React, { memo, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Alert, } from "react-native";
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
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { SafeAreaView } from "react-native-safe-area-context";

var _path = ""
var _remark = ""
var _item = "";
var _action = "";

const SubstationsDetailsScreen = (props) => {

    const route = useRoute();
    const { obj } = route.params;

    const [isPreviousData, setPreviousData] = useState(obj);

    const [isSelectTab, setSelectTab] = useState(1);
    const [isData, setData] = useState(null);
    const [isList, setList] = useState([]);
    const [isPowerSubstationList, setPowerSubstationList] = useState([]);
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

            "item_no":isPreviousData?.geotag_list?.item_no,
            "district_id": isPreviousData?.district_id,
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
                let substationDetails = (res?.data?.substations_data)[geptagList[0].item_no];
                setData(substationDetails);
                setPowerSubstationList(substationDetails?.power_substation_data);

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
                        onPressImage={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
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

    const powerList = (item, index) => {

        return (
            <View style={ApprovalHomeScreenStyle.powerView} > 
           
                <View style={ApprovalHomeScreenStyle.powerViewInner}>
                        <View style={ApprovalHomeScreenStyle.firstRow}>
                            <Text style={ApprovalHomeScreenStyle.headText}>PT Capacity</Text>
                            <Text style={ApprovalHomeScreenStyle.SubText}>{item?.pt_capacity}</Text>
                        </View>   

                        <View>
                                <Text style={ApprovalHomeScreenStyle.headText}>Make Model</Text>
                                <Text style={ApprovalHomeScreenStyle.SubText}>{ item?.pt_make_model}</Text>
                        </View>                
                </View>

                <View style={[ApprovalHomeScreenStyle.powerViewInner,{marginTop:10}]}>
                        <View style={ApprovalHomeScreenStyle.firstRow}>
                            <Text style={ApprovalHomeScreenStyle.headText}>Manufacturing Date</Text>
                            <Text style={ApprovalHomeScreenStyle.SubText}>{moment(item?.manufacturing_month_year).format("YYYY-MM-DD")}</Text>
                        </View>   

                        <View>
                                <Text style={ApprovalHomeScreenStyle.headText}>Date of Installation</Text>
                                <Text style={ApprovalHomeScreenStyle.SubText}>{moment(item?.date_of_installation).format("YYYY-MM-DD")}</Text>
                        </View>   
                        </View>   

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
                Alert.alert('Alert', res.message, [
                    {
                        text: 'ok', onPress: () => {
                            props.navigation.goBack()
                        }
                    },
                ]);
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    return (
        <SafeAreaView style={ApprovalHomeScreenStyle.mainView}>
            <Header
                title="Substation"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("ApprovarMapScreen",
                    {
                        type: "Substation",
                        district_id: isPreviousData?.district_id,
                        major_component_id: isPreviousData?.major_component_id,
                        sub_component_id: isPreviousData?.sub_component_id,
                        items_specification_id: isPreviousData?.items_specification_id
                    })}
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
                        {obj?.status == "Pending" && <Text style={ApprovalHomeScreenStyle.status3}>{obj?.status}</Text>}
                        {obj?.status == "Return" && <Text style={ApprovalHomeScreenStyle.status1}>{obj?.status}</Text>}
                        {obj?.status == "Returned" && <Text style={ApprovalHomeScreenStyle.status1}>{obj?.status}</Text>}
                        {obj?.status == "Approved" && <Text style={ApprovalHomeScreenStyle.status2}>{obj?.status}</Text>}
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
                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[ApprovalHomeScreenStyle.descriptiontab1, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 1 ? Colors.white : "#000" }]}>Geotags</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[ApprovalHomeScreenStyle.descriptiontab1, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 2 ? Colors.white : "#000" }]}>Action History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectTab(3)} style={[ApprovalHomeScreenStyle.descriptiontab1, { backgroundColor: isSelectTab == 3 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 3 ? Colors.white : "#000", textAlign:'center' }]}>{"Power\nTransformers"}</Text>
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
                {isSelectTab == 3 &&
                    <View style={ApprovalHomeScreenStyle.recentMainView1}>
                        {isSelectTab == 3 &&  isPowerSubstationList?.length ? isPowerSubstationList?.map((item, index) => (powerList(item, index))) 
                        : 
                        <Text style={{width:"100%", marginTop:150, textAlign:'center'}}>No power transformer added!</Text>}
                    </View>
                }


            </KeyboardAwareScrollView>

            {
                obj?.status == "Pending" &&
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
                obj?.status == "Returned" &&
                <View style={ApprovalHomeScreenStyle.buttomBtn3}>
                    <Text style={ApprovalHomeScreenStyle.txtBtn1}>{obj?.status}</Text>
                </View>
            }
            {
                obj?.status == "Approved" &&
                <View style={ApprovalHomeScreenStyle.buttomBtn4}>
                    <Text style={ApprovalHomeScreenStyle.txtBtn1}>{obj?.status}</Text>
                </View>
            }
            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <SubstationViewDetailePopup data={isData} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />
            <RemarkPopup handleClose={() => setSubstationRemarkVisible(false)} isVisible={isSubstationRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubStationPrecess()} />
        </SafeAreaView>
    );
};

export default memo(SubstationsDetailsScreen);



