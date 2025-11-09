import React, { memo, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Alert, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DtrGeoTaggedStyle } from "./DtrGeoTaggedStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../../assets/svg/IcnMap";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import InputFields from "../../../components/inputFields/InputFields";
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import { Service, } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import { Labels } from "../../../utils/Labels";
import { onLoading } from "../../../../App";
import { useRoute } from "@react-navigation/native";
import { boxTitles } from "../../../utils/AppUtil";
import { UserManager } from "../../../manager/UserManager";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import DTRCard from "../../../components/commonCards/DTRCard";

var _list = [];
const CreateDtrGeoTag = (props) => {
    const [cardData, setCardData] = useState([]);
    const [indexCode, setIndexCode] = useState("");
    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [isSubmittedItem, setSubmittedItem] = useState([]);

    // Route params
    const route = useRoute();
    const { parentData, selectedDistricts, feederList, geotagType, selectedOption, achievementButtonState, selectedDistrictsName, countlist, sessionType } = route.params;

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
    // Fetch data and set initial state
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch card data
    const fetchData = async () => {
        onLoading(true);
        try {
            const body = {
                form_id: "33",
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                district_id: selectedDistricts,
                major_component: parentData?.major_component_id,
                sub_component: parentData?.sub_component_id,
                items_specification: parentData?.item_specification_id,
                geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
                taging_for: selectedOption,
            };

            Service.post(EndPoints.getgeotagData, body, (response) => {
                onLoading(false);
                if (response.data) {
                    setIndexCode(response?.index_code);
                    setCardData(response?.data);
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

    // Handle view all cards
    const handleViewAll = () => {
        props.navigation.navigate("DtrViewMoreScreen", {
            selectedDistricts,
            selectedMajorComponent: parentData?.major_component_id,
            selectedSubComponent: parentData?.sub_component_id,
            sl_district_items_specification: [parentData?.item_specification_id],
            achievementButtonState,
            selectedOption,
            selectedItem: parentData?.major_components + " " + parentData?.sub_components,
            feederList,
            geotagType,
            sl_district_major_component: [parentData?.major_component_id],
            sl_district_sub_component: [parentData?.sub_component_id],
            pacageList: parentData?.package_data,

        });
    };

    // Handle click
    const handleClick = () => {
        if (indexCode == "") {
            Alert.alert("Alert", "indexCode code missing refresh it", [
                {
                    text: "OK",
                    onPress: () => {
                        fetchData();
                    },
                },
            ]);
            return;
        }
        props.navigation.navigate("GeneralAssetDetail", {
            selectedItem: parentData?.major_components + " " + parentData?.sub_components,
            feederList,
            indexCode,
            geotagType,
            selectedDistricts,
            sl_district_major_component: [parentData?.major_component_id],
            sl_district_sub_component: [parentData?.sub_component_id],
            sl_district_items_specification: [parentData?.item_specification_id],
            selectedOption,
            achievementButtonState,
            selectedDistrictsName,
            list: _list,
            cardData,
            sessionType,
            pacageList: parentData?.package_data
        });
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

    const onEdit = (item) => {
        props.navigation.navigate("EditGeneralAssetDetail", {
            selectedItem: parentData?.major_components + " " + parentData?.sub_components,
            feederList,
            indexCode,
            geotagType,
            selectedDistricts,
            sl_district_major_component: [parentData?.major_component_id],
            sl_district_sub_component: [parentData?.sub_component_id],
            sl_district_items_specification: [parentData?.item_specification_id],
            pacageList: parentData?.package_data,
            selectedOption,
            achievementButtonState,
            item,
            cardData,
        });
    }

    const onDelet = (id) => {
        onLoading(true);
        const data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: selectedDistricts,
            major_component_id: parentData?.major_component_id,
            sub_component_id: parentData?.sub_component_id,
            items_specification_id: parentData?.item_specification_id,
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
            taging_for: selectedOption,
            remove_id: id,
        };

        Service.post(EndPoints.deleteDtrGeoTagbyId, data, (res) => {
            if (res._resultflag) {
                // Alert.alert("Alert",res.message);
                fetchData();
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    }

    const handleDeletePress = (id) => {
        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => {
                    onDelet(id)

                }
            },
            {
                text: 'No', onPress: () => { }
            }
        ]);
    }

    const onTestCommonCardPress = (dt) => {

        let obj = {
            title: dt?.title,
            index_id: dt?.index_id,
            item_no: dt?.item_no,
            district_id: selectedDistricts,
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
            taging_for: selectedOption,
            major_component_id: parentData?.major_component_id,
            sub_component_id: parentData?.sub_component_id,
            items_specification_id: parentData?.item_specification_id,
            feederList: feederList
        };
        props.navigation.navigate("UserDTRDetailsScreen", { obj: obj, type: "DtrGeoTagged" });
    }

    const onSubmitAll = () => {

        const data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: selectedDistricts,
            major_component_id: parentData?.major_component_id,
            sub_component_id: parentData?.sub_component_id,
            items_specification_id: parentData?.item_specification_id,
            geotag_type: "Achievement",
            taging_for: "LossReduction",
        };

        onLoading(true);
        Service.post(EndPoints.submitAllDTR, data, (res) => {
          onLoading(false);
          if (res._resultflag) {

            Alert.alert('', "DTR Data Submitted successfully.", [
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
            // Loger.onLog("Error", err)
          }
        );

    }

    return (
        <SafeAreaView style={DtrGeoTaggedStyle.mainView}>
            <Header
                title="DTR Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}

                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("MapScreen",
                    {
                        type: "DTR",
                        district_id: selectedDistricts,
                        major_component_id: parentData?.major_component_id,
                        sub_component_id: parentData?.sub_component_id,
                        items_specification_id: parentData?.item_specification_id
                    })}
            />
            <ScrollView>
                <View style={DtrGeoTaggedStyle.container}>
                    <View style={DtrGeoTaggedStyle.title}>
                        <Text style={DtrGeoTaggedStyle.text}> {parentData?.major_components + " " + parentData?.sub_components}</Text>
                    </View>
                    <View style={DtrGeoTaggedStyle.modifySearch}>
                        <Text style={DtrGeoTaggedStyle.modifySearchText}>
                            {Labels.generalAssetDetails}
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>
                    <View style={DtrGeoTaggedStyle.innerContainer}>
                        <InputFields
                            title1={boxTitles.title1}
                            value1={parentData?.sanctioned || "0"}
                            title2={boxTitles.title2}
                            value2={parentData?.award_items || "0"}
                            title3={boxTitles.title3}
                            value3={parentData?.charged || "0"}
                            title4={boxTitles.title4}
                            value4={parentData?.surveyed_items || "0"}
                        />

                        <Text style={DtrGeoTaggedStyle.assetsText}>{cardData.length}{" "}{Labels.geoTagged}</Text>
                        <SubmitBtn title="Geotag" onPress={handleClick} />

                        <View style={DtrGeoTaggedStyle.cardsContainer}>
                            <View style={DtrGeoTaggedStyle.titles}>
                                <Text style={DtrGeoTaggedStyle.leftTitle}>
                                    {cardData.length > 0 && Labels.recentlyTagged}
                                </Text>

                                {cardData.length > 2 && (
                                    <TouchableOpacity onPress={handleViewAll}>
                                        <Text style={DtrGeoTaggedStyle.rightTitle}>
                                            {Labels.viewAll}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={DtrGeoTaggedStyle.commonCardView}>
                                {cardData.slice(0, 2).map((item, index) => (
                                    <DTRCard
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
                                        editIconPress={() => onEdit(item)}
                                        deletIconPress={(id) => handleDeletePress(id)}
                                        onCardPress={() => onTestCommonCardPress(item)}
                                    />
                                ))}
                            </View>

                            {cardData.length > 0 && <SubmitBtn title="Submit All" onPress={() => onSubmitAll()} />}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ImageViewer
                isVisible={visible}
                handleClose={() => setIsVisible(false)}
                images={images}
                index={imgIndex}
            />
        </SafeAreaView>
    );
};

export default memo(CreateDtrGeoTag);
