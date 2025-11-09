//import liraries
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { onLoading } from "../../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { SqlData } from "../../database/SqlData";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
const OffLineFeederList = (props) => {

    const navigation = useNavigation();
    const route = useRoute();

    const { selectedDistricts, selectedDistrictsName, geotagModule, geotagType, sessionType, tableName, } = route.params;

    const [resultArray, setResultArray] = useState([]);

    useEffect(() => {

        SqlData.getdatax("SELECT * FROM " + tableName + ";", (response) => {
            onLoading(false);
            let res = JSON.parse(response.rows.item(0).list);
            setResultArray(res);
        }, (error) => {
            onLoading(false);
            Alert.alert("Alert", "no data available", [
                {
                    text: "ok",
                    onPress: () => { }
                },
            ]);
        }
        );

    }, []);

    const handleItemPress = (item) => {
        props.navigation.navigate("OffLineCreateFeederGeoTag", {
            parentData: item,
            selectedDistricts,
            selectedDistrictsName,
            geotagType,
            geotagModule,
            sessionType
        });
    }
    return (
        <SafeAreaView style={styles.container}>

            <Header
                onLeftPress={() => props.navigation.goBack()}
                title="Feeder Geotag"
                leftIcon={<IcnBack />}
            />

            <View style={styles.secondView}>
                <FlatList
                    removeClippedSubviews={true}
                    windowSize={5}
                    initialNumToRender={10}
                    style={styles.flatList}
                    scrollEnabled
                    data={resultArray}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { handleItemPress(item); }} style={styles.cell} >
                            <Text numberOfLines={2} style={styles.cellText}>{item?.feeder_code + " - " + item?.feeder_name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },
    firstView: {
        width: "100%",
        paddingHorizontal: AppUtil.getWP(4),
        paddingVertical: AppUtil.getHP(2),
        backgroundColor: Colors.secondaryBG10,
    },
    flexView: {
        flexDirection: "row",
        alignItems: "center",
    },
    secondView: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },

    flatList: {
        width: "100%",
        paddingHorizontal: AppUtil.getWP(4),
        paddingVertical: AppUtil.getHP(2),
        backgroundColor: Colors.primaryBackground,
        flexWrap: "wrap",
    },
    cell: {
        width: AppUtil.getWP(92),
        height: AppUtil.getHP(8),
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingHorizontal: AppUtil.getWP(4),
        marginBottom: AppUtil.getHP(1.1),
        justifyContent: 'center'
    },
    cellText: {
        fontSize: AppUtil.getHP(1.8),
        color: Colors.darkBlack,
        fontFamily: Fonts.RobotoMedium,

    },
    mainView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: AppUtil.getHP(2),
        width: "100%",
    },
    btnDrop: {
        width: "85%",
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.white,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: AppUtil.getWP(3),
        color: Colors.darkBlack,
    },
    btnSearch: {
        width: AppUtil.getHP(6.16),
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.orange,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

//make this component available to the app
export default memo(OffLineFeederList);
