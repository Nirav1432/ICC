import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import IcnDownlod from "../../assets/svg/IcnDownlod";
import IcnLogout from "../../assets/svg/IcnLogout";
import { onLoading } from '../../../App';

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../utils/Colors';
import { UserManager } from '../../manager/UserManager';
import { BASE_URL } from '../../service/appConfig';
import { useNavigation } from "@react-navigation/native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';

const ApprovarRDSSdashboard = (props) => {

    const navigation = useNavigation();
    var tkn = UserManager.login_token_at;
    var tokan = tkn.split(" ").join("");

    const [isUrl, setUrl] = useState("https://rdss.powermin.gov.in/dashboard?mobile=Y&token=" + tokan);


    useEffect(() => {
        return () => onLoading(false);
    }, []);

    const onCompilted = () => {
        setTimeout(() => { onLoading(false) }, 600)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryBackground, }}>

            <Header
                leftIcon={<IcnLogout />}
                onLeftPress={() => { navigation.openDrawer() }}
                title="RDSS Dashboar"
            />

            <WebView
                source={{ uri: isUrl }}
                onLoadStart={() => onLoading(true)}
                onLoadEnd={() => onCompilted()}
                onError={(error) => null}
            />
        </SafeAreaView>
    );
}

export default React.memo(ApprovarRDSSdashboard);