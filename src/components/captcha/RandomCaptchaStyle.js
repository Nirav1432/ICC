import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const generateColor = () => {
  let randomColorString = "#";
  const arrayOfColorFunctions = "0123456789abcdef";
  for (let x = 0; x < 6; x++) {
    let index = Math.floor(Math.random() * 16);
    let value = arrayOfColorFunctions[index];

    randomColorString += value;
  }
  return randomColorString;
};

const CommonDropdownListStyle = StyleSheet.create({
  mainView: {
    width: "100%",
    height: AppUtil.getHP(10),
    alignItems: "center",
    flexDirection: "row",
  },
  mainInnerView: {
    width: "45%",
    height: AppUtil.getHP(6),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.darkGray,
  },

  txtCaption1: {
    // fontSize: AppUtil.getHP(Math.random() * (3 - 1 + 1) + 1),
    fontSize: AppUtil.getHP(2.5),
    color: generateColor(),
    marginBottom: Math.floor(Math.random() * 7),
  },
  txtCaption2: {
    // fontSize: AppUtil.getHP(Math.random() * (3 - 1 + 1) + 1),
    fontSize: AppUtil.getHP(2.5),
    backgroundColor: Math.floor(Math.random() * 5) == 1 ? generateColor() : 'transparent',
    color: generateColor(),
    marginVertical: Math.floor(Math.random() * 7),
  },
  txtCaption3: {
    // fontSize: AppUtil.getHP(Math.random() * (3 - 1 + 1) + 1),
    fontSize: AppUtil.getHP(2.5),
    color: generateColor(),
    marginBottom: Math.floor(Math.random() * 7),
  },
  txtCaption4: {
    // fontSize: AppUtil.getHP(Math.random() * (3 - 1 + 1) + 1),
    fontSize: AppUtil.getHP(2.5),
    backgroundColor: Math.floor(Math.random() * 5) == 1 ? generateColor() : 'transparent',
    color: generateColor(),
    marginVertical: Math.floor(Math.random() * 7),
  },
  txtCaption5: {
    // fontSize: AppUtil.getHP(Math.random() * (3 - 1 + 1) + 1),
    fontSize: AppUtil.getHP(2.5),
    color: generateColor(),
    marginBottom: Math.floor(Math.random() * 7),
  },
  txtCaption6: {
    // fontSize: AppUtil.getHP(Math.random() * (3 - 1 + 1) + 1),
    fontSize: AppUtil.getHP(2.5),
    backgroundColor: Math.floor(Math.random() * 5) == 1 ? generateColor() : 'transparent',
    color: generateColor(),
    marginVertical: Math.floor(Math.random() * 7),
  },

  headText: { marginTop: AppUtil.getHP(2), marginBottom: 7, paddingLeft: 10 },

  dropdown3BtnChildStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdown3BtnTxt: {
    color: Colors.black,
    textAlign: "center",
    fontSize: AppUtil.getHP(2.8),
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: AppUtil.getHP(1),
  },
  dropdown3RowTxt: {
    color: Colors.black,
    textAlign: "center",
    fontSize: AppUtil.getHP(2.8),
  },
  btnView: { marginHorizontal: AppUtil.getWP(3) },
  inputText: {
    height: AppUtil.getHP(6),
    width: "40%",
    backgroundColor: Colors.white,
    borderRadius: 7,
    justifyContent: "center",
    borderWidth: 1,
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 1,
    // elevation: 4,
    fontSize: AppUtil.getHP(1.7),
    fontFamily: Fonts.RobotoRegular,
    borderColor: Colors.darkGray,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});
export default CommonDropdownListStyle;
