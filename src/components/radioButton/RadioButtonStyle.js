import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const RadioButtonStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: AppUtil.getHP(0.5),
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginHorizontal: AppUtil.getWP(5),
    marginVertical: AppUtil.getHP(1),
  },
  radioButtonInner: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: 10,
    marginLeft: 10,
  },

  radioButtonDotSelected: {
    borderColor: Colors.white,
    backgroundColor: Colors.primary,
    width: 16,
    height: 16,
  },
  radioButtonLabel: {
    fontSize: 16,
    color: Colors.black,
  },
});
