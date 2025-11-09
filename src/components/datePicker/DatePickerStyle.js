import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const DatePickerStyle = StyleSheet.create({
  text1: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontWeight: "500",
    alignSelf: "flex-start", // Align the title to the left
    // marginLeft: AppUtil.getWP(3),
    marginBottom: AppUtil.getHP(1),
    marginTop: AppUtil.getHP(1),
  },
  pickerWrapper: {
    backgroundColor: Colors.disableViewColor,
    padding: AppUtil.getHP(0.5),
    // flex: 1,
    marginBottom: AppUtil.getHP(1),
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
  },
  wrapperButton: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  text: {
    color: Colors.darkBlack,
    fontSize: AppUtil.getHP(2),
    padding: AppUtil.getWP(2),
  },
  textView: {
    width: "90%",
  },
  iconView: {
    width: "10%",
  },
});
