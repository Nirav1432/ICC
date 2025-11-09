import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";

export const FeederFormStyle = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.grey,
  },
  mainView: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
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
    padding: AppUtil.getHP(1.5),
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
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
    marginHorizontal:25,
    marginTop:5,
    marginBottom: AppUtil.getHP(2),
  },
  recentView:{
    paddingHorizontal:25,
    marginTop:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
});
