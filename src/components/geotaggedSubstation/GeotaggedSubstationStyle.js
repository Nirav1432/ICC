import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const GeotaggedSubstationStyle = StyleSheet.create({
  container: {
    paddingHorizontal: AppUtil.getWP(4),
  },
  headText: {
    fontSize: AppUtil.getHP(2),
    color: Colors.black,
    fontFamily: Fonts.RobotoMedium,
  },
  subContainer: {
    marginTop: AppUtil.getHP(1),
    marginBottom: AppUtil.getHP(2),
  },
  subHeader1: {
    width: "100%",
    height: AppUtil.getHP(6),
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: AppUtil.getWP(4),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  subHeaderText1: {
    fontSize: AppUtil.getHP(2),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
  },
  subText: {
    fontSize: AppUtil.getHP(1.3),
    color: Colors.lightGray,
    fontFamily: Fonts.RobotoMedium,
  },
  subView: {
    width: "100%",
    height: AppUtil.getHP(6),
    backgroundColor: Colors.secondaryBG10,
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: AppUtil.getWP(4),
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.substationlineColor,
  },
  curve: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default GeotaggedSubstationStyle;
