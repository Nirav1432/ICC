//import liraries
import React, { memo, useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import Header from "../../components/header/Header";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import IcnLogout from "../../assets/svg/IcnLogout";
import { onLoading } from '../../../App';

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../utils/Colors';
import { UserManager } from '../../manager/UserManager';
import { useNavigation } from "@react-navigation/native";
import { Loger } from '../../utils/Loger';
import { StyleSheet } from 'react-native';

// create a component
const ContactUs = () => {
    
     var tkn = UserManager.login_token_at;
    var tokan = tkn.split(" ").join("");

    const navigation = useNavigation();
    const [isUrl, setUrl] = useState("https://rdss-uat.webipsa.com/contact-us");

    useEffect(() => {
        return () => onLoading(false);
    }, []);

    const onCompilted = () => {
        setTimeout(() => { onLoading(false) }, 1000)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryBackground, }}>

            <Header
                rightIcon={<IcnMpty />}
                leftIcon={<IcnLogout />}
                onLeftPress={() => { navigation.openDrawer() }}
                title="Contact Us"
            />

            <WebView
                source={{ uri: isUrl }}
                onLoadStart={() => { onLoading(true), setTimeout(() => { onLoading(false) }, 5000); }}
                onLoadEnd={() => onCompilted()}
                onError={(error) => null}
                onNavigationStateChange={(obj) => Loger.onLog("------", obj.url)}
                
            />
        </SafeAreaView>
    );

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default memo(ContactUs);
