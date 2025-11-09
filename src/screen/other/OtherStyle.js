
import { StyleSheet } from "react-native";
import { AppUtil } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";

const PageStyle = StyleSheet.create({

  mainView: {
    marginBottom: AppUtil.getHP(6),
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: AppUtil.getHP(2),
    width: "100%",
  },

  container: {
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
    fontSize: 12,
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
    paddingVertical: AppUtil.getHP(2),
    backgroundColor: Colors.secondaryBG10,
  },
  flexView: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
    paddingHorizontal: AppUtil.getWP(4),
    paddingVertical: AppUtil.getHP(2),
    backgroundColor: Colors.primaryBackground,
    flexWrap: "wrap",
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
  //---------------------------------------------------//
  mainView1: {
    marginBottom: AppUtil.getHP(8),
  },
  container1: {
    flex: 1,
    color: Colors.primaryBackground,
    backgroundColor: Colors.primaryBackground,
  },
  title: {
    backgroundColor: Colors.white,
    padding: AppUtil.getHP(2),
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
    borderRadius: 10,
  },
  assetsText: {
    color: Colors.mediumGray,
    marginTop: AppUtil.getHP(1),
    fontSize: 14,
    textAlign: "center",
  },

  title1: {
    backgroundColor: Colors.white,
    padding: AppUtil.getHP(2),
  },
  text: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: 500,

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
    width: '100%', height: AppUtil.getHP(30), marginTop: 10, borderWidth: 0.5,
    borderColor: Colors.orange,
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
  imageContainer: {
    flexDirection: "row",
    marginTop: AppUtil.getHP(2),
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

  formContainer: {
    width: '100%',
    height: '92%',
  },
  marginTop: {
    height: AppUtil.getHP(9),
    paddingHorizontal: 10,
    marginTop: AppUtil.getHP(2),
  },
  twobtn:{width: "100%", flexDirection:"row", justifyContent:'space-between'},

  btnFormSubmit: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnDrop: {
    width: "85%",
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: AppUtil.getWP(3),
    color: Colors.darkBlack,
  },
  btnSearch: {
    width: AppUtil.getHP(6.16),
    height: AppUtil.getHP(6.16),
    backgroundColor: Colors.orange,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    marginTop: AppUtil.getHP(2),
  },
  titles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: AppUtil.getHP(1),
  },
  leftTitle: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  rightTitle: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  commonCardView: {
    marginBottom: AppUtil.getHP(2),
  },
  asaText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 10,
    color: Colors.mediumGray,
    marginTop: 3,
  },

  heading: {
    marginTop: AppUtil.getHP(2),
    paddingVertical: AppUtil.getHP(1.5),
    borderRadius: 5,
    backgroundColor: Colors.beige,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: AppUtil.getWP(2),

    
  },
  headingText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: Fonts.RobotoMedium,
    color: Colors.darkBlack,
    marginLeft: AppUtil.getWP(3),
  },
  textView: {
    width: "85%",
  },
  icnView: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  inpView: { width: '100%', height: AppUtil.getHP(6.16), backgroundColor: Colors.white, borderRadius: 5, justifyContent: "space-between", alignItems: "center", flexDirection: 'row', paddingHorizontal: AppUtil.getWP(3), },
});
export default PageStyle;
