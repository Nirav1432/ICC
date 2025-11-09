// Other by Khasiya Sagar.

//import liraries
import { View, Text,  ScrollView, TouchableOpacity, StyleSheet, Alert, Image, TextInput, } from "react-native";
import React, { memo, useState, useRef, useEffect, } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header/Header";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Labels } from "../../utils/Labels";
import { AppUtil, PhotoQualityOptions } from "../../utils/AppUtil";
import { Colors } from "../../utils/Colors";
import { Fonts } from "../../utils/Fonts";
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import { useRoute } from "@react-navigation/native";
import IcnAddress from "../../assets/svg/powerTransformersSvgs/IcnAddress";
import MapView, { Marker, } from 'react-native-maps';
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import Geolocation from "@react-native-community/geolocation";
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import LocationPopup from "../../components/LocationPopup";
import { onLoading } from "../../../App";
import * as ImagePicker from "react-native-image-picker";
import { UserManager } from "../../manager/UserManager";
import { SqlData } from "../../database/SqlData";
import { StackActions } from '@react-navigation/native';
import { LTHToptions } from "../../utils/CardData";
import IcnDetails from "../../assets/svg/IcnDetails";
import HTLineOfflinePopup from "../../components/HTLineOfflinePopup";
import LTLineOfflinePopup from "../../components/LTLineOfflinePopup";
import PollDetailsOfflinePopup from "../../components/PollDetailsOfflinePopup";
import LocationPopupOffline from "../../components/LocationPopupOffline";
import { SafeAreaView } from "react-native-safe-area-context";

// LT line and HT line var
var _majorComponent = "";
var _scheme = "";
var _oldUGorOH = "";
var _oldWhetherCableOrConductor = "";
var _oldCableSize = "";
var _oldSinglePhaseThreePhase = "";
var _oldCircuitType = "";
var _oldLTLineVoltage = "";
var _oldSpecifyTypeVoltage = "";
var _oldTypeOfCable = "";
var _olsSpecifyTypeOfCable = "";
var _oldTypeOfConductor = "";
var _olsSpecifyTypeOfConductor = "";
var _oldPoleStructur = "";

//POLE VAR
var _poleType = "";
var _poleHeight = "";
var _poleSpecifyType = "";
var _existingPole = "";
var _branchPoint = "";

// create a component
const OffLineFeederGeneralAssetDetail = () => {

    const route = useRoute();
    const { parentData, selectedDistricts, geotagModule, geotagType, selectedDistrictsName, sessionType } = route.params;
    const navigation = useNavigation();
    const mapRef = React.useRef(null);
    let watchID = null;

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [isDropVisible, setDropVisible] = useState(false);
    const [isSelectedOption, setSelectedOption] = useState("Select");
    const [isHTModalVisible, setHTModalVisible] = useState(false);
    const [isLTModalVisible, setLTModalVisible] = useState(false);
    const [isPollDetailsVisible, setPollDetailsVisible] = useState(false);

    const [isMapview, setMapview] = useState("standard");
    const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);
    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);
    const [isDefultLongitude, setDefultLongitude] = useState(-1);
    const [isDefultLatitude, setDefultLatitude] = useState(-1);
    const [isImagesUrl, setImageUploadUrl] = useState([]);
    const [isRemark, setRemark] = useState("");

    const [isHTMajorComponents, setHTMajorComponents] = useState([]);
    const [isLTMajorComponents, setLTMajorComponents] = useState([]);

    useEffect(() => {
        SqlData.createTablex("SaveFeederGeotagTable");
        Geolocation.clearWatch(watchID);
        subscribeLocationLocation()
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    useEffect(() => {
        onLoading(true);
        SqlData.getdatax('SELECT * FROM LT_MAJOR_COMPONENT_TABLE;', (response) => {
            onLoading(false);
            let res = JSON.parse(response.rows.item(0).list);
            setLTMajorComponents(res);
        }, (error) => {
            onLoading(false);
        });

    }, []);

    useEffect(() => {
        onLoading(true);
        SqlData.getdatax('SELECT * FROM HT_MAJOR_COMPONENT_TABLE;', (response) => {
            onLoading(false);
            let res = JSON.parse(response.rows.item(0).list);
            setHTMajorComponents(res);
        }, (error) => {
            onLoading(false);

        });
    }, []);


    const onGetLocation = () => {
        if (Platform.OS === "ios") {
            Geolocation.requestAuthorization((info) => {
                onWatchPosition();
            })
            onWatchPosition();
        } else {
            requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,]).then((statuses) => {
                if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted") {
                    onWatchPosition();
                } else {
                    Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
                        [{
                            text: "OKAY",
                            onPress: () => {
                                openSettings().catch(() => {
                                    null;
                                });
                            },
                        },
                        ]
                    );
                }
            });
        }
    }
    const onWatchPosition = () => {
        onLoading(true);
        Geolocation.clearWatch(watchID);
        subscribeLocationLocation()

        setTimeout(() => {
            onWatchPosition1();
        }, 2000);
    }
    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition((position) => { }, (error) => { }, {
            enableHighAccuracy: false,
            maximumAge: 100,
            distanceFilter: 0.5
        }
        );
    };
    const onWatchPosition1 = async () => {
        onLoading(true);

        Geolocation.getCurrentPosition((info) => {
            onLoading(false);
            setDefultLatitude(JSON.stringify(info.coords.latitude));
            setDefultLongitude(JSON.stringify(info.coords.longitude));
            setLocationPopupVisible(true)
        }, (error) => {

            Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
                [
                    {
                        text: "OKAY",
                        onPress: () => {
                        },
                    },
                ]
            );
            onLoading(false)
        }, {
            enableHighAccuracy: false,
            interval: 1000,
            distanceFilter: 0.5,
        }
        );
    };
    const onGetCurrentLocation = (currentLatitude, currentLongitude) => {

        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);

        mapRef.current?.animateToRegion({
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });

        setTimeout(() => {
            onLoading(false);
        }, 1000);
    };
    const onPressCapture = () => {
        if (isImagesUrl.length < 3) {
            ImagePicker.launchCamera(PhotoQualityOptions, (res) => {
                var response = null;
                if (res.didCancel) {
                } else if (res.error) {
                    Alert.alert(res.error);
                } else if (res.customButton) {
                } else if (res.errorCode == "camera_unavailable") {
                    let images = [...isImagesUrl, Labels?.data];
                    setImageUploadUrl(images);
                } else {
                    response = res.assets[0];
                    let images = [...isImagesUrl, response];
                    setImageUploadUrl(images);
                }
            }
            );
        } else {
            Alert.alert("You can upload only 3 images");
        }
    };
    const removeImage = (index) => {
        setImageUploadUrl((oldValues) => {
            return oldValues.filter((_, i) => i !== index);
        });
    };
    const handleSubmit = () => {

        if (isSelectedOption == "Select") {
            Alert.alert("alert", "Please Select HT Line or an LT Line")
            return
        }
        else if (isSelectedOption == "HT Line" && (_majorComponent == "" || _scheme == "" || _oldUGorOH == "" || _oldLTLineVoltage == "" || _oldWhetherCableOrConductor == "" || _oldPoleStructur == "" || _oldCircuitType == "")) {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedOption == "HT Line" && _oldLTLineVoltage == "Other" && _oldSpecifyTypeVoltage == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "" && _oldCableSize == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "Other" && _olsSpecifyTypeOfCable == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedOption == "HT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "Other" && _olsSpecifyTypeOfConductor == "") {
            Alert.alert("alert", "Please fill HT Line details")
            return
        }
        else if (isSelectedOption == "LT Line" && (_majorComponent == "" || _scheme == "" || _oldUGorOH == "" || _oldWhetherCableOrConductor == "" || _oldSinglePhaseThreePhase == "" || _oldCircuitType == "")) {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "" && _oldCableSize == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor == "Cable" && _oldTypeOfCable == "Other" && _olsSpecifyTypeOfCable == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (isSelectedOption == "LT Line" && _oldWhetherCableOrConductor == "Conductor" && _oldTypeOfConductor == "Other" && _olsSpecifyTypeOfConductor == "") {
            Alert.alert("alert", "Please fill LT Line details")
            return
        }
        else if (_poleType == "" || _poleHeight == "" || _existingPole == "" || _branchPoint == "") {
            Alert.alert("alert", "Please add Pole Details")
            return
        }
        else if (_poleType == "Others" && _poleSpecifyType == "") {
            Alert.alert("alert", "Please add Pole Details1")
            return
        }
        else if (isCurrentLatitude == -1 || isCurrentLongitude == -1) {
            Alert.alert("Alert", "Please add Location");
            return
        } else if (isImagesUrl?.length < 1) {
            Alert.alert("Alert", "Please add image");
            return
        } else if (isRemark == "") {
            Alert.alert("alert", "Please add remarks.")
            return
        } else {
            var obj = {
                form_id: 33,
                role_id: UserManager.role_id,
                user_id: UserManager.id,
                discom_id: UserManager.discom_id,
                remark: isRemark,
                latitude: isCurrentLatitude,
                longitude: isCurrentLongitude,
                images: isImagesUrl,
                itemSummary: parentData?.item_summary,
                parentData: parentData,
                selectedDistrictsName,
                selectedDistricts,
                geotagModule,
                geotagType,
                sessionType,
                selectedHtLtOption: isSelectedOption,
                segmet: isSelectedOption == "HT Line" ? {
                    scheme: _scheme,
                    majorComponent: _majorComponent,
                    UGorOH: _oldUGorOH,
                    HTLineVoltage: _oldLTLineVoltage,
                    SpecifyTypeVoltage: _oldSpecifyTypeVoltage,
                    WhetherCableOrConductor: _oldWhetherCableOrConductor,
                    TypeOfCable: _oldTypeOfCable,
                    CableSize: _oldCableSize,
                    SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                    TypeOfConductor: _oldTypeOfConductor,
                    SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                    PoleStructur: _oldPoleStructur,
                    CircuitType: _oldCircuitType,
                } : {
                    scheme: _scheme,
                    majorComponent: _majorComponent,
                    UGorOH: _oldUGorOH,
                    WhetherCableOrConductor: _oldWhetherCableOrConductor,
                    TypeOfCable: _oldTypeOfCable,
                    CableSize: _oldCableSize,
                    SpecifyTypeOfCable: _olsSpecifyTypeOfCable,
                    TypeOfConductor: _oldTypeOfConductor,
                    SpecifyTypeOfConductor: _olsSpecifyTypeOfConductor,
                    SinglePhaseThreePhase: _oldSinglePhaseThreePhase,
                    CircuitType: _oldCircuitType,
                },
                poleDetails: {
                    poleType: _poleType,
                    poleHeight: _poleHeight,
                    poleSpecifyType: _poleSpecifyType,
                    existingPole: _existingPole,
                    branchPoint: _branchPoint,
                },
            };

            SqlData.setDatax('SaveFeederGeotagTable', false, obj, (response) => {
                const popAction = StackActions.pop(1);
                navigation.dispatch(popAction);
            }, (error) => {
                Alert.alert("Alert", "something wrong try again later")
            });
        }

    };
    const onSelectDropdown = (selectedOption) => {
        setSelectedOption(selectedOption);
        switch (selectedOption) {
            case "HT Line":
                setHTModalVisible(true);
                break;
            case "LT Line":
                setLTModalVisible(true);
                break;
            default:
                break;
        }

        setDropVisible(false);
    };
    const onSelectDropdownItem = (selectedOption) => {

        if (selectedOption == isSelectedOption) {
            onSelectDropdown(selectedOption);
        }
        else {
            _scheme = "";
            _majorComponent == "",
                _oldUGorOH = "";
            _oldWhetherCableOrConductor = "";
            _oldSinglePhaseThreePhase = "";
            _oldCircuitType = "";
            _oldLTLineVoltage = "";
            _oldSpecifyTypeVoltage = "";
            _oldTypeOfCable = "";
            _oldCableSize = "";
            _olsSpecifyTypeOfCable = "";
            _oldTypeOfConductor = "";
            _olsSpecifyTypeOfConductor = "";
            _oldPoleStructur = "";
            onSelectDropdown(selectedOption);
        }
    }
    const onBack = () => {
        _majorComponent = "";
        _scheme = "";
        _oldUGorOH = "";
        _oldWhetherCableOrConductor = "";
        _oldCableSize = "";
        _oldSinglePhaseThreePhase = "";
        _oldCircuitType = "";
        _oldLTLineVoltage = "";
        _oldSpecifyTypeVoltage = "";
        _oldTypeOfCable = "";
        _olsSpecifyTypeOfCable = "";
        _oldTypeOfConductor = "";
        _olsSpecifyTypeOfConductor = "";
        _oldPoleStructur = "";

        navigation.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onLeftPress={() => onBack()}
                title="Feeder Geotag"
                leftIcon={<IcnBack />}
            />

            <KeyboardAwareScrollView>
                <ScrollView>
                    <View style={styles.title}>
                        <Text style={styles.text}>{parentData?.feeder_name} </Text>
                    </View>

                    <View style={styles.modifySearch}>
                        <Text style={styles.modifySearchText}>
                            {Labels.generalDetails}
                        </Text>
                        <TouchableOpacity>
                            <IcnGreyDown />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>

                        <Text style={styles.fieldTitle}>{Labels.HtLtLineTitle}</Text>

                        <TouchableOpacity style={styles.modifySearch2} onPress={() => setDropVisible(!isDropVisible)}>
                            <Text style={styles.modifySearchText2}>
                                {isSelectedOption}
                            </Text>
                            <IcnGreyDown />
                        </TouchableOpacity>

                        {isDropVisible && (
                            <View style={styles.options}>
                                {LTHToptions.map((option, index) => (
                                    <TouchableOpacity key={index} onPress={() => onSelectDropdownItem(option.label)}
                                        style={[styles.optionButton, index === LTHToptions.length - 1 && styles.lastOptionButton,]}>
                                        <Text style={styles.btnTxt}>
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {isSelectedOption != "Select" &&
                            <TouchableOpacity style={styles.heading} onPress={() => isSelectedOption == "LT Line" ? onSelectDropdown("LT Line") : onSelectDropdown("HT Line")}>
                                <View style={styles.textView}>
                                    <Text style={styles.headingText}>{isSelectedOption}</Text>
                                </View>
                                <View style={styles.icnView}>
                                    <IcnDetails />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.btnDTRSubmit}>
                        <Text style={styles.txtAddDTRRDSS}>{Labels.ProvidePoleDetails}</Text>
                        <TouchableOpacity style={styles.btnDTRClick} onPress={() => { setPollDetailsVisible(true) }}>
                            <Text style={styles.txtAddDTR}>{Labels.Details}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10, paddingHorizontal: 10, flexDirection: "row" }}>

                        <View style={styles.textInput11}>
                            <Text style={styles.fieldTitle}>Latitude</Text>
                            <View style={styles.textInput1}>
                                <Text style={styles.text}>{isCurrentLatitude == -1 ? "" : isCurrentLatitude}</Text>
                            </View>
                        </View>

                        <View style={styles.textInput22}>
                            <Text style={styles.fieldTitle}>Longitude</Text>
                            <View style={styles.textInput2}>
                                <Text style={styles.text}>{isCurrentLongitude == -1 ? "" : isCurrentLongitude}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.fieldTitle1}>.</Text>
                            <TouchableOpacity style={styles.buttonIcon} onPress={() => onGetLocation()}>
                                <IcnAddress />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.remarkCantainer}>

                        <Text style={styles.fieldTitle}>Remarks*</Text>
                        <View style={styles.container}>
                            <TextInput
                                multiline={true}
                                maxLength={500}
                                value={isRemark}
                                editable={true}
                                style={styles.enabledField}
                                onChangeText={(text) => setRemark(text)}
                            />
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: AppUtil.getHP(2) }}>
                        <View style={{ width: '100%', height: AppUtil.getHP(30), borderWidth: 0.5, borderColor: Colors.orange, }}>
                            <MapView style={{ width: '100%', height: '100%' }}
                                ref={mapRef}
                                initialRegion={isInitialRegion}
                                mapType={isMapview == "satellite" ? "satellite" : "standard"}>
                                <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
                                    <IcnDTR1 />
                                </Marker>
                            </MapView>
                            <TouchableOpacity style={{ width: 40, height: 40, end: 0, padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" }}
                                onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                                <IcnAddress />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <SubmitBtn
                            onPress={() => onPressCapture()}
                            backColor={isImagesUrl.length < 3 ? Colors.orange : Colors.disableViewColor}
                            title={isImagesUrl.length == 0 ? "Capture Photo" : "Capture Another Photo"}
                        />
                    </View>

                    {isImagesUrl.length > 0 && (
                        <>
                            <View style={styles.imageContainer}>
                                {isImagesUrl.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.imagebtn} onPress={() => handlePressImage(index)}>
                                            <Image source={{ uri: item?.uri }} style={styles.image} />
                                            <TouchableOpacity onPress={() => removeImage(index)} style={styles.ImageRemove}>
                                                <Text style={{ color: Colors.white }}>X</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <View style={{ paddingHorizontal: 10, marginBottom: 30 }}>
                                <SubmitBtn title="Save" onPress={() => handleSubmit()} />
                            </View>
                        </>
                    )}

                </ScrollView>
            </KeyboardAwareScrollView>

            <LocationPopupOffline
                isVisible={isLocationPopupVisible}
                handleClose={() => setLocationPopupVisible(false)}
                lett={isDefultLatitude}
                long={isDefultLongitude}
                finalPont={(data) => onGetCurrentLocation(data?.latitude, data?.longitude)}
            />

            <HTLineOfflinePopup
                handleClose={() => setHTModalVisible(false)}
                isModalVisible={isHTModalVisible}

                oldScheme={_scheme}
                onSelectScheme={(data) => _scheme = data}

                majorComponentList={isHTMajorComponents}
                oldMajorComponent={_majorComponent}
                onSelectMajorComponent={(data) => _majorComponent = data}

                oldUGorOH={_oldUGorOH}
                onSelectUGorOH={(data) => _oldUGorOH = data}

                oldLTLineVoltage={_oldLTLineVoltage}
                onSelectLTLineVoltage={(data) => _oldLTLineVoltage = data}
                oldSpecifyTypeVoltage={_oldSpecifyTypeVoltage}
                onSelectSpecifyTypeVoltage={(data) => _oldSpecifyTypeVoltage = data}

                oldWhetherCableOrConductor={_oldWhetherCableOrConductor}
                onSelectWhetherCableOrConductor={(data) => _oldWhetherCableOrConductor = data}

                oldCableSize={_oldCableSize}
                onSelectCableSize={(data) => _oldCableSize = data}

                oldTypeOfCable={_oldTypeOfCable}
                onSelectTypeOfCable={(data) => _oldTypeOfCable = data}
                olsSpecifyTypeOfCable={_olsSpecifyTypeOfCable}
                onSelectSpecifyTypeOfCable={(data) => _olsSpecifyTypeOfCable = data}

                oldTypeOfConductor={_oldTypeOfConductor}
                onSelectTypeOfConductor={(data) => _oldTypeOfConductor = data}
                olsSpecifyTypeOfConductor={_olsSpecifyTypeOfConductor}
                onSelectSpecifyTypeOfConductor={(data) => _olsSpecifyTypeOfConductor = data}

                oldPoleStructur={_oldPoleStructur}
                onSelectPoleStructur={(data) => _oldPoleStructur = data}

                oldCircuitType={_oldCircuitType}
                onSelectCircuitType={(data) => _oldCircuitType = data}

                saveObj={() => { setHTModalVisible(false); }}
            />

            <LTLineOfflinePopup
                handleClose={() => setLTModalVisible(false)}
                isModalVisible={isLTModalVisible}

                oldScheme={_scheme}
                onSelectScheme={(data) => _scheme = data}


                majorComponentList={isLTMajorComponents}
                oldMajorComponent={_majorComponent}
                onSelectMajorComponent={(data) => _majorComponent = data}

                oldUGorOH={_oldUGorOH}
                onSelectUGorOH={(data) => _oldUGorOH = data}

                oldWhetherCableOrConductor={_oldWhetherCableOrConductor}
                onSelectWhetherCableOrConductor={(data) => _oldWhetherCableOrConductor = data}

                oldCableSize={_oldCableSize}
                onSelectCableSize={(data) => _oldCableSize = data}

                oldTypeOfCable={_oldTypeOfCable}
                onSelectTypeOfCable={(data) => _oldTypeOfCable = data}
                olsSpecifyTypeOfCable={_olsSpecifyTypeOfCable}
                onSelectSpecifyTypeOfCable={(data) => _olsSpecifyTypeOfCable = data}

                oldTypeOfConductor={_oldTypeOfConductor}
                onSelectTypeOfConductor={(data) => _oldTypeOfConductor = data}
                olsSpecifyTypeOfConductor={_olsSpecifyTypeOfConductor}
                onSelectSpecifyTypeOfConductor={(data) => _olsSpecifyTypeOfConductor = data}

                oldSinglePhaseThreePhase={_oldSinglePhaseThreePhase}
                onSelectSinglePhaseThreePhase={(data) => _oldSinglePhaseThreePhase = data}

                oldCircuitType={_oldCircuitType}
                onSelectCircuitType={(data) => _oldCircuitType = data}

                saveObj={() => { setLTModalVisible(false) }}
            />

            <PollDetailsOfflinePopup
                handleClose={() => setPollDetailsVisible(false)}
                isModalVisible={isPollDetailsVisible}

                option={false}

                oldPolltype={_poleType}
                onSelectPoleType={(data) => _poleType = data}

                oldPoleHeight={_poleHeight}
                onSelectPoleHeight={(data) => _poleHeight = data}

                oldPoleSpecifyType={_poleSpecifyType}
                onSelectPoleSpecifyType={(data) => _poleSpecifyType = data}

                oldExistingPole={_existingPole}
                onSelectExistingPole={(data) => _existingPole = data}

                oldBranchPoint={_branchPoint}
                onSelectBranchPoint={(data) => _branchPoint = data}

            />

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({

    remarkCantainer: { paddingHorizontal: 10 },
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        width: "100%",
        alignSelf: "center",
        borderRadius: 5,
    },
    enabledField: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 90,
        color: Colors.darkBlack,
        width: "100%",
        paddingHorizontal: AppUtil.getWP(3),
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    fieldTitle: {
        fontSize: 14,
        color: Colors.darkBlack,
        fontWeight: "500",
        alignSelf: "flex-start",
        marginBottom: AppUtil.getHP(1),
    },
    fieldTitle1: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: AppUtil.getHP(1),
    },
    textInput11: { width: "42%", },
    textInput1: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 45,
        color: Colors.darkBlack,
        justifyContent: 'center',
        paddingStart: 5,
    },
    textInput22: { width: "42%", marginLeft: "2%" },
    textInput2: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 45,
        color: Colors.darkBlack,
        justifyContent: 'center',
        paddingStart: 5,
    },
    buttonIcon: {
        width: 45,
        height: 45,
        marginStart: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: Colors.disableViewColor,
    },
    text: { color: Colors.secondary, fontSize: 14, fontWeight: "500", },
    subHeader: {
        width: "100%",
        height: AppUtil.getHP(3),
        backgroundColor: Colors.white,
        justifyContent: "center",
        paddingHorizontal: AppUtil.getWP(4),
    },
    subHeaderText: { fontSize: AppUtil.getHP(1.7), color: Colors.darkBlack, fontFamily: Fonts.RobotoBold, },
    modifySearch: {
        flexDirection: "row",
        padding: AppUtil.getHP(1.5),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.disableViewColor,
    },
    modifySearchText: { color: "black", width: "90%", fontWeight: 500, fontSize: 16, },
    title: { backgroundColor: Colors.white, padding: AppUtil.getHP(1) },
    imageContainer: { flexDirection: "row", marginVertical: AppUtil.getHP(2), paddingHorizontal: 10, },
    imagebtn: {
        marginHorizontal: AppUtil.getWP(1),
        width: "31%",
        height: AppUtil.getHP(10),
        borderRadius: 10,
        backgroundColor: Colors.white,
    },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
    ImageRemove: {
        height: 25,
        width: 25,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.orange,
        right: -5,
        top: -5,
        borderRadius: 15,
    },
    modifySearch2: {
        flexDirection: "row",
        padding: AppUtil.getHP(1.5),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 5,
    },
    modifySearchText2: {
        color: "black",
        width: "90%",
        fontWeight: 500,
        fontSize: 14,
    },
    options: {
        backgroundColor: Colors.disableViewColor,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
    },
    btnTxt: {
        fontSize: 14,
        color: Colors.darkBlack,
        fontWeight: "bold",
        marginLeft: AppUtil.getWP(3),
    },
    optionButton: {
        padding: AppUtil.getHP(1),
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        paddingVertical: AppUtil.getHP(1.5),
    },
    lastOptionButton: {
        borderBottomWidth: 0,
    },
    heading: {
        marginTop: AppUtil.getHP(2),
        paddingVertical: AppUtil.getHP(1.5),
        borderRadius: 5,
        backgroundColor: Colors.beige,
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textView: {
        width: "85%",
    },
    headingText: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.darkBlack,
        marginLeft: AppUtil.getWP(3),
    },
    icnView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
    },
    btnDTRSubmit: {
        height: AppUtil.getHP(7),
        padding: AppUtil.getHP(1),
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    txtAddDTRRDSS: {
        fontSize: 14,
        color: Colors.darkBlack,
        fontWeight: "500",
    },
    btnDTRClick: {
        width: "25%",
        height: AppUtil.getHP(5),
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 2,
    },
    txtAddDTR: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: "500",
    },
});

//make this component available to the app
export default memo(OffLineFeederGeneralAssetDetail);
