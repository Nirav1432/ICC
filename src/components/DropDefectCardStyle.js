import { StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";
import { AppUtil } from "../utils/AppUtil";

export const DropDefectCardStyle = StyleSheet.create({
  dropCard: {
    marginTop:10,
  },

  expandableCard: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: Colors.white,
    padding: AppUtil.getHP(1.5),
    height:50, alignItems:'center', 
   
  },
  noeExpandableCard: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: Colors.white,
    padding: AppUtil.getHP(1.5),
    height:50, alignItems:'center', 
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    borderWidth:1
  },
  cardText: {
    width: "95%",
    marginHorizontal: AppUtil.getWP(1),
  },
  expandableCardText: {
    color: Colors.black,
    fontSize: 14,
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
