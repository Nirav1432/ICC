import { StyleSheet, } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

export const ApprovarProfileStyle = StyleSheet.create({
    mainView: {
        marginBottom: AppUtil.getHP(8),
        backgroundColor: Colors.primaryBackground,
      },
      SecondView:{
        backgroundColor:Colors.disableViewColor,
        width:'100%',
        height:AppUtil.getHP(90)
      },
      blueView:{
        backgroundColor:Colors.headerColor,
        height:AppUtil.getHP(20),
      },
      absolateView:{
        // position:"absolute",
        marginHorizontal:AppUtil.getWP(4.33),
        backgroundColor:Colors.white,
        marginTop:AppUtil.getHP(-13),
        height:AppUtil.getHP(18),
        alignItems:'center',
        borderBottomColor:Colors.orange,
        borderBottomWidth:5,
      },
      userProfile:{
        height:AppUtil.getHP(18),
        width:AppUtil.getHP(18),
        borderRadius:AppUtil.getHP(100),
        borderWidth:5,
        borderColor:Colors.white,
        marginTop:AppUtil.getHP(-8),
        backgroundColor:Colors.disableViewColor
      },
      uNameText:{
        fontFamily:Fonts.RobotoBlack,
        fontSize:AppUtil.getHP(2.25),
        color:Colors.black,
        marginTop:10
      },
      absolateSecondView:{
        marginHorizontal:AppUtil.getWP(4.33),
        backgroundColor:Colors.white,
        marginTop:AppUtil.getHP(2),
        // height:AppUtil.getHP(18),
        // paddingBottom:9,
        padding:AppUtil.getHP(2),
      },
      headText:{
        fontFamily:Fonts.RobotoRegular,
        fontSize:AppUtil.getHP(2),
        color:Colors.lightGray,
        marginTop:10,
      },
      SubText:{
        fontFamily:Fonts.RobotoBold,
        fontSize:AppUtil.getHP(2),
        color:Colors.black,
        marginTop:3
      },
      line:{
        backgroundColor:Colors.lightGray,
        height:1,
        marginTop:10,
      }
});
