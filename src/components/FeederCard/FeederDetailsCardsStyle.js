import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

export const CommonStyle = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: AppUtil.getWP(5),
    width: "90%",
    alignSelf: "center",
  },
  cardTitles: {
    marginLeft: AppUtil.getWP(4),
    marginTop: AppUtil.getHP(2),
  },

  cardSr: {
    width: "70%",
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: AppUtil.getHP(1),
  },
  cardTitle: {
    color: Colors.lightGray,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: AppUtil.getHP(1),
  },

  bottomBorder: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    padding: AppUtil.getHP(2),
  },

  cardLeft: {
    width: "30%",
    height: "30%",
  },
  cardRight: {
    width: "70%",
    flexDirection: "column",
  },
  cardRightTop: {
    flexDirection: "row",
    marginLeft: AppUtil.getWP(2),

  },
  rightDate: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: 500,
    width: "50%",
  },
  rightTime: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 500,
    width: "50%",
  },
  cardRightAddress: {
    marginLeft: AppUtil.getWP(2),
    marginTop: 1,
  },
  rightAddress: {
    color: Colors.darkBlack,
    fontSize: 12
  },
  rightAddress1: {
      color: Colors.darkBlack,
      fontSize: 12,
      fontFamily:Fonts.RobotoMedium
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
    paddingRight: 20,
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
    marginTop: 2,
  },
  rightBottomText: {
    color: Colors.secondary,
    fontSize: 12,
  },
  taggedByName: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  rightBottomText1: {
    color: Colors.secondary,
    fontSize: 14,
  },
  taggedByName1: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
  taggedByName2: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },

  image: {
    borderRadius: 10,
    width: AppUtil.getWP(24.5),
    height: AppUtil.getHP(10),
  },
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

  buttonView3: {
    width: "50%",
    height: 30,
    backgroundColor: '#DFD592',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView4: {
    width: "50%",
    height: 30,
    backgroundColor: '#B1E7D5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView5: {
    width: "100%",
    height: 30,
    backgroundColor: '#DFD592',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView6: {
    width: "100%",
    height: 30,
    backgroundColor: '#B1E7D5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  status1: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#DFD592", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
  status2: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#B1E7D5", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
  status3: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#DCD4FF", borderRadius: 10, fontSize: 12, fontWeight: "bold", },

});
