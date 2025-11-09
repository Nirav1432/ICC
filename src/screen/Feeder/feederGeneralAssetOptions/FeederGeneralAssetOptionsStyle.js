import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { AppUtil } from "../../../utils/AppUtil";
import { Fonts } from "../../../utils/Fonts";

export const PageStyle = StyleSheet.create({
  mainView: {
    flex:1,
    backgroundColor: Colors.primaryBackground,
  },
  container: {
    flex: 1,
    color: Colors.grey,
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
  title: {
    backgroundColor: Colors.white,
    padding: AppUtil.getHP(1.5),
    flexDirection:"row",
    justifyContent:"space-between"
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
    color: "black"
  },
  btnSkip:{ height: AppUtil.getHP(4),width:AppUtil.getWP(20),borderRadius: 5, alignItems: "center", justifyContent: "center",  backgroundColor: Colors.orange },
  txtSkip:{ fontSize: AppUtil.getHP(2), color: Colors.white },
  subHeader: {
    width: "100%",
    height: AppUtil.getHP(5),
    backgroundColor: Colors.white,
    justifyContent: "center",
    paddingHorizontal: AppUtil.getWP(4),
  },

  subHeaderText: {
    fontSize: AppUtil.getHP(1.7),
    color: Colors.darkBlack,
    fontFamily: Fonts.RobotoBold,
  },
  innerContainer: {
    marginHorizontal: AppUtil.getWP(5),
    borderRadius: 10,
    marginBottom: AppUtil.getHP(2),
  },

  dropSelectText: {
    fontSize: 14,
    color: Colors.darkBlack,
    fontWeight: "500",
    alignSelf: "flex-start", // Align the title to the left
    marginBottom: AppUtil.getHP(1),
    marginTop: AppUtil.getHP(1),
  },
  modifySearch1: {
    flexDirection: "row",
    padding: AppUtil.getHP(1.5),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginTop: AppUtil.getHP(2),
  },
  modifySearchText1: {
    color: "black",
    width: "90%",
    fontWeight: 500,
    fontSize: 16,
  },
  modifySearch2: {
    flexDirection: "row",
    padding: AppUtil.getHP(1.5),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  modifySearchText2: {
    color: "black",
    width: "90%",
    fontWeight: 500,
    fontSize: 14,
  },
  options: {
    backgroundColor: Colors.disableViewColor,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  optionButton: {
    padding: AppUtil.getHP(1),
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingVertical: AppUtil.getHP(1.5),
  },

  lastOptionButton: {
    borderBottomWidth: 0,
  },
  btnTxt: {
    fontSize: 14,
    color: Colors.darkBlack,
    fontWeight: "bold",
    marginLeft: AppUtil.getWP(3),
  },

  imageContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: AppUtil.getHP(2),
    flexWrap: "wrap",
  },
  imagebtn: {
    marginHorizontal: AppUtil.getWP(1),
    width: "30%",
    height: AppUtil.getHP(10),
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: AppUtil.getHP(10),
    borderRadius: 10,

  },
  container1: {
    backgroundColor: Colors.white,

    flex: 1,
    marginBottom: AppUtil.getHP(1),
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
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
  enabledField: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    height: 80,
    color: Colors.darkBlack,
    width: "100%",
    paddingHorizontal: AppUtil.getWP(3),
  },
  textInput: {
    marginTop: 15,
    backgroundColor: Colors.disableViewColor,
    borderRadius: 5,
    height: AppUtil.getHP(6),
    padding: AppUtil.getWP(2),
    paddingTop:AppUtil.getWP(3),
    color: Colors.darkBlack,
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
  btnDTRSubmit:{
    width: "100%",
    height:AppUtil.getHP(7),
    marginTop: 10,
    padding:AppUtil.getHP(1),
    backgroundColor: Colors.white,
    alignItems:'center',
    justifyContent:"space-between",
    borderRadius:5,
    flexDirection: "row",    
  },
  txtAddDTRRDSS:{
    fontSize: 14,
    color: Colors.darkBlack,
    fontWeight: "500",
  },
  btnDTRClick:{
    width:"25%",
    height:AppUtil.getHP(5),
    backgroundColor:Colors.orange,
    justifyContent:'center',
    alignItems:"center",
    borderRadius:2,
  },
  txtAddDTR:{
    fontSize: 14,
    color: Colors.white,
    fontWeight: "500",
  },
});
