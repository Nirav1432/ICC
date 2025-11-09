import { View, Text, Image, TouchableOpacity, ScrollView, Alert, } from "react-native";
import React, { memo, useEffect, useState } from "react";
import DrawerStyles from "./DrawerStyle";
import IcnHeaderBack from "../assets/svg/IcnHeaderBack";
import { Labels } from "../utils/Labels";
import { Images } from "../utils/Images";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserManager } from "../manager/UserManager";
import { SafeAreaView } from "react-native-safe-area-context";
import { Service } from "../service/Service";
import { EndPoints } from "../service/Endpoints";
import { onLoading } from "../../App";
import { SqlData } from "../database/SqlData";

let _isClicked = true;
const ApproverDrawer = (props) => {

  const [drawerData, setDrawerData] = useState([{ title: "RDSS Dashboard", index: 1 }, { title: "Geotagging of RDSS Assets", index: 2 }, { title: "Contact Us", index: 3 }, { title: "Delete Account", index: 4 }]);


  const onSelectOption = (selectScreen) => {

    if (selectScreen == 1) {
      props.navigation.navigate("ApprovarRDSSdashboard")
    }
    else if (selectScreen == 2) {
      props.navigation.navigate("ApprovalHomeScreen")
    }
    else if (selectScreen == 3) {
      props.navigation.navigate("ContactUs")
    }
    else if (selectScreen == 4) {
      props.navigation.navigate("DeleteAccount")
    }

  }

  const onLogoutUser = async () => {

    if (_isClicked) {
      _isClicked = false;
      onLoading(true);

      Service.post(EndPoints.logout, { login_token: UserManager.login_token, is_approver: 1 }, (response) => {
        onLoading(false);
        if (response?.resultflag) {
          _isClicked = true;
          AsyncStorage.setItem('@user', JSON.stringify(null));
          SqlData.clearDataBase()
          Alert.alert(
            "Alert", response?.message,
            [
              {
                text: "OKAY",
                onPress: () => { props.navigation.dispatch(StackActions.replace("LoginRoot")); },
              },
            ]
          );
        }
        else {
          Alert.alert("Alert", response?.message);
        }
      },
        (err) => {
          onLoading(false);
        }
      );
    }
  }


  return (
    <SafeAreaView style={DrawerStyles.safeView}>
      <View style={DrawerStyles.container}>
        <View style={DrawerStyles.profileView}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }} onPress={() => props.navigation.navigate("ApprovarProfile")}>
            <Image style={DrawerStyles.profileImage} source={Images.logos} />
            <View>
              <Text style={DrawerStyles.unText}>{UserManager.first_name} {UserManager.last_name}</Text>
              <Text style={DrawerStyles.unSubText}>{UserManager.last_name}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={DrawerStyles.backBtn}
          >
            <IcnHeaderBack width={34} height={34} />
          </TouchableOpacity>
        </View>

        <View style={DrawerStyles.menuView}>
          <ScrollView>
            {drawerData.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => onSelectOption(item?.index)} style={DrawerStyles.menuItem}>
                  <Text style={DrawerStyles.menuText1}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={DrawerStyles.footerView}>
          <TouchableOpacity style={DrawerStyles.footerBtn} onPress={() => { onLogoutUser() }}>
            <Text style={DrawerStyles.footerText1}>{Labels.signOut}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(ApproverDrawer);
