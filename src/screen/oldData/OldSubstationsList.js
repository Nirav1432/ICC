// Other by Khasiya Sagar.
//import liraries
import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import HalfDropDown from "../../components/halfDropDown/HalfDropDown";
import { Service } from "../../service/Service";
import { onLoading } from "../../../App";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { UserManager } from "../../manager/UserManager";
import IcnSearch from "../../assets/svg/IcnSearch";
import Header from "../../components/header/Header";
import { EndPoints } from "../../service/Endpoints";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

// create a component
const OldSubstationsList = (props) => {

    const [subComponents, setSubComponents] = useState([]);
    const [majorComponents, setMajorComponents] = useState([]);
    const [selectedMajorComponent, setMajorComponentId] = useState("");
    const [selectedSubComponent, setSubComponentID] = useState("");
    const [resultArray, setResultArray] = useState([]);
    const [searchText, setSearchText] = useState("");

    const route = useRoute();

    const { selectedDistricts, selectedOption, achievementButtonState, geotagType, selectedDistrictsName } = route.params;

    useEffect(() => {
        fetchMajorComponents();
    }, []);

    // Fetch major components from the API
    const fetchMajorComponents = () => {

        onLoading(true);
        Service.post(EndPoints.OLD_majorComponent, { monitoring_id: "2" }, (response) => {

            onLoading(false);
            if (response.data) {
                const majorComponents = response.data.map((majorComponent) => ({
                    label: majorComponent.title,
                    value: majorComponent.id,
                }));
                majorComponents.unshift({ label: "Select", value: -1 });
                setMajorComponents(majorComponents);
                fetchItemsList("", "", "");

            } else showErrorToast(response.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    // Fetch sub-components if a major component is selected
    useEffect(() => {
        fetchSubComponents();
    }, [selectedMajorComponent]);

    // Fetch sub-components from the API
    const fetchSubComponents = () => {
        setSubComponents([]);
        onLoading(true);

        Service.post(EndPoints.OLD_subComponent, { lr_major_component_id: JSON.stringify(selectedMajorComponent), monitoring_id: "2" }, (response) => {


            onLoading(false);
            if (response.data) {
                const subComponents = response.data.map((subComponent) => ({
                    label: subComponent.title,
                    value: subComponent.id,
                }));
                subComponents.unshift({ label: "Select", value: -1 });
                setSubComponents(subComponents);
            }
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    // Fetch items list based on selected components
    useEffect(() => {
        if (selectedMajorComponent !== null || selectedSubComponent !== null) {
            fetchItemsList(selectedMajorComponent, selectedSubComponent, searchText);
        }
    }, [selectedMajorComponent, selectedSubComponent]);

    // Fetch items list from the API

    const fetchItemsList = (majorComponent, subComponentid, searchText) => {

        setSubComponentID(subComponentid)

        onLoading(true);
        const body = {
            district_id: JSON.stringify(selectedDistricts),
            discom_id: UserManager.discom_id,
            majorcomponent_id: majorComponent + "",
            subcomp_id: subComponentid + "",
            searchText: searchText,
            asset_type: 'Substation'
        };

        Service.post(EndPoints.OLD_getItemsUpdateList, body, (response) => {
            onLoading(false);
            if (response.data) {
                setResultArray(response.data);
                _SeachArr = response.data;
            } else showErrorToast(response.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const handleItemPress = React.useCallback((item) => {

        props.navigation.navigate("OldCreateSubstationsGeoTag", {
            parentData: item,
            selectedDistricts: selectedDistricts,
            selectedOption,
            achievementButtonState,
            geotagType: geotagType,
            countlist: item?.sanctioned,
            selectedDistrictsName,

        });
    },
        [props.navigation, resultArray, selectedDistricts, selectedMajorComponent, selectedSubComponent,]
    );

    const OnsetText = (text) => {
        setSearchText(text);
        if (text == "")
            fetchItemsList(selectedMajorComponent, selectedSubComponent, "")
    }
    const handleSearch = () => {
        fetchItemsList(selectedMajorComponent, selectedSubComponent, searchText);
    }

    return (
        <SafeAreaView>
            <Header
                title="Old Substations Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
            />

            <View style={SubstationsHomeStyle.container}>
                <View style={SubstationsHomeStyle.firstView}>
                    <View style={SubstationsHomeStyle.flexView}>

                        <HalfDropDown
                            title={"Major Components"}
                            data={majorComponents}
                            onValueChange={(value) => {
                                setSubComponentID("")
                                setMajorComponentId(value.value == -1 ? "" : value.value);
                            }}
                        />
                        <HalfDropDown
                            title={"Sub Component"}
                            data={subComponents}
                            onValueChange={(value) => {
                                setSubComponentID(value.value == -1 ? "" : value.value);
                            }}
                        />

                    </View>

                    <View style={SubstationsHomeStyle.mainView}>
                        <TextInput
                            maxLength={70}
                            placeholder="Enter your keyword here"
                            placeholderTextColor={"black"}
                            style={SubstationsHomeStyle.btnDrop}
                            value={searchText}
                            onChangeText={(text) => { OnsetText(text) }}
                        />
                        <TouchableOpacity onPress={() => { handleSearch() }} style={SubstationsHomeStyle.btnSearch}>
                            <IcnSearch />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={SubstationsHomeStyle.secondView}>
                    <FlatList
                        removeClippedSubviews={true}
                        windowSize={5}
                        initialNumToRender={10}
                        style={SubstationsHomeStyle.flatList}
                        scrollEnabled
                        data={resultArray}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={SubstationsHomeStyle.cell} onPress={() => { handleItemPress(item); }}>
                                <Text numberOfLines={2} style={SubstationsHomeStyle.cellText}>{item?.major_components + " - " + item?.item_summary}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
};

// define your styles
const SubstationsHomeStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: AppUtil.getHP(80),
        backgroundColor: Colors.primaryBackground,
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
    secondView: {
        backgroundColor: Colors.primaryBackground,
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
        justifyContent: "center",
    },
    cellText: {
        fontSize: AppUtil.getHP(1.8),
        color: Colors.darkBlack,
        fontFamily: Fonts.RobotoMedium,
    },
    mainView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: AppUtil.getHP(2),
        width: "100%",
    },
    btnDrop: {
        width: "85%",
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.white,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: AppUtil.getWP(3),
        color: Colors.darkBlack,
    },
    btnSearch: {
        width: AppUtil.getHP(6.16),
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.orange,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

//make this component available to the app
export default memo(OldSubstationsList);
