import { View, Text, Image, TouchableOpacity, ScrollView, Alert, } from "react-native";
import React, { useEffect, useState } from "react";
import DrawerStyles from "./DrawerStyle";
import IcnHeaderBack from "../assets/svg/IcnHeaderBack";
import { Labels } from "../utils/Labels";
import { Images } from "../utils/Images";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserManager } from "../manager/UserManager";
import { SqlData } from "../database/SqlData";
import { SafeAreaView } from "react-native-safe-area-context";
import { EndPoints } from "../service/Endpoints";
import { onLoading } from "../../App";
import { Service } from "../service/Service";

let _isClicked = true;
const MyDrawer = (props) => {

  const [drawerData, setDrawerData] = useState([{ title: "RDSS Dashboard", index: 3 }, { title: "Geotagging of RDSS Assets", index: 2 }, { title: "My History", index: 1 }, { title: "Offline", index: 0 }, 
    { title: "Old data", index: 4 }, { title: "Contact Us", index: 5 }, { title: "Delete Account", index: 6 }]);

  const onSelectOption = (selectScreen) => {

    if (selectScreen == 3) {
      // props.navigation.navigate("RDSSdashboard")
      props.navigation.navigate('HomeRoot', { screen: 'RDSSdashboard' });
    }
    else if (selectScreen == 2) {
      // props.navigation.navigate("HomeScreen")
      props.navigation.navigate('HomeRoot', { screen: 'HomeScreen' });
    }
    else if (selectScreen == 1) {
      // props.navigation.navigate("HistoryScreen")
      props.navigation.navigate('HomeRoot', { screen: 'HistoryScreen' });
    }
    else if (selectScreen == 0) {
      // props.navigation.navigate("OffLinedownlodDetailsScreen")
      props.navigation.navigate('HomeRoot', { screen: 'OffLinedownlodDetailsScreen' });
    }
    else if (selectScreen == 4) {
      // props.navigation.navigate("OldDataHomeScreen")
      props.navigation.navigate('HomeRoot', { screen: 'OldDataHomeScreen' });
    }
    else if (selectScreen == 5) {
      // props.navigation.navigate("ContactUs")
      props.navigation.navigate('HomeRoot', { screen: 'ContactUs' });
    }
    else if (selectScreen == 6) {
      // props.navigation.navigate("DeleteAccount")
      props.navigation.navigate('HomeRoot', { screen: 'DeleteAccount' });
    }
  }

  const onLogoutUser = async () => {

    if (_isClicked) {
      _isClicked = false;
      onLoading(true);

      Service.post(EndPoints.logout, { login_token: UserManager.login_token, is_approver: 0 }, (response) => {
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
          <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }} onPress={() => props.navigation.navigate("Profile")}>
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

export default MyDrawer;
