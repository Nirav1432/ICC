import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { memo, useEffect } from "react";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { ProfileStyle } from "./ProfileStyle";
import { UserManager } from "../../manager/UserManager";
import { Images } from "../../utils/Images";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { Fonts } from "../../utils/Fonts";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = (props) => {
  useEffect(() => {
  }, []);

  const handleLogin = () => {
    props.navigation.navigate("Changepassword");
  }

  return (
    <SafeAreaView >
      <KeyboardAwareScrollView >
        <Header
          title="My Profile"
          leftIcon={<IcnBack />}
          onLeftPress={() => props.navigation.goBack()}
        />
        <View style={ProfileStyle.SecondView}>
          <View style={ProfileStyle.blueView} />
          <View style={ProfileStyle.absolateView}>
            <Image style={ProfileStyle.userProfile} source={Images.logos} />
            <Text style={ProfileStyle.uNameText}>{UserManager.first_name} {UserManager.last_name}</Text>
          </View>
          <View style={ProfileStyle.absolateSecondView}>

            <Text style={ProfileStyle.headText}>Organization</Text>
            <Text style={ProfileStyle.SubText}>
              {UserManager.discom_name}
            </Text>
            <View style={ProfileStyle.line} />

            <Text style={ProfileStyle.headText}>Mobile No</Text>
            <Text style={ProfileStyle.SubText}>
              +91 - {UserManager.mobile}
            </Text>
            <View style={ProfileStyle.line} />

            <Text style={ProfileStyle.headText}>Email ID</Text>
            <Text style={ProfileStyle.SubText}>
              {UserManager.email}
            </Text>
            <View style={ProfileStyle.line} />

            <Text style={ProfileStyle.headText}>Gender</Text>
            <Text style={ProfileStyle.SubText}>
              Male
            </Text>
            <View style={ProfileStyle.line} />

            <Text style={ProfileStyle.headText}>Designation</Text>
            <Text style={ProfileStyle.SubText}>
              Lpsum Lorem Text
            </Text>
            <View style={ProfileStyle.line} />

            <Text style={ProfileStyle.headText}>Role</Text>
            <Text style={ProfileStyle.SubText}>
              {UserManager.role_name}
            </Text>
            <View style={ProfileStyle.line} />


            <TouchableOpacity onPress={handleLogin} style={{ marginTop: 10, borderRadius: 5, alignItems: "center", justifyContent: "center", height: 45, backgroundColor: Colors.orange }}>
              <Text style={{ fontSize: AppUtil.getHP(2), fontFamily: Fonts.RobotoMedium, color: Colors.white, }}>{"Change Password"}</Text>
            </TouchableOpacity>

          </View>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(Profile);
