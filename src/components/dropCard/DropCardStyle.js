import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const DropCardStyle = StyleSheet.create({
  dropCard: {
    // marginTop: AppUtil.getHP(2),
    // marginBottom: AppUtil.getHP(1),
  },

  expandableCard: {
    flexDirection: "row",
    borderRadius: 10,
    marginTop: AppUtil.getHP(1),

    backgroundColor: Colors.white,
    padding: AppUtil.getHP(1.5),
  },
  cardText: {
    width: "95%",

    marginHorizontal: AppUtil.getWP(1),
  },
  expandableCardText: {
    color: Colors.black,
    fontSize: AppUtil.getHP(1.8),
    fontWeight: "bold",
  },
  cardBtn: {
    width: "5%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
});
