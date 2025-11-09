import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const LoginStyles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  signinText: {
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoMedium,
    color: Colors.white,
    marginTop: AppUtil.getHP(2),
    alignSelf: "center",
  },
  ippsText: {
    fontSize: AppUtil.getHP(3),
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
    marginTop: AppUtil.getHP(2),
    alignSelf: "center",
    textAlign: "center",
  },
  ChangePasswordText: {
    fontSize: 24,
    fontWeight: "500",
    fontSize: 24,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
    marginTop: 30,
    alignSelf: "center",
    textAlign: "center",
  },

  inputContainer: {
    marginTop: AppUtil.getHP(3),
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 5,

    width: "80%",
    paddingHorizontal: 20,
    // paddingVertical: 30,
    paddingTop: 20, // Adjusted padding at the top
    paddingBottom: 20, // Adjusted padding at the bottom
    overflow: "hidden",
  },
  margin: { marginTop: 40 },
  rememberMeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  btnRemember: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rememberText: {
    fontSize: AppUtil.getHP(1.7),
    fontFamily: Fonts.RobotoRegular,
    color: Colors.darkBlack,
    marginLeft: 5,
  },
  forgetText: {
    fontSize: AppUtil.getHP(1.7),
    fontFamily: Fonts.RobotoRegular,
    color: Colors.orange,
    marginLeft: 5,
  },
  headText: {
    fontSize: AppUtil.getHP(1.7),
    fontFamily: Fonts.RobotoRegular,
    marginTop: AppUtil.getHP(4),
    marginBottom: 2,
  },
  redColor: { color: Colors.red },
  loadingIndicator: {
    marginTop: 30,
    color: Colors.orange,
  },
  headerText: {
    color: Colors.white,
    fontSize: 24,
    textAlign: "center",
    fontFamily: Fonts.RobotoMedium,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: AppUtil.getHP(2),
  },
  back: {
    position: "absolute",
    left: AppUtil.getWP(4),
    marginTop: AppUtil.getHP(2),
  },
});

export default LoginStyles;
