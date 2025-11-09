import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

const { getWP, getHP } = AppUtil;
export const HeaderStyle = StyleSheet.create({
  container: {
    height: getHP(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: Colors.headerColor,
    width: "100%",
    paddingHorizontal: getWP(4),
    paddingBottom: getHP(1),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.white,
    // marginLeft: getWP(1),
    // marginRight: getWP(1),
    padding: getHP(1),
  },
  title: {
    flex: 1,
    fontSize: getHP(2),
    textAlign: "center",
    color: Colors.white,
    fontFamily: Fonts.RobotoMedium,
  },




  searchView: {paddingBottom:getHP(2), backgroundColor: Colors.secondary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  innerMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "78%",
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  btnSearch: {
    width: AppUtil.getHP(6.16),
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.orange,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
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
  filterView: {
    width: AppUtil.getHP(6.16),
    height: AppUtil.getHP(6.16),
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.mapblue,

  },
});
