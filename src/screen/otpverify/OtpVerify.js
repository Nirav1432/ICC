import React, { memo, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, BackHandler } from "react-native";
import { OtpVerifyStyle } from "./OtpVerifyStyle";
import LinearGradient from "react-native-linear-gradient";
import { Labels } from "../../utils/Labels";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserManager } from "../../manager/UserManager";
import { SqlData } from "../../database/SqlData";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { onLoading } from "../../../App";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Jsencrypt } from "../../service/JsencryptService";
import { Loger } from "../../utils/Loger";

var _click = true;
let _clicked = true;
const OtpVerify = (props) => {

  const { LoginResponse, LoginEmail, LoginPassword, LoginCaptcha } = props.route.params;

  const otpFields1 = useRef();
  const otpFields2 = useRef();
  const otpFields3 = useRef();
  const otpFields4 = useRef();
  const otpFields5 = useRef();
  const otpFields6 = useRef();

  const [counter, setCounter] = useState(60); // Countdown time
  const [isResending, setIsResending] = useState(false);

  const [isVerificationNoFirst, setVerificationNoFirst] = useState("")
  const [isVerificationNoSecond, setVerificationNoSecond] = useState("")
  const [isVerificationNoTherd, setVerificationNoTher] = useState("")
  const [isVerificationNoFour, setVerificationNoFour] = useState("")
  const [isVerificationNoFive, setVerificationNoFive] = useState("")
  const [isVerificationNoSix, setVerificationNoSix] = useState("")

  var mobileNumber = (LoginResponse?.mobile).slice(-4).padStart((LoginResponse?.mobile).length, "*");

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    // BackHandler.addEventListener('hardwareBackPress', backAction);
    // return () => {
    //   BackHandler.removeEventListener('hardwareBackPress', backAction);
    // };
  }, []);
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const onMoveNext = () => {
    const OTPdata = {
      email: LoginEmail,
      otp: Jsencrypt.encrypt(isVerificationNoFirst + isVerificationNoSecond + isVerificationNoTherd + isVerificationNoFour + isVerificationNoFive + isVerificationNoSix + "")
    }
    if (_click) {
      _click = false;

      onLoading(true);
      Service.post(EndPoints.getverifyotp, OTPdata, (response) => {

        _click = true;
        onLoading(false);

        if (response?._resultflag == 1) {
          onNext(Jsencrypt.decrypt(response?.data));
        }
        else {
          Alert.alert("Alert", response?.message);
        }
      }, (err) => {
        _click = true;
        onLoading(false);
      })
    }
  };

  const onNext = (response) => {

    UserManager.email = response?.email;
    UserManager.id = response?.id;
    UserManager.role_id = response?.role_id;
    UserManager.role_name = response?.role_name;
    UserManager.discom_id = response?.discom_id;
    UserManager.first_name = response?.first_name;
    UserManager.last_name = response?.last_name;
    UserManager.mobile = response?.mobile;
    UserManager.state_ids = response?.state_ids;
    UserManager.status = response?.status;
    UserManager.otp = response?.otp;
    UserManager.login_status = response?.login_status;
    UserManager.login_token = response?.login_token;
    UserManager.created_at = response?.created_at;
    UserManager.updated_at = response?.updated_at;
    UserManager.created_by = response?.created_by;
    UserManager.updated_by = response?.updated_by;
    UserManager.fp_token = response?.fp_token;
    UserManager.fp_token_at = response?.fp_token_at;
    UserManager.is_password_reset = response?.is_password_reset;
    UserManager.nodal_agency = response?.nodal_agency;
    UserManager.discom_name = response?.discom_name;
    UserManager.image_path = response?.image_path;
    UserManager.login_token_at = response?.login_token_at;
    UserManager.is_password_reset = response?.is_password_reset;


    SqlData.openSQlDatabase();
    let respo = Jsencrypt.encrypt(response)
    let userData = {};

    userData.email = respo?.email;
    userData.id = respo?.id;
    userData.role_id = respo?.role_id;
    userData.role_name = respo?.role_name;
    userData.discom_id = respo?.discom_id;
    userData.first_name = respo?.first_name;
    userData.last_name = respo?.last_name;
    userData.mobile = respo?.mobile;
    userData.state_ids = respo?.state_ids;
    userData.status = respo?.status;
    userData.otp = respo?.otp;
    userData.login_status = respo?.login_status;
    userData.login_token = respo?.login_token;
    userData.created_at = respo?.created_at;
    userData.updated_at = respo?.updated_at;
    userData.created_by = respo?.created_by;
    userData.updated_by = respo?.updated_by;
    userData.fp_token = respo?.fp_token;
    userData.fp_token_at = respo?.fp_token_at;
    userData.is_password_reset = respo?.is_password_reset;
    userData.nodal_agency = respo?.nodal_agency;
    userData.discom_name = respo?.discom_name;
    userData.image_path = respo?.image_path;
    userData.login_token_at = respo?.login_token_at;
    userData.is_password_reset = respo?.is_password_reset;

    AsyncStorage.setItem("@user", JSON.stringify(userData));

    if (UserManager.role_id == 3)
      props.navigation.dispatch(StackActions.replace("ApproverRoot"))
    else
      props.navigation.dispatch(StackActions.replace("MyDrawer"))

  };

  const OnResendOTP = async () => {
    setIsResending(true);
    if (_clicked) {
      _clicked = false;

      onLoading(true);
      Service.post(EndPoints.login, { email: LoginEmail, pwd: LoginPassword, systemCaptcha: LoginCaptcha, enteredCaptcha: LoginCaptcha }, (response) => {

        _clicked = true;
        onLoading(false);

        if (response._resultflag == "1") {
          try {
            Alert.alert('Success', 'OTP has been resent!');
            setCounter(60); // Reset timer
          } catch (error) {
            Alert.alert('Error', 'Failed to resend OTP.');
          } finally {
            setIsResending(false);
          }
        }
        else
          Alert.alert("Alert", response.message);
        // setCounter(120); // Reset timer
        setIsResending(false);
        // showErrorToast(response.message);

      }, (err) => {
        _clicked = true;
        // Loger.onLog("error",err)
      }
      );
    }
  };

  return (
    <SafeAreaView style={OtpVerifyStyle.container}>
      <LinearGradient
        colors={["#F58216", "#1B2F68"]}
        style={OtpVerifyStyle.background}
      >
        <View style={OtpVerifyStyle.headerStyle}>
          <View style={OtpVerifyStyle.back}>
          </View>
          <Text style={OtpVerifyStyle.headerText}>{Labels.otpHeader}</Text>
        </View>
        <View style={OtpVerifyStyle.innerContentContainer}>
          <View style={OtpVerifyStyle.contentContainer}>
            <Text style={OtpVerifyStyle.title}>
              {Labels.otpTitle} {mobileNumber}
            </Text>
            
            <View style={OtpVerifyStyle.inputContainer}>

              <TextInput
                key={"1"}
                ref={(otpFields1)}
                style={OtpVerifyStyle.inputBox}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
                onChangeText={(text) => {
                  if (text.length === 1) {
                    setVerificationNoFirst(text);
                    otpFields2.current?.focus();
                  }
                  else if (text.length === 0) {
                    setVerificationNoFirst("");
                  }
                }}
              />
              <TextInput
                ref={(otpFields2)}
                key={"2"}
                style={OtpVerifyStyle.inputBox}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
                onChangeText={(text) => {
                  if (text.length === 1) {
                    setVerificationNoSecond(text);
                    otpFields3.current?.focus();
                  } else if (text.length === 0) {
                    setVerificationNoSecond("");
                    otpFields1.current.focus();
                  }
                }}
              />
              <TextInput
                ref={(otpFields3)}
                key={"3"}
                style={OtpVerifyStyle.inputBox}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
                onChangeText={(text) => {
                  if (text.length === 1) {
                    setVerificationNoTher(text);
                    otpFields4.current?.focus();
                  } else if (text.length === 0) {
                    setVerificationNoTher("");
                    otpFields2.current.focus();
                  }
                }}
              />
              <TextInput
                ref={(otpFields4)}
                key={"4"}
                style={OtpVerifyStyle.inputBox}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
                onChangeText={(text) => {
                  if (text.length === 1) {
                    setVerificationNoFour(text);
                    otpFields5.current?.focus();
                  } else if (text.length === 0) {
                    setVerificationNoFour("");
                    otpFields3.current?.focus();
                  }
                }}
              />

              <TextInput
                ref={(otpFields5)}
                key={"5"}
                style={OtpVerifyStyle.inputBox}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
                onChangeText={(text) => {
                  if (text.length === 1) {
                    setVerificationNoFive(text);
                    otpFields6.current?.focus();
                  } else if (text.length === 0) {
                    setVerificationNoFive("");
                    otpFields4.current.focus();
                  }
                }}
              />

              <TextInput
                ref={(otpFields6)}
                key={"6"}
                style={OtpVerifyStyle.inputBox}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
                onChangeText={(text) => {
                  if (text.length === 1) {
                    setVerificationNoSix(text);
                  } else if (text.length === 0) {
                    setVerificationNoSix("");
                    otpFields5.current.focus();
                  }
                }}
              />

            </View>


            {/* <Text style={OtpVerifyStyle.resendText}>
              {Labels.otpResend1}
              <TouchableOpacity onPress={() => { resendOTP() }}>
                <Text style={OtpVerifyStyle.resendtextunderline}>
                  &nbsp;{Labels.otpResend2}
                </Text>
              </TouchableOpacity>
            </Text> */}

            {counter === 0 ? (
              <TouchableOpacity
                style={OtpVerifyStyle.resendButton}
                onPress={OnResendOTP}
                disabled={isResending}
              >
                <Text style={OtpVerifyStyle.resendText}>
                  {isResending ? Labels.otpResend1 : Labels.otpResend2}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={OtpVerifyStyle.timerText}>Resend available in {counter}s</Text>
            )}

            {
              (isVerificationNoFirst != "" && isVerificationNoSecond != "" && isVerificationNoTherd != "" && isVerificationNoFour != "" && isVerificationNoFive != "" && isVerificationNoSix != "") &&
              <TouchableOpacity onPress={() => onMoveNext()} style={OtpVerifyStyle.verifyButton}>
                <Text style={OtpVerifyStyle.verifyButtonText}>
                  {Labels.otpButton}
                </Text>
              </TouchableOpacity>
            }

          </View>
        </View>
      </LinearGradient>

    </SafeAreaView>
  );
};

export default memo(OtpVerify);