// Other by Khasiya Sagar.

import { View, Text, FlatList, TouchableOpacity, TextInput, } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import Header from "../../components/header/Header";
import PageStyle from "../other/OtherStyle";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import { Labels } from "../../utils/Labels";
import { UserManager } from "../../manager/UserManager";
import IcnSearch from "../../assets/svg/IcnSearch";
import { SqlData } from "../../database/SqlData";
import { SafeAreaView } from "react-native-safe-area-context";

const OtherListScreen = (props) => {
    const route = useRoute();
    const { selectedDistricts, sessionType, tableName } = route.params;

    const navigation = useNavigation();
    const [isSearchItem, setSearchItem] = useState("");
    const [isFeederList, setFeederList] = useState([]);
    const [isMajorComponent, setMajorComponent] = useState("");

    useEffect(() => {
        SqlData.createTablex(tableName);
        onFetchOtherComponentList("", "");
    }, []);


    const onSelectMajorComponent = (value) => {
        setMajorComponent(value)
        onFetchOtherComponentList(isSearchItem, value);
    }

    const onSearchTextUpdate = (text) => {
        setSearchItem(text);

        if (text == "") {
            onFetchOtherComponentList("", isMajorComponent);
        }
    }
    const onSearchClick = () => {
        onFetchOtherComponentList(isSearchItem, isMajorComponent);
    }

    const onFetchOtherComponentList = (searchValue, MajorComponentsID) => {
        onLoading(true);

        const data = {
            "district_id": JSON.stringify(selectedDistricts?.value),
            "discom_id": UserManager.discom_id,
            "major_component_id": MajorComponentsID.id ? MajorComponentsID.id : "",
            "sub_component_id": "",
            "search_name": searchValue,
        };

        Service.post(EndPoints.oterFeederList, data, (response) => {
            onLoading(false);
            if (response.data) {
                setFeederList(response?.data);
                if ((response.data).length > 0) {
                    setTimeout(() => {
                        SqlData.setDatax(tableName, false, (response.data), (response) => {
                        }, (error) => {
                        });
                    }, 100)
                }

            } else {
            }
        },
            (err) => {
                onLoading(false);
            }
        );
    }


    const onClickNavigate = (item) => {
        navigation.navigate("OtherCreateGeotagScreen", {
            selectedDistricts: selectedDistricts,
            parentData: item,
            countlist: item?.sanctioned,
            sessionType,
        })
    }

    return (
        <SafeAreaView style={PageStyle.mainView}>
            <Header
                title="Other Assets Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
            />

            <View style={PageStyle.container}>
                <View style={PageStyle.headerView}>
                    <Text style={PageStyle.headerText}>Loss Reduction</Text>
                </View>

                <View style={PageStyle.firstView}>
                    <View style={PageStyle.flexView}>

                        <SingleDropdownList title={Labels.MajorComponents} data={UserManager.majorComonentOthers} onSelectedSevice={(value) => { onSelectMajorComponent(value) }} />

                    </View>
                    <View style={PageStyle.searchView}>
                        <TextInput
                            maxLength={70}
                            placeholder="Enter your keyword here"
                            placeholderTextColor={"black"}
                            style={PageStyle.btnDrop}
                            value={isSearchItem}
                            onChangeText={(text) => { onSearchTextUpdate(text) }}
                        />
                        <TouchableOpacity onPress={() => { onSearchClick() }} style={PageStyle.btnSearch}>
                            <IcnSearch />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    removeClippedSubviews={true}
                    windowSize={5}
                    initialNumToRender={10}
                    style={PageStyle.flatList}
                    scrollEnabled
                    data={isFeederList}
                    renderItem={({ item }) => (

                        <TouchableOpacity onPress={() => onClickNavigate(item)} style={PageStyle.cell}>
                            <Text style={PageStyle.cellText}>
                                {item?.display_name + " " + item?.item_summary}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default React.memo(OtherListScreen);
