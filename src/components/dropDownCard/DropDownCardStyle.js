import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

const DropDownCardStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: AppUtil.getWP(5),
    marginTop: AppUtil.getHP(2),
    padding: AppUtil.getWP(4),
    borderRadius: 5,
  },
  title: {
    fontSize: AppUtil.getHP(2.5),
    marginBottom: 10,
    color: Colors.secondary,
    fontFamily: Fonts.RobotoMedium,
  },
  subtitle: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoRegular,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  textField: {
    marginBottom: 10,
    color: Colors.secondary,
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoMedium,
  },
  documentsTitle: {
    marginTop: 10,
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoRegular,
  },
  subText: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.secondary,
    fontFamily: Fonts.RobotoRegular,
  },
  documentText: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.secondary,
    fontFamily: Fonts.RobotoMedium,
  },
  statusView: {
    // Common styles for both compliant and non-compliant status
    marginLeft: 5,
    paddingLeft: 8,
    paddingTop: 1,
    paddingBottom: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 8,
    borderRadius: 20,
  },
  compliantStatusView: {
    // Styles for compliant status
    backgroundColor: "#D6F6D5",
  },
  nonCompliantStatusView: {
    // Styles for non-compliant status
    backgroundColor: "#FFA8A8",
  },
  statusTextField: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoRegular,
  },
});
export default DropDownCardStyle;
