import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const HalfDropDownStyle = StyleSheet.create({
  headerText: {
    fontSize: AppUtil.getHP(1.75),
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily:Fonts.RobotoMedium
  },

  btnDrop: {
    height: AppUtil.getHP(5),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  dropDown: {
    width: "100%",
    height: AppUtil.getHP(6),
    color: Colors.white,
    fontFamily: Fonts.RobotoMedium,
  },

  dropdown3RowStyle: {
    height: AppUtil.getHP(5),
    paddingHorizontal: AppUtil.getWP(2),
  },

  dropdown3BtnChildStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: AppUtil.getHP(1),
  },
  dropdown3RowTxt: {
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
  },
  txtCaption: {
    width:"90%",
    height:20,
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    alignSelf:'center',
  },
});
export default HalfDropDownStyle;
