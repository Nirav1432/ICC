// Other by Khasiya Sagar.
//import liraries
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert, Image } from "react-native";
import { useNavigation, } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { SliderBox } from "react-native-image-slider-box";
import { SqlData } from "../../database/SqlData";
import React, { memo, useEffect, useState } from "react";
import { UserManager } from "../../manager/UserManager";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
const OffLineSaveOthersGeoTagList = (props) => {

    const navigation = useNavigation();
    const [isList, setList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            onRetrieveData();
        }, [])
    );

    function onRetrieveData() {

        SqlData.getdatax('SELECT * FROM SaveOthersGeotagTable;', (response) => {
            setList(AppUtil.getFunctionValueinArr(response))
        },
            (error) => {
                setList([]);

                Alert.alert("Alert", "No offline data is available", [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.goBack()
                        },
                    },
                ]);
            });
    }

    function onDeletIconPress(item) {
        Alert.alert('Alert', "Are you sure you want to delete? ", [
            {
                text: 'Yes', onPress: () => {
                    SqlData.DeleteData(item?.id, `DELETE FROM SaveOthersGeotagTable WHERE id = ?;`, (response) => {
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

    function onSavePress(item) {
        navigation.navigate("OffLineOthersGeotagSaveScreen", { item: item, });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onLeftPress={() => navigation.goBack()}
                title="Offline DTR Geotag List"
                leftIcon={<IcnBack />}
            />
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
                                {/* <View style={{ flexDirection: 'column' }}>
                                    <SliderBox
                                        images={item?.images}
                                        resizeMode={"cover"}
                                        sliderBoxHeight={80}
                                        sliderBoxWidth={80}
                                        dotColor={Colors.orange}
                                        inactiveDotColor="#90A4AE"
                                        resizeMethod={"resize"}
                                        parentWidth={80}
                                        ImageComponentStyle={styles.ImageComponentStyle}
                                        onCurrentImagePressed={(index) => { null }}
                                        dotStyle={styles.dotStyle}
                                    />
                                </View> */}

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
                                <TouchableOpacity style={styles.buttonView2} onPress={() => onSavePress(item)}>
                                    <Text style={styles.btnText}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    flatList: { backgroundColor: Colors.primaryBackground, },
    secondView: { flex: 1, backgroundColor: Colors.primaryBackground, },
    card: { width: "90%", alignSelf: "center", backgroundColor: Colors.white, borderRadius: 10, marginVertical: AppUtil.getHP(1), marginHorizontal: AppUtil.getWP(5), },
    cardTitles: { marginLeft: AppUtil.getWP(4), marginTop: AppUtil.getHP(1), },
    cardSr: { width: "70%", color: Colors.secondary, fontSize: 14, fontWeight: "500", marginBottom: AppUtil.getHP(1), },
    bottomBorder: { borderBottomColor: Colors.gray, borderBottomWidth: 1, },
    cardContainer: { flex: 1, flexDirection: "row", padding: AppUtil.getHP(2), },
    cardRight: { width: "70%", flexDirection: "column", },
    cardRightBottom: { marginLeft: AppUtil.getWP(2), flexDirection: "row", marginTop: 2, },
    rightAddress: { color: Colors.darkBlack, fontSize: 12 },
    taggedByName2: { width: "65%", color: Colors.secondary, fontSize: 14, fontWeight: "bold", },
    taggedByName: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
    cardRightBottom: { marginLeft: AppUtil.getWP(2), flexDirection: "row", marginTop: 2, },
    rightBottomText: { color: Colors.secondary, fontSize: 12, },
    longs: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", width: "50%", paddingRight: 20, },
    lats: { color: Colors.secondary, fontSize: 14, width: "50%", fontWeight: "bold", },
    long: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    lat: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    cardLatLong: { flexDirection: "row", marginTop: 2, marginLeft: AppUtil.getWP(2), },
    cardLatsLongs: { flexDirection: "row", marginLeft: AppUtil.getWP(2), },
    buttonView1: { width: "50%", height: 30, backgroundColor: '#ACCFFD', justifyContent: 'center', alignItems: 'center' },
    buttonView2: { width: "50%", height: 30, backgroundColor: '#F5C0BB', justifyContent: 'center', alignItems: 'center' },
    btnView: { flexDirection: 'row', },
    btnText: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
    ImageComponentStyle: { borderRadius: 10, width: 80, height: 60, alignSelf: "flex-start", },
    dotStyle: { width: 5, height: 5, borderRadius: 5, marginHorizontal: -10, backgroundColor: "rgba(128, 128, 128, 0.92)", top: 20 }
});

//make this component available to the app
export default memo(OffLineSaveOthersGeoTagList);
