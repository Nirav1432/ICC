// Other by Khasiya Sagar.

//import liraries
import React, { useState, useEffect, memo } from 'react';
import { View,  Alert,  } from 'react-native';
import PageStyle from "../other/OtherStyle";
import { Labels } from '../../utils/Labels';
import Header from '../../components/header/Header';
import IcnBack from '../../assets/svg/headerSvgs/IcnBack';
import { StackActions, useRoute } from "@react-navigation/native";
import { onLoading } from '../../../App';
import { Colors } from '../../utils/Colors';
import { postFormDataAPI, Service } from '../../service/Service';
import { EndPoints } from '../../service/Endpoints';
import { useNavigation } from "@react-navigation/native";
import RemarkPopup from '../../components/submitRemark/RemarkPopup';
import SubmitButton from '../../components/submit button/SubmitButton';
import SingleDropdownList from '../../components/singleselectlist/SingleDropdownList';
import DisableView from '../../components/disableView/DisableView';
import { UserManager } from '../../manager/UserManager';
import { SqlData } from '../../database/SqlData';
import { SafeAreaView } from 'react-native-safe-area-context';

var _remark = "";

// create a component
const OffLineOtherGeotagFormScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { item, selectedDistricts, parentData, imagesUrl, locationDetail, otherPackage, indexCode, codeIndex } = route.params;

    const [isFeederNameList, setFeederNameList] = React.useState(null);
    const [isRemarkVisible, setRemarkVisible] = React.useState(false);

    const [isSubstationList, setSubstationList] = useState(null);
    const [isSubstationName, setSubstationName] = useState("");

    const [isFeederList, setFeederList] = React.useState([]);
    const [isFidderName, setFidderName] = React.useState("");

    useEffect(() => {
        getSubstationList();
    }, [])

    const getSubstationList = () => {
        onLoading(true);

        var data = { district_id: JSON.stringify(selectedDistricts?.value) };

        Service.post(EndPoints.getSubstationByDistrict, data, (success) => {
            const transformedDistricts = success.data.map((district) => ({
                title: district?.substation_name,
                value: district?.id,
            }));
            setSubstationList(transformedDistricts.reverse());
            onLoading(false);
        },
            (error) => {
                onLoading(false);
            }
        );
    }

    const onGetFeederList = (item) => {

        setFeederList([]);

        setFidderName(null);
        setSubstationName(item);
        onLoading(true);
        const data = { district_id: JSON.stringify(selectedDistricts?.value), substation_id: item?.value, };

        Service.post(EndPoints.getFeederbydistrict, data, (response) => {
            onLoading(false);
            if (response.resultflag == 1) {
                setFeederList(response?.data);
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    };

    const onGetListData = (item) => {

        setFidderName(item);
        onLoading(true);

        Service.post(EndPoints.getFeederDetails, { feeder_id: item.id }, (res) => {
            onLoading(false);

            if (res.resultflag == "1" && res.data)
                setFeederNameList(res.data);
            else
                showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onSubmit = () => {

        setRemarkVisible(false);

        if (isSubstationName == "") {
            Alert.alert("Alert", "Please add substation")
            return
        }
        else if (isFidderName == null) {
            Alert.alert("Alert", "Please add Feeder")
            return
        }

        var data = {
            role_id: UserManager.role_id,
            user_id: UserManager.id,
            discom_id: UserManager.discom_id,
            geotag_type: "Achievement",
            district_id: JSON.stringify(selectedDistricts?.value),
            remarks: _remark,
            item_no: codeIndex,
            task:"save",

            geotagData: {

                sl_district_major_component: parentData?.major_component_id,
                sl_district_sub_component: parentData?.sub_component_id,
                sl_district_items_specification: parentData?.item_specification_id,

                sl_lattitude: {
                    title: parentData?.major_components + " " + parentData?.sub_components,
                    item_no: codeIndex,
                    index_id: indexCode,
                    package: otherPackage,
                    tag_by: UserManager.first_name + " " + UserManager.last_name,
                    latitude: locationDetail.latitude,
                    longitude: locationDetail.longitude,
                    address: locationDetail.address,
                    block: locationDetail.block,
                    village: locationDetail.village,
                    images: imagesUrl,

                    dtr_details: {
                        package: otherPackage,
                        "substation": isSubstationName,
                        "feeder": isFidderName,
                        "feeder_name": isFeederNameList?.feeder_name,
                        "feeder_category": isFeederNameList?.feeder_category,
                        "feeder_code": isFeederNameList?.feeder_code,
                        "feeder_voltage": isFeederNameList?.feeder_voltage,
                        "feeder_length": isFeederNameList?.feeder_length,
                        "substation_name": isFeederNameList?.substation_name,
                    },
                },
            },

        };

        onLoading(true);

        Service.post(EndPoints.addOtherGeotag, data, (res) => {
            onLoading(false);
            if (res._resultflag) {
                Alert.alert("", res.message, [
                    {
                        text: "OK",
                        onPress: () => {
                            SqlData.DeleteData(item?.id, `DELETE FROM SaveOthersGeotagTable WHERE id = ?;`, (response) => {
                                const popAction = StackActions.pop(2);
                                navigation.dispatch(popAction);
                            }, (error) => {
                                 const popAction = StackActions.pop(4);
                                navigation.dispatch(popAction);
                            });
                        },
                    },
                ]);
            }
            else {
                Alert.alert("Alert", res.message)
            }
        },
            (err) => {
                onLoading(false);
                Alert.alert("Alert", "something wrong try again later")
            }
        );


    }

    return (
        <SafeAreaView style={{flex:1}}>

            <Header
                onLeftPress={() => navigation.goBack()}
                title="Other Assets Geotag"
                leftIcon={<IcnBack />}
            />

            <View style={PageStyle.formContainer}>

                <View style={PageStyle.marginTop}>
                    <SingleDropdownList title={Labels.SelectFilterbySubstationName + "*"} data={isSubstationList} onSelectedSevice={(item) => onGetFeederList(item)} />
                </View>
                {
                    isFeederList.length > 0 &&
                    <View style={PageStyle.marginTop}>
                        <SingleDropdownList title={"11 kV Feeder Name on which DTR is Erected*"} data={isFeederList} onSelectedSevice={(item) => onGetListData(item)} />
                    </View>
                }

                <View style={PageStyle.marginTop}>
                    <DisableView title={"11 kV feeder code on which the asset was erected"} value={isFeederNameList?.feeder_code} />
                </View>
                <View style={PageStyle.marginTop}>
                    <DisableView title={"Emanating SS Name"} value={isFeederNameList?.substation_name} />
                </View>
                <View style={PageStyle.marginTop}>
                    <DisableView title={"Emanating SS Code"} value={isFeederNameList?.substation_code} />
                </View>

                <View style={PageStyle.btnFormSubmit}>
                    <SubmitButton
                        textColor={Colors.white}
                        borderColor={Colors.transparent}
                        handlePress={() => onSubmit()}
                        buttonColor={Colors.orange}
                        buttonText={Labels.save}
                    />
                </View>

            </View>
            {/* <RemarkPopup handleClose={() => setRemarkVisible(false)} isVisible={isRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubmit()} /> */}
        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(OffLineOtherGeotagFormScreen);
