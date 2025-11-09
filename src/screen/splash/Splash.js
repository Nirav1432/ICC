import { View, ImageBackground, Image, Alert, BackHandler } from "react-native";
import React, { memo, useState, useRef, useEffect, } from "react";
import { Images } from "../../utils/Images";
import { SplashStyles } from "./SplashStyle";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserManager } from "../../manager/UserManager";
import { fetch } from "@react-native-community/netinfo";
import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY } from "../../service/appConfig";
import { SqlData } from "../../database/SqlData";
import { Jsencrypt } from "../../service/JsencryptService";

const Splash = (props) => {
  useEffect(() => {
    SqlData.openSQlDatabase();
    Geocoder.init(GOOGLE_API_KEY);
  }, [])

  useEffect(() => {
    fetch().then(state => {
      AsyncStorage.getItem("@user").then((response) => {

        if (response != "null" && response != null) {
          const res = JSON.parse(response);
          
          if (res != null && res != undefined) {
            UserManager.email = Jsencrypt.decrypt(res.email);
            UserManager.id = Jsencrypt.decrypt(res.id);
            UserManager.role_id = Jsencrypt.decrypt(res.role_id);
            UserManager.role_name = Jsencrypt.decrypt(res.role_name);
            UserManager.discom_id = Jsencrypt.decrypt(res.discom_id);
            UserManager.first_name = Jsencrypt.decrypt(res.first_name);
            UserManager.last_name = Jsencrypt.decrypt(res.last_name);
            UserManager.mobile = Jsencrypt.decrypt(res.mobile);
            UserManager.state_ids = Jsencrypt.decrypt(res.state_ids);
            UserManager.status = Jsencrypt.decrypt(res.status);
            UserManager.otp = Jsencrypt.decrypt(res.otp);
            UserManager.login_status = Jsencrypt.decrypt(res.login_status);
            UserManager.login_token = Jsencrypt.decrypt(res.login_token);
            UserManager.created_at = Jsencrypt.decrypt(res.created_at);
            UserManager.updated_at = Jsencrypt.decrypt(res.updated_at);
            UserManager.created_by = Jsencrypt.decrypt(res.created_by);
            UserManager.updated_by = Jsencrypt.decrypt(res.updated_by);
            UserManager.fp_token = Jsencrypt.decrypt(res.fp_token);
            UserManager.fp_token_at = Jsencrypt.decrypt(res.fp_token_at);
            UserManager.is_password_reset = Jsencrypt.decrypt(res.is_password_reset);
            UserManager.nodal_agency = Jsencrypt.decrypt(res.nodal_agency);
            UserManager.discom_name = Jsencrypt.decrypt(res.discom_name);
            UserManager.image_path = Jsencrypt.decrypt(res.image_path);
            UserManager.login_token_at = Jsencrypt.decrypt(res.login_token_at);
            UserManager.is_password_reset = Jsencrypt.decrypt(res.is_password_reset);

            
            if (!state.isConnected) {
              Alert.alert("Alert", "Connection lost. Are you sure you would like to continue geotagging offline?", [
                {
                  text: "Continue",
                  onPress: () => {
                    props.navigation.dispatch(StackActions.replace("OffLineRoot"))
                  },
                },
              ]);
            }
            else if (Jsencrypt.decrypt(res.role_id) == 3) {
              props.navigation.dispatch(StackActions.replace("ApproverRoot"))
            }
            else {
              props.navigation.dispatch(StackActions.replace("MyDrawer"))
            }
          } else{
            props.navigation.dispatch(StackActions.replace("LoginRoot"));
          }
        } else{
          props.navigation.dispatch(StackActions.replace("LoginRoot"));
        }
      })

    });

  }, []);

  return (
    <View style={SplashStyles.container}>
      <Image
        source={Images.splash}
        style={SplashStyles.backgroundImage}
        resizeMode={"cover"}
      />

      <View style={SplashStyles.logoContainer}>
        <ImageBackground source={Images.logos} style={SplashStyles.logo} />
      </View>
    </View>
  );
};

export default memo(Splash);
