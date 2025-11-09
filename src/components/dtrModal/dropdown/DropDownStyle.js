import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { Fonts } from "../../../utils/Fonts";
import { AppUtil } from "../../../utils/AppUtil";

export const DropDownStyle = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: AppUtil.getHP(1),
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
  },
  headerText: {
    fontSize: AppUtil.getHP(2),
    marginTop: AppUtil.getHP(2),
    marginBottom: 5,
  },
  dropDownTitle: {
    fontSize: AppUtil.getHP(2),
    color: Colors.darkBlack,
    fontWeight: "500",
    alignSelf: "flex-start", // Align the title to the left
    // marginLeft: AppUtil.getWP(3),
    marginBottom: AppUtil.getHP(1),
    marginTop: AppUtil.getHP(1),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: AppUtil.getWP(0.5),
  },
  dropDownWrapper: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.white,
    overflow: "hidden",
    height: 45,
    justifyContent: "center",
  },
  dropDown: {
    width: "100%",
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
  },
  subtitle: {
    fontFamily: Fonts.RobotoRegular,
  },
  buttonStyle: {
    width: 55,
    height: 55,
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
