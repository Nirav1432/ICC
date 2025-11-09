import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubstationsHomeStyle } from "./SubstationsHomeStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import HalfDropDown from "../../../components/halfDropDown/HalfDropDown";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { onLoading } from "../../../../App";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import SearchView from "../../../components/searchView/SearchView";
import { useRoute } from "@react-navigation/native";
import { UserManager } from "../../../manager/UserManager";
import IcnSearch from "../../../assets/svg/IcnSearch";
import { Loger } from "../../../utils/Loger";
import { SqlData } from "../../../database/SqlData";

function SubstationsList(props) {
    const [subComponents, setSubComponents] = useState([]);
    const [majorComponents, setMajorComponents] = useState([]);
    const [selectedMajorComponent, setMajorComponentId] = useState("");
    const [selectedSubComponent, setSubComponentID] = useState("");
    const [componentTitles, setComponentTitles] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [ids, setIds] = useState(null);
    const [searchText, setSearchText] = useState("");

    const route = useRoute();

    const { selectedDistricts, selectedOption, achievementButtonState, geotagType, selectedDistrictsName, tableName } = route.params;

    useEffect(() => {
        SqlData.createTablex(tableName);
        fetchMajorComponents();
    }, []);

    // Fetch major components from the API
    const fetchMajorComponents = () => {

        onLoading(true);
        Service.post(EndPoints.majorComponent, { monitoring_id: "2" }, (response) => {

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

        Service.post(EndPoints.subComponent, { lr_major_component_id: JSON.stringify(selectedMajorComponent), monitoring_id: "2" }, (response) => {


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

        Service.post(EndPoints.getItemsUpdateList, body, (response) => {
            onLoading(false);
            if (response.data) {
                setResultArray(response.data);
                _SeachArr = response.data;

                if ((response.data).length > 0) {
                    setTimeout(() => {
                        SqlData.setDatax(tableName, false, (response.data), (response) => {
                        }, (error) => {
                        });
                    }, 100)

                }

            } else showErrorToast(response.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    useEffect(() => {
        if (resultArray.length === 0) {
            setComponentTitles([]);
        } else {
            const majorComponentTitles = majorComponents.reduce((acc, item) => {
                acc[item.value] = item.label;
                return acc;
            }, {});

            const updatedResultArray = resultArray.map((item) => {
                const id = Object.keys(item)[0];

                const majorComponentID = item[id]?.sl_district_major_component || null;
                const title = majorComponentTitles[majorComponentID] || "Unknown";
                const combinedTitle = `${title} ${item[id]?.sl_district_remarks || ""}`;
                return { [id]: { ...item[id], combined_title: combinedTitle } };
            });

            const updatedIds = updatedResultArray.map((item) => Object.keys(item)[0]);
            setIds(updatedIds);

            let ArrObj = updatedResultArray.map((item) => Object.values(item)[0].combined_title)
            let uniq = {};
            let output = ArrObj.filter(obj => !uniq[obj] && (uniq[obj] = true));

            setComponentTitles(output);
            _SeachArr = output
        }
    }, [resultArray]);

    const handleItemPress = React.useCallback((item) => {

        props.navigation.navigate("CreateSubstationsGeoTag", {
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
                title="Substations Geotag"
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
}
export default memo(SubstationsList);
