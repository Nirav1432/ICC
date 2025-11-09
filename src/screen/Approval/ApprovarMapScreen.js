import React, { useEffect, useState, useRef } from 'react';
import { useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import IcnDownlod from "../../assets/svg/IcnDownlod";
import { onLoading } from '../../../App';

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../utils/Colors';
import { UserManager } from '../../manager/UserManager';
import { BASE_URL } from '../../service/appConfig';
import { Loger } from '../../utils/Loger';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert, View } from 'react-native';
import { PermissionsAndroid, Platform, } from 'react-native';
import { captureRef } from 'react-native-view-shot';

const ApprovarMapScreen = (props) => {

    const viewRef = useRef();

    var tkn = UserManager.login_token_at;
    var tokan = tkn.split(" ").join("");
    const route = useRoute();
    const { type, district_id, feeder_id, major_component_id, sub_component_id, items_specification_id } = route.params;
    const [isUrl, setUrl] = useState(BASE_URL + '/map-design.php?mobile=Y&token=' + tokan + "&user_id=" + UserManager.id);

    useEffect(() => {
        if (type == "Feeder") {
            setUrl(BASE_URL + "/map-design.php?mobile=Y&district_id=" + district_id + "&discom_id=" + UserManager.discom_id + "&feeder_id=" + feeder_id + "&asset_type=Feeder" + "&token=" + tokan + "&user_id=" + UserManager.id)
        }
        else if (type == "Substation") {
            setUrl(BASE_URL + "/map-design.php?mobile=Y&district_id=" + district_id + "&discom_id=" + UserManager.discom_id + "&major_component_id=" + major_component_id + "&sub_component_id=" + sub_component_id + "&items_specification_id=" + items_specification_id + "&asset_type=Substation" + "&token=" + tokan + "&user_id=" + UserManager.id)
        }
        else if (type == "DTR") {
            setUrl(BASE_URL + "/map-design.php?mobile=Y&district_id=" + district_id + "&discom_id=" + UserManager.discom_id + "&major_component_id=" + major_component_id + "&sub_component_id=" + sub_component_id + "&items_specification_id=" + items_specification_id + "&asset_type=DTR" + "&token=" + tokan + "&user_id=" + UserManager.id)
        }
    }, [props]);


    useEffect(() => {
        return () => onLoading(false);
    }, []);

    const onCompilted = () => {
        setTimeout(() => { onLoading(false) }, 600)
    }

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {

            const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
            const result = await PermissionsAndroid.request(permission);
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else if (result === PermissionsAndroid.RESULTS.DENIED) {
                Alert.alert('Permission Required', 'Please grant storage permission.');
            } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                const result = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,]);
                return Object.values(result).every(
                    (val) => val === PermissionsAndroid.RESULTS.GRANTED
                );
            }
        }
        return true;
    };
    const generatePdfFromView = async () => {

        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            Alert.alert('Permission denied');
            return;
        }

        onLoading(true);
        try {
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
                result: 'base64',
            });

            const html = `
                <html>
                  <body style="margin:0;padding:0;">
                    <img src="data:image/png;base64,${uri}" style="width:90%;" />
                  </body>
                </html>
              `;

            // 2. Generate the PDF with the image embedded
            const pdfOptions = {
                html,
                fileName: 'RdssApprovalMap',
                directory: 'Documents',
            };

            const pdf = await RNHTMLtoPDF.convert(pdfOptions);
            onLoading(false);
            Alert.alert('PDF Saved', pdf.filePath);

        } catch (error) {
            console.error('PDF generation failed:', error);
            Alert.alert('Error', 'Could not generate PDF');
            onLoading(false);
        }
    };

    const onCreatePDF = async () => {
        try {

            const response = await fetch(isUrl);
            const html = await response.text();

            const options = {
                html: html,
                fileName: 'RdssMap',
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);
            Alert.alert('PDF Created', `Saved to: ${file.filePath}`);
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryBackground, }}>
            <Header title="Geotag" leftIcon={<IcnBack />} rightIcon={<IcnDownlod />} onLeftPress={() => props.navigation.goBack()} onRightPress={() => generatePdfFromView()} />

            <View ref={viewRef} style={{ flex: 1 }}>
                <WebView
                    source={{ uri: isUrl }}
                    onLoadStart={() => onLoading(true)}
                    onLoadEnd={() => onCompilted()}
                    onError={(error) => Loger.onLog("error", error)}
                />
            </View>
        </SafeAreaView>
    );
}

export default React.memo(ApprovarMapScreen);