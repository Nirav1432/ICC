// Other by Khasiya Sagar.
//import liraries
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import Header from "../../components/header/Header";
import SearchView from "../../components/searchView/SearchView";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import { Labels } from "../../utils/Labels";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
const OldFeederListScreen = (props) => {
    const route = useRoute();
    const { selectedDistricts } = route.params;

    const navigation = useNavigation();
    const [isSubstationId, setSubstationId] = useState("");
    const [isSearchItem, setSearchItem] = useState("");
    const [isDisticList, setDisticList] = useState([]);
    const [isFeederList, setFeederList] = useState([]);



    useEffect(() => {
        onFetchMajorData();
    }, []);


    const onFetchMajorData = () => {
        onLoading(true);
        var data = { district_id: selectedDistricts?.value };

        Service.post(EndPoints.OldgetSubstationByDistrict, data, (success) => {

            const transformedDistricts = success.data.map((district) => ({
                title: district?.substation_name,
                value: district?.id,
            }));

            transformedDistricts.push({ "title": "Select", "value": -1 })
            setDisticList(transformedDistricts.reverse());
            onFetchFeederComponentList(isSearchItem, isSubstationId);
        },
            (error) => {
                onLoading(false);
            }
        );
    }

    const onFetchFeederComponentList = (searchValue, substationId) => {
        onLoading(true);
        const data = {
            district_id: JSON.stringify(selectedDistricts.value),
            search_name: searchValue,
            substation_id: substationId,
        };

        Service.post(EndPoints.OldgetFeederbydistrict, data, (response) => {
            onLoading(false);
            if (response.resultflag == 1) {
                setFeederList(response?.data);
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onSelectSubstation = (value) => {
        setSubstationId(value.value == -1 ? "" : value.value)
        onFetchFeederComponentList(isSearchItem, value.value == -1 ? "" : value.value);
    }

    const onSearch = (text) => {
        setSearchItem(text);
        onFetchFeederComponentList(text, isSubstationId);
    }

    const onClickNavigate = (item) => {
        navigation.navigate("OldCreateFeederGeotag", { feederData: item, selectedDistricts: selectedDistricts })
    }


    return (
        <SafeAreaView style={styles.mainView}>
            <Header
                title="Old Feeder Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
            />
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Loss Reduction</Text>
                </View>

                <View style={styles.firstView}>
                    <View style={styles.flexView}>
                        <SingleDropdownList title={Labels.FilterbySubstationName} data={isDisticList} onSelectedSevice={(value) => { onSelectSubstation(value) }} />
                    </View>
                    <View style={styles.flexView}>
                        <SearchView onHandleSearch={(text) => { onSearch(text) }} onSearch={() => null} />
                    </View>
                </View>


                <FlatList
                    removeClippedSubviews={true}
                    windowSize={5}
                    initialNumToRender={10}
                    style={styles.flatList}
                    scrollEnabled
                    data={isFeederList}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onClickNavigate(item)} style={styles.cell}>
                            <Text style={styles.cellText}>
                                {item?.feeder_name + " - " + item?.feeder_code}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainView: {
        marginBottom: AppUtil.getHP(6),
    },
    container: {
        // flex: 1,
        height: AppUtil.getHP(89),
        backgroundColor: Colors.primaryBackground,
    },
    headerView: {
        backgroundColor: Colors.primaryBackground,
        height: AppUtil.getHP(5),
        justifyContent: "center",
        paddingHorizontal: AppUtil.getWP(4),
    },
    headerText: {
        fontSize: AppUtil.getHP(2.2),
        color: Colors.darkBlack,
        fontFamily: Fonts.RobotoMedium,
    },
    subHeaderView: {
        backgroundColor: Colors.disableViewColor,
        paddingHorizontal: AppUtil.getWP(4),
        paddingVertical: AppUtil.getHP(2),
    },
    margin: {
        marginTop: AppUtil.getHP(1.5),
    },
    mHorizontal: {
        marginHorizontal: AppUtil.getWP(-5),
    },

    firstView: {
        width: "100%",
        paddingHorizontal: AppUtil.getWP(4),
        paddingVertical: AppUtil.getHP(2),
        backgroundColor: Colors.secondaryBG10,
    },
    flexView: {
        flexDirection: "row",
        alignItems: "center",
    },
    flatList: {
        width: "100%",
        paddingHorizontal: AppUtil.getWP(4),
        paddingVertical: AppUtil.getHP(2),
        backgroundColor: Colors.primaryBackground,
        flexWrap: "wrap",
    },
    cell: {
        width: AppUtil.getWP(92),
        height: AppUtil.getHP(8),
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingHorizontal: AppUtil.getWP(4),
        marginBottom: AppUtil.getHP(1.1),
        justifyContent: 'center'
    },
    cellText: {
        fontSize: 12,
        color: Colors.darkBlack,
        fontFamily: Fonts.RobotoMedium,

    },
});

//make this component available to the app
export default memo(OldFeederListScreen);



