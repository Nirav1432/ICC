// Other by Khasiya Sagar.

//import liraries
import { FlashList } from '@shopify/flash-list';
import React, { Component, memo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/header/Header';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import IcnMap from "../../assets/svg/IcnMap";
import TestCommonCard from '../../components/commonCards/TestCommonCard';
import ImageViewer from '../../components/imageViewr/ImageViewer';
import { Service } from '../../service/Service';
import { EndPoints } from '../../service/Endpoints';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { UserManager } from '../../manager/UserManager';
import { Colors } from '../../utils/Colors';
import { AppUtil } from '../../utils/AppUtil';
import { onLoading } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const OtherViewMoreScreen = (props) => {
    const [isRecentGeotagList, setRecentGeotagList] = useState([]);

    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [indexCode, setIndexCode] = useState("");

    // Route params
    const route = useRoute();
    const { selectedDistricts, parentData } = route.params;

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
                } else showErrorToast(response?.message);
            },
                (err) => {
                    onLoading(false);
                }
            );
        } catch (error) {
            onLoading(false);
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


    const onEdit = (item) => {



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

    }

    const onTestCommonCardPress = (item) => {
        props.navigation.navigate("DdeOtherDetailsScreen", { obj: item, majorComponent: parentData?.major_component_id, subComponent: parentData?.sub_component_id, itemsSpecification: parentData?.item_specification_id, });
    }

    return (
        <SafeAreaView style={PageStyle.mainView}>
            <Header
                title="Other Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={<IcnMap />}

            />

            <FlashList
                data={isRecentGeotagList}
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

// define your styles
const PageStyle = StyleSheet.create({
    mainView: { flex: 1, },
    container: { color: Colors.primaryBackground, backgroundColor: Colors.primaryBackground, },
    innerContainer: { marginHorizontal: AppUtil.getWP(5), borderRadius: 10, },
});

//make this component available to the app
export default memo(OtherViewMoreScreen);
