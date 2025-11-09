// Other by Khasiya Sagar.
//import liraries
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { memo, useState } from "react";
import { useRoute } from "@react-navigation/native";

import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnEdit from "../../assets/svg/IcnEdit";
import { ScrollView } from "react-native-gesture-handler";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { Labels } from "../../utils/Labels";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields2 from "../../components/inputFields/InputFields2";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { UserManager } from "../../manager/UserManager";
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from "../../components/imageViewr/ImageViewer";
import DTRDetailePopup from "../Approval/DTRDetailePopup";
import PolDetailePopup from "../Approval/PolDetailePopup";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import FeederCard from "../../components/oldDataComponents/FeederCard";
import { FlashList } from "@shopify/flash-list";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { Fonts } from "../../utils/Fonts";
import { Loger } from "../../utils/Loger";

var _typeItemDetails = "";

// create a component
const OldCreateFeederGeotag = (props) => {
    const route = useRoute();
    const { feederData, selectedDistricts } = route.params;

    const [isFeederDetails, setFeederDetails] = React.useState(null);
    const [isDTRList, setDTRList] = React.useState([]);



    useFocusEffect(
        React.useCallback(() => {
            onFetchFeederDetailse();
        }, [])
    );

    const onFetchFeederDetailse = () => {
        onLoading(true);
        Service.post(EndPoints.OldgetFeederDetails, { feeder_id: feederData.id }, (response) => {

            if (response.resultflag == 1) {
                setFeederDetails(response?.data);
                onFetchFeederList(response?.data);
            } else {
                Loger.onLog("error", response)
                onLoading(false);
            }
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onFetchFeederList = (dt) => {
        onLoading(true);
        let data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": JSON.stringify(selectedDistricts.value),
            "geotag_type": "Achievement",
            "taging_for": "LossReduction",
            "fedeer_id": dt?.id,
            "fedeer_code": dt?.feeder_code
        }

        Service.post(EndPoints.OldgetFedderGeoTagList, data, (response) => {
            onLoading(false);
            if (response._resultflag == 1) {
                setDTRList(response?.data);
            } else { }
        },
            (err) => {
                onLoading(false);
            }
        );
    }


    const onEdit = (item) => {

        props.navigation.navigate("OldFeederAssetsScreen", {
            data: item,
            feederDetails: isFeederDetails,
            feederData: feederData,
            selectedDistricts: selectedDistricts,
            isDTRList: isDTRList,
        });

    }

    const onDelet = (delteItem) => {

        Alert.alert("Alert", "Are you sure you want to delete?",
            [
                {
                    text: 'Yes', onPress: () => {

                        var obj = {
                            "role_id": UserManager.role_id,
                            "user_id": UserManager.id,
                            "discom_id": UserManager.discom_id,
                            "district_id": JSON.stringify(selectedDistricts),
                            "geotag_type": "Achievement",
                            "taging_for": "LossReduction",
                            "fedeer_id": isFeederDetails?.id,
                            "fedeer_code": isFeederDetails?.feeder_code,
                            "remove_id": delteItem,
                        }

                        onLoading(true);

                        Service.post(EndPoints.OlddeletFedderGeotag, obj, (response) => {
                            onLoading(false);
                            if (response._resultflag) {
                                onFetchFeederDetailse();
                            }
                            else { }
                        },
                            (err) => {
                                onLoading(false);
                            }
                        );

                    }
                },
                { text: 'No', onPress: () => { } },
            ]);


    }

    return (
        <SafeAreaView style={styles.mainView}>
            <Header title="Old Feeder Geotag" leftIcon={<IcnBack />} onLeftPress={() => props.navigation.goBack()} />
            <View style={styles.container}>

                <View style={styles.title}>
                    <Text style={[styles.text, { color: "black" }]}>
                        {feederData.feeder_name}
                    </Text>
                </View>
                <View style={styles.modifySearch}>
                    <Text style={styles.modifySearchText}>
                        {Labels.generalAssetDetails}
                    </Text>
                    <TouchableOpacity>
                        <IcnGreyDown />
                    </TouchableOpacity>
                </View>

                <View style={styles.commonCardView}>
                    <FlashList
                        data={isDTRList}
                        estimatedItemSize={50}
                        renderItem={({ item, index }) =>
                            <FeederCard
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
                                othersAssetType={item.sub_asset_type}
                                status={item?.approval_status}
                                editIcon={<IcnEdit />}
                                editIconPress={() => onEdit(item)}
                                deletIconPress={(item) => onDelet(item)}
                            />
                        }
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, color: Colors.red, },
    mainView: { flex: 1, backgroundColor: Colors.primaryBackground, },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(1.5), },
    text: { color: Colors.secondary, fontSize: 14, fontFamily: Fonts.RobotoBold },
    innerContainer: { marginHorizontal: AppUtil.getWP(5), borderRadius: 10, },
    assetsText: { color: Colors.mediumGray, marginTop: AppUtil.getHP(1), fontSize: 14, textAlign: "center", },
    cardsContainer: { marginTop: AppUtil.getHP(2), },
    titles: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: AppUtil.getHP(1), },
    leftTitle: { color: Colors.secondary, fontSize: 20, fontWeight: "bold", textAlign: "left", },
    rightTitle: { color: Colors.primary, fontSize: 14, fontWeight: "bold", textAlign: "right", },
    commonCardView: { flex: 1, marginHorizontal: AppUtil.getWP(5), borderRadius: 10, },
    recentView: { paddingHorizontal: 25, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

//make this component available to the app
export default memo(OldCreateFeederGeotag);
