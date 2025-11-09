import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import DeviceInfo from "react-native-device-info";
import { Fonts } from "../../utils/Fonts";

export const TableCardStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: AppUtil.getWP(5.33),
    // marginTop: AppUtil.getHP2),
    marginBottom: AppUtil.getHP(2),
    padding: AppUtil.getWP(4),
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: AppUtil.getWP(2),
  },
  evenRow: {
    backgroundColor: Colors.tableRowColor1,
  },
  oddRow: {
    backgroundColor: Colors.tableRowColor2,
  },
  leftText: {
    fontSize: DeviceInfo.isTablet() ? 18 : AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    width: AppUtil.getWP(30),
    marginHorizontal: AppUtil.getWP(2),
    fontFamily:Fonts.RobotoRegular,
  },
  centerText: {
    flex: 1,
    fontSize: DeviceInfo.isTablet() ? 18 : AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily:Fonts.RobotoRegular,
    marginHorizontal: AppUtil.getWP(3),
  },
  rightText: {
    fontSize: DeviceInfo.isTablet() ? 18 : AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    textAlign: "right",
    fontFamily:Fonts.RobotoRegular,
    marginHorizontal: AppUtil.getWP(4),
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: AppUtil.getHP(2),
    marginHorizontal: AppUtil.getWP(1),
  },
  leftIcon: {
    marginRight: AppUtil.getWP(1),
  },
  fileName: {
    flex: 1,
    fontSize: DeviceInfo.isTablet() ? 18 : 14,
    color: Colors.secondary,
    fontWeight: "500",
    marginLeft: AppUtil.getWP(1),
  },
  rightIcon: {
    marginLeft: AppUtil.getWP(1),
  },
  titleLeftText: {
    fontSize: DeviceInfo.isTablet() ? 18 : AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    width: AppUtil.getWP(30),
    fontFamily:Fonts.RobotoMedium,
  },
  titleCenterText: {
    flex: 1,
    fontSize: DeviceInfo.isTablet() ? 18 : AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily:Fonts.RobotoMedium,
    marginHorizontal: AppUtil.getWP(5),
  },
  titleRightText: {
    fontSize: DeviceInfo.isTablet() ? 18 : AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily:Fonts.RobotoMedium,
    marginHorizontal: AppUtil.getWP(2),
  },
  title: {
    marginHorizontal: AppUtil.getWP(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: AppUtil.getHP(1),
  },
});
