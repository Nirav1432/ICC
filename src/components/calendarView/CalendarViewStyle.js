import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const CalendarViewStyle = StyleSheet.create({
  headerText: {
    fontSize: 12,
    color: Colors.darkBlack,
    // fontWeight:"500",
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium,
  },
  headerText2: {
    fontSize: 12,
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium,
    marginTop:10,
  },
  text2: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: AppUtil.getHP(1.7),
    color: Colors.mediumGray,
    width: AppUtil.getWP(55),
  },

  btnDrop: {
    width: "100%",
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: AppUtil.getWP(3),
  },
  text: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    color: Colors.mediumGray,
    width: AppUtil.getWP(74),
  },
  line: {
    height: "100%",
    width: 0.5,
    backgroundColor: Colors.mediumGray,
  },
});
export default CalendarViewStyle;
