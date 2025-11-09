import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const SearchViewStyle = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: AppUtil.getHP(2),
    width: "100%",
  },
  headerText: {
    fontSize: AppUtil.getHP(1.75),
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium,
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
export default SearchViewStyle;
