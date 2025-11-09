import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const DisabledFieldStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
  },
  fieldTitle: {
    fontSize: 12,
    color: Colors.darkBlack,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: AppUtil.getHP(1),
    marginTop: AppUtil.getHP(1),
  },
  disabledField: {
    backgroundColor: Colors.disableViewColor,
    borderRadius: 5,
    height: 45,
    color: Colors.darkBlack,
    width: "100%",
    paddingHorizontal: AppUtil.getWP(3),
  },
});
