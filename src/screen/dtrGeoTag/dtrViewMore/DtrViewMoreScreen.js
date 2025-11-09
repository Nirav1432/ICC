import React, { memo, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageStyle } from "./DtrViewMoreScreenStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../../assets/svg/IcnMap";
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { onLoading } from "../../../../App";
import { useRoute } from "@react-navigation/native";
import { UserManager } from "../../../manager/UserManager";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { FlashList } from "@shopify/flash-list";
import DTRCard from "../../../components/commonCards/DTRCard";

const DtrViewMoreScreen = (props) => {
    const [cardData, setCardData] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [indexCode, setIndexCode] = useState("");

    // Route params
    const route = useRoute();
    const {
        selectedDistricts,
        selectedMajorComponent,
        selectedSubComponent,
        sl_district_items_specification,
        achievementButtonState,
        selectedOption,
        selectedItem,
        feederList,
        geotagType,
        sl_district_major_component,
        sl_district_sub_component,
        pacageList,
    } = route.params;

    useEffect(() => {
        fetchData();
    }, [route.params]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        onLoading(true);
        const body = {
            form_id: "33",
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            district_id: selectedDistricts,
            major_component: selectedMajorComponent,
            sub_component: selectedSubComponent,
            items_specification: sl_district_items_specification[0],
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
            taging_for: selectedOption,
        };

        Service.post(EndPoints.getgeotagData, body, (response) => {
            onLoading(false);

            if (response.data) {
                setIndexCode(response.index_code);
                setCardData(response.data);
            } else showErrorToast(response.message);
        },
            (err) => {
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
        props.navigation.navigate("EditGeneralAssetDetail", {
            selectedItem,
            feederList,
            indexCode,
            geotagType,
            selectedDistricts,
            sl_district_major_component,
            sl_district_sub_component,
            sl_district_items_specification,
            selectedOption,
            achievementButtonState,
            item, pacageList
        });


    }
    const handleDeletePress = (id) => {
        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => { onDelet(id) }
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
            major_component_id: selectedMajorComponent,
            sub_component_id: selectedSubComponent,
            items_specification_id: sl_district_items_specification[0],
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
            taging_for: selectedOption,
            remove_id: id,
        };

        Service.post(EndPoints.deleteDtrGeoTagbyId, data, (res) => {
            if (res._resultflag) {
                fetchData();
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    }

    const onTestCommonCardPress = (dt) => {

        let obj = {

            title: dt?.title,
            index_id: dt?.index_id,
            district_id: selectedDistricts,
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
            taging_for: selectedOption,
            major_component_id: selectedMajorComponent,
            sub_component_id: selectedSubComponent,
            items_specification_id: sl_district_items_specification[0],
            feederList: feederList,
            item_no: dt?.item_no
        };
        props.navigation.navigate("UserDTRDetailsScreen", { obj: obj, type: "DtrViewMoreScreen" });
    }

    return (
        <SafeAreaView style={PageStyle.mainView}>
            <Header
                title="DTR Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("MapScreen",
                    {
                        type: "DTR",
                        district_id: selectedDistricts,
                        major_component_id: selectedMajorComponent,
                        sub_component_id: selectedSubComponent,
                        items_specification_id: sl_district_items_specification[0]
                    })}
            />
            <FlashList
                data={cardData}
                renderItem={({ item, index }) =>
                    <View style={PageStyle.container}>
                        <View style={PageStyle.innerContainer}>
                            <DTRCard
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
                                imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                                status={item?.status}
                                editIconPress={() => onEdit(item)}
                                deletIconPress={(id) => handleDeletePress(id)}
                                onCardPress={() => onTestCommonCardPress(item)}
                            />
                        </View>
                    </View>
                }
            />
            <ImageViewer
                isVisible={visible}
                handleClose={() => setIsVisible(false)}
                images={images}
                index={imgIndex}
            />
        </SafeAreaView>
    );
};

export default memo(DtrViewMoreScreen);
