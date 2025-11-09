import { StyleSheet } from "react-native";
import { AppUtil } from "../../../utils/AppUtil";
import { Colors } from "../../../utils/Colors";
import { Fonts } from "../../../utils/Fonts";

const EditGeneralAssetDetailStyle = StyleSheet.create({
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

  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
  },
  subHeader: {
    width: "100%",
    height: AppUtil.getHP(3),
    backgroundColor: Colors.white,
    justifyContent: "center",
    paddingHorizontal: AppUtil.getWP(4),
  },
  subHeader1: {
    width: "100%",
    height: AppUtil.getHP(6),
    backgroundColor: Colors.secondaryBG10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: AppUtil.getWP(4),
  },
  subHeaderText: {
    fontSize: AppUtil.getHP(1.7),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoBold,
  },
  subHeaderText1: {
    fontSize: AppUtil.getHP(2),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
  },
  container: {
    height: AppUtil.getHP(75),
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: AppUtil.getWP(4),
    backgroundColor: "red",
  },
  marginTop: {
    paddingHorizontal: 10,
    marginTop: AppUtil.getHP(2),
  },
  asaText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: AppUtil.getHP(1.5),
    color: Colors.mediumGray,
    marginTop: 3,
  },

  //------
  searchView: {
    height: 15,
  },
  container: {
    flex: 1,
    marginBottom: AppUtil.getHP(1),
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
    padding: AppUtil.getHP(2),
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
  },

  imageContainer: {
    flexDirection: "row",
    marginVertical: AppUtil.getHP(2),
  },
  imagebtn: {
    marginHorizontal: AppUtil.getWP(1),
    width: "31%",
    height: AppUtil.getHP(10),
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: AppUtil.getHP(10),
    borderRadius: 10,

  },
  stepStyle: {
    marginHorizontal: AppUtil.getWP(2.5),
    marginBottom: AppUtil.getHP(2),
  },
  headerText: {
    fontSize: AppUtil.getHP(1.75),
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium
  },
  inpView: {
    width: '100%',
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: AppUtil.getWP(3),
  },
});

export default EditGeneralAssetDetailStyle;
