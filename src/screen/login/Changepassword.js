import { View, Text, ImageBackground, TouchableOpacity, Image, Alert } from "react-native";
import React, { memo, useState, useRef, useEffect } from "react";
import { Images } from "../../utils/Images";
import LoginStyles from "./LoginStyle";
import { Labels } from "../../utils/Labels";
import ConfirmPassInput from "../../components/clogin/userpassinput/ConfirmPassInput";
import IcnCheckRight from "../../assets/svg/IcnCheckRight";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import RandomCaptcha from "../../components/captcha/RandomCaptcha";
import { ScrollView } from "react-native-gesture-handler";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import IcnUnCheck from "../../assets/svg/IcnUnCheck";
import { Service } from "../../service/Service";
import { EndPoints } from "./../../service/Endpoints";
import { onLoading } from "../../../App";
import { UserManager } from "../../manager/UserManager";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppUtil } from "../../utils/AppUtil";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions } from "@react-navigation/native";
import { Jsencrypt } from "../../service/JsencryptService";

const Changepassword = (props) => {

    const [isOldPassword, setOldPassword] = useState("");
    const [isNewPassword, setNewPassword] = useState("");
    const [isShowNewPassword, setShowNewPasswords] = useState(false);
    const [isConfirmPassword, setConfirmPassword] = useState("");
    const [isShowConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');


    const onShowNewPasswordVisibility = () => {
        setShowNewPasswords((prevShowPassword) => !prevShowPassword);
    };
    const onShowConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    const validatePassword = () => {
        // Define your validation rules here

        if (isOldPassword == "") {
            setError('Enter Old Password.');
            return false;
        }
        else if (isNewPassword.length < 7) {
            setError('Password must be at least 8 characters long.');
            return false;
        }
        else if (isNewPassword === isOldPassword) {
            setError('New password must be different from the old password.');
            return false;
        }
        else if (isNewPassword !== isConfirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        else if (!AppUtil.getValidatePassword(isNewPassword)) {
            setError('Password must include a combination of uppercase, lowercase, numbers, and special characters.');
        }
        else {

            setError('');
            return true;
        }
    }

    const onChnagePassword = () => {
        if (validatePassword()) {

            onLoading(true);
            var data = {
                "role_id":Jsencrypt.encrypt(UserManager.role_id),
                "user_id": Jsencrypt.encrypt(UserManager.id),
                "old_pwd": Jsencrypt.encrypt(isOldPassword),
                "new_pwd": Jsencrypt.encrypt(isNewPassword),
                "confirm_pwd": Jsencrypt.encrypt(isConfirmPassword),
            }
            Service.post(EndPoints.changepassword, data, (res) => {
                onLoading(false);
                if (res._resultflag === "1") {

                    // Alert.alert('Alert', "Your password hav been changed successfully", [
                    //     {
                    //         text: 'OK', onPress: () => {
                    //             props.navigation.goBack()
                    //         }
                    //     },
                    // ]);

                    // Simulate password change success
                    Alert.alert(
                        'Success',
                        'Password changed successfully. Please log in again.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    AsyncStorage.setItem('@user', JSON.stringify(null));
                                    props.navigation.dispatch(StackActions.replace("LoginRoot"));
                                },
                            },
                        ],
                    );


                }
                else
                    showErrorToast(res.message);
            }, (err) => {
                onLoading(false);
            }
            );
        }
    }




    const handleBack = () => {
        props.navigation.goBack()
    };

    return (
        <SafeAreaView>
            <ImageBackground style={LoginStyles.bgImage} source={Images.bg_login}>
                <KeyboardAwareScrollView>

                    <View style={LoginStyles.headerStyle}>
                        <View style={LoginStyles.back}>
                            <TouchableOpacity onPress={handleBack}>
                                <Image source={Images.back} />
                            </TouchableOpacity>
                        </View>
                        <Text style={LoginStyles.headerText}>{"Change Password"}</Text>
                    </View>

                    <View style={LoginStyles.inputContainer}>

                        <ConfirmPassInput
                            value={isOldPassword}
                            title={"Old Password"}
                            onChangeText={(value) => setOldPassword(value == 0 || value == "," || value == "." ? value.replace(/[^1-9]/g, '') : value)}

                        />
                        <View style={LoginStyles.margin} />

                        <ConfirmPassInput
                            value={isNewPassword}
                            isPass={true}
                            title={"New Password"}
                            onChangeText={(value) => setNewPassword(value == 0 || value == "," || value == "." ? value.replace(/[^1-9]/g, '') : value)}
                            onTogglePasswordVisibility={onShowNewPasswordVisibility}
                            showPassword={isShowNewPassword}
                            secureTextEntry={!isShowNewPassword}
                        />

                        <View style={LoginStyles.margin} />

                        <ConfirmPassInput
                            value={isConfirmPassword}
                            isPass={true}
                            title={"Confirm Password"}
                            onChangeText={(text) => setConfirmPassword(text)}
                            onTogglePasswordVisibility={onShowConfirmPasswordVisibility}
                            showPassword={isShowConfirmPassword}
                            secureTextEntry={!isShowConfirmPassword}
                        />

                        {error ? <Text style={{ color: 'red', marginTop: AppUtil.getHP(2) }}>{error}</Text> : null}

                        <SubmitBtn onPress={onChnagePassword} title={"Confirm"} />
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default memo(Changepassword);
