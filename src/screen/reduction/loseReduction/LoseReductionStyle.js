import { StyleSheet } from "react-native";
import { AppUtil } from "../../../utils/AppUtil";
import { Colors } from "../../../utils/Colors";

const LoseReductionStyle = StyleSheet.create({
    firstView: {
        height: AppUtil.getHP(26.85),
        width: AppUtil.getWP(100),
        backgroundColor: Colors.secondaryBG10,
        paddingHorizontal: AppUtil.getWP(5.33),
        paddingVertical: AppUtil.getHP(2.5),
    },
    flexView: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    margin:{
        marginTop:AppUtil.getHP(2.5),
    },
    scrollStl:{
        height:AppUtil.getHP(73),
        backgroundColor:Colors.secondaryBG10,
    }
});
export default LoseReductionStyle;