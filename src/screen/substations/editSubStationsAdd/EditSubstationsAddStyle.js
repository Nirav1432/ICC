import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";
import { Fonts } from "../../../utils/Fonts";

export const EditSubstationsAddStyle = StyleSheet.create({
  mainView: {
    marginBottom: AppUtil.getHP(8),
    backgroundColor: Colors.primaryBackground,
  },
  container: {
    flex: 1,
    marginBottom: AppUtil.getHP(1),
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

  subHeaderText: {
    fontSize: AppUtil.getHP(1.7),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoBold,
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
  },
  modifySearch1: {
    flexDirection: "row",
    padding: AppUtil.getHP(1.5),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBackground,
    borderBottomColor: Colors.black,
  },
  modifySearchText1: {
    color: Colors.secondary,
    fontWeight: "bold",
    width: "90%",

    fontSize: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    marginHorizontal: AppUtil.getWP(5),
  },
  marginBottom: {
    marginBottom: AppUtil.getHP(2),
  },
});
