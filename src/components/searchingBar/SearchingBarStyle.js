import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const SearchingBarStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  addressSearchBar: {
    justifyContent: "space-between",
    marginVertical: AppUtil.getHP(1),
  },
  buttonIcon: {
    backgroundColor: Colors.disableViewColor,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: AppUtil.getWP(1),
    padding: AppUtil.getWP(3.5),
    borderRadius: 5,
  },
  titleText: {
    color: Colors.darkBlack,
    fontSize: 14,
    fontWeight: 500,
    marginVertical: AppUtil.getHP(1),
  },
  textInput: {
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 5,
    padding: AppUtil.getWP(2),
    color: Colors.darkBlack,
    overflow: "hidden",
  },
});
