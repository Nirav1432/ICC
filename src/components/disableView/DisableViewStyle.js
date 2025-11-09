import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const DisableViewStyle = StyleSheet.create({ 
    headerText: {
        fontSize: 12,
        color: Colors.darkBlack,
        marginBottom: AppUtil.getHP(0.7),
        fontFamily:Fonts.RobotoMedium

    },
    btnDrop: {
        width: '100%',
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.disableViewColor,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection:'row',
        paddingHorizontal:AppUtil.getWP(3),
    },

 });
export default DisableViewStyle;