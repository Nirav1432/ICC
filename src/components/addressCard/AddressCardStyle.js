import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const AddressCardStyle = StyleSheet.create({
  cardSr: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: AppUtil.getHP(1),
  },
  cardTitles: {
    marginLeft: AppUtil.getWP(2),
  },

  cardTitle: {
    color: Colors.lightGray,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: AppUtil.getHP(1),
  },
  bottomBorder: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    marginBottom: AppUtil.getHP(1),
  },
 
  addressCard: {
    backgroundColor: Colors.white,
    padding: AppUtil.getHP(2),
    borderRadius: 10,
    marginTop: AppUtil.getHP(2),
  },
  cardRight: {
    width: "100%",
    flexDirection: "column",
  },
  cardRightTop: {
    flexDirection: "row",
    marginLeft: AppUtil.getWP(2),
    marginBottom: 5,
  },
  rightDate: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: 500,
    width: "50%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  },
  rightTime: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
    width: "50%",
  },
  cardRightAddress: {
    marginLeft: AppUtil.getWP(2),
    marginBottom: 2,
  },
  rightAddress: {
    fontSize: 14,
    color: Colors.darkBlack,
  },
  cardLatLong: {
    flexDirection: "row",
    marginLeft: AppUtil.getWP(2),
  },
  long: {
    color: Colors.darkBlack,
    fontSize: 12,
    width: "50%",
  },
  lat: {
    color: Colors.darkBlack,
    fontSize: 12,
    width: "50%",
  },
  cardLatsLongs: {
    flexDirection: "row",
    marginLeft: AppUtil.getWP(2),
    marginBottom: AppUtil.getHP(1),
  },
  longs: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    width: "50%",
    paddingRight:15,
  },
  lats: {
    color: Colors.secondary,
    fontSize: 14,
    width: "50%",
    fontWeight: "bold",
  },
  cardRightBottom: {
    marginLeft: AppUtil.getWP(2),
    flexDirection: "row",
    marginBottom: 5,
  },
  rightBottomText: {
    fontSize: 14,
    color: Colors.darkBlack,
  },
  taggedByName: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  asstType: {
    flexDirection: "row",
    marginLeft: AppUtil.getWP(2),
    marginBottom: AppUtil.getHP(1),
  },
  type: {
    color: Colors.darkBlack,
  },
  asset: {
    color: Colors.secondary,
    fontWeight: "bold",
    marginLeft: AppUtil.getWP(1),
  },
});
