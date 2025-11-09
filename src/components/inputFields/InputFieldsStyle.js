import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

export const InputFieldsStyle = StyleSheet.create({
  input: {
    flex: 1,
  },
  inputFields: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: AppUtil.getHP(2),
  },

  textInput: {
    backgroundColor: Colors.disableViewColor,
    borderRadius: 5,
    width: "98%",
    height: 45,
    fontSize: 12,
    padding: AppUtil.getHP(1.2),
    color: Colors.darkBlack,
    alignItems: "center",
    textAlignVertical: "center",
   
  },
  textInput1: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: "98%",
    height: 45,
    padding: AppUtil.getHP(1.2),
    color: Colors.darkBlack,
    alignItems: "center",
    textAlignVertical: "center"
  },
  textInputTitle: {
    height: AppUtil.getHP(5),
    textAlignVertical:"top",
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(1),
    fontSize: 12,
    fontFamily:Fonts.RobotoMedium,
    
  },
  textInputTitle1: {
    textAlignVertical:"top",
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(1),
    fontSize: 12,
    fontFamily:Fonts.RobotoMedium,
    
  },
});
