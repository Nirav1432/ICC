import { StyleSheet } from "react-native";
import { Colors } from "./../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

const { getWP, getHP } = AppUtil;

export const OtpVerifyStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: getHP(2),
  },
  back: {
    position: "absolute",
    left: getWP(4),
    marginTop: getHP(2),
  },
  headerText: {
    color: Colors.white,
    fontSize: getHP(2.5),
    textAlign: "center",
    fontFamily:Fonts.RobotoMedium,
  },
  contentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getWP(4),
  },
  innerContentContainer: {
    backgroundColor: Colors.white,
    color: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: getWP(6),
    marginTop: getHP(6),
    paddingBottom: getHP(7),
  },
  title: {
    fontSize: getHP(1.8),
    marginTop: getHP(6),
    color: Colors.textColor,
    textAlign: "center",
    fontFamily:Fonts.RobotoRegular,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: getHP(4),
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputBox: {
    width: getWP(11),
    height: getHP(7),
    marginHorizontal: getWP(1),
    backgroundColor: Colors.white,
    borderRadius: 8,
    fontSize: getHP(2),
    textAlign: "center",
    borderColor: "#AAAAAA",
    borderWidth: 1,
    marginTop: getHP(4),
  },
  resendText: {
    fontSize: AppUtil.getHP(1.5),
    color: Colors.textColor,
    marginTop: getHP(2),
    fontFamily:Fonts.RobotoRegular,
  },
  resendtextunderline: {
    fontSize: AppUtil.getHP(1.5),
    textDecorationLine: "underline",
    color: Colors.primary,
    fontWeight: "bold",
    fontFamily:Fonts.RobotoMedium,
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    marginTop: getHP(5.5),
    // paddingVertical: getHP(1.8),
    width: "100%",
    height: 50,
    borderRadius: 80,
    alignItems:"center",
    justifyContent:"center"
  },
  verifyButtonText: {
    fontSize: AppUtil.getHP(2),
    fontFamily:Fonts.RobotoMedium,
    color: Colors.white,
    textAlign: "center",
  },

  

  timerText: {
    color: 'gray',
    fontSize: 14,
  },
  resendButton: {
    padding: 10,
  },
  resendText: {
    color: '#007BFF',
    fontSize: 16,
  },

});
