// Other by Khasiya Sagar.

import React, { memo, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageStyle } from "./FeederViewMoreScreenStyle";
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
import DTRDetailePopup from "../../Approval/DTRDetailePopup";
import PolDetailePopup from "../../Approval/PolDetailePopup";
import { FlashList } from "@shopify/flash-list";

var _typeItemDetails = "";

const FeederViewMoreAssetScreen = (props) => {
    const [cardData, setCardData] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [indexCode, setIndexCode] = useState("");
    const [isStatus, setStatus] = React.useState('');

    const [isDTRpopupVisible, setDTRpopupVisible] = useState(false);
    const [isPolPopupVisible, setPolPopupVisible] = useState(false);

    // Route params
    const route = useRoute();
    const { selectedDistricts, achievementButtonState, selectedOption, feeder_id, feeder_code, feederDetails, feederData, selectedDistrictsName } = route.params;

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        onLoading(true);
        let data = {
            "form_id": 33,
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,

            "district_id": JSON.stringify(selectedDistricts),
            "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
            "taging_for": selectedOption,
            "fedeer_id": feeder_id,
            "fedeer_code": feeder_code
        }

        Service.post(EndPoints.getFedderGeoTagList, data, (response) => {
            onLoading(false);
            if (response._resultflag == 1) {
                setCardData(response?.data);
                setStatus(response?.status);
            } else showErrorToast(res.message);
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

    const onTestCommonCardPress = (dt) => {

        let obj = {
            title: dt?.title,
            index_id: dt?.index_id,
            tag_by: dt?.tag_by,
            item:dt,
      
            taging_for: selectedOption,
            fedeer_id: feederDetails?.id,
            fedeer_code: feederDetails?.feeder_code,
            district_id: selectedDistricts,
            geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
          };
          props.navigation.navigate("FeederDdeDetailsDetailsScreen", { obj });
    }

    const onTypeTextClick = (obj) => {

        _typeItemDetails = obj;

        if (obj.asset_type == "DTR") {
            setDTRpopupVisible(true);
        }
        else if (obj.asset_type == "Pole") {
            setPolPopupVisible(true);
        }
    }

    return (
        <SafeAreaView style={PageStyle.mainView}>
            <Header
                title="Feeder Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}
                onRightPress={() => props.navigation.navigate("MapScreen", { type: "Feeder", district_id: selectedDistricts, feeder_id: feeder_id })}
            />
             <FlashList
                data={cardData}
                renderItem={({ item, index }) =>
                    <View style={PageStyle.container}>
                        <View style={PageStyle.innerContainer}>
                            <TestCommonCard
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
                                type={item?.asset_type}
                                othersAssetType={item.sub_asset_type}
                                imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                                typeClick={() => onTypeTextClick(item)}
                                onCardPress={() => onTestCommonCardPress(item)}
                            />
                        </View>
                    </View>
                }
            />
            <ImageViewer isVisible={visible} handleClose={() => setIsVisible(false)} images={images} index={imgIndex} />
            <DTRDetailePopup data={_typeItemDetails} isVisible={isDTRpopupVisible} handleClose={() => setDTRpopupVisible(false)} />
            <PolDetailePopup data={_typeItemDetails} isVisible={isPolPopupVisible} handleClose={() => setPolPopupVisible(false)} />
        </SafeAreaView>
    );
};

export default memo(FeederViewMoreAssetScreen);
