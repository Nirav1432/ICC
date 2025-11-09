import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const LocationBarStyle = StyleSheet.create({
  addressSearchBar: {
    width:"100%",
  },
  titleText: {
    color: Colors.darkBlack,
    fontSize: 13,
    fontWeight: 500,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent:'space-between'
  },
  rowDisbleView: {
  },

  textInput: {
    width:"85%",
    height:45,
    paddingLeft:10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    color: Colors.darkBlack,
  },
  textInputDisbleView: {
    width:"100%",
    minHeight: 45,
    paddingHorizontal:10,
    backgroundColor: Colors.disableViewColor,
    borderRadius: 5,
    color: Colors.darkBlack,
  },

  buttonIcon: {
    width:45,
    height:45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.disableViewColor,
  },


});
