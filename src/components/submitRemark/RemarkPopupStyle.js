import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

export const RemarkPopupStyle = StyleSheet.create({
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
    backgroundColor: Colors.primaryBackground,

    borderRadius: 10,
    width: "90%",
    marginVertical: "20%",
    marginHorizontal: "5%",
    alignSelf: "center",
    padding: AppUtil.getHP(3),

    // height: "50%",
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
    marginTop:AppUtil.getHP(4),
  },

   marginTop: {
    paddingHorizontal: 2,
    marginTop: AppUtil.getHP(0.5),
  },
  headerText: {
    fontSize: AppUtil.getHP(1.75),
    color: Colors.darkBlack,
    marginBottom: AppUtil.getHP(0.7),
    fontFamily: Fonts.RobotoMedium
  },
  inpView: {
    width: '100%',
    height: AppUtil.getHP(12),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: AppUtil.getWP(3),
  },

  btnLogin: {
    marginTop: 10,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor:Colors.orange
  },
  btnLoginText: {
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoMedium,
    color: Colors.white,
  },
  closeSty:{ end:5, top:5, position:'absolute'},
});
