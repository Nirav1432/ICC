// Other by Khasiya Sagar.
import React, { memo, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../assets/svg/IcnMap";
import { Service, } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { Labels } from "../../utils/Labels";
import { onLoading } from "../../../App";
import { AppUtil, boxTitles } from "../../utils/AppUtil";
import { UserManager } from "../../manager/UserManager";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { Colors } from "../../utils/Colors";
import { FlashList } from "@shopify/flash-list";
import DtrCard from "../../components/oldDataComponents/DtrCard";

const OldCreateDtrGeoTag = (props) => {
    const [cardData, setCardData] = useState([]);
    const [indexCode, setIndexCode] = useState("");
    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [isSubmittedItem, setSubmittedItem] = useState([]);

    // Route params
    const route = useRoute();
    const { parentData, selectedDistricts, feederList, geotagType, selectedOption, achievementButtonState, countlist } = route.params;

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

    // Fetch card data
    const fetchData = async () => {
        onLoading(true);
        try {
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

            Service.post(EndPoints.OldgetgeotagData, body, (response) => {

                if (response.data) {
                    setIndexCode(response?.index_code);
                    setCardData(response?.data);
                    setSubmittedItem(response?.submitted_item);

                } else showErrorToast(response?.message);

                setTimeout(() => { onLoading(false); }, 1000);
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

    const onEdit = (item) => {
        props.navigation.navigate("OldDTRGeneralAssetDetailOne", {
            item,selectedDistricts,
            major_component: parentData?.major_component_id,
            sub_component: parentData?.sub_component_id,
            items_specification: parentData?.item_specification_id,
            selectedItem: parentData?.major_components + " " + parentData?.sub_components,
            feederList,
            indexCode,
            geotagType,
            pacageList: parentData?.package_data,
            selectedOption,
            achievementButtonState,
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

    return (
        <SafeAreaView style={styles.mainView}>
            <Header
                title="Old DTR Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
            />

            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.text}> {parentData?.major_components + " " + parentData?.sub_components}</Text>
                </View>
                <View style={styles.modifySearch}>
                    <Text style={styles.modifySearchText}>
                        {Labels.generalAssetDetails}
                    </Text>
                    <TouchableOpacity>
                        <IcnGreyDown />
                    </TouchableOpacity>
                </View>

                <View style={styles.innerContainer}>
                    <FlashList
                        data={cardData}
                        estimatedItemSize={50}
                        renderItem={({ item, index }) =>
                            <DtrCard
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
                                status={item?.status ? item?.status : ""}
                                editIconPress={() => onEdit(item)}
                                deletIconPress={(id) => handleDeletePress(id)}
                            />
                        }
                    />
                </View>
            </View>
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
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    container: {
        flex: 1,
        color: Colors.primaryBackground,
        backgroundColor: Colors.primaryBackground,
    },
    text: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: 500,
    },
    modifySearch: {
        flexDirection: "row",
        padding: AppUtil.getHP(1.5),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.disableViewColor,
    },
    modifySearchText: {
        color: "black",
        width: "90%",
        fontWeight: 500,
        fontSize: 16,
    },
    title: {
        backgroundColor: Colors.white,
        padding: AppUtil.getHP(2),
    },
    innerContainer: {
        flex: 1,
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
    commonCardView: {
        marginBottom: AppUtil.getHP(2),
    },
});

export default memo(OldCreateDtrGeoTag);
