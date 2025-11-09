import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const UploadButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  buttonStyle: {
    width: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginTop: AppUtil.getHP(5),
    height: AppUtil.getHP(6.16),
    paddingHorizontal: AppUtil.getWP(2.5),
    color: Colors.white,
    justifyContent: "center",
    alignItems:'center',
  },
});
