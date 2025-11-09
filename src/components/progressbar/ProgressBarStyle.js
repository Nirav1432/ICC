import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const ProgressBarStyle = StyleSheet.create({
  progressBarContainer: {
    height: AppUtil.getHP(1),
    backgroundColor: Colors.gray,
    borderRadius: 4,
    marginHorizontal: AppUtil.getWP(5),
    marginVertical: AppUtil.getHP(3),
  },
  progressBar: {
    height: AppUtil.getHP(1),
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
});
