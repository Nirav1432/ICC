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
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { onLoading } from "../../../App";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
const OffLineFeederSaveGeoTagList = (props) => {

    const navigation = useNavigation();
    const [isList, setList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            onRetrieveData();
        }, [])
    );

    function onRetrieveData() {

        SqlData.getdatax('SELECT * FROM SaveFeederGeotagTable;', (response) => {
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
                    SqlData.DeleteData(item?.id, `DELETE FROM SaveFeederGeotagTable WHERE id = ?;`, (response) => {
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

    const onSavePress = (dt) => {
        onLoading(true);
        let data = {
            "form_id": 33,
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "district_id": dt?.selectedDistricts,
            "geotag_type": "Achievement",
            "taging_for": dt?.selectedOption,
            "fedeer_id": dt?.parentData?.id,
            "fedeer_code": dt?.parentData?.feeder_code
        }

        Service.post(EndPoints.getGeoTagList, data, (response) => {
            onLoading(false);
            if (response._resultflag == 1) {
                onSelectGeotag(response?.data, dt);
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }
    function onSelectGeotag(list, item) {

        props.navigation.navigate("OffLineAddFeederGeneralAssetDetailFirstOption", { data: item, });

        // var firstFeeder = false

        // list.forEach((myFunction) => {
        //   if (myFunction?.asset_type == "Feeder" || myFunction?.asset_type == "Substation")
        //     firstFeeder = true;
        // });


        // if (firstFeeder) {
        //   props.navigation.navigate("OffLineAddFeederGeneralAssetDetailSecondOption", {
        //     data:item,
        //   });
        // }
        // else {
        //   props.navigation.navigate("OffLineAddFeederGeneralAssetDetailFirstOption", {
        //     data:item,
        //   });
        // }   
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onLeftPress={() => navigation.goBack()}
                title="Offline Feeder Geotag List"
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
                                <Text style={styles.cardSr}>{item?.parentData?.feeder_name}</Text>
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

                                    {/* <View style={styles.cardRightBottom}>
                                        <Text style={styles.rightAddress}>itemSummary - </Text>
                                        <Text style={styles.taggedByName3} >{item?.parentData?.item_summary}</Text>
                                    </View> */}

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
    flatList: {
        backgroundColor: Colors.primaryBackground,
    },
    secondView: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },
    card: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginVertical: AppUtil.getHP(1),
        marginHorizontal: AppUtil.getWP(5),
    },
    cardTitles: {
        marginLeft: AppUtil.getWP(4),
        marginTop: AppUtil.getHP(1),
    },
    cardSr: {
        width: "70%",
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "500",
        marginBottom: AppUtil.getHP(1),
    },
    bottomBorder: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        padding: AppUtil.getHP(2),
    },
    cardRight: {
        width: "70%",
        flexDirection: "column",
    },
    cardRightBottom: {
        marginLeft: AppUtil.getWP(2),
        flexDirection: "row",
        marginTop: 2,
    },
    rightAddress: {
        color: Colors.darkBlack,
        fontSize: 12
    },
    taggedByName2: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "bold",
    },
    taggedByName3: {
        maxWidth: "70%",
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "bold",
    },
    taggedByName: {
        color: Colors.secondary,
        fontSize: 12,
        fontWeight: "bold",
    },

    rightBottomText: {
        color: Colors.secondary,
        fontSize: 12,
    },
    longs: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "bold",
        width: "50%",
        paddingRight: 20,
    },
    lats: {
        color: Colors.secondary,
        fontSize: 14,
        width: "50%",
        fontWeight: "bold",
    },
    long: {
        color: Colors.darkBlack,
        fontSize: 14,
        width: "50%",
    },
    lat: {
        color: Colors.darkBlack,
        fontSize: 14,
        width: "50%",
    },
    cardLatLong: {
        flexDirection: "row",
        marginTop: 2,
        marginLeft: AppUtil.getWP(2),
    },
    cardLatsLongs: {
        flexDirection: "row",
        marginLeft: AppUtil.getWP(2),
    },
    buttonView1: {
        width: "50%",
        height: 30,
        backgroundColor: '#ACCFFD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView2: {
        width: "50%",
        height: 30,
        backgroundColor: '#F5C0BB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnView: {
        flexDirection: 'row',
    },
    btnText: {
        color: Colors.secondary,
        fontSize: 12,
        fontWeight: "bold",
    },
    ImageComponentStyle: {
        borderRadius: 10,
        width: 80,
        height: 60,
        alignSelf: "flex-start",
    },
    dotStyle: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: -10,
        backgroundColor: "rgba(128, 128, 128, 0.92)",
        top: 20
    }
});

//make this component available to the app
export default memo(OffLineFeederSaveGeoTagList);
