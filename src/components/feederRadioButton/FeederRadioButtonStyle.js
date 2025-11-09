import {StyleSheet} from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const FeederRadioButtonStyle = StyleSheet.create({
    headerText: {
        fontSize: AppUtil.getHP(1.75),
        color: Colors.darkBlack,
        marginBottom: AppUtil.getHP(0.7),
        fontFamily:Fonts.RobotoMedium,
        marginTop:AppUtil.getHP(2),

    },
    flexView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:AppUtil.getHP(0.5),
    },
    btnRadio: {
        width: "48%",
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.disableViewColor,
        borderRadius: 10,
        alignItems: "center",
        flexDirection:'row',
        paddingHorizontal:AppUtil.getWP(3),
    },
    selectedBtnRadio: {
        width: "48%",
        height: AppUtil.getHP(6.16),
        backgroundColor: Colors.headerColor,
        borderRadius: 10,
        alignItems: "center",
        flexDirection:'row',
        paddingHorizontal:AppUtil.getWP(3),
    },
    radioText:{
        fontSize:AppUtil.getHP(1.75),
        color:Colors.darkBlack,
        fontFamily:Fonts.RobotoRegular,
        marginLeft:AppUtil.getWP(2),
    },
    selectedRadioText:{
        fontSize:AppUtil.getHP(1.75),
        color:Colors.white,
        fontFamily:Fonts.RobotoMedium,
        marginLeft:AppUtil.getWP(2),
    },
})
export default FeederRadioButtonStyle;