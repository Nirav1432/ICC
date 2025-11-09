import React, { memo, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Alert, } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ApprovalHomeScreenStyle } from "./ApprovalHomeScreenStyle";
import Header from "../../components/header/SearchHeader";
import { onLoading } from "../../../App";
import { Colors } from "../../utils/Colors";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { useNavigation } from "@react-navigation/native";
import { UserManager } from "../../manager/UserManager";
import IcnMap from "../../assets/svg/IcnMap";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";
import ApprovalSubstationCard from "../../components/approval/ApprovalSubstationCard";
import ApprovalFeederCard from "../../components/approval/ApprovalFeederCard";
import ApprovalFilter from "../../components/approval/ApprovalFilter";
import { AppUtil } from "../../utils/AppUtil";
import IcnFilter from "../../assets/svg/IcnFilterClose";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';
import IcnLogout from "../../assets/svg/IcnLogout";
import { Loger } from "../../utils/Loger";
import ApprovalDTRCard from "../../components/approval/ApprovalDTRCard";
import ApprovalOtherCard from "../../components/approval/ApprovalOtherCard";
import { SafeAreaView } from "react-native-safe-area-context";


var _remark = "";
var _item = "";
var _action = "";
var _filter = { "DTRstype": -1, "Feeder": { "id": "", "name": "" }, "Substation": { "name": "", "value": "" }, "Dest": { "id": "", "name": "" }, "Survey": true, Tagged: "", "fromDate": 'From', "toDate": 'To' };

var _dtrPage = 1;
var DTR_RESPONSE = false;

const ApprovalHomeScreen = () => {

    const navigation = useNavigation();

    const [isSelectTab, setSelectTab] = useState(1);

    const [isOtherRemarkVisible, setOtherRemarkVisible] = useState(false);
    const [isDTRsRemarkVisible, setDTRsRemarkVisible] = useState(false);
    const [isSubstationRemarkVisible, setSubstationRemarkVisible] = useState(false);
    const [isFeederRemarkVisible, setFeederRemarkVisible] = useState(false);

    const [isDataList, setDataList] = useState([]);
    const [isFeederDataList, setFeederDataList] = useState([]);
    const [isSubstationDataList, setSubstationDataList] = useState([]);
    const [isOtherDataList, setOtherDataList] = useState([]);

    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isFilterData, setFilterData] = useState([]);
    const [isSearchText, setSearchText] = useState("");

    useFocusEffect(
        React.useCallback(() => {

            _dtrPage = 1;
            DTR_RESPONSE = false;
            onLoading(true);
            setTimeout(() => {
                onFetchSubstationsData();
                onFetchFeederData();
                onFetchDTRsData(true);
                onFetchOthersData();
            }, 1000)
        }, [])
    );

    useEffect(() => {
        onFetchFilter();
    }, []);

    const onFetchFilter = () => {

        onLoading(true);
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
        };

        Service.post(EndPoints.filterlist, data, (res) => {
            if (res._resultflag) {
                onGetDstirct(res?.data);
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    }

    const onGetDstirct = (obj) => {
        onLoading(true);
        const dynamicEndpoint = `${EndPoints.getDistrictsbyuser}/?user_id=${UserManager.id}`;
        Service.post(dynamicEndpoint, {}, (responseJson) => {

            if (responseJson?.district) {

                const transformedDistricts = responseJson.district.map((district) => ({
                    name: district.district_name,
                    id: district.id,
                }));
                obj.dest = transformedDistricts ? transformedDistricts : [];
            }
            setFilterData(obj);


            onFetchSubstationsData()
        }, (err) => {
            onLoading(false);
        })
    }

    const onSelectTab = (btn) => {

        if (btn !== isSelectTab) {

            _dtrPage = 1;
            setDataList([]);
            setSubstationDataList([]);
            setFeederDataList([]);
            setSearchText("")
            _filter = { "DTRstype": -1, "Feeder": { "id": "", "name": "" }, "Substation": { "name": "", "value": "" }, "Dest": { "id": "", "name": "" }, "Survey": true, 'fromDate': 'From', "toDate": 'To' };
            setSelectTab(btn);

            if (btn == 1)
                onFetchSubstationsData()
            else if (btn == 2)
                onFetchFeederData()
            else if (btn == 3)
                onFetchDTRsData(true)
            else if (btn == 4)
                onFetchHouseHoldsData()
            else if (btn == 5)
                onFetchOthersData()

        }
    }

    const onRefresh = () => {

        _dtrPage = 1;
        setDataList([]);

        if (isSelectTab == 1)
            onFetchSubstationsData()
        else if (isSelectTab == 2)
            onFetchFeederData()
        else if (isSelectTab == 3)
            onFetchDTRsData(true)
        else if (isSelectTab == 4)
            onFetchHouseHoldsData()
        else if (isSelectTab == 5)
            onFetchOthersData()

    }

    const onFetchSubstationsData = () => {

        onLoading(true);
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "asset_type": "Substations",

            "district_id": _filter?.Dest?.id ? _filter?.Dest?.id : "",

            "taging_for": _filter?.Project?.value ? _filter?.Project?.value : "LossReduction",
            "status": _filter?.Status?.value,
            "geotag_type": _filter?.Survey ? "Achievement" : "Survey",
            "tag_by": _filter?.Tagged?.id,

            "submitted_date_from": _filter?.fromDate == "From" ? "" : _filter?.fromDate,
            "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate,
            "search": isSearchText.length > 1 ? isSearchText : ""

        };

        Service.post(EndPoints.pendingAssetlist, data, (res) => {
            onLoading(false);
            if (res._resultflag) {
                _path = res?.data?.image_path
                setSubstationDataList(res?.data?.list)
            } else {
                Alert.alert("Alert", res.message);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onFetchFeederData = () => {

        onLoading(true);
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "asset_type": "Feeder",

            "district_id": _filter?.Dest?.id ? _filter?.Dest?.id : "",
            "taging_for": _filter?.Project?.value ? _filter?.Project?.value : "LossReduction",
            "status": _filter?.Status?.value,
            "geotag_type": _filter?.Survey ? "Achievement" : "Survey",
            "tag_by": _filter?.Tagged?.id,

            "submitted_date_from": _filter?.fromDate == "From" ? "" : _filter?.fromDate,
            "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate,
            "feeder": _filter?.Feeder?.value ? _filter?.Feeder?.value : "",
            "substation_id": _filter?.Substation?.value ? _filter?.Substation?.value : "",

            "search": isSearchText.length > 1 ? isSearchText : ""
        };

        Service.post(EndPoints.ddrFeederList, data, (res) => {
            if (res._resultflag) {
                _path = res?.data?.image_path
                setFeederDataList(res?.data?.list)
                onLoading(false);
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onFetchDTRsData = (newdata) => {

        if (DTR_RESPONSE)
            return;


        onLoading(true);
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "asset_type": "DTR",

            "district_id": _filter?.Dest?.id ? _filter?.Dest?.id : "",
            "taging_for": _filter?.Project?.value ? _filter?.Project?.value : "LossReduction",
            "status": _filter?.Status?.value,
            "geotag_type": _filter?.Survey ? "Achievement" : "Survey",
            "tag_by": _filter?.Tagged?.id,

            "submitted_date_from": _filter?.fromDate == "From" ? "" : _filter?.fromDate,
            "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate,

            "page": _dtrPage,
            "limit": 100,

            "search": isSearchText.length > 1 ? isSearchText : ""


        };

        DTR_RESPONSE = true;
        Service.post(EndPoints.pendingAssetlist, data, (res) => {

            DTR_RESPONSE = false;
            if (res._resultflag) {

                _path = res?.data?.image_path
                if (res?.data?.list.length > 0) {

                    if (newdata) {
                        setDataList(res?.data?.list)
                    }
                    else {
                        setDataList([...isDataList, ...res?.data?.list]);
                    }
                    _dtrPage = _dtrPage + 1;
                }
                else {
                    if (newdata)
                        setDataList(res?.data?.list)
                }

                setTimeout(() => { onLoading(false); }, 1000)
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onFetchHouseHoldsData = () => {

        // onLoading(true);
        // const data = {

        //     "role_id": UserManager.role_id,
        //     "user_id": UserManager.id,
        //     "discom_id": UserManager.discom_id,
        //     "asset_type": "Households",

        //     "district_id": _filter?.Dest?.id ? _filter?.Dest?.id : "",
        //     "taging_for": _filter?.Project?.value ? _filter?.Project?.value : "LossReduction",
        //     "status": _filter?.Status?.value,
        //     "geotag_type": _filter?.Survey ? "Achievement" : "Survey",
        //     "tag_by": _filter?.Tagged?.id,

        //     "submitted_date_from": _filter?.fromDate == "From" ? "" : _filter?.fromDate,
        //     "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate
        // };

        // Service.post(EndPoints.pendingAssetlist, data, (res) => {
        //     if (res._resultflag) {
        //         _path = res?.data?.image_path
        //         _filteringDataDTR = res?.data?.list;
        //         setDataList(res?.data?.list)
        //         onLoading(false);
        //     } else {
        //         Alert.alert("Alert", res.message);
        //         onLoading(false);
        //     }
        // }, (err) => {
        //     onLoading(false);
        // })

    }

    const onFetchOthersData = () => {

        onLoading(true);
        const data = {

            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "taging_for": "LossReduction",
            "geotag_type": "Achievement",

            "district_id": _filter?.Dest?.id ? _filter?.Dest?.id : "",
            "submitted_date_from": _filter?.fromDate == "From" ? "" : _filter?.fromDate,
            "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate,

            "status": _filter?.Status?.value,
            "tag_by": _filter?.Tagged?.id,

            // "page": _dtrPage,
            // "limit": 100,

            "search": isSearchText.length > 1 ? isSearchText : ""

        };

        Service.post(EndPoints.ddrOtherPendingList, data, (res) => {
            if (res._resultflag) {
                _path = res?.data?.image_path


                setOtherDataList(res?.data?.list)
                onLoading(false);
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }


    const onDTRsActionClick = (indexItem, action) => {
        _item = indexItem;
        _action = action;
        setDTRsRemarkVisible(true);
    }

    const onDTRsPrecess = () => {
        setDTRsRemarkVisible(false);
        // onLoading(true);
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": _item?.district_id,
            "asset_type":"Dtr",

            "major_component_id": _item?.major_component_id,
            "sub_component_id": _item?.sub_component_id,
            "items_specification_id": _item?.items_specification_id,

            "geotag_type": _item?.geotag_type,
            "taging_for": _item?.taging_for,

            "remarks": _remark,
            "status": _action,
            "item_no": _item?.geotag_list?.item_no,
        };


        Service.post(EndPoints.dtrAction, data, (res) => {
            if (res._resultflag) {
                _item = "";
                _action = "";
                _dtrPage = 1;
                setDataList([]);
                onFetchDTRsData(true)
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onSubstationActionClick = (indexItem, action) => {
        _item = indexItem;
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
            "district_id": _item?.district_id,
            "asset_type":"Substation",

            "major_component_id": _item?.major_component_id,
            "sub_component_id": _item?.sub_component_id,
            "items_specification_id": _item?.items_specification_id,

            "geotag_type": _item?.geotag_type,
            "taging_for": _item?.taging_for,

            "remarks": _remark,
            "status": _action,

            "item_no": _item?.geotag_list?.item_no,
        };

        Service.post(EndPoints.dtrAction, data, (res) => {
            if (res._resultflag) {
                _item = "";
                _action = "";
                onFetchSubstationsData();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onFeederActionClick = (indexItem, action) => {
        _item = indexItem;
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
            "district_id": _item?.district_id,
            "geotag_type": _item?.geotag_type,
            "taging_for": _item?.taging_for,
            "fedeer_id": _item?.fedeer_id,
            "index_id": "",
            "remarks": _remark,
            "status": _action,
        };

        Service.post(EndPoints.ddrFeederAction, data, (res) => {
            if (res._resultflag) {
                _item = "";
                _action = "";
                onFetchFeederData();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onOtherActionClick = (indexItem, action) => {
        _item = indexItem;
        _action = action;
        setOtherRemarkVisible(true);
    }
    const onOtherPrecess = () => {
        setOtherRemarkVisible(false);


        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": _item?.district_id,

            "major_component_id": _item?.major_component_id,
            "sub_component_id": _item?.sub_component_id,
            "items_specification_id": _item?.items_specification_id,

            "geotag_type": _item?.geotag_type,
            "taging_for": _item?.taging_for,

            "remarks": _remark,
            "status": _action,

            "item_no": _item?.geotag_list[0]?.item_no,
        };

        onLoading(true);
        Service.post(EndPoints.ddrOthersitemsAction, data, (res) => {
            if (res._resultflag) {
                _item = "";
                _action = "";
                onFetchOthersData();
            } else {
                Alert.alert("Alert", res.message)
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }

    const onRemoveFilter = (type) => {
        if (type == "Dis") {
            _filter.Dest = { "id": "", "name": "" }
            _filter.Feeder = { "id": "", "name": "" };
            _filter.Substation = { "name": "", "value": "" };
        }
        else if (type == "Substation") {
            _filter.Substation = { "name": "", "value": "" };
            _filter.Feeder = { "id": "", "name": "" };
        }
        else if (type == "Feeder") {
            _filter.Feeder = { "id": "", "name": "" };
        }
        else if (type == "Project") {
            _filter.Project = "";
        }
        else if (type == "Status") {
            _filter.Status = "";
        }
        else if (type == "Tagged") {
            _filter.Tagged = "";
        }
        else if (type == "date") {
            _filter.fromDate = "From";
            _filter.toDate = "To";
        }

        onRefresh();
    }

    const cardPress = (type, item) => {

        _dtrPage = 1;
        DTR_RESPONSE = false;
        setDataList([]);
        setSearchText("");
        _filter = { "DTRstype": -1, "Dest": { "id": "", "name": "" }, "Survey": true, 'fromDate': 'From', "toDate": 'To' };

        onLoading(false);
        if (type == "substation") {
            navigation.navigate("SubstationsDetailsScreen", { obj: item })
        }
        else if (type == "feeder") {
            navigation.navigate("DDRFeederDetailsScreen", { obj: item })
        }
        else if (type == "dtr") {
            navigation.navigate("DtrDetailsScreen", { obj: item })
        }
        else if (type == "other") {
            navigation.navigate("DDROtherDetailsScreen", { obj: item })
        }
    }

    const onSearch = (txt) => {

        if (isSelectTab == 1) {
            onFetchSubstationsData()
        }
        else if (isSelectTab == 2) {
            onFetchFeederData()
        }
        else if (isSelectTab == 3) {
            _dtrPage = 1;
            onFetchDTRsData(true)
        }
        else if (isSelectTab == 5) {
            onFetchOthersData()
        }
        else
            onLoading(false);

    }

    const getItemLayout = (_, index) => {
        return {
            length: ITEM_HEIGHT, // Fixed height
            offset: ITEM_HEIGHT * index,
            index,
        };
    };

    return (
        <SafeAreaView style={ApprovalHomeScreenStyle.mainView}>
            <Header
                title="Geotagging of RDSS Assets"
                rightIcon={<IcnMap />}
                leftIcon={<IcnLogout />}
                searchText={isSearchText}
                onLeftPress={() => { navigation.openDrawer() }}
                filterOpen={() => { setFilterModalVisible(true) }}
                onSearchClick={() => { onSearch(isSearchText) }}
                changeSearchText={(text) => { setSearchText(text), text == "" && onSearch(text) }}

                onRightPress={() => navigation.navigate("ApprovarMapScreen", { type: "" })}
            />

            <View style={ApprovalHomeScreenStyle.tabView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[ApprovalHomeScreenStyle.tab, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#263D7E" }]}>
                        <Text style={ApprovalHomeScreenStyle.txtTab}>Substations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[ApprovalHomeScreenStyle.tab, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#263D7E" }]}>
                        <Text style={ApprovalHomeScreenStyle.txtTab}>Feeders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(3)} style={[ApprovalHomeScreenStyle.tab, { backgroundColor: isSelectTab == 3 ? Colors.orange : "#263D7E" }]}>
                        <Text style={ApprovalHomeScreenStyle.txtTab}>DTRs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(4)} style={[ApprovalHomeScreenStyle.tab, { backgroundColor: isSelectTab == 4 ? Colors.orange : "#263D7E" }]}>
                        <Text style={ApprovalHomeScreenStyle.txtTab}>Households</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(5)} style={[ApprovalHomeScreenStyle.tab, { backgroundColor: isSelectTab == 5 ? Colors.orange : "#263D7E" }]}>
                        <Text style={ApprovalHomeScreenStyle.txtTab}>Others</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={ApprovalHomeScreenStyle.selectItemButtonView}>
                {
                    _filter?.Dest?.id &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Dest?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Dis")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Substation?.name &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Substation?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Substation")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Feeder?.value &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Feeder?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Feeder")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Project?.name &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Project?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Project")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Status?.name &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Status?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Status")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Tagged?.name &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{_filter?.Tagged?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Tagged")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.fromDate != "From" &&
                    <View style={ApprovalHomeScreenStyle.filerView}>
                        <Text style={ApprovalHomeScreenStyle.txtFilter}>{moment(_filter?.fromDate).format("MM/YYYY") + " To " + moment(_filter?.toDate).format("MM/YYYY")}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("date")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
            </View>

            {isSelectTab == 1 &&
                <FlashList
                    data={isSubstationDataList}
                    renderItem={({ item, index }) =>
                        <ApprovalSubstationCard
                            key={index}
                            data={item}
                            approvePress={(data) => onSubstationActionClick(data, "Approved")}
                            returnPress={(data) => onSubstationActionClick(data, "Returned")}
                            cardPress={() => cardPress("substation", item)}
                            getItemLayout={getItemLayout} />
                    }
                    estimatedItemSize={200}

                />
            }
            {isSelectTab == 2 &&
                <FlashList
                    data={isFeederDataList}
                    renderItem={({ item, index }) =>
                        <ApprovalFeederCard
                            key={index}
                            data={item}
                            approvePress={(data) => onFeederActionClick(data, "Approved")}
                            returnPress={(data) => onFeederActionClick(data, "Returned")}
                            cardPress={() => cardPress("feeder", item)} />
                    }
                    estimatedItemSize={200}
                />
            }
            {isSelectTab == 3 && isDataList.length > 0 &&
                <FlashList
                    data={isDataList}
                    renderItem={({ item, index }) =>
                        <ApprovalDTRCard
                            keyse={index}
                            keva={index}
                            data={item}
                            imageCenterPath={_path}
                            approvePress={(data) => onDTRsActionClick(data, "Approved")}
                            returnPress={(data) => onDTRsActionClick(data, "Returned")}
                            cardPress={() => cardPress("dtr", item)}
                            getItemLayout={getItemLayout}
                        />
                    }
                    estimatedItemSize={200}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => isDataList.length > 99 && onFetchDTRsData(false)} // Trigger pagination when scrolling to the end
                />
            }
            {isSelectTab == 5 && isOtherDataList.length > 0 &&
                <FlashList
                    data={isOtherDataList}
                    renderItem={({ item, index }) =>
                        <ApprovalOtherCard
                            keyse={index}
                            data={item}
                            imageCenterPath={_path}
                            approvePress={(data) => onOtherActionClick(data, "Approved")}
                            returnPress={(data) => onOtherActionClick(data, "Returned")}
                            cardPress={() => cardPress("other", item)}
                            getItemLayout={getItemLayout}
                        />
                    }
                    estimatedItemSize={200}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => isDataList.length > 99 && onFetchDTRsData(false)} // Trigger pagination when scrolling to the end
                />
            }

            <RemarkPopup handleClose={() => setDTRsRemarkVisible(false)} isVisible={isDTRsRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onDTRsPrecess()} />
            <RemarkPopup handleClose={() => setFeederRemarkVisible(false)} isVisible={isFeederRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onFeederPrecess()} />
            <RemarkPopup handleClose={() => setSubstationRemarkVisible(false)} isVisible={isSubstationRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubStationPrecess()} />
            <RemarkPopup handleClose={() => setOtherRemarkVisible(false)} isVisible={isOtherRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onOtherPrecess()} />

            <ApprovalFilter
                data={isFilterData}
                feederName={isSelectTab == 2}
                modalVisible={isFilterModalVisible}
                handleClose={() => setFilterModalVisible(false)}
                newFilter={(data) => { _filter = data, onRefresh() }}
                oldFilter={_filter}
            />
        </SafeAreaView>
    );

}
export default memo(ApprovalHomeScreen);



