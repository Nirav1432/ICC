import { View, Text, ImageBackground, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, } from "react-native";
import React, { memo, useState, useRef, useEffect } from "react";
import { Images } from "../../utils/Images";
import LoginStyles from "./LoginStyle";
import { Labels } from "../../utils/Labels";
import UserPassInput from "../../components/clogin/userpassinput/UserPassInput";
import IcnCheckRight from "../../assets/svg/IcnCheckRight";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import RandomCaptcha from "../../components/captcha/RandomCaptcha";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import IcnUnCheck from "../../assets/svg/IcnUnCheck";
import { Service, ServiceLogin } from "../../service/Service";
import { EndPoints } from "./../../service/Endpoints";
import { onLoading } from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Jsencrypt } from "../../service/JsencryptService";
import { SafeAreaView } from "react-native-safe-area-context";

let _clicked = true;
const Login = (props) => {

  const [isEmail, setEmail] = useState("tkc1_dvvnl@mailinator.com");
  const [isPassword, setPassword] = useState("dvvnltkc1user1@123");

  const [isCaptchaAns, setCaptchaAns] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [isRefreshCaptcha, setRefreshCaptcha] = useState(false);

  const passwordRef = useRef();
  const captchaRef = useRef();

  useEffect(() => {
    AsyncStorage.getItem("@renenber").then((response) => {
      if (response != 'null' && response != null) {
        var res = Jsencrypt.decrypt(response);
        res = JSON.parse(res);
        setEmail(res.uname);
        setPassword(res.paass);
        setRememberMe(res.tick == 1 ? true : false);
      }
    });
  }, []);

  const handleEmailSubmit = () => {
    passwordRef.current?.focus();
  };

  const handlePasswordSubmit = () => {
    captchaRef.current?.focus();
  };

  const handleCaptchaSubmit = () => {
    handleLogin();
  };

  const toggleRememberMe = (value) => {
    setRememberMe(!value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {

    if(__DEV__)
    {

    }
    else if (!isEmail || !isPassword || enteredCaptcha !== isCaptchaAns) {
      setRefreshCaptcha(!isRefreshCaptcha)
      showErrorToast(!isEmail ? "Please enter email" : !isPassword ? "Please enter password" : "Please enter correct captcha");
      return;
    }

    if (_clicked) {
      _clicked = false;

      onLoading(true);
      ServiceLogin.post(EndPoints.login, { email: Jsencrypt.encrypt(isEmail), pwd: Jsencrypt.encrypt(isPassword), systemCaptcha: Jsencrypt.encrypt(isCaptchaAns), enteredCaptcha: Jsencrypt.encrypt(enteredCaptcha) }, (response) => {

        _clicked = true;
        onLoading(false);

        if (response._resultflag == "1") {
          let res = Jsencrypt.decrypt(response?.data);

          if (rememberMe) {
            var obj = {}
            obj.uname = isEmail;
            obj.paass = isPassword;
            obj.tick = 1;
            AsyncStorage.setItem('@renenber', Jsencrypt.encrypt(JSON.stringify(obj)));
          }
          else {
            AsyncStorage.setItem('@renenber', "");
          }
          props.navigation.navigate("VerifyOTP", { LoginResponse: res, LoginEmail: Jsencrypt.encrypt(isEmail), LoginPassword: Jsencrypt.encrypt(isPassword), LoginCaptcha: Jsencrypt.encrypt(enteredCaptcha) })
        }
        else
          Alert.alert("Alert", response.message);
        // showErrorToast(response.message);

      }, (err) => {
         onLoading(false);
        _clicked = true;
        // Loger.onLog("error",err)
      }
      );

    }


  };

  return (
    <SafeAreaView>
      <ImageBackground style={LoginStyles.bgImage} source={Images.bg_login}>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled" >

            <Text style={LoginStyles.signinText}>{Labels.sign_In}</Text>
            <Text style={LoginStyles.ippsText}>{Labels.IPPS_Schemes}</Text>

            <View style={LoginStyles.inputContainer}>

              <UserPassInput
                value={isEmail}
                isPass={false}
                title={Labels.username}
                onChangeText={(text) => setEmail(text)}
                returnKeyType="next"
                onSubmitEditing={() => handleEmailSubmit()}
              />

              <View style={LoginStyles.margin} />
              <UserPassInput
                value={isPassword}
                isPass={true}
                title={Labels.password}
                onChangeText={(text) => setPassword(text)}
                onTogglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                secureTextEntry={!showPassword}
                returnKeyType="next"
                onSubmitEditing={() => handlePasswordSubmit()}
                ref={passwordRef}
              />

              <View style={LoginStyles.rememberMeView}>
                <TouchableOpacity style={LoginStyles.btnRemember} onPress={() => toggleRememberMe(rememberMe)}>
                  {rememberMe ?
                    (<IcnCheckRight />)
                    :
                    (<>
                      <View style={LoginStyles.checkbox} />
                      <IcnUnCheck />
                    </>
                    )}
                  <Text style={LoginStyles.rememberText}>
                    {Labels.rememberMe}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={LoginStyles.forgetText}>
                    {/* {Labels.forgotPassword} */}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={LoginStyles.headText}>
                {Labels.captcha}
                <Text style={LoginStyles.redColor}>*</Text>
              </Text>

              <RandomCaptcha
                refresh={isRefreshCaptcha}
                onAns={(ans) => setCaptchaAns(ans)}
                keyboardType="numeric"
                onEnterCaptcha={(text) => setEnteredCaptcha(text)}
                returnKeyType="done"
                onSubmitEditing={() => handleCaptchaSubmit()}
                ref={captchaRef}
              />

              <SubmitBtn onPress={handleLogin} title={Labels.submit} />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

      </ImageBackground>
    </SafeAreaView>
  );
};

export default memo(Login);
