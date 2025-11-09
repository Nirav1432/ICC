import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const BoxViewStyle = StyleSheet.create({ 
    boxView: {
        width: AppUtil.getWP(42),
        height: AppUtil.getHP(15),
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: AppUtil.getWP(2),
        marginVertical: AppUtil.getHP(1),
    },

    icon: {
        width: AppUtil.getWP(10),
        height: AppUtil.getHP(5),
        resizeMode: "contain",
        backgroundColor: Colors.primaryBackground,
    },
    text: {
        fontSize: AppUtil.getHP(1.7),
        color: Colors.darkBlack,
        marginTop: AppUtil.getHP(1),
        fontFamily: Fonts.RobotoMedium,
        width: AppUtil.getWP(30),
        textAlign: "center",
    },
 });
export default BoxViewStyle;