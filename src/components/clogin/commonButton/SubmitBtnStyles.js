import { StyleSheet } from "react-native";
import { AppUtil } from "../../../utils/AppUtil";
import { Colors } from "../../../utils/Colors";
import { Fonts } from "../../../utils/Fonts";

const SubmitBtnStyles = StyleSheet.create({
  btnLogin: {
    marginTop: 10,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  btnLoginText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.white,
  },
});
export default SubmitBtnStyles;
