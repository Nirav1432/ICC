import { View, Text, Image } from "react-native";
import React, { memo, useEffect } from "react";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { ApprovarProfileStyle } from "./ApprovarProfileStyle";
import { UserManager } from "../../manager/UserManager";
import { Images } from "../../utils/Images";
import { SafeAreaView } from "react-native-safe-area-context";

const ApprovarProfile = (props) => {
    useEffect(() => {
    }, []);
    
  return (
    <SafeAreaView style={ApprovarProfileStyle.mainView}>
      <Header
        title="My Profile"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />
      <View style={ApprovarProfileStyle.SecondView}>
        <View style={ApprovarProfileStyle.blueView} />
        <View style={ApprovarProfileStyle.absolateView}>
          <Image style={ApprovarProfileStyle.userProfile} source={Images.logos} />
          <Text style={ApprovarProfileStyle.uNameText}>{UserManager.first_name} {UserManager.last_name}</Text>
        </View>
        <View style={ApprovarProfileStyle.absolateSecondView}>

          <Text style={ApprovarProfileStyle.headText}>Organization</Text>
          <Text style={ApprovarProfileStyle.SubText}>
            {UserManager.discom_name}
          </Text>
          <View style={ApprovarProfileStyle.line} />

          <Text style={ApprovarProfileStyle.headText}>Mobile No</Text>
          <Text style={ApprovarProfileStyle.SubText}>
          +91 - {UserManager.mobile}
          </Text>
          <View style={ApprovarProfileStyle.line} />

          <Text style={ApprovarProfileStyle.headText}>Email ID</Text>
          <Text style={ApprovarProfileStyle.SubText}>
          {UserManager.email}
          </Text>
          <View style={ApprovarProfileStyle.line} />

          <Text style={ApprovarProfileStyle.headText}>Gender</Text>
          <Text style={ApprovarProfileStyle.SubText}>
          Male
          </Text>
          <View style={ApprovarProfileStyle.line} />

          <Text style={ApprovarProfileStyle.headText}>Designation</Text>
          <Text style={ApprovarProfileStyle.SubText}>
          Lpsum Lorem Text
          </Text>
          <View style={ApprovarProfileStyle.line} />

          <Text style={ApprovarProfileStyle.headText}>Role</Text>
          <Text style={ApprovarProfileStyle.SubText}>
          {UserManager.role_name}
          </Text>
          <View style={ApprovarProfileStyle.line} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(ApprovarProfile);
