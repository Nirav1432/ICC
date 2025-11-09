import { StyleSheet } from "react-native";
import { AppUtil } from "../../../utils/AppUtil";
import { Colors } from "../../../utils/Colors";
import { Fonts } from "../../../utils/Fonts";

const UserPassInputStyles = StyleSheet.create({
  inputText: {
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoRegular,
    color: Colors.lightGray,
  },
  inputView: {
    marginTop: 5,
    flexDirection: "row",
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  input: {
    width: "85%",
    height: 50,
    marginLeft: 10,
    color: Colors.darkBlack,
  },
});
export default UserPassInputStyles;
