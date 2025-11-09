import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import DeviceInfo from "react-native-device-info";

export const FileContainerStyle = StyleSheet.create({
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: AppUtil.getHP(2),
    marginHorizontal: AppUtil.getWP(1),
  },
  leftIcon: {
    marginRight: AppUtil.getWP(1),
  },
  fileName: {
    flex: 1,
    fontSize: DeviceInfo.isTablet() ? 18 : 14,
    color: Colors.secondary,
    fontWeight: "500",
    marginLeft: AppUtil.getWP(1),
  },
});
