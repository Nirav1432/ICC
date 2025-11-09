import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const RadioButtonImageStyle = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
  },
  radioButton: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // marginRight: 10,
    // flex: 1,
    width: AppUtil.getWP(25),
    // height: AppUtil.getHP(15),
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginHorizontal: AppUtil.getWP(3),
    marginVertical: AppUtil.getHP(1.5),
  },
  radioButtonContent: {
    // alignItems: "flex-end",
    // justifyContent: "flex-start",
  },
  radioButtonDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    marginLeft: AppUtil.getWP(18),
  },
  radioButtonImage: {
    width: AppUtil.getWP(18),
    height: AppUtil.getHP(8),
    marginHorizontal: AppUtil.getWP(2),
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    // marginTop: AppUtil.getHP(1),
  },
  radioButtonLabel: {
    fontSize: 16,
    color: Colors.black,
  },
  radioButtonDotSelected: {
    borderColor: Colors.primary,

    backgroundColor: Colors.primary,
  },
});
