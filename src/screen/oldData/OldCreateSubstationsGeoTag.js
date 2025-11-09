// Other by Khasiya Sagar.
//import liraries
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, ScrollView } from "react-native-gesture-handler";

import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { AppUtil, boxTitles } from "../../utils/AppUtil";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { UserManager } from "../../manager/UserManager";
import { Fonts } from "../../utils/Fonts";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { Colors } from "../../utils/Colors";
import SubstationCommonCard from "../../components/oldDataComponents/SubstationCommonCard";

var _list = [];

// create a component
const OldCreateSubstationsGeoTag = (props) => {

    const route = useRoute();
    const { parentData, selectedOption, achievementButtonState, selectedItem, selectedDistricts, feederList, geotagType, sl_district_major_component, sl_district_sub_component, selectedDistrictsName, countlist } = route.params;

    const [cardData, setCardData] = useState([]);
    const [indexCode, setIndexCode] = useState("");
    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [substationData, setSubstationData] = useState(null);
    const [isSubmittedItem, setSubmittedItem] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    useEffect(() => {
        var arr = [];
        for (let i = 0; i < 999; i++) {
            if (i < 9)
                arr.push({ title: "00" + (i + 1) });
            else if (i < 99)
                arr.push({ title: "0" + (i + 1) });
            else
                arr.push({ title: "" + (i + 1) });
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

    // Fetch card data
    const fetchData = async () => {
        const body = {
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

        onLoading(true);
        Service.post(EndPoints.OLD_getSsGeoTagData, body, (response) => {
            if (response._resultflag) {
                setIndexCode(response.index_code);
                setCardData(response.data);
                setSubstationData(response.substations_data);
                setSubmittedItem(response?.submitted_item ? response?.submitted_item : []);
                onLoading(false);
            } else {
                Alert.alert("Alert", response.message);
                onLoading(false);
            }
        },
            (error) => {
                onLoading(false);
            }
        );
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

        var itemNomber = item?.item_no;
        var getSubmitedItemFormData = substationData[itemNomber];

        props.navigation.navigate("OldSubstationGoetagSubmiteScreen", {
            item,
            selectedDistricts,
            majorComponent: parentData?.major_component_id,
            subComponent: parentData?.sub_component_id,
            items_specification: parentData?.item_specification_id,
            list: _list,
            recentList: cardData,
            indexCode,
            selectedOption,
            achievementButtonState,
            selectedItem,
            feederList,
            sl_district_major_component,
            sl_district_sub_component,
            substationData: getSubmitedItemFormData ? getSubmitedItemFormData : null,
            pacageList: parentData?.package_data,
        });
    };

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

        Service.post(EndPoints.OlsdeleteSSGeoTagbyId, data, (res) => {
            if (res?._resultflag) {
                Alert.alert('Alert', res?.message, [
                    {
                        text: 'Ok', onPress: () => {
                            fetchData();
                        }
                    },
                    
                ]);


            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    };

    return (
        <SafeAreaView style={SubstationsGeoTaggedStyle.mainView}>
            <Header
                title="Old Substations Geotag List"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={null}
                onRightPress={() => null}
            />
            <ScrollView>
                <View style={SubstationsGeoTaggedStyle.container}>
                    <View style={SubstationsGeoTaggedStyle.title}>
                        <Text style={SubstationsGeoTaggedStyle.text1}>{parentData?.major_components + " " + parentData?.sub_components}</Text>
                    </View>

                    <View style={SubstationsGeoTaggedStyle.innerContainer}>
                        <View style={SubstationsGeoTaggedStyle.cardsContainer}>
                            <View style={SubstationsGeoTaggedStyle.commonCardView}>
                                {cardData.map((item, index) => (
                                    <SubstationCommonCard
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
                                        status={item?.status ? item?.status : ""}
                                        imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                                        editIconPress={() => onEdit(item)}
                                        deletIconPress={(id) => handleDeletePress(id)}
                                        onCardPress={() => null}
                                    />
                                ))}
                            </View>
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

// define your styles
const SubstationsGeoTaggedStyle = StyleSheet.create({
    mainView: { marginBottom: AppUtil.getHP(8), },
    container: { flex: 1, backgroundColor: Colors.primaryBackground, marginBottom: AppUtil.getHP(2), },
    text1: { color: Colors.secondary, fontSize: 16, fontWeight: 500, },


    title: {
        backgroundColor: Colors.white,
        padding: AppUtil.getHP(2),
    },
    innerContainer: {
        marginHorizontal: AppUtil.getWP(5),
        borderRadius: 10,
    },

    assetsText: {
        color: Colors.mediumGray,
        marginTop: AppUtil.getHP(1),
        fontSize: 14,
        textAlign: "center",
    },
    cardsContainer: {
        marginTop: AppUtil.getHP(2),
    },
    titles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: AppUtil.getHP(1),
    },
    leftTitle: {
        color: Colors.secondary,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    },
    rightTitle: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right",
    },
    suggestion: {
        marginHorizontal: AppUtil.getWP(10),
        marginTop: AppUtil.getHP(2),
    },
    suggestionText: {
        color: Colors.secondary,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        fontFamily: Fonts.RobotoBold,
    },
});

//make this component available to the app
export default memo(OldCreateSubstationsGeoTag);
