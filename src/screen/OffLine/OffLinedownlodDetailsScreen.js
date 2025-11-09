// Other by Khasiya Sagar.

import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Platform, ScrollView, } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IcnLogout from "../../assets/svg/IcnLogout";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import Header from "../../components/header/Header";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import { AppUtil } from "../../utils/AppUtil";
import { UserManager } from "../../manager/UserManager";
import { EndPoints } from "../../service/Endpoints";
import { Service } from "../../service/Service";
import { onLoading } from "../../../App";
import { SqlData, SqlTableName } from "../../database/SqlData";
import RadioButtonImage from "../../components/radioButtonImage/RadioButtonImgae";
import IcnSubStations from "../../assets/svg/Substations";
import IcnFeeders from "../../assets/svg/IcnFeeders";
import IcnDTR from "../../assets/svg/IcnDTR";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import MapView, { Marker } from "react-native-maps";
import { LocalTile } from 'react-native-maps';
import { Colors } from "../../utils/Colors";
import { requestMultiple, PERMISSIONS, openSettings, } from "react-native-permissions";
import IcnHouse from "../../assets/svg/IcnHouse";
import IcnOther from "../../assets/svg/IcnOther";
import Geolocation from "@react-native-community/geolocation";
import { SafeAreaView } from "react-native-safe-area-context";

let watchID = null;
const OffLinedownlodDetailsScreen = () => {

    const navigation = useNavigation();
    const mapRef = React.useRef(null);

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [isCurrentLongitude, setCurrentLongitude] = useState(-1);
    const [isCurrentLatitude, setCurrentLatitude] = useState(-1);

    const [isDistricts, setDistricts] = useState([]);
    const [isSelectedDistricts, setSelectedDistricts] = useState(null);
    const [isSelectedImageOption, setSelectedImageOption] = useState(null);

    // const options = ["Substations", "Feeders", "DTR"];
    // const imageSource = [<IcnSubStations />, <IcnFeeders />, <IcnDTR />];
    const options = ["Substations", "Feeders", "DTR", "Households", "Others"];
    const imageSource = [<IcnSubStations />, <IcnFeeders />, <IcnDTR />, <IcnHouse />, <IcnOther />,];


    useEffect(() => {
        subscribeLocationLocation();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    useEffect(() => {

        onLoading(true);

        const user_id = UserManager.id;
        const dynamicEndpoint = `${EndPoints.getDistrictsbyusername}?user_id=${user_id}`;

        let arr = [];
        Service.post(dynamicEndpoint, {}, (response) => {
            onLoading(false);

            for (let disObj of response?.district) {
                arr.push({ title: disObj.district_name, value: disObj.id, })
            }

            setDistricts(arr);
            onLocationPress()
            setTimeout(() => {
                SqlData.setDatax("districtsTable", true, arr);
            }, 100)
        },
            (err) => {
                onLoading(false);
            }
        );
    }, []);

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition((position) => { }, (error) => { }, {
            enableHighAccuracy: true,
            maximumAge: 100,
            distanceFilter: 0.1,
        }
        );
    };

    const onLocationPress = async () => {
        if (Platform.OS === "ios") {
            watchPosition();
        } else {
            requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,]).then((statuses) => {
                if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted") {
                    watchPosition();
                } else {
                    Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
                        [
                            {
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
    };
    const watchPosition = () => {
        onLoading(true);
        Geolocation.clearWatch(watchID);
        subscribeLocationLocation()

        setTimeout(() => {
            watchPosition1();
        }, 2000);
    }
    const watchPosition1 = () => {
        onLoading(true);
        Geolocation.getCurrentPosition((info) => {
            onLoading(false);
            setCurrentLatitude(JSON.stringify(info.coords.latitude));
            setCurrentLongitude(JSON.stringify(info.coords.longitude));

            mapRef.current?.animateToRegion({
                latitude: parseFloat(info.coords.latitude),
                longitude: parseFloat(info.coords.longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });

        }, (error) => {
            Alert.alert(
                "Alert",
                "This App needs access to your phone's location. Please enable location permissions in settings.",
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
            distanceFilter: 0.1,

        });
    };

    const handlePress = () => {

        if (isSelectedDistricts == null) {
            showErrorToast("Please select District")
            return
        }
        else if (isSelectedImageOption == null) {
            showErrorToast("Please select substations or feeder or DTR or households or Other")
            return
        }
        else if (isSelectedImageOption == "Households") {
            showErrorToast("under development")
            return
        }

        else {

            Alert.alert("Alert", "Save the data for the " + isSelectedDistricts.title + " district for offline access.", [
                {
                    text: "OK",
                    onPress: () => {
                        if (isSelectedImageOption === "Substations") {

                            onLoading(true);

                            var str = ((isSelectedDistricts?.title).trim().split(/ +/).join(""))
                            var Dist = str.replace(/[^a-zA-Z ]/g, "")
                            var tableName = "Substations" + Dist;
                            SqlData.createTablex(tableName);

                            setTimeout(() => {
                                fetchSubstationItemsList(tableName);
                            }, 5000)
                        }
                        else if (isSelectedImageOption === "Feeders") {

                            onLoading(true);

                            var str = ((isSelectedDistricts?.title).trim().split(/ +/).join(""))
                            var Dist = str.replace(/[^a-zA-Z ]/g, "")
                            var tableName = "Feeders" + Dist;
                            SqlData.createTablex(tableName);

                            setTimeout(() => {
                                onFetchFeederComponentList(tableName);
                            }, 5000)
                        }
                        else if (isSelectedImageOption === "DTR") {
                            onLoading(true);
                            var str = ((isSelectedDistricts?.title).trim().split(/ +/).join(""))
                            var Dist = str.replace(/[^a-zA-Z ]/g, "")
                            var tableName = "DTR" + Dist;
                            SqlData.createTablex(tableName);

                            setTimeout(() => {
                                onFetchDTRdateList(tableName);
                            }, 5000)
                        }
                        else if (isSelectedImageOption === "Others") {
                            onLoading(true);
                            var str = ((isSelectedDistricts?.title).trim().split(/ +/).join(""))
                            var Dist = str.replace(/[^a-zA-Z ]/g, "")
                            var tableName = "Others" + Dist;
                            SqlData.createTablex(tableName);

                            setTimeout(() => {
                                onFetchOthersList(tableName);
                            }, 5000)
                        }
                    },
                },
                {
                    text: "Cancel",
                },
            ]);
        }
    };

    const fetchSubstationItemsList = (tableName) => {
        const body = {
            district_id: JSON.stringify(isSelectedDistricts.value),
            discom_id: UserManager.discom_id,
            majorcomponent_id: "",
            subcomp_id: "",
            searchText: "",
            asset_type: 'Substation'
        };

        Service.post(EndPoints.getItemsUpdateList, body, (response) => {
            onLoading(false);
            if (response.data) {
                if ((response.data).length > 0) {
                    setTimeout(() => {
                        SqlData.setDatax(tableName, false, (response.data), (response) => {
                        }, (error) => {
                        });
                    }, 100)

                } else {
                    showErrorToast("Substation list is empty!")
                }

            } else showErrorToast(response.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onFetchFeederComponentList = (tableName) => {
        onLoading(true);
        const data = {
            district_id: JSON.stringify(isSelectedDistricts.value),
            search_name: "",
            substation_id: "",
        };

        Service.post(EndPoints.getFeederbydistrict, data, (response) => {

            if (response.resultflag == 1) {
                if ((response.data).length > 0) {

                    onLoading(false);
                    setTimeout(() => {
                        SqlData.setDatax(tableName, false, (response.data), (response) => {
                        }, (error) => {
                        });
                    }, 100)
                }
                else {
                    showErrorToast("Feeder list is empty!")
                }
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onFetchDTRdateList = (tableName) => {


        onLoading(true);
        const body = {
            district_id: JSON.stringify(isSelectedDistricts?.value),
            discom_id: UserManager.discom_id,
            majorcomponent_id: "",
            subcomp_id: "",
            searchText: "",
            asset_type: 'DTR'
        };

        Service.post(EndPoints.getItemsUpdateList, body, (response) => {
            onLoading(false);
            if (response.data) {
                if ((response.data).length > 0) {
                    setTimeout(() => {
                        SqlData.setDatax(tableName, false, (response.data), (response) => {
                        }, (error) => {
                        });
                    }, 100)
                }
                else {
                    showErrorToast("DTR list is empty!")
                }
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }

    const onFetchOthersList = (tableName) => {

        onLoading(true);

        const data = {
            district_id: JSON.stringify(isSelectedDistricts?.value),
            discom_id: UserManager.discom_id,
            major_component_id: "",
            sub_component_id: "",
        };

        Service.post(EndPoints.oterFeederList, data, (res) => {

            onLoading(false);
            if (res.data) {
                if ((res.data).length > 0) {
                    setTimeout(() => {
                        SqlData.setDatax(tableName, false, (res.data), (response) => {
                        }, (error) => {
                        });
                    }, 100)
                }
                else {
                    showErrorToast("Other list is empty!")
                }
            } else showErrorToast(res.message);
        },
            (err) => {
                onLoading(false);
            }
        );
    }



    return (
        <SafeAreaView style={pageStyles.mainView}>
            <Header
                rightIcon={<IcnMpty />}
                leftIcon={<IcnLogout />}
                onLeftPress={() => { navigation.openDrawer() }}
                title="Offline Data Download"
            />

            <ScrollView style={pageStyles.container}>
                <View style={pageStyles.innerContainer}>
                    <View style={pageStyles.dropdownview}>
                        <SingleDropdownList title={"Select District"} data={isDistricts} onSelectedSevice={(value) => { setSelectedDistricts(value) }} />
                    </View>

                    <View style={pageStyles.imageButtonView}>
                        <RadioButtonImage
                            options={options}
                            selectedOption={isSelectedImageOption}
                            onSelect={(option) => setSelectedImageOption(option)}
                            imageSource={imageSource}
                        />
                    </View>

                    <View style={{ marginHorizontal: AppUtil.getWP(5),width: '100%', height: AppUtil.getHP(30), marginTop: AppUtil.getHP(1), borderWidth: 0.5, borderColor: Colors.orange, }}>
                        <MapView style={{ width: '100%', height: '100%' }}
                            ref={mapRef}
                            initialRegion={isInitialRegion}>
                            <LocalTile tileSize={256} />
                            <Marker coordinate={{ latitude: parseFloat(isCurrentLatitude), longitude: parseFloat(isCurrentLongitude) }} pinColor={"purple"}>
                            </Marker>
                        </MapView>
                    </View>

                    <SubmitBtn title="Download" onPress={handlePress} />

                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

// define your styles
const pageStyles = StyleSheet.create({
    mainView: { flex: 1, },
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },
    innerContainer: {
        
    },
    dropdownview: {
        marginHorizontal: AppUtil.getWP(5),
        marginTop: 20,
        marginBottom: 10,
    },

    imageButtonView: {
        backgroundColor: Colors.disableViewColor,
        marginVertical: AppUtil.getHP(2),
        paddingVertical: AppUtil.getHP(3),
    },

});

export default memo(OffLinedownlodDetailsScreen);



