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
import { Colors } from "../../utils/Colors";
import { onLoading } from "../../../App";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";
import FeederViewDetailePopup from "./FeederViewDetailePopup";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import DTRDetailePopup from "./DTRDetailePopup";
import PolDetailePopup from "./PolDetailePopup";
import IcnFilter from "../../assets/svg/IcnFilter2";
import IcnFilter1 from "../../assets/svg/IcnFilterClose";
import FeederLtHtLineFilter from "./FeederLtHtLineFilter";
import { AppUtil } from "../../utils/AppUtil";
import ApprovalFeederDetailsCards from "../../components/FeederCard/ApprovalFeederDetailsCards";
import { SafeAreaView } from "react-native-safe-area-context";


var _path = ""
var _remark = ""
var _item = ""
var _action = "";
var _filter = { Line: "", Scheme: "", SelectedMajorComponent: "", UGorOH: "", HTLineVoltage: "", CableOrConductor: "", TypeofCable: "", TypeofConductor: "", PoleStructure: "", CircuitType: "", SinglePhaseThreePhase: "" };

const DDRFeederListScreen = (props) => {

    const route = useRoute();
    const { obj } = route.params;
    const [isPreviousData, setPreviousData] = useState(obj);

    const [isSelectTab, setSelectTab] = useState(1);
    const [isList, setList] = useState([]);
    const [isHistoreList, setHistoreList] = useState([]);
    const [isFeederRemarkVisible, setFeederRemarkVisible] = useState(false);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isMajorComponents, setMajorComponents] = useState([]);

    useEffect(() => {
        _filter = { Line: "", Scheme: "", SelectedMajorComponent: "", UGorOH: "", HTLineVoltage: "", CableOrConductor: "", TypeofCable: "", TypeofConductor: "", PoleStructure: "", CircuitType: "", SinglePhaseThreePhase: "" };
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
            "filter": {
                Line: _filter?.Line == "" ? "" : _filter?.Line == "LT Line" ? "LTline" : "HTline",
                Scheme: _filter?.Scheme,
                SelectedMajorComponent: _filter?.SelectedMajorComponent,
                UGorOH: _filter?.UGorOH,
                HTLineVoltage: _filter?.HTLineVoltage,
                CableOrConductor: _filter?.CableOrConductor,
                TypeofCable: _filter?.TypeofCable,
                TypeofConductor: _filter?.TypeofConductor,
                PoleStructure: _filter?.PoleStructure,
                CircuitType: _filter?.CircuitType,
                SinglePhaseThreePhase: _filter?.SinglePhaseThreePhase,
            }
        };

        onLoading(true);
        Service.post(EndPoints.getFeederAssetDetails, data, (res) => {

            if (res._resultflag) {

                if (res?.data?.geotagData) {
                    _path = res?.data?.image_path;
                    _status = res?.data?.status;

                    var geptagList = res?.data?.geotagData;
                    geptagList.map((details) => {
                        details.showFlag = false;
                    })

                    setList(geptagList);
                }
                else
                    setList([]);

            } else {
                Alert.alert("Alert", res.message);
            }
            onFetchMajorData();
        }, (err) => {
            onLoading(false);
        })
    }
    const onFetchMajorData = () => {

        if (isMajorComponents.length > 0) {
            onLoading(false);
            return;
        }

        onLoading(true);

        Service.post(EndPoints.majorComponent, { monitoring_id: "3" }, (response) => {
            onLoading(false);
            if (response.data) {

                const majorComponents = response.data.map((majorComponent) => (majorComponent.title));
                setMajorComponents(majorComponents);

            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
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
            _filter = { Line: "", Scheme: "", SelectedMajorComponent: "", UGorOH: "", HTLineVoltage: "", CableOrConductor: "", TypeofCable: "", TypeofConductor: "", PoleStructure: "", CircuitType: "", SinglePhaseThreePhase: "" };
        }
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
    const onRemoveFilter = (type) => {
        if (type == "Line")
            _filter.Line = ""
        else if (type == "Scheme")
            _filter.Scheme = ""
        else if (type == "SelectedMajorComponent")
            _filter.SelectedMajorComponent = ""
        else if (type == "UGorOH")
            _filter.UGorOH = ""
        else if (type == "HTLineVoltage")
            _filter.HTLineVoltage = ""
        else if (type == "CableOrConductor")
            _filter.CableOrConductor = ""
        else if (type == "TypeofCable")
            _filter.TypeofCable = ""
        else if (type == "TypeofConductor")
            _filter.TypeofConductor = ""
        else if (type == "PoleStructure")
            _filter.PoleStructure = ""
        else if (type == "CircuitType")
            _filter.CircuitType = ""
        else if (type == "SinglePhaseThreePhase")
            _filter.SinglePhaseThreePhase = ""
        onFetchGeotag();
    }
    const onGeotagAction = (action, indexItem) => {
        _action = action;
        _item = indexItem;
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
            "major_component_id": isPreviousData?.major_component_id,
            "sub_component_id": isPreviousData?.sub_component_id,
            "items_specification_id": isPreviousData?.items_specification_id,
            "index_id": _item?.index_id,
            "remarks": _remark,
            "status": _action
        };
        Service.post(EndPoints.feederAction, data, (res) => {
            if (res._resultflag) {
                _action = "";
                _item = "";
                onFetchGeotag();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onCardPress = (dt) => {
        let obj = {
            title: dt?.title,
            index_id: dt?.index_id,
            tag_by: dt?.tag_by,
            item: dt,

            taging_for: isPreviousData?.taging_for,
            fedeer_id: isPreviousData?.fedeer_id,
            fedeer_code: isPreviousData?.fedeer_code,
            district_id: isPreviousData?.district_id,
            geotag_type: isPreviousData?.geotag_type,
        };
        props.navigation.navigate("DDRFeederDetailsScreen", { obj });
    }

    const feederList = (item, index) => {
        return (
            <>
                <ApprovalFeederDetailsCards
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
                    status={item?.approval_status}
                    onPressImage={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                    onAction={(type) => onGeotagAction(type, item)}
                    onCardPress={() => onCardPress(item)}
                />
                <View style={{ marginTop: 10 }}></View>
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
                onLeftPress={() => {
                    _filter = { Line: "", Scheme: "", SelectedMajorComponent: "", UGorOH: "", HTLineVoltage: "", CableOrConductor: "", TypeofCable: "", TypeofConductor: "", PoleStructure: "", CircuitType: "", SinglePhaseThreePhase: "" };
                    props.navigation.goBack()
                }
                }
                onRightPress={() => props.navigation.navigate("ApprovarMapScreen", { type: "Feeder", district_id: isPreviousData?.district_id, feeder_id: isPreviousData?.fedeer_id })}
            />

            <KeyboardAwareScrollView>

                <View style={ApprovalHomeScreenStyle.descriptiontabView}>
                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[ApprovalHomeScreenStyle.descriptiontab2, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 1 ? Colors.white : "#000" }]}>Geotags</Text>
                        <Text style={ApprovalHomeScreenStyle.count}>{isList.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[ApprovalHomeScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[ApprovalHomeScreenStyle.txtTab, { color: isSelectTab == 2 ? Colors.white : "#000" }]}>Action History</Text>
                    </TouchableOpacity>
                </View>

                <View style={ApprovalHomeScreenStyle.selectItemButtonView}>
                    {
                        _filter?.Line &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Line}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("Line")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.Scheme &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Scheme}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("Scheme")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.SelectedMajorComponent &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.SelectedMajorComponent}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("SelectedMajorComponent")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.UGorOH &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.UGorOH}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("UGorOH")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.HTLineVoltage &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.HTLineVoltage}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("HTLineVoltage")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.CableOrConductor &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.CableOrConductor}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("CableOrConductor")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.TypeofCable &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.TypeofCable}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("TypeofCable")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.TypeofConductor &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.TypeofConductor}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("TypeofConductor")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.PoleStructure &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.PoleStructure}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("PoleStructure")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        _filter?.CircuitType &&
                        <View style={ApprovalHomeScreenStyle.filerView}>
                            <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.CircuitType}</Text>
                            <TouchableOpacity onPress={() => onRemoveFilter("CircuitType")}>
                                <IcnFilter1 height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
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


            </KeyboardAwareScrollView>

            {
                isSelectTab == 1 &&
                <TouchableOpacity style={ApprovalHomeScreenStyle.filterView} onPress={() => setFilterModalVisible(true)}>
                    <IcnFilter />
                </TouchableOpacity>
            }


            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <FeederLtHtLineFilter
                modalVisible={isFilterModalVisible}
                handleClose={() => setFilterModalVisible(false)}
                majorComponentList={isMajorComponents}
                newFilter={(data) => { _filter = data, onFetchGeotag() }}
                oldFilter={_filter}
            />

            <RemarkPopup handleClose={() => setFeederRemarkVisible(false)} isVisible={isFeederRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onFeederPrecess()} />
        </SafeAreaView>
    );
};

export default memo(DDRFeederListScreen);



