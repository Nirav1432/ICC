// Other by Khasiya Sagar.
//import liraries
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import HalfDropDown from "../../components/halfDropDown/HalfDropDown";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { UserManager } from "../../manager/UserManager";
import IcnSearch from "../../assets/svg/IcnSearch";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { SafeAreaView } from "react-native-safe-area-context";


// create a component
const OldDtrGeoTagList = (props) => {
    const [majorComponents, setMajorComponents] = useState([]);
    const [selectedMajorComponent, setMajorComponentId] = useState("");
    const [subComponents, setSubComponents] = useState([]);
    const [selectedSubComponent, setSubComponentID] = useState("");

    const [resultArray, setResultArray] = useState([]);
    const [isFeederList, setFeederList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const route = useRoute();

    const { selectedDistricts, selectedOption, achievementButtonState, geotagType, selectedDistrictsName, sessionType } = route.params;

    useEffect(() => {
        onFetchFeederComponentList();
    }, []);

    const onFetchFeederComponentList = () => {
        onLoading(true);
        const data = { district_id: JSON.stringify(selectedDistricts), };

        Service.post(EndPoints.OldgetFeederbydistrict, data, (response) => {
            if (response.resultflag == "1") {
                setFeederList(response?.data);
                onFetchMajorData();
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    const onFetchMajorData = () => {
        onLoading(true);
        Service.post(EndPoints.OldmajorComponent, { monitoring_id: "3" }, (response) => {
            onLoading(false);
            if (response.data) {

                const majorComponents = response.data.map((majorComponent) => ({
                    label: majorComponent.title,
                    value: majorComponent.id,
                }));
                majorComponents.unshift({ label: "Select", value: "-1" });
                setMajorComponents(majorComponents);
                onFetchUpdateList("", "", "")

            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onSelectMajorComponent = (_id) => {

        let id = _id == "-1" ? "" : _id

        setMajorComponentId(id);
        setSubComponents([]);
        setSubComponentID("")

        if (_id != -1)
            onFetchSubComponentData(id);

        setTimeout(() => {
            onFetchUpdateList(id, "", searchText)
        }, 500)

    }

    const onFetchSubComponentData = (id) => {
        setSubComponents([]);

        onLoading(true);

        Service.post(EndPoints.OldsubComponent, { lr_major_component_id: JSON.stringify(id), monitoring_id: "3" }, (response) => {
            onLoading(false);
            if (response.data) {

                const subComponents = response.data.map((subComponent) => ({
                    label: subComponent.title,
                    value: subComponent.id,
                }));
                subComponents.unshift({ label: "Select", value: "-1" });
                setSubComponents(subComponents);

            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onSelectSubComponent = (_id) => {
        let id = _id == "-1" ? "" : _id

        setSubComponentID(id)
        onFetchUpdateList(selectedMajorComponent, id, searchText)
    }

    const onFetchUpdateList = (majorComponent, subComponentid, searchText) => {


        onLoading(true);
        const body = {
            district_id: JSON.stringify(selectedDistricts),
            discom_id: UserManager.discom_id,
            majorcomponent_id: majorComponent + "",
            subcomp_id: subComponentid + "",
            searchText: searchText,
            asset_type: 'DTR'
        };

        Service.post(EndPoints.OlsgetItemsUpdateList, body, (response) => {
            onLoading(false);
            if (response.data) {
                setResultArray(response.data);
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }


    const handleItemPress = React.useCallback((item) => {

        props.navigation.navigate("OldCreateDtrGeoTag", {
            parentData: item,
            selectedDistricts: selectedDistricts,
            feederList: isFeederList,
            geotagType: geotagType,
            selectedOption,
            achievementButtonState,
            selectedDistrictsName,
            countlist: item?.sanctioned,
            sessionType
        });
    },
        [props.navigation, resultArray, selectedDistricts, selectedMajorComponent, selectedSubComponent,]
    );

    const OnsetText = (text) => {
        setSearchText(text);

        if (text == "")
            onFetchUpdateList(selectedMajorComponent, selectedSubComponent, "")

    }
    const handleSearch = () => {
        if (searchText !== "")
            onFetchUpdateList(selectedMajorComponent, selectedSubComponent, searchText);
    }

    return (
        // <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>

            <Header
                onLeftPress={() => props.navigation.goBack()}
                title="DTR Geotag"
                leftIcon={<IcnBack />}
            />

            <View style={styles.firstView}>
                <View style={styles.flexView}>

                    <HalfDropDown
                        title={"Major Components"}
                        data={majorComponents}
                        onValueChange={(value) => { onSelectMajorComponent(value.value) }}
                    />
                    <HalfDropDown
                        title={"Sub Component"}
                        data={subComponents}
                        onValueChange={(value) => {
                            onSelectSubComponent(value.value);
                        }
                        }
                    />
                </View>
                <View style={styles.mainView}>
                    <TextInput
                        maxLength={70}
                        placeholder="Enter your keyword here"
                        placeholderTextColor={"black"}
                        style={styles.btnDrop}
                        value={searchText}
                        onChangeText={(text) => { OnsetText(text) }}
                    />
                    <TouchableOpacity onPress={() => { handleSearch() }} style={styles.btnSearch}>
                        <IcnSearch />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.secondView}>
                <FlatList
                    removeClippedSubviews={true}
                    windowSize={5}
                    initialNumToRender={10}
                    style={styles.flatList}
                    scrollEnabled
                    data={resultArray}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { handleItemPress(item); }} style={styles.cell} >
                            <Text numberOfLines={2} style={styles.cellText}>{item?.major_components + " - " + item?.item_summary}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
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
        flex: 1,
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
        justifyContent: 'center'
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
export default memo(OldDtrGeoTagList);
