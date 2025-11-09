import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";
import { Fonts } from "../../../utils/Fonts";

export const SubStationsDetailsStyle = StyleSheet.create({
  mainView: {
    marginBottom: AppUtil.getHP(8),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  modifySearch: {
    flexDirection: "row",
    padding: AppUtil.getHP(1.5),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.disableViewColor,
  },
  modifySearchText: {
    color: "black",
    width: "90%",
    fontWeight: 500,
    fontSize: 16,
  },
  title: {
    backgroundColor: Colors.white,
    marginLeft: AppUtil.getWP(4),
    // marginTop: AppUtil.getHP(2),
    paddingTop: AppUtil.getHP(1),
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
  },
  subHeader: {
    width: "100%",
    height: AppUtil.getHP(5),
    backgroundColor: Colors.white,
    justifyContent: "center",
    paddingHorizontal: AppUtil.getWP(4),
  },
  subHeader1: {
    width: "100%",
    height: AppUtil.getHP(6),
    backgroundColor: Colors.secondaryBG10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: AppUtil.getWP(4),
  },
  subHeaderText: {
    fontSize: AppUtil.getHP(1.7),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoBold,
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
    overflow: "hidden",
  },
  disabledField: {
    backgroundColor: Colors.tableRowColor2,
    borderRadius: 5,
    height: 40,
    color: Colors.darkBlack,
    width: "100%",
    paddingHorizontal: AppUtil.getWP(3),
  },
  fieldTitle: {
    fontSize: 12,
    color: Colors.darkBlack,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: AppUtil.getHP(1),
    marginTop: AppUtil.getHP(1),
  },
   asaText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: AppUtil.getHP(1.5),
    color: Colors.mediumGray,
    marginTop: 3,
  },
});
