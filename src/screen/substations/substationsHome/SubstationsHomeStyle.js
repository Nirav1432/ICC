import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";
import { Fonts } from "../../../utils/Fonts";

export const SubstationsHomeStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: AppUtil.getHP(80),
    backgroundColor: Colors.primaryBackground,
  },
  firstView: {
    width: "100%",
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: AppUtil.getHP(2),
    backgroundColor: Colors.secondaryBG10,
  },
  flexView: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondView: {
    backgroundColor: Colors.primaryBackground,
  },

  flatList: {
    width: "100%",
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: AppUtil.getHP(2),
    backgroundColor: Colors.primaryBackground,
    flexWrap: "wrap",
  },
  cell: {
    width: AppUtil.getWP(92),
    height: AppUtil.getHP(8),
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: AppUtil.getWP(4),
    marginBottom: AppUtil.getHP(1.1),
    justifyContent: "center",
  },
  cellText: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: AppUtil.getHP(2),
    width: "100%",
  },
  btnDrop: {
    width: "85%",
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: AppUtil.getWP(3),
    color: Colors.darkBlack,
  },
  btnSearch: {
    width: AppUtil.getHP(6.16),
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.orange,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
