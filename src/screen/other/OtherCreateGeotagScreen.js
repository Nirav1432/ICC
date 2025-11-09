// Other by Khasiya Sagar.
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import PageStyle from "./OtherStyle";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../assets/svg/IcnMap";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { Labels } from "../../utils/Labels";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import InputFields from "../../components/inputFields/InputFields";
import { boxTitles } from "../../utils/AppUtil";
import { UserManager } from "../../manager/UserManager";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import TestCommonCard from "../../components/commonCards/TestCommonCard";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { Loger } from "../../utils/Loger";

var _list = [];

var _request = true;

function OtherCreateGeotagScreen(props) {

    const route = useRoute();
    const { selectedDistricts, parentData, countlist, sessionType } = route.params;

    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    const [isSubmittedItem, setSubmittedItem] = useState([]);
    const [isRecentGeotagList, setRecentGeotagList] = useState([]);
    const [indexCode, setIndexCode] = useState("");

    useEffect(() => {
        var arr = [];
        for (let i = 0; i < countlist; i++) {
            if (i < 9)
                arr.push({ title: "00" + (i + 1) });
            else
                arr.push({ title: "0" + (i + 1) });
        }
        _list = findCommonValues(arr, isSubmittedItem);

    }, [countlist, isSubmittedItem]);

    const findCommonValues = (arr1, arr2) => {
        let commonValues = [];

        if (arr1 && arr2 && arr1.length > 0 && arr2.length > 0) {

            arr1.forEach((value) => {
                if (arr2.includes(value?.title)) {
                }
                else {
                    commonValues.push(value);
                }
            });
        }
        else {
            commonValues = arr1;
        }

        return commonValues;
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        onLoading(true);
        try {
            const body = {
                discom_id: UserManager.discom_id,
                district_id: selectedDistricts?.value,
                major_component_id: parentData?.major_component_id,
                sub_component_id: parentData?.sub_component_id,
                items_specification_id: parentData?.item_specification_id,
            };

            Service.post(EndPoints.recentOtherGeotagList, body, (response) => {
                onLoading(false);
                if (response.data) {
                    setIndexCode(response?.index_code);
                    setRecentGeotagList(response?.data);
                    setSubmittedItem(response?.submitted_item);
                } else showErrorToast(response?.message);
            },
                (err) => {
                    onLoading(false);
                }
            );
        } catch (error) {
        } finally {
            onLoading(false);
        }
    };

    const handlePressImage = (index, image) => {
        var img = [];
        image.forEach((element) => {
            const obj = { uri: element };
            img.push(obj);
        });
        setImages(img);
        setImgIndex(index);
        setIsVisible(true);
    };

    const onRetiveViewAll = () => {
        props.navigation.navigate("OtherViewMoreScreen", {
            selectedDistricts, parentData,
            selectedItem: parentData?.major_components + " " + parentData?.sub_components,
        });
    }

    const onRecentGeotagPress = (item) => {

        props.navigation.navigate("DdeOtherDetailsScreen", { obj: item, majorComponent: parentData?.major_component_id, subComponent: parentData?.sub_component_id, itemsSpecification: parentData?.item_specification_id, });
    }

    const onDeletePress = (id) => {

        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => {

                    onLoading(true);
                    try {
                        const body = {
                            "role_id": UserManager.role_id,
                            "user_id": UserManager.id,
                            "discom_id": UserManager.discom_id,
                            "district_id": selectedDistricts?.value,
                            "major_component_id": parentData?.major_component_id,
                            "sub_component_id": parentData?.sub_component_id,
                            "items_specification_id": parentData?.item_specification_id,
                            "geotag_type": "Achievement",
                            "taging_for": "LossReduction",
                            "remove_id": id,
                        };

                        Service.post(EndPoints.deleteOtherGeotagbyid, body, (response) => {
                            fetchData();
                        },
                            (err) => {
                                onLoading(false);
                            }
                        );
                    } catch (error) {
                    } finally {
                        onLoading(false);
                    }

                }
            },
            {
                text: 'No', onPress: () => { }
            }
        ]);



    }

    const onEditPress = (item) => {
        props.navigation.navigate("EditOtherGeotagScreen", { oldItem: item, selectedDistricts, parentData, indexCode, othersList: isRecentGeotagList, list: _list, sessionType })
    }

    const onSubmitAll = () => {

        const data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: selectedDistricts?.value,
            major_component_id: parentData?.major_component_id,
            sub_component_id: parentData?.sub_component_id,
            items_specification_id: parentData?.item_specification_id,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
        };

        if (_request)
            _request = false;
        else
            return;

        onLoading(true);
        Service.post(EndPoints.submitAllOthers, data, (res) => {
            onLoading(false);
            _request = true;

            if (res._resultflag) {
                Alert.alert('', "Others Data Submitted successfully.", [
                    {
                        text: 'OK', onPress: () => {
                            fetchData();
                        }
                    },
                ]);
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
                Loger.onLog("Error", err)
            }
        );

    }

    return (
        <SafeAreaView style={PageStyle.mainView1}>
            <Header
                title={Labels.OtherAssetsGeotag}
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("MapScreen",
                    {
                        type: "Others",
                        district_id: selectedDistricts,
                        major_component_id: parentData?.major_component_id,
                        sub_component_id: parentData?.sub_component_id,
                        items_specification_id: parentData?.item_specification_id
                    })}
            />

            <ScrollView>

                <View style={PageStyle.container1}>
                    <View style={PageStyle.title}>
                        <Text style={PageStyle.text}> {parentData?.major_components + " " + parentData?.sub_components}</Text>
                    </View>

                    <View style={PageStyle.modifySearch}>
                        <Text style={PageStyle.modifySearchText}>
                            {Labels.generalAssetDetails}
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>
                    <View style={PageStyle.innerContainer}>
                        <InputFields
                            title1={boxTitles.title1}
                            value1={parentData?.santion_items || "0"}
                            title2={boxTitles.title2}
                            value2={parentData?.award_items || "0"}
                            title3={boxTitles.title3}
                            value3={parentData?.surveyed_items || "0"}
                            title4={boxTitles.title4}
                            value4={parentData?.achievment || "0"}
                        />

                        <Text style={PageStyle.assetsText}>{isRecentGeotagList.length}{" "}{Labels.geoTagged}</Text>
                        <SubmitBtn title="Geotag" onPress={() => {
                            props.navigation.navigate("OtherGeotagScreen",
                                {
                                    selectedDistricts, parentData, indexCode,
                                    othersList: isRecentGeotagList, list: _list, sessionType
                                })
                        }} />

                        <View style={PageStyle.cardsContainer}>
                            <View style={PageStyle.titles}>
                                <Text style={PageStyle.leftTitle}>
                                    {isRecentGeotagList.length > 0 && Labels.recentlyTagged}
                                </Text>

                                {isRecentGeotagList.length > 2 && (
                                    <TouchableOpacity onPress={() => onRetiveViewAll()}>
                                        <Text style={PageStyle.rightTitle}>
                                            {Labels.viewAll}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={PageStyle.commonCardView}>
                                {isRecentGeotagList.slice(0, 2).map((item, index) => (
                                    <TestCommonCard
                                        key={index}
                                        title={item.title}
                                        index_id={item.index_id}
                                        created_by_date={item.created_at ? item.created_at : item.updated_at}
                                        created_by_time={item.created_at ? item.created_at : item.updated_at}
                                        address={item.block + " " + item.address}
                                        latitude={item.latitude}
                                        longitude={item.longitude}
                                        tag_by={item.tag_by}
                                        images={item.images}
                                        imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                                        // status={""}
                                        status={item?.status ? item?.status : ""}
                                        editIconPress={() => onEditPress(item)}
                                        deletIconPress={(id) => onDeletePress(id)}
                                        onCardPress={() => onRecentGeotagPress(item)}
                                    />
                                ))}
                            </View>

                            {isRecentGeotagList.length > 0 && <SubmitBtn title="Submit All" onPress={() => onSubmitAll()} />}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ImageViewer
                isVisible={visible}
                handleClose={() => setIsVisible(false)}
                images={isImages}
                index={imgIndex}
            />
        </SafeAreaView>
    );
}
export default React.memo(OtherCreateGeotagScreen);