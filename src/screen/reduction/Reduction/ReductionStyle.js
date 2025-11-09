import { StyleSheet } from "react-native";
import { AppUtil } from "../../../utils/AppUtil";
import { Colors } from "../../../utils/Colors";

const { getHP, getWP } = AppUtil;
const ReductionStyle = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
export default ReductionStyle;
