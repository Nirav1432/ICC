import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";

export const EditSubstationsGeoTaggedCapturePhotoStyle = StyleSheet.create({
  mainView: {
    marginBottom: AppUtil.getHP(8),
  },
  container: {
    flex: 1,
    marginBottom: AppUtil.getHP(1),
    backgroundColor: Colors.primaryBackground,
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
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
  },

  imageContainer: {
    // flexDirection: "row",
    // marginVertical: AppUtil.getHP(2),
    flexDirection: "row",
    marginTop: AppUtil.getHP(2),
    flexWrap: "wrap",
  },
  imagebtn: {
    marginHorizontal: AppUtil.getWP(1),
    width: "30%",
    height: AppUtil.getHP(10),
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: AppUtil.getHP(1),
    // marginHorizontal: AppUtil.getWP(1),
    // width: "33%",
    // borderRadius: 10,
  },
  image: {
    width: "100%",
    height: AppUtil.getHP(10),
    borderRadius: 10,

  },
  dropCard: {
    // marginTop: AppUtil.getHP(2),
    // marginBottom: AppUtil.getHP(1),
  },

  expandableCard: {
    flexDirection: "row",
    borderRadius: 10,
    marginTop: AppUtil.getHP(1),

    backgroundColor: Colors.white,
    padding: AppUtil.getHP(1),
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
