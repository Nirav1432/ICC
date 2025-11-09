import React, { memo, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import { UserManager } from "../../manager/UserManager";
import RandomCaptcha from "../../components/captcha/RandomCaptcha";
import Header from "../../components/header/Header";
import IcnMpty from "../../assets/svg/IcnMpty";
import IcnLogout from "../../assets/svg/IcnLogout";
import { Colors } from "../../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";
import { useNavigation } from "@react-navigation/native";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { Labels } from "../../utils/Labels";
import { EndPoints } from "../../service/Endpoints";
import { Service, ServiceLogin } from "../../service/Service";
import { onLoading } from "../../../App";
import DisableView from "../../components/disableView/DisableView";

var _clicked = true;
const ContactUs = () => {

    const [firstName, setFirstName] = useState(UserManager?.first_name || "");
    const [lastName, setLastName] = useState(UserManager?.last_name || "");
    const [email, setEmail] = useState(UserManager?.email || "");
    const [contactNumber, setContactNumber] = useState(UserManager?.mobile || "");
    const [feedback, setFeedback] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isCaptchaAns, setCaptchaAns] = useState("");
    const [enteredCaptcha, setEnteredCaptcha] = useState("");
    const [isRefreshCaptcha, setRefreshCaptcha] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        let userEmail = UserManager?.email || "";
        setEmail(userEmail);
    }, []);

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || !lastName || !email || !contactNumber || !feedback) {
            Alert.alert("Error", "Please fill all fields!");
            return;
        }
        else if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address!");
            return;
        }

        if (_clicked) {
            _clicked = false;

            onLoading(true);
            Service.post(EndPoints.deleteAccount, { email: email, firstName: firstName, lastName: lastName, contactNumber: contactNumber, feedback: feedback }, (response) => {
                _clicked = true;
                onLoading(false);

                Alert.alert("Alert", "Thank you for contacting us. We will review your query and get back to you via email.", [
                    {
                        text: "OK",
                        onPress: () => {
                            setFeedback("");
                        },
                    },
                ]);


            }, (err) => {
                onLoading(false);
                _clicked = true;
                Alert.alert("Alert", "Thank you for contacting us. We will review your query and get back to you via email.", [
                    {
                        text: "OK",
                        onPress: () => {
                            setFeedback("");
                        },
                    },
                ]);

            }
            );

        }
    };

    return (
        <SafeAreaView style={styles.container} >

            <Header
                rightIcon={<IcnMpty />}
                leftIcon={<IcnLogout />}
                onLeftPress={() => { navigation.openDrawer() }}
                title="Delete Account"
            />

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }} keyboardShouldPersistTaps="handled" >



                    <View style={styles.marginTop}>
                        <Text style={styles.headerText}>{"First Name*"}</Text>
                        <TextInput
                            maxLength={70}
                            value={firstName}
                            style={styles.inpView}
                            onChangeText={(txt) => setFirstName(txt)}
                        />
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.headerText}>{"Last Name*"}</Text>
                        <TextInput
                            maxLength={70}
                            value={lastName}
                            style={styles.inpView}
                            onChangeText={(txt) => setLastName(txt)}
                        />
                    </View>

                    {
                        UserManager.email != "" ?
                            <View style={styles.marginTop}>
                                <DisableView title={"Email"} value={UserManager.email} />
                            </View>
                            :
                            <View style={styles.marginTop}>
                                <Text style={styles.headerText}>{"Email*"}</Text>
                                <TextInput
                                    maxLength={70}
                                    value={email}
                                    style={styles.inpView}
                                    onChangeText={(txt) => setEmail(txt)}
                                    keyboardType="email-address"
                                />
                            </View>
                    }

                    <View style={styles.marginTop}>
                        <Text style={styles.headerText}>{"Contact Number*"}</Text>
                        <TextInput
                            maxLength={10}
                            value={contactNumber}
                            style={styles.inpView}
                            onChangeText={(txt) => setContactNumber(txt)}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.headerText}>{"Feedback / Query*"}</Text>
                        <TextInput
                            value={feedback}
                            style={styles.inpView1}
                            multiline={true}
                            onChangeText={(txt) => setFeedback(txt)}
                        />
                    </View>

                    <View style={styles.marginTop} />
                    <SubmitBtn onPress={handleSubmit} title={Labels.submit} />
                    {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity> */}

                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primaryBackground, },
    marginTop: { paddingHorizontal: 10, marginTop: AppUtil.getHP(2), },
    headerText: { fontSize: AppUtil.getHP(1.75), color: Colors.darkBlack, marginBottom: AppUtil.getHP(0.7), fontFamily: Fonts.RobotoMedium },
    inpView: { width: '100%', height: AppUtil.getHP(6.16), backgroundColor: Colors.white, borderRadius: 5, justifyContent: "space-between", alignItems: "center", flexDirection: 'row', paddingHorizontal: AppUtil.getWP(3), },
    inpView1: { width: '100%', height: AppUtil.getHP(10), backgroundColor: Colors.white, borderRadius: 5, justifyContent: "space-between", alignItems: "center", flexDirection: 'row', paddingHorizontal: AppUtil.getWP(3), },
});

export default memo(ContactUs);
