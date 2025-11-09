import { StyleSheet } from "react-native";
import { AppUtil } from "../../../utils/AppUtil";
import { Colors } from "../../../utils/Colors";
import { Fonts } from "../../../utils/Fonts";

const FeederMainStyle = StyleSheet.create({
  mainView: {
    marginBottom: AppUtil.getHP(6),
  },
  container: {
    // flex: 1,
    height: AppUtil.getHP(89),
    backgroundColor: Colors.primaryBackground,
  },
  headerView: {
    backgroundColor: Colors.primaryBackground,
    height: AppUtil.getHP(5),
    justifyContent: "center",
    paddingHorizontal: AppUtil.getWP(4),
  },
  headerText: {
    fontSize: AppUtil.getHP(2.2),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
  },
  subHeaderView: {
    backgroundColor: Colors.disableViewColor,
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: AppUtil.getHP(2),
  },
  margin:{
    marginTop: AppUtil.getHP(1.5),
  },
  mHorizontal:{
    marginHorizontal: AppUtil.getWP(-5),
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
});

export default FeederMainStyle;
