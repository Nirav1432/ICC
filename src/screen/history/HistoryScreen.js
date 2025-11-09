import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ScrollView, } from "react-native";
import { HistoryScreenStyle } from "./HistoryScreenStyle";
import Header from "../../components/header/SearchHeader";
import { onLoading } from "../../../App";
import { Colors } from "../../utils/Colors";
import { Service, postAPI } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { useNavigation } from "@react-navigation/native";
import { UserManager } from "../../manager/UserManager";
import IcnMap from "../../assets/svg/IcnMap";
import IcnLogout from "../../assets/svg/IcnLogout";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import RemarkPopup from "../../components/submitRemark/RemarkPopup";

import { AppUtil } from "../../utils/AppUtil";
import IcnFilter from "../../assets/svg/IcnFilterClose";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';
import SubstationHistoryCard from "../../components/history/SubstationHistoryCard";
import FeederHistoryCard from "../../components/history/FeederHistoryCard";
import DTRHistoryCard from "../../components/history/DTRHistoryCard";
import HistoryFilter from "../../components/history/HistoryFilter";
import { FlashList } from "@shopify/flash-list";
import ApprovalOtherCard from "../../components/approval/ApprovalOtherCard";
import OthersHistoryCard from "../../components/history/OthersHistoryCard";
import { SafeAreaView } from "react-native-safe-area-context";


var _path = "";
var _item = "";
var _action = "";
var _filter = { "DTRstype": -1, "Dest": { "id": "", "name": "" }, "Survey": true, Tagged: "", "fromDate": 'From', "toDate": 'To' };
var _filteringDataSubStation = [];
var _filteringDataFeeder = [];
var _filteringDataDTR = [];


const HistoryScreen = () => {

    const navigation = useNavigation();

    const [isSelectTab, setSelectTab] = useState(1);

    const [isDTRsRemarkVisible, setDTRsRemarkVisible] = useState(false);
    const [isSubstationRemarkVisible, setSubstationRemarkVisible] = useState(false);
    const [isFeederRemarkVisible, setFeederRemarkVisible] = useState(false);

    const [isDataList, setDataList] = useState([]);
    const [isFeederDataList, setFeederDataList] = useState([]);
    const [isSubstationDataList, setSubstationDataList] = useState([]);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isFilterData, setFilterData] = useState([]);
    const [isSearchText, setSearchText] = useState("");

    const [isOtherDataList, setOtherDataList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            onFetchSubstationsData();
            onFetchFeederData();
            onFetchDTRsData();
            onFetchOthersData();
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

    const onFetchHouseHoldsData = () => {

    }

    const onSelectTab = (btn) => {
        if (btn !== isSelectTab) {
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

        if (isSelectTab == 1)
            onFetchSubstationsData()
        else if (isSelectTab == 2)
            onFetchFeederData()
        else if (isSelectTab == 3)
            onFetchDTRsData()
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
            "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate
        };

        Service.post(EndPoints.pendingAssetlist, data, (res) => {
            onLoading(false);
            if (res._resultflag) {
                _path = res?.data?.image_path
                _filteringDataSubStation = res?.data?.list;
                setSubstationDataList(res?.data?.list)
            } else {
                // Alert.alert("Alert", res.message);
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
                _filteringDataFeeder = res?.data?.list;
                setFeederDataList(res?.data?.list)
                onLoading(false);
            } else {
                // Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })

    }
    const onFetchDTRsData = () => {

        onLoading(true);
        const data = {

            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "asset_type": "DTR",

            "tag_by": _filter?.Tagged?.id,
            "district_id": _filter?.Dest?.id ? _filter?.Dest?.id : "",
            "taging_for": _filter?.Project?.value ? _filter?.Project?.value : "LossReduction",
            "status": _filter?.Status?.value,
            "geotag_type": _filter?.Survey ? "Achievement" : "Survey",

            "submitted_date_from": _filter?.fromDate == "From" ? "" : _filter?.fromDate,
            "submitted_date_to": _filter?.toDate == "To" ? "" : _filter?.toDate,

            "page": 1,
            "limit": 1000,
        };

        Service.post(EndPoints.pendingAssetlist, data, (res) => {
            if (res._resultflag) {
                _path = res?.data?.image_path
                _filteringDataDTR = res?.data?.list;
                setDataList(res?.data?.list)
                onLoading(false);
            } else {
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
        onLoading(true);
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
            "status": _action
        };

        Service.post(EndPoints.dtrAction, data, (res) => {
            if (res._resultflag) {
                _item = "";
                _action = "";
                onFetchDTRsData();
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

            "major_component_id": _item?.major_component_id,
            "sub_component_id": _item?.sub_component_id,
            "items_specification_id": _item?.items_specification_id,

            "geotag_type": _item?.geotag_type,
            "taging_for": _item?.taging_for,

            "remarks": _remark,
            "status": _action
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
            "remarks": _remark,
            "status": _action,
        };

        Service.post(EndPoints.feederAction, data, (res) => {
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

        _filter = { "DTRstype": -1, "Dest": { "id": "", "name": "" }, "Survey": true, 'fromDate': 'From', "toDate": 'To' };

        if (type == "substation") {
            item.item_no = item?.geotag_list?.item_no;
            navigation.navigate("UserSubstationsDetailsScreen", { obj: item, type: "History" });
        }
        else if (type == "feeder") {
            item.index_id = item?.index_id;
            item.title = item?.title;
            item.tag_by = item?.tag_by;
            navigation.navigate("UserFeederDetailsScreen", { obj: item, type: "History" });
        }
        else if (type == "dtr") {
            item.index_id = item.geotag_list.index_id;
            item.title = item.geotag_list.title;
            item.item_no = item?.geotag_list?.item_no
            navigation.navigate("UserDTRDetailsScreen", { obj: item, type: "History" });
        }
        else if (type == "other") {
            navigation.navigate("DdeOtherDetailsScreen", { obj: item?.geotag_list[0], majorComponent: item?.major_component_id, subComponent: item?.sub_component_id, itemsSpecification: item?.items_specification_id });
        }
    }

    const EmptyListMessage = ({ item }) => {
        return (
            <Text style={HistoryScreenStyle.emptyListStyle}>
                No Data Found
            </Text>
        );
    };

    const onSearch = (txt) => {
        if (isSelectTab == 1) {
            if (txt) {
                let filteredName = _filteringDataSubStation.filter((item) => {
                    return item?.geotag_list?.title?.toLowerCase().match(txt?.toLowerCase()) || item?.geotag_list?.tag_by?.toLowerCase().match(txt?.toLowerCase())
                })
                setSubstationDataList(filteredName);
            } else { setSubstationDataList(_filteringDataSubStation); }
        }
        else if (isSelectTab == 2) {
            if (txt) {
                let filteredName = _filteringDataFeeder.filter((item) => {
                    return item?.geotag_list?.title?.toLowerCase().match(txt?.toLowerCase()) || item?.geotag_list?.tag_by?.toLowerCase().match(txt?.toLowerCase())
                })
                setFeederDataList(filteredName);
            }
            else {
                setFeederDataList(_filteringDataFeeder);
            }
        }
        else if (isSelectTab == 3) {
            if (txt) {
                let filteredName = _filteringDataDTR.filter((item) => {
                    return item?.geotag_list?.title?.toLowerCase().match(txt?.toLowerCase()) || item?.geotag_list?.tag_by?.toLowerCase().match(txt?.toLowerCase())
                })
                setDataList(filteredName);
            }
            else {
                setDataList(_filteringDataDTR);
            }
        }
    }

    return (
        <SafeAreaView style={HistoryScreenStyle.mainView}>

            <Header
                title="My History"
                rightIcon={<IcnMap />}
                leftIcon={<IcnLogout />}
                searchText={isSearchText}
                onLeftPress={() => navigation.openDrawer()}
                filterOpen={() => { setFilterModalVisible(true) }}
                onSearchClick={() => { onSearch(isSearchText) }}
                changeSearchText={(text) => { setSearchText(text), text == "" && onSearch(text) }}
                onRightPress={() => navigation.navigate("MapScreen", { type: "" })}
            />

            <View style={HistoryScreenStyle.tabView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[HistoryScreenStyle.tab, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#263D7E" }]}>
                        <Text style={HistoryScreenStyle.txtTab}>Substations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[HistoryScreenStyle.tab, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#263D7E" }]}>
                        <Text style={HistoryScreenStyle.txtTab}>Feeders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(3)} style={[HistoryScreenStyle.tab, { backgroundColor: isSelectTab == 3 ? Colors.orange : "#263D7E" }]}>
                        <Text style={HistoryScreenStyle.txtTab}>DTRs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(4)} style={[HistoryScreenStyle.tab, { backgroundColor: isSelectTab == 4 ? Colors.orange : "#263D7E" }]}>
                        <Text style={HistoryScreenStyle.txtTab}>Households</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSelectTab(5)} style={[HistoryScreenStyle.tab, { backgroundColor: isSelectTab == 5 ? Colors.orange : "#263D7E" }]}>
                        <Text style={HistoryScreenStyle.txtTab}>Others</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={HistoryScreenStyle.selectItemButtonView}>
                {
                    _filter?.Dest?.id &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{_filter?.Dest?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Dis")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Substation?.name &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{_filter?.Substation?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Substation")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Feeder?.value &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{_filter?.Feeder?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Feeder")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Project?.name &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{_filter?.Project?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Project")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Status?.name &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{_filter?.Status?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Status")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.Tagged?.name &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{_filter?.Tagged?.name}</Text>
                        <TouchableOpacity onPress={() => onRemoveFilter("Tagged")}>
                            <IcnFilter height={AppUtil.getHP(4)} width={AppUtil.getHP(4)} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    _filter?.fromDate != "From" &&
                    <View style={HistoryScreenStyle.filerView}>
                        <Text style={HistoryScreenStyle.txtFilter}>{moment(_filter?.fromDate).format("MM/YYYY") + " To " + moment(_filter?.toDate).format("MM/YYYY")}</Text>
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
                        <SubstationHistoryCard
                            key={index}
                            data={item}
                            approvePress={(data) => onSubstationActionClick(data, "Approved")}
                            returnPress={(data) => onSubstationActionClick(data, "Returned")}
                            cardPress={() => cardPress("substation", item)} />
                    }
                    estimatedItemSize={100}
                    ListEmptyComponent={EmptyListMessage} />
                    
            }
            {isSelectTab == 2 &&
                <FlashList
                    data={isFeederDataList}
                    renderItem={({ item, index }) =>
                        <FeederHistoryCard
                            key={index}
                            data={item}
                            approvePress={(data) => onFeederActionClick(data, "Approved")}
                            returnPress={(data) => onFeederActionClick(data, "Returned")}
                            cardPress={() => cardPress("feeder", item)} />
                    }
                    estimatedItemSize={100}
                    ListEmptyComponent={EmptyListMessage} />
            }
            {isSelectTab == 3 &&
                <FlashList
                    data={isDataList}
                    renderItem={({ item, index }) =>
                        <DTRHistoryCard
                            key={index}
                            data={item}
                            imageCenterPath={_path}
                            imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                            approvePress={(data) => onDTRsActionClick(data, "Approved")}
                            returnPress={(data) => onDTRsActionClick(data, "Returned")}
                            cardPress={() => cardPress("dtr", item)}
                        />
                    }
                    ListEmptyComponent={EmptyListMessage}
                    estimatedItemSize={100}
                />
            }
            {isSelectTab == 5 && isOtherDataList.length > 0 &&
                <FlashList
                    data={isOtherDataList}
                    renderItem={({ item, index }) =>
                        <OthersHistoryCard
                            keyse={index}
                            data={item}
                            imageCenterPath={_path}
                            cardPress={() => cardPress("other", item)}
                        />
                    }
                    estimatedItemSize={100}
                    ListEmptyComponent={EmptyListMessage}
                />
            }

            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <RemarkPopup handleClose={() => setDTRsRemarkVisible(false)} isVisible={isDTRsRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onDTRsPrecess()} />
            <RemarkPopup handleClose={() => setFeederRemarkVisible(false)} isVisible={isFeederRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onFeederPrecess()} />
            <RemarkPopup handleClose={() => setSubstationRemarkVisible(false)} isVisible={isSubstationRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubStationPrecess()} />

            <HistoryFilter
                data={isFilterData}
                feederName={isSelectTab == 2}
                modalVisible={isFilterModalVisible}
                handleClose={() => setFilterModalVisible(false)}
                newFilter={(data) => { _filter = data, onRefresh() }}
                oldFilter={_filter}
            />
        </SafeAreaView>
    );
};

export default memo(HistoryScreen);



