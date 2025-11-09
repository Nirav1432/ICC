import React, { memo, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert, ScrollView, Image } from "react-native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import InputFields from "../../components/inputFields/InputFields";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { Labels } from "../../utils/Labels";
import { useRoute } from "@react-navigation/native";
import { AppUtil, boxTitles } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { SqlData } from "../../database/SqlData";
import { UserManager } from "../../manager/UserManager";
import { SafeAreaView } from "react-native-safe-area-context";

const OffLineCreateDtrGeoTag = (props) => {

    // Route params
    const route = useRoute();
    const { parentData, selectedDistricts, geotagModule, geotagType, selectedDistrictsName, sessionType } = route.params;

    const [isList, setList] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            onRetrieveData();
        }, [])
    );

    function onRetrieveData() {

        SqlData.getdatax('SELECT * FROM SaveSubstationGeotagTable', (response) => {
            const data = AppUtil.getFunctionValueinArr(response)
            const filteredData = data.filter(item => item.itemSummary === parentData?.item_summary);
            setList(filteredData)
        },
            (error) => {
                setList([]);
            });
    }

    function onDeletIconPress(item) {
        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => {
                    SqlData.DeleteData(item?.id, `DELETE FROM SaveSubstationGeotagTable WHERE id = ?;`, (response) => {
                        onRetrieveData();
                    }, (error) => {
                        Alert.alert("Alert", "something wrong try again later")
                    });

                }
            },
            {
                text: 'No', onPress: () => { }
            }
        ]);


    }

    // Handle click
    const handleClick = () => {
        props.navigation.navigate("OffLineSubstationGeneralAssetDetail",
            {
                parentData, selectedDistricts, geotagModule, geotagType,
                selectedDistrictsName, sessionType
            });
    };

    return (
        <SafeAreaView style={styles.mainView}>
            <Header
                title="Substations Geotag"
                leftIcon={<IcnBack />}
                onLeftPress={() => props.navigation.goBack()}
                rightIcon={null}
                onRightPress={() => { }}
            />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.text}>{parentData?.major_components + " " + parentData?.sub_components}</Text>
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
                        <InputFields
                            title1={boxTitles.title1}
                            value1={parentData?.sanctioned || "0"}
                            title2={boxTitles.title2}
                            value2={parentData?.award_items || "0"}
                            title3={boxTitles.title3}
                            value3={parentData?.charged || "0"}
                            title4={boxTitles.title4}
                            value4={parentData?.achievment || "0"}
                        />

                        <SubmitBtn title="Geotag" onPress={handleClick} />
                    </View>

                    <View style={styles.secondView}>
                        <FlatList
                            removeClippedSubviews={true}
                            windowSize={5}
                            initialNumToRender={10}
                            style={styles.flatList}
                            scrollEnabled
                            data={isList}
                            renderItem={({ item }) => (

                                <View style={styles.card} >

                                    <View style={styles.cardTitles}>
                                        <Text style={styles.cardSr}>{item?.parentData?.major_components + " " + item?.parentData?.sub_components}</Text>
                                    </View>
                                    <View style={styles.bottomBorder} />

                                    <View style={styles.cardContainer}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Image source={{ uri: item?.images[0]?.uri }} style={{ width: 80, height: 80, borderRadius: 10, }} resizeMode="cover" />
                                        </View>

                                        <View style={styles.cardRight}>

                                            <View style={styles.cardRightBottom}>
                                                <Text style={styles.rightAddress}>Type - </Text>
                                                <Text style={styles.taggedByName2} >{item?.sessionType}</Text>
                                            </View>

                                            <View style={styles.cardRightBottom}>
                                                <Text style={styles.rightAddress}>District Name - </Text>
                                                <Text style={styles.taggedByName2} >{item?.selectedDistrictsName}</Text>
                                            </View>

                                            <View style={styles.cardRightBottom}>
                                                <Text style={styles.rightAddress}>itemSummary - </Text>
                                                <Text style={styles.taggedByName2} >{item?.parentData?.item_summary}</Text>
                                            </View>

                                            <View style={styles.cardLatLong}>
                                                <Text style={styles.long}>Latitude</Text>
                                                <Text style={styles.lat}>Longitude</Text>
                                            </View>
                                            <View style={styles.cardLatsLongs}>
                                                <Text style={styles.longs}>{item?.latitude}</Text>
                                                <Text style={styles.lats}>{item?.longitude}</Text>
                                            </View>

                                            <View style={styles.cardRightBottom}>
                                                <Text style={styles.rightBottomText}>Tagged By -</Text>
                                                <Text style={styles.taggedByName}>{UserManager.first_name + " " + UserManager.last_name}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.btnView}>
                                        <TouchableOpacity style={styles.buttonView1} onPress={() => onDeletIconPress(item)}>
                                            <Text style={styles.btnText}>DELETE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainView: { marginBottom: AppUtil.getHP(8), },
    container: { flex: 1, color: Colors.primaryBackground, backgroundColor: Colors.primaryBackground, },
    text: { color: Colors.secondary, fontSize: 14, fontWeight: "500", },
    modifySearch: { flexDirection: "row", padding: AppUtil.getHP(1.5), justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.disableViewColor, },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(2), },
    innerContainer: { marginHorizontal: AppUtil.getWP(5), borderRadius: 10, },
    assetsText: { color: Colors.mediumGray, marginTop: AppUtil.getHP(1), fontSize: 14, textAlign: "center", },
    cardsContainer: { marginTop: AppUtil.getHP(2), },
    titles: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: AppUtil.getHP(1), },
    leftTitle: { color: Colors.secondary, fontSize: 20, fontWeight: "bold", textAlign: "left", },
    rightTitle: { color: Colors.primary, fontSize: 14, fontWeight: "bold", textAlign: "right", },
    commonCardView: { marginBottom: AppUtil.getHP(2), },
    flatList: { backgroundColor: Colors.primaryBackground, },
    secondView: { flex: 1, backgroundColor: Colors.primaryBackground, },
    card: { width: "90%", alignSelf: "center", backgroundColor: Colors.white, borderRadius: 10, marginVertical: AppUtil.getHP(1), marginHorizontal: AppUtil.getWP(5), },
    cardTitles: { marginLeft: AppUtil.getWP(4), marginTop: AppUtil.getHP(1), },
    cardSr: { width: "70%", color: Colors.secondary, fontSize: 14, fontWeight: "500", marginBottom: AppUtil.getHP(1), },
    bottomBorder: { borderBottomColor: Colors.gray, borderBottomWidth: 1, },
    cardContainer: { flex: 1, flexDirection: "row", padding: AppUtil.getHP(2), },
    cardRight: { width: "70%", flexDirection: "column", },
    rightAddress: { color: Colors.darkBlack, fontSize: 12 },
    taggedByName2: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", },
    taggedByName: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
    cardRightBottom: { marginLeft: AppUtil.getWP(2), flexDirection: "row", marginTop: 2, },
    rightBottomText: { color: Colors.secondary, fontSize: 12, },
    longs: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", width: "50%", paddingRight: 20, },
    lats: { color: Colors.secondary, fontSize: 14, width: "50%", fontWeight: "bold", },
    long: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    lat: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    cardLatLong: { flexDirection: "row", marginTop: 2, marginLeft: AppUtil.getWP(2), },
    cardLatsLongs: { flexDirection: "row", marginLeft: AppUtil.getWP(2), },
    buttonView1: { width: "100%", height: 30, backgroundColor: '#ACCFFD', justifyContent: 'center', alignItems: 'center' },
    btnView: { flexDirection: 'row', },
    btnText: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
    ImageComponentStyle: { borderRadius: 10, width: 80, height: 60, alignSelf: "flex-start", },
    dotStyle: { width: 5, height: 5, borderRadius: 5, marginHorizontal: -10, backgroundColor: "rgba(128, 128, 128, 0.92)", top: 20 }
});

export default memo(OffLineCreateDtrGeoTag);
