import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const OldDataHOmeScreenStyle = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
  },
  dropdownview:{
    marginTop:20,
    marginBottom:10,
  },
  radioView: {
    backgroundColor: Colors.disableViewColor,
    marginVertical: AppUtil.getHP(2),
    paddingVertical: AppUtil.getHP(3),
  },
  imageButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: AppUtil.getHP(2),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.disableViewColor,
    borderRadius: 25,
  },
  button: {
    borderRadius: 25,
    paddingVertical: AppUtil.getHP(2),
    width: AppUtil.getWP(50),
  },
  selectedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    width: AppUtil.getWP(40),
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnText1: {
    color: Colors.lightGray,
    fontSize: 16,
    // marginLeft: AppUtil.getWP(5),
  },
  btnText2: {
    color: Colors.lightGray,
    fontSize: 16,
    marginRight: AppUtil.getWP(12),
  },
  selectedBtnTxt2: {
    color: Colors.white,
  },
  selectedBtnTxt1: {
    color: Colors.white,
  },
  bottomView: {
    marginTop: AppUtil.getHP(2),
    marginBottom: AppUtil.getHP(2),
    // paddingVertical: AppUtil.getHP(2),
    backgroundColor: Colors.disableViewColor,
    borderRadius: 25,
    flexDirection: "row",
  },
  bottomText: {
    color: Colors.lightGray,
    fontSize: 16,
    alignSelf: "center",
    width: AppUtil.getWP(45),
    justifyContent: "center",
    textAlign: "center",
  },
  button1: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: AppUtil.getHP(2),
    borderRadius: 25,
  },
  button2: {
    width: "50%",
    paddingVertical: AppUtil.getHP(2),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: Colors.lightGray,
  },
});
