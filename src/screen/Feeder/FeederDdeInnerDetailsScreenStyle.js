import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

export const FeederDdeInnerDetailsScreenStyle = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: '#ECF1F9' },
  tabView: { height: AppUtil.getHP(6.5), flexDirection: 'row', backgroundColor: Colors.orange },
  tab: { height: AppUtil.getHP(6), paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#263D7E', borderLeftWidth: 1, borderLeftColor: Colors.orange },
  txtTab: { color: Colors.white, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
  item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8, marginHorizontal: 16, },
  title: { fontSize: 32, },
  selectItemButtonView: { paddingHorizontal: 20, backgroundColor: '#D6DDEA', flexDirection: 'row', flexWrap: "wrap" },
  selectItemButtonView1: { paddingHorizontal: 5, backgroundColor: '#D6DDEA', flexDirection: 'row', flexWrap: "wrap" },
  filerView: { backgroundColor: Colors.white, margin: 5, paddingHorizontal: 5, borderRadius: 7, flexDirection: 'row', alignItems: 'center' },
  txtFilter: { fontSize: 12 },


  cardSaprater: { backgroundColor: Colors.white },
  cardTitles1: {  paddingVertical: 10, paddingHorizontal: 20, backgroundColor: Colors.white, },

  cardTitles: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: Colors.white, },
  cardSr: { width: "90%", color: Colors.secondary, fontSize: 14, fontWeight: "bold", marginBottom: 2, },
  cardTitle: { color: Colors.lightGray, fontSize: 14, fontWeight: 500, marginBottom: AppUtil.getHP(1), },
  cardView1: { flexDirection: "row", },
  cardView2: { flexDirection: "row", marginTop: 5 },
  rightBottomText: { color: Colors.secondary, fontSize: 12, fontFamily: Fonts.RobotoRegular, },
  taggedByName: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
  status: { textAlign: 'center', backgroundColor: "#DCD4FF", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },
  status1: { textAlign: 'center', backgroundColor: "#DFD592", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },
  status2: { textAlign: 'center', backgroundColor: "#B1E7D5", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },
  status3: { textAlign: 'center', backgroundColor: "#DCD4FF", borderRadius: 10, fontSize: 12, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 2 },

  heading: {
    backgroundColor: Colors.white,
    marginVertical: AppUtil.getHP(2),
    marginHorizontal: 20,
    paddingVertical: AppUtil.getHP(2),
    borderRadius: 5,
    backgroundColor: Colors.beige,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feederHeading: {
    width: "75%",
    backgroundColor: Colors.white,
    paddingVertical: AppUtil.getHP(1.5),
    borderRadius: 5,
    backgroundColor: Colors.beige,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterView1: {
    width: AppUtil.getHP(6.16),
    height: AppUtil.getHP(6.16),
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.mapblue,

  },
  filterSaprater: { flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginVertical: 10 },
  heading1: {
    marginTop: AppUtil.getHP(2),
    marginHorizontal: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkBlack,
    marginLeft: AppUtil.getWP(3),
  },
  icnView: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptiontabView: { height: AppUtil.getHP(6.5), flexDirection: 'row', backgroundColor: Colors.orange },

  descriptiontab: { width: "50%", height: AppUtil.getHP(6), justifyContent: 'center', alignItems: 'center', backgroundColor: '#263D7E' },
  descriptiontab1: { width: "33.33%", height: AppUtil.getHP(6), justifyContent: 'center', alignItems: 'center', backgroundColor: '#263D7E', },
  showView: {
    width: '90%', height: AppUtil.getHP(6), justifyContent: 'space-between', alignItems: 'center', marginTop: AppUtil.getHP(1), marginHorizontal: "5%", backgroundColor: Colors.white,
    paddingHorizontal: AppUtil.getWP(4), flexDirection: 'row', borderRadius: 10
  },
  headingText1: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.darkBlack,
    marginLeft: AppUtil.getWP(3),
  },
  recentMainView: { marginTop: 8, marginBottom: AppUtil.getHP(6) },
  recentMainView1: { marginBottom: AppUtil.getHP(6), },
  buttomBtnView: { flexDirection: 'row', position: 'absolute', bottom: 0 },
  buttomBtn1: { width: '50%', height: AppUtil.getHP(5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#DFD592' },
  buttomBtn2: { width: '50%', height: AppUtil.getHP(5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#B1E7D5' },
  buttomBtn3: { width: '100%', height: AppUtil.getHP(5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#DFD592' },
  buttomBtn4: { width: '100%', height: AppUtil.getHP(5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#B1E7D5' },

  buttomBtn5: { width: '50%', height: AppUtil.getHP(5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#ACCFFD' },
  buttomBtn6: { width: '50%', height: AppUtil.getHP(5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5C0BB' },

  txtBtn1: { fontSize: 14, fontWeight: "bold", color: Colors.darkBlack, marginLeft: AppUtil.getWP(3), },

  actionMainView: { width: "100%", paddingTop: AppUtil.getHP(2), backgroundColor: Colors.white },
  line: { width: "100%", borderBottomWidth: 2, borderColor: "#EBEBEB", marginTop: AppUtil.getHP(1) },
  roundView: { width: AppUtil.getHP(4), height: AppUtil.getHP(4), borderRadius: AppUtil.getHP(4), backgroundColor: 'rgba(232,234,241,255)', marginHorizontal: "4%", justifyContent: 'center', alignItems: 'center' },
  centerView: { width: "65%" },
  actionMainInnerView: { flexDirection: 'row' },

  view1: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  view2: { marginTop: 5 },

  txt1: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", },
  txt2: { color: Colors.black, fontSize: 12, marginLeft: 5 },
  txt3: { color: Colors.black, fontSize: 12, fontWeight: "bold", },
  txt4: { color: Colors.black, fontSize: 12, fontWeight: "bold", },
  txt5: { color: "#8A8A8A", fontSize: 12, },

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
    width: "95%",
    marginVertical: "10%",
    marginHorizontal: "5%",
    alignSelf: "center",
    padding: AppUtil.getHP(3),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.darkBlack,
  },

  ViewmarginTop: {
    paddingHorizontal: 10,
    marginTop: AppUtil.getHP(2),
  },
  imageList: { width: "90%", marginTop: AppUtil.getWP(3), flexDirection: 'row', alignSelf: 'center', },
  imagestyle: { width: AppUtil.getWP(25), height: AppUtil.getWP(25), borderRadius: 5 },
  imagestyle2: { width: AppUtil.getWP(25), height: AppUtil.getWP(25), marginHorizontal: "8.3%", borderRadius: 5 },
  detailsView: { width: "90%", marginTop: AppUtil.getWP(3), borderRadius: 5, alignSelf: 'center', backgroundColor: '#fff', padding: 12 },

  cardRightTop: {
    flexDirection: "row",
    marginTop: 8
  },
  rightDate: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: 500,

  },
  rightTime: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 20
  },
  rightAddress: {
    color: Colors.darkBlack,
    fontSize: 12,
    marginTop: 8
  },
  cardLatLong: {
    flexDirection: "row",
    marginTop: 2,
    marginLeft: AppUtil.getWP(2),
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
  cardLatsLongs: {
    flexDirection: "row",
    marginLeft: AppUtil.getWP(2),
  },
  longs: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    width: "50%",
    paddingRight: 15,
  },
  lats: {
    color: Colors.secondary,
    fontSize: 14,
    width: "50%",
    fontWeight: "bold",
  },
  cardRightBottom: {
    marginLeft: AppUtil.getWP(2),
    flexDirection: "row",
    marginTop: 5,
  },
  descriptiontabView1: { height: AppUtil.getHP(6.5), borderBottomWidth: 2, borderBottomColor: "#EBEBEB", justifyContent: "center", paddingHorizontal: 20, backgroundColor: Colors.white },
  txt6: { color: Colors.black, fontWeight: 'bold', fontSize: 16 },

  btnView: {
    flexDirection: 'row',
  },
  buttonView1: {
    width: "50%",
    height: 30,
    backgroundColor: '#ACCFFD',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView2: {
    width: "50%",
    height: 30,
    backgroundColor: '#F5C0BB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyListStyle: { marginTop: AppUtil.getHP(30), alignSelf: 'center', },

  powerView: { marginTop: 10, marginHorizontal: 10, padding: 15, backgroundColor: "#fff", borderRadius: 10 },
  headText: { fontFamily: Fonts.RobotoRegular, color: Colors.black, fontSize: 12, },
  SubText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 13,
    color: Colors.black,
    marginTop: 3,
  },

  firstRow: { width: "50%" },
  powerViewInner: { flexDirection: "row" },
  filterView: {
    position: 'absolute',
    width: AppUtil.getHP(6.16),
    height: AppUtil.getHP(6.16),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.mapblue,
    bottom: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10
  },
  descriptiontab2: { width: "50%", height: AppUtil.getHP(6), justifyContent: 'center', alignItems: 'center', backgroundColor: '#263D7E', flexDirection: "row" },
  count: { width: 20, height: 20, backgroundColor: Colors.white, textAlign: 'center', borderRadius: 20, marginLeft: 5, fontSize: 13, color: Colors.black, },
});
