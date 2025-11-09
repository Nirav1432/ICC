import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const { getHP, getWP } = AppUtil;

const CommonTabsStyle = StyleSheet.create({
  tabView: {
    backgroundColor: Colors.white,
    height: getHP(8),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.orange,
  },
  tabText: {
    color: Colors.lightGray,
    fontSize: getHP(2),
    fontFamily:Fonts.RobotoRegular,
    textAlign: "center",
  },
  selectedTabText: {
    color: Colors.white,
    fontSize: getHP(2),
    textAlign: "center",
    fontFamily:Fonts.RobotoBold,
  },
  tabBtn: {
    width: getWP(33.33),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderRightColor: Colors.lightGray,
  },
  selectedTabBtn: {
    width: getWP(33.33),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange,
  },
});
export default CommonTabsStyle;
