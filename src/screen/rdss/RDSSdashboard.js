import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import IcnLogout from "../../assets/svg/IcnLogout";
import { onLoading } from '../../../App';

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../utils/Colors';
import { UserManager } from '../../manager/UserManager';
import { BASE_URL } from '../../service/appConfig';
import { useNavigation } from "@react-navigation/native";
import { Loger } from '../../utils/Loger';

const RDSSdashboard = (props) => {

    var tkn = UserManager.login_token_at;
    var tokan = tkn.split(" ").join("");

    const navigation = useNavigation();
    const [isUrl, setUrl] = useState("https://rdss.powermin.gov.in/dashboard?mobile=Y&token=" + tokan);

    useEffect(() => {
        return () => onLoading(false);
    }, []);

    const onCompilted = () => {
        setTimeout(() => { onLoading(false) }, 1000)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryBackground, }}>
            {/* <Header title="Geotag" leftIcon={<IcnBack />} onLeftPress={() => props.navigation.goBack()} /> */}

            <Header
                rightIcon={<IcnMpty />}
                leftIcon={<IcnLogout />}
                onLeftPress={() => { navigation.openDrawer() }}
                title="RDSS Dashboard"
            />

            <WebView
                source={{ uri: isUrl }}
                onLoadStart={() => { onLoading(true), setTimeout(() => { onLoading(false) }, 5000); }}
                onLoadEnd={() => onCompilted()}
                onError={(error) => null}
                onNavigationStateChange={(obj) => Loger.onLog("------", obj.url + "?mobile=Y&token=" + UserManager.login_token_at)}
                
            />
        </SafeAreaView>
    );
}

export default React.memo(RDSSdashboard);