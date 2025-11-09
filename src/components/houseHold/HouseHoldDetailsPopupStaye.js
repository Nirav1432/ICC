import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

const PageStyle = StyleSheet.create({
  header: {
    flexDirection: "row",
    // flex: 1,
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerRight: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  container: {
    maxHeight:"80%",
    backgroundColor: Colors.primaryBackground,
    borderRadius: 10,
    width: "90%",
    marginVertical: "10%",
    marginHorizontal: "5%",
    alignSelf: "center",
    padding: AppUtil.getHP(3),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.darkBlack,
  },
  fields: {
    width: "100%",
  },

   marginTop: {
    paddingHorizontal: 2,
    marginTop: AppUtil.getHP(2),
  },
  headerText: {
    fontSize: AppUtil.getHP(1.75),
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium
  },
  inpView: {
    width: '100%',
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: AppUtil.getWP(3),
  },
  btnRadioView: { flexDirection: 'row', marginTop: 15 },
  btnRadioInnerView: { flexDirection: 'row' },
  headText: {
    fontSize: AppUtil.getHP(1.75),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
    marginLeft: 5,
  },
});

export default PageStyle;
