import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

const { getWP, getHP } = AppUtil;

export const RdssStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryBackground,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: getHP(4),
  },
  cardContainer: {
    width: getWP(42),
    height: getHP(19),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: Colors.white,
    marginTop: getHP(3),
    overflow: "hidden",
    borderRadius: 10,
  },
  cardContainerTouched: {
    backgroundColor: Colors.orange,
  },
  cardImage: {
    resizeMode: "cover",
    marginBottom: getHP(1),
  },
  cardText: {
    textAlign: "center",
    fontSize: AppUtil.getHP(2),
    color: Colors.darkBlack,
    marginTop: getHP(1),
    fontFamily:Fonts.RobotoRegular,
  },
});
