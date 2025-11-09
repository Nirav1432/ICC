import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const SearchBarStyle = StyleSheet.create({
  searchBar: {
    marginHorizontal: AppUtil.getWP(5),
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    height: AppUtil.getHP(6),
    borderRadius: 8,
    backgroundColor: Colors.white,
    width: "100%",
    color: Colors.darkBlack,
    flex: 1,
    paddingHorizontal: AppUtil.getWP(2),
  },
  searchButton: {
    width: AppUtil.getHP(6),
    height: AppUtil.getHP(6),
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: AppUtil.getWP(2),
  },
});
