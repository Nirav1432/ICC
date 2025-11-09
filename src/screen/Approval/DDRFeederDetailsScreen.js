import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
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
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";
import FeederDetailsCards from "./FeederDetailsCards.js";
import FeederViewDetailePopup from "./FeederViewDetailePopup";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import DTRDetailePopup from "./DTRDetailePopup";
import PolDetailePopup from "./PolDetailePopup";
import IcnFilter from "../../assets/svg/IcnFilter2";
import ApprovarFeederFilter from "../../components/approval/ApprovarFeederFilter";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { AppUtil } from "../../utils/AppUtil";
import IcnFilterClose from "../../assets/svg/IcnFilterClose";
import { SafeAreaView } from "react-native-safe-area-context";


var _path = ""
var _remark = ""
var _action = "";

var _typeItemDetails = "";
var _filter = { status: "", Line: "", Scheme: "", MajorComponent: "", UGorOH: "", WhetherCableOrConductor: "", TypeOfCable: "", TypeOfConductor: "", CircuitType: "", HTLineVoltage: "", PoleStructur: "", SinglePhaseThreePhase: "" };

const FeederDetailsScreen = (props) => {

    const route = useRoute();
    const { obj } = route.params;

    const [isPreviousData, setPreviousData] = useState(obj);

    const [isSelectTab, setSelectTab] = useState(1);
    const [isList, setList] = useState([]);
    const [isHistoreList, setHistoreList] = useState([]);
    const [isFeederRemarkVisible, setFeederRemarkVisible] = useState(false);
    const [isViewDetailsPopupVisible, setViewDetailsPopupVisible] = useState(false);
    const [feederDetail, setFeederDetail] = useState([]);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    const [isDTRpopupVisible, setDTRpopupVisible] = useState(false);
    const [isPolPopupVisible, setPolPopupVisible] = useState(false);

    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isMajorComponentList, setMajorComponentList] = useState([]);

    const [isTotalDistance, setTotalDistance] = useState(0);
    const [isPendingDistance, setPendingDistance] = useState(0);


    useEffect(() => {
        onFetchMajorData();
    }, []);

    const onFetchMajorData = () => {

        onLoading(true);

        Service.post(EndPoints.majorComponent, { monitoring_id: "3" }, (response) => {
            onLoading(false);
            if (response.data) {
                const majorComponents = response.data.map((majorComponent) => (majorComponent.title));
                setMajorComponentList(majorComponents);
            } else {
                showErrorToast(res.message)
            };
            onFetchGeotag();
        },
            (err) => {
                onLoading(false);
                onFetchGeotag();
            }
        );
    }

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
            filter: _filter,
        };

        onLoading(true);
        Service.post(EndPoints.ddrGetFeederAssetDetails, data, (res) => {
            if (res._resultflag) {

                if (res.message == "No record found.") {
                    setList([]);
                    setTotalDistance(0);
                    setPendingDistance(0);
                }
                else {
                    _path = res?.data?.image_path;
                    var geptagList = res?.data?.geotagData;

                    let totalDistance: Number = 0;
                    let pendingDistance: Number = 0;



                    geptagList.map((details) => {

                        details.showFlag = false;

                        let _totalDistance: Number = details?.actualDistance ? Number(details?.actualDistance) : 0;
                        totalDistance = _totalDistance + totalDistance;

                        let _pendingDistance: Number = details?.approval_status == "Pending" ? details?.actualDistance ? Number(details?.actualDistance) : 0 : 0;
                        pendingDistance = _pendingDistance + pendingDistance;

                    })


                    setTotalDistance(totalDistance);
                    setPendingDistance(pendingDistance);
                    setList(geptagList);
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

    const onSubstationActionClick = (action) => {
        _action = action;
        setFeederRemarkVisible(true);
    }
    const onFeederPrecess = () => {

        setFeederRemarkVisible(false);
        onLoading(true);

        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": isPreviousData?.district_id,

            "geotag_type": isPreviousData?.geotag_type,
            "taging_for": isPreviousData?.taging_for,
            "fedeer_id": isPreviousData?.fedeer_id,

            "remarks": _remark,
            "status": _action,
            "index_id": "",
        };
        Service.post(EndPoints.ddrFeederAction, data, (res) => {
            if (res._resultflag) {
                _action = "";
                // onFetchGeotag();
                props.navigation.goBack();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

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

        _typeItemDetails = obj;

        if (obj.asset_type == "DTR") {
            setDTRpopupVisible(true);
        }
        else if (obj.asset_type == "Pole") {
            setPolPopupVisible(true);
        }
    }
    const onGeotagAction = (item, action) => {

        //  "role_id": UserManager.role_id,
        //     "user_id": UserManager.id,
        //     "discom_id": UserManager.discom_id,
        //     "district_id": isPreviousData?.district_id,

        //     "geotag_type": isPreviousData?.geotag_type,
        //     "taging_for": isPreviousData?.taging_for,
        //     "fedeer_id": isPreviousData?.fedeer_id,

        //     "remarks": _remark,
        //     "status": _action,
        //     "index_id": "",

        onLoading(true);
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,

            "district_id": isPreviousData?.district_id,
            "geotag_type": isPreviousData?.geotag_type,
            "taging_for": isPreviousData?.taging_for,
            "fedeer_id": isPreviousData?.fedeer_id,

            "index_id": item?.index_id,
            "remarks": "",
            "status": action,
        };

        Service.post(EndPoints.ddrFeederAction, data, (res) => {
            if (res._resultflag) {
                onRefresh();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }
    const feederList = (item, index) => {

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
                        type={item?.asset_type}
                        othersAssetType={item.sub_asset_type}
                        onPressImage={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                        typeClick={() => onTypeTextClick(item)}
                        onDetails={() => props.navigation.navigate("DDRFeederInnerDetailsScreen", { obj: item })}
                        moreDetails={true}
                        ddrInnerbutton={item?.approval_status == "Pending"}
                        editIconPress={() => { onGeotagAction(item, "Approved") }}
                        deletIconPress={() => { onGeotagAction(item, "Returned") }}
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

    const onRemoveFilter = (type) => {

        if (type == "line") {
            _filter.Line = "";
            _filter.HTLineVoltage = "";
            _filter.PoleStructur = "";
            _filter.SinglePhaseThreePhase = "";
        }
        else if (type == "status") {
            _filter.status = "";
        }
        else if (type == "Scheme") {
            _filter.Scheme = "";
        }
        else if (type == "MajorComponent") {
            _filter.MajorComponent = "";
        }
        else if (type == "UGorOH") {
            _filter.UGorOH = "";
        }
        else if (type == "WhetherCableOrConductor") {
            _filter.WhetherCableOrConductor = "";
            _filter.TypeOfCable = "";
            _filter.TypeOfConductor = "";
        }
        else if (type == "TypeOfCable") {
            _filter.TypeOfCable = "";
        }
        else if (type == "TypeOfConductor") {
            _filter.TypeOfConductor = "";
        }
        else if (type == "CircuitType") {
            _filter.CircuitType = "";
        }
        else if (type == "HTLineVoltage") {
            _filter.HTLineVoltage = "";
        }
        else if (type == "PoleStructur") {
            _filter.PoleStructur = "";
        }
        else if (type == "SinglePhaseThreePhase") {
            _filter.SinglePhaseThreePhase = "";
        }


        onRefresh();
    }

    const onRefresh = () => {
        onFetchGeotag();
    }
    const onResetFilter = () => {
        _filter = { status: "", Line: "", Scheme: "", MajorComponent: "", UGorOH: "", WhetherCableOrConductor: "", TypeOfCable: "", TypeOfConductor: "", CircuitType: "", HTLineVoltage: "", PoleStructur: "", SinglePhaseThreePhase: "" };
        props.navigation.goBack()
    }

    return (
        <SafeAreaView style={ApprovalHomeScreenStyle.mainView}>
            <Header
                title="Feeder"
                leftIcon={<IcnBack />}
                rightIcon={<IcnMap />}
                onLeftPress={() => onResetFilter()}
                onRightPress={() => props.navigation.navigate("ApprovarMapScreen", { type: "Feeder", district_id: isPreviousData?.district_id, feeder_id: isPreviousData?.fedeer_id })}
            />

            <KeyboardAwareScrollView>


                <View style={ApprovalHomeScreenStyle.cardSaprater}>
                    <View style={ApprovalHomeScreenStyle.cardTitles1}>
                        <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.geotag_list?.title}</Text>
                        <Text style={ApprovalHomeScreenStyle.cardSr}>{obj?.geotag_list?.index_id}</Text>

                        <View style={ApprovalHomeScreenStyle.cardView1}>
                            <Text style={ApprovalHomeScreenStyle.rightBottomText}>Tagged By - </Text>
                            <Text style={ApprovalHomeScreenStyle.taggedByName}>{obj?.geotag_list?.tag_by}</Text>
                        </View>

                        {/* <View style={ApprovalHomeScreenStyle.cardView2}>
                            <Text style={ApprovalHomeScreenStyle.rightBottomText}>Status - </Text>
                            {obj?.geotag_list?.approval_status == "Pending" && <Text style={ApprovalHomeScreenStyle.status3}>{obj?.geotag_list?.approval_status}</Text>}
                            {obj?.geotag_list?.approval_status == "Return" && <Text style={ApprovalHomeScreenStyle.status1}>{obj?.geotag_list?.approval_status}</Text>}
                            {obj?.geotag_list?.approval_status == "Returned" && <Text style={ApprovalHomeScreenStyle.status1}>{obj?.geotag_list?.approval_status}</Text>}
                            {obj?.geotag_list?.approval_status == "Approved" && <Text style={ApprovalHomeScreenStyle.status2}>{obj?.geotag_list?.approval_status}</Text>}
                        </View> */}
                        <View style={ApprovalHomeScreenStyle.cardView2}>
                            <Text style={ApprovalHomeScreenStyle.rightBottomText}>{"Total length of Geotag (CMtrs) : "}</Text>
                            <Text style={ApprovalHomeScreenStyle.taggedByName}>{isTotalDistance}</Text>
                        </View>
                        <View style={ApprovalHomeScreenStyle.cardView2}>
                            <Text style={ApprovalHomeScreenStyle.rightBottomText}>{"Total length geotagged (CMtrs) pending for approval : "}</Text>
                            <Text style={ApprovalHomeScreenStyle.taggedByName}>{isPendingDistance}</Text>
                        </View>

                    </View>

                </View>


                <View style={ApprovalHomeScreenStyle.filterSaprater}>
                    <TouchableOpacity style={ApprovalHomeScreenStyle.feederHeading} onPress={() => onOpenPopup()}>
                        <View style={ApprovalHomeScreenStyle.textView}>
                            <Text style={ApprovalHomeScreenStyle.headingText}>{"View Details"}</Text>
                        </View>
                        <View style={ApprovalHomeScreenStyle.icnView}>
                            <IcnDetails />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setFilterModalVisible(true) }} style={ApprovalHomeScreenStyle.filterView1}>
                        <IcnFilter />
                    </TouchableOpacity>

                </View>

                <View style={ApprovalHomeScreenStyle.descriptiontabView}>

                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[ApprovalHomeScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 1 ? Colors.white : "#000" }]}>Geotags</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[ApprovalHomeScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 2 ? Colors.white : "#000" }]}>Action History</Text>
                    </TouchableOpacity>
                </View>

                <View style={ApprovalHomeScreenStyle.selectItemButtonView1}>
                    {
                        _filter?.status != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.status}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("status")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.Line != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Line}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("line")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.Scheme != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Scheme}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("Scheme")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.MajorComponent != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.MajorComponent}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("MajorComponent")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.UGorOH != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.UGorOH}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("UGorOH")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.WhetherCableOrConductor != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.WhetherCableOrConductor}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("WhetherCableOrConductor")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.TypeOfCable != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.TypeOfCable}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("TypeOfCable")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.TypeOfConductor != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.TypeOfConductor}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("TypeOfConductor")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.CircuitType != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.CircuitType}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("CircuitType")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.HTLineVoltage != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.HTLineVoltage}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("HTLineVoltage")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.PoleStructur != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.PoleStructur}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("PoleStructur")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.SinglePhaseThreePhase != "" &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.SinglePhaseThreePhase}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("SinglePhaseThreePhase")}>
                                <IcnFilterClose height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }

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

                {
                    obj?.geotag_list?.approval_status == "Pending" && isList.length > 0 &&
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
                    obj?.geotag_list?.approval_status == "Returned" &&
                    <View style={ApprovalHomeScreenStyle.buttomBtn3}>
                        <Text style={ApprovalHomeScreenStyle.txtBtn1}>{obj?.geotag_list?.approval_status}</Text>
                    </View>
                }
                {
                    obj?.geotag_list?.approval_status == "Approved" &&
                    <View style={ApprovalHomeScreenStyle.buttomBtn4}>
                        <Text style={ApprovalHomeScreenStyle.txtBtn1}>{obj?.geotag_list?.approval_status}</Text>
                    </View>
                }
            </KeyboardAwareScrollView>



            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <DTRDetailePopup data={_typeItemDetails} isVisible={isDTRpopupVisible} handleClose={() => setDTRpopupVisible(false)} />
            <PolDetailePopup data={_typeItemDetails} isVisible={isPolPopupVisible} handleClose={() => setPolPopupVisible(false)} />
            <FeederViewDetailePopup data={feederDetail} handleClose={() => setViewDetailsPopupVisible(false)} isVisible={isViewDetailsPopupVisible} />

            <ApprovarFeederFilter
                data={null}
                modalVisible={isFilterModalVisible}
                majorComponentList={isMajorComponentList}
                handleClose={() => setFilterModalVisible(false)}
                newFilter={(data) => { _filter = data, onRefresh() }}
                oldFilter={_filter}
            />
            <RemarkPopup handleClose={() => setFeederRemarkVisible(false)} isVisible={isFeederRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onFeederPrecess()} />

        </SafeAreaView>
    );
};

export default memo(FeederDetailsScreen);



