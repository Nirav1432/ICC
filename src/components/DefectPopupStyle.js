import { StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";
import { AppUtil } from "../utils/AppUtil";
import { Fonts } from "../utils/Fonts";

export const DefectPopupStyle = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackground,
        borderRadius: 10,
        width: "90%",
        marginVertical: "20%",
        marginHorizontal: "5%",
        alignSelf: "center",
        borderWidth: 1,
        paddingBottom: 10,
    },
    header: {
        padding: 15,
        flexDirection: "row",
        backgroundColor: "#D7E1F1",
        borderTopLeftRadius: 10,
        borderTopStartRadius: 10,
    },
    headerLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    headerRight: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    title: {
        color: "#1B2F68",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdownview: { height: AppUtil.getHP(6.16), marginBottom: 10, marginHorizontal: AppUtil.getWP(5), },
    headText: {
        color: Colors.darkBlack,
        fontSize: 14,
        fontWeight: 500,
        marginVertical: 5,
    },

    view1: {
        marginTop: 20,
        marginHorizontal: AppUtil.getWP(5),
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    view2: {
        width: "45%",
    },
    view3: { backgroundColor: "#fff", height: 40, justifyContent: "center", alignItems: "flex-start", paddingHorizontal:10},
    view4: {
        marginHorizontal: AppUtil.getWP(5),
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    view5: {
        marginHorizontal: AppUtil.getWP(5),
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom:10
    },
    inputTxt: {
        color: "#323232",
        fontSize: 12,
    },
    view14: { height: 45, backgroundColor: Colors.orange, borderRadius: 50, justifyContent: "center", alignItems: "center", marginVertical: 10, marginHorizontal: AppUtil.getWP(5), },
    txt6: { color: "#ffffff", fontSize: 16, fontFamily: Fonts.RobotoMedium, },

});
