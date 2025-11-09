import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const CommonDropdownListStyle = StyleSheet.create({

  mainView: { flex: 1, },
  mainView1: { width: '48%' },

  headText: {
    fontSize: 12,
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium
  },

  dropBtn: {
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  btnView: {
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    width: "100%",
  },
  btnView1: {
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    width: "100%",
    justifyContent: "center",
  },

  dropdown3RowStyle: {
    height: AppUtil.getHP(6),
    paddingHorizontal: AppUtil.getWP(2)
  },

  dropdown3BtnChildStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  txtCaption: {
    width: "90%",
    fontSize: 14,
    fontFamily: Fonts.RobotoBlack,

  },
  dropdown3BtnTxt: {
    textAlign: 'center',
    fontSize: 16,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: AppUtil.getHP(1),
  },
  dropdown3RowTxt: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: Fonts.RobotoBlack,
  },


  dropdown3BtnChildStyle1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtCaption1: {
    width: "90%",
    fontSize: 14,
    fontFamily: Fonts.RobotoBlack,
    paddingHorizontal: 10
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown3RowTxt1: {
    fontSize: 12,
    fontFamily: Fonts.RobotoBlack,
  },
  placeholderStyle: {
    fontSize: 16,
  },

});
export default CommonDropdownListStyle;
