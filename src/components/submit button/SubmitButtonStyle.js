import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import DeviceInfo from "react-native-device-info";
import { Fonts } from "../../utils/Fonts";

export const SubmitButtonStyle = StyleSheet.create({
  submitButton: {
    width: AppUtil.getWP(90),
    padding: 15,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    marginTop: AppUtil.getHP(2),
    marginBottom: AppUtil.getHP(2),
    borderWidth: 1,
  },
  buttonText: {
    fontSize: DeviceInfo.isTablet() ? 20 : AppUtil.getHP(2),
    fontFamily: Fonts.RobotoMedium,
  },
});
