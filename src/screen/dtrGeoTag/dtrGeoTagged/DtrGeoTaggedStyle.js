import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";

export const DtrGeoTaggedStyle = StyleSheet.create({
  mainView: {
    marginBottom: AppUtil.getHP(8),
  },
  container: {
    flex: 1,
    color: Colors.primaryBackground,
    backgroundColor: Colors.primaryBackground,
  },
  text: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: 500,
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
    padding: AppUtil.getHP(2),
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
    borderRadius: 10,
  },

  assetsText: {
    color: Colors.mediumGray,
    marginTop: AppUtil.getHP(1),
    fontSize: 14,
    textAlign: "center",
  },
  cardsContainer: {
    marginTop: AppUtil.getHP(2),
  },
  titles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: AppUtil.getHP(1),
  },
  leftTitle: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  rightTitle: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  commonCardView: {
    marginBottom: AppUtil.getHP(2),
  },
});
