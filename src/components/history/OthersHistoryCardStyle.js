import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";

export const OthersHistoryCardStyle = StyleSheet.create({

  card: {
    width: "92%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  cardSr: {
    width: "90%",
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
 
  cardTitle: {
    color: Colors.lightGray,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: AppUtil.getHP(1),
  },
  cardTitles: {
    marginLeft: AppUtil.getWP(4),
    marginTop: AppUtil.getHP(1),
  },
  bottomBorder: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: AppUtil.getHP(2),
    paddingVertical: AppUtil.getHP(2),
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
    paddingRight:15,
    
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
    backgroundColor: '#DFD592',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView2: {
    width: "50%",
    height: 30,
    backgroundColor: '#B1E7D5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView3: {
    width: "100%",
    height: 30,
    backgroundColor: '#DFD592',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView4: {
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
