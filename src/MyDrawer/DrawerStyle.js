import { AppUtil } from "../utils/AppUtil";
import { Colors } from "../utils/Colors";
import { Fonts } from "../utils/Fonts";

const { StyleSheet } = require("react-native");

const DrawerStyles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileView: {
    height: AppUtil.getHP(14),
    backgroundColor: Colors.headerColor,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: AppUtil.getWP(5),
    // justifyContent:'center',
  },
  profileImage: {
    height: AppUtil.getHP(8),
    width: AppUtil.getHP(8),
    borderRadius: AppUtil.getHP(5),
    backgroundColor: Colors.white,
  },
  unText: {
    color: Colors.white,
    fontSize: AppUtil.getHP(1.8),
    marginLeft: AppUtil.getWP(2),
    fontFamily: Fonts.RobotoRegular,
  },
  unSubText: {
    color: Colors.skyBlue,
    fontSize: AppUtil.getHP(1.7),
    fontWeight: "bold",
    marginLeft: AppUtil.getWP(2),
    fontFamily: Fonts.RobotoRegular,
  },
  backBtn: {
    padding: 5,
    position: "absolute",
    right: 0,
    top: 5,
  },
  menuView: {
    flex: 1,
  },
  menuItem: {
    height: AppUtil.getHP(6),
    justifyContent: "center",
    marginHorizontal: AppUtil.getWP(5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
  },

  menuText: {
    color: Colors.darkBlack,
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoRegular,
  },
  menuText1: {
    color: Colors.orange,
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoMedium,
  },
  scrollView: {
    flex: 1,
  },
  footerView: {
    width: "100%",
    height: AppUtil.getHP(7),
    bottom: 0,
    position: "absolute",
    backgroundColor: Colors.footerColor,
  },
  footerBtn: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: Colors.darkGray,
  },
  footerText: {
    color: Colors.darkBlack,
    fontSize: AppUtil.getHP(1.8),
    fontFamily: Fonts.RobotoRegular,
  },
  footerText1: {
    color: Colors.orange,
    fontSize: AppUtil.getHP(1.8),
    fontFamily: Fonts.RobotoMedium,
  },
});
export default DrawerStyles;
