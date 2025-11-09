
import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const PageStyle = StyleSheet.create({

  mainView: {
    marginBottom: AppUtil.getHP(6),

  },
  container: {
    // flex: 1,
    height: AppUtil.getHP(89),
    backgroundColor: Colors.primaryBackground,
  },
  headerView: {
    backgroundColor: Colors.primaryBackground,
    height: AppUtil.getHP(5),
    justifyContent: "center",
    paddingHorizontal: AppUtil.getWP(4),
  },
  headerText: {
    fontSize: AppUtil.getHP(2.2),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,
  },
  subHeaderView: {
    backgroundColor: Colors.disableViewColor,
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: AppUtil.getHP(2),
  },
  margin: {
    marginTop: AppUtil.getHP(1.5),
  },
  mHorizontal: {
    marginHorizontal: AppUtil.getWP(-5),
  },

  firstView: {
    width: "100%",
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: 5,
    backgroundColor: Colors.secondaryBG10,
  },
  firstView1: {
    width: "100%",
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: AppUtil.getHP(1),
    backgroundColor: Colors.secondaryBG10,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  boder: {
    width: "32%", height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 3, padding: 5,
    borderColor: Colors.disableButtonColor, paddingTop: 10, backgroundColor: Colors.white
  },
  flexView: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexView1: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  flatList: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cell: {
    width: AppUtil.getWP(92),
    height: AppUtil.getHP(8),
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: AppUtil.getWP(4),
    marginBottom: AppUtil.getHP(1.1),
    justifyContent: 'center'
  },
  cellText: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoMedium,

  },
  houseHoldListCard: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    marginBottom: 10,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.greenColor,
  },
  card1: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  cardSr: {
    width: "70%",
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 1,
    fontFamily: Fonts.RobotoBold,

  },
  cardSr1: {
    color: Colors.secondary,
    fontSize: 12,
    marginBottom: 1,
    fontFamily: Fonts.RobotoBold,
  },
  cardTitle: {
    color: Colors.lightGray,
    fontSize: 12,
    fontFamily: Fonts.RobotoRegular,
    fontWeight: 500,
    marginBottom: 5,
  },

  cardTitles: {
    marginLeft: AppUtil.getWP(4),
    marginTop: AppUtil.getHP(1.5),
  },
  cardTitles1: {
    width: "45%",
    marginLeft: AppUtil.getWP(4),
  },
  bottomBorder: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  bottomBorderWithPadding: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    marginHorizontal: AppUtil.getWP(4),
  },
  rightDate: {
    marginTop: AppUtil.getHP(1),
    marginLeft: AppUtil.getWP(4),
    flexDirection: 'row',
    alignItems: "center"
  },
  txtDate: { marginLeft: 5, color: Colors.secondary, fontSize: 14, fontWeight: "700" },
  cardRightAddress: {
    marginLeft: AppUtil.getWP(4),
    marginTop: AppUtil.getHP(1),
  },
  rightAddress: {
    color: Colors.darkBlack,
    fontSize: 13
  },

  long: {
    color: Colors.darkBlack,
    fontSize: 14,
    width: "50%",
  },
  lat: {
    color: Colors.darkBlack,
    fontSize: 14,
    width: "50%",
  },
  cardLatLong: {
    marginTop: AppUtil.getHP(1),
    flexDirection: "row",
    marginLeft: AppUtil.getWP(4),
  },
  cardLatsLongs: {
    marginBottom: AppUtil.getHP(1),
    flexDirection: "row",
    marginLeft: AppUtil.getWP(4),
  },
  longs: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    width: "50%",
    paddingRight: 20,
  },
  lats: {
    color: Colors.secondary,
    fontSize: 14,
    width: "50%",
    fontWeight: "bold",
  },

  contactTitles: {
    marginLeft: AppUtil.getWP(4),
    marginTop: 4,
  },
  btnLogin: {
    marginTop: 10,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    backgroundColor: Colors.orange,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  btnLoginText: {
    fontSize: AppUtil.getHP(2),
    fontFamily: Fonts.RobotoMedium,
    color: Colors.white,
  },
  modifySearch: {
    flexDirection: "row",
    padding: AppUtil.getHP(1.5),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.disableViewColor,
  },
  modifySearchText: {
    color: "black",
    width: "90%",
    fontWeight: 500,
    fontSize: 16,
  },
  mapConstainer:
  {
    width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), borderWidth: 0.5,
    borderColor: Colors.orange,
  },
  imageContainer: {
    flexDirection: "row",
    marginVertical: AppUtil.getHP(2),
  },
  imagebtn: {
    marginHorizontal: AppUtil.getWP(1),
    width: "31%",
    height: AppUtil.getHP(10),
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: AppUtil.getHP(10),
    borderRadius: 10,
  },
  heading: {
    marginHorizontal: AppUtil.getWP(5),
    marginTop: AppUtil.getHP(2),
    paddingVertical: AppUtil.getHP(1.5),
    borderRadius: 5,
    backgroundColor: Colors.beige,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  textView: {
    width: "85%",
  },
  headingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.darkBlack,
    marginLeft: AppUtil.getWP(3),
  },
  icnView: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  fieldTitle: {
    fontSize: AppUtil.getHP(1.8),
    color: Colors.darkBlack,
    fontWeight: "500",
    alignSelf: "flex-start",
    // marginLeft: AppUtil.getWP(3),
    marginBottom: AppUtil.getHP(1),
    marginTop: AppUtil.getHP(2),
  },
  container1: {
    backgroundColor: Colors.white,

    flex: 1,
    marginBottom: AppUtil.getHP(1),
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
  },
  enabledField: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    height: 80,
    color: Colors.darkBlack,
    width: "100%",
    paddingHorizontal: AppUtil.getWP(3),
  },
  imageTouch: {
    height: 25,
    width: 25,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    right: -5,
    top: -5,
    borderRadius: 15,
  },
  margintop: {
    height: AppUtil.getHP(9),
    paddingHorizontal: 10,
    marginTop: AppUtil.getHP(2),
  },
  btnSave: { width: "48%", padding: 12, borderRadius: 10, backgroundColor: Colors.primary, alignItems: "center" },
  twobtn: { width: "100%", flexDirection: "row", justifyContent: 'space-between' },
  txtSave: { color: "#fff", fontSize: 14, fontFamily: Fonts.RobotoMedium, },
});
export default PageStyle;
