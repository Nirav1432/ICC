import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

const DropDownCardStyle2 = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: AppUtil.getWP(5),
    marginTop: AppUtil.getHP(2),
    padding: AppUtil.getWP(4),
    borderRadius: 5,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.darkBlack,
  },
  remarks: {
    fontSize: 14,
    color: Colors.darkBlack,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
  },
  row2: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  textField: {
    marginBottom: 10,
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "500",
    marginLeft: AppUtil.getWP(1),
  },
  statusView: {
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
    backgroundColor: "#D6F6D5",
  },
  nonCompliantStatusView: {
    backgroundColor: "#FFA8A8",
  },
  statusTextField: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.gray,
    marginBottom: 1,
    marginTop: 15,
    width: "100%",
  },
});
export default DropDownCardStyle2;
