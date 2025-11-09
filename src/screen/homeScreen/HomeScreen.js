import React, { memo, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert, } from "react-native";
import { HomeScreenStyle } from "./HomeScreenStyle";
import Header from "../../components/header/Header";
import IcnLogout from "../../assets/svg/IcnLogout";
import IcnMpty from "../../assets/svg/IcnMpty.js";
import RadioButton from "../../components/radioButton/RadioButton";
import SubmitBtn from "../../components/clogin/commonButton/SubmitBtn";
import RadioButtonImage from "../../components/radioButtonImage/RadioButtonImgae";
import IcnSubStations from "../../assets/svg/Substations";
import IcnFeeders from "../../assets/svg/IcnFeeders";
import IcnDTR from "../../assets/svg/IcnDTR";
import { onLoading } from "../../../App";
import { Colors } from "../../utils/Colors";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import { useNavigation } from "@react-navigation/native";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import { UserManager } from "../../manager/UserManager";
import IcnHouse from "../../assets/svg/IcnHouse";
import IcnOther from "../../assets/svg/IcnOther";
import { requestMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import Geolocation from "@react-native-community/geolocation";
import { SqlData, SqlTableName } from "../../database/SqlData";
import { GOOGLE_API_KEY } from "../../service/appConfig";
import Geocoder from "react-native-geocoding";
import { SafeAreaView } from "react-native-safe-area-context";

const options = ["Substations", "Feeders", "DTR", "Households", "Others"];
const imageSource = [<IcnSubStations />, <IcnFeeders />, <IcnDTR />, <IcnHouse />, <IcnOther />,];
const lossReduction = ["Loss Reduction"];
const smartMetering = ["Smart Metering"];
const modernization = ["Modernization"];

const HomeScreen = () => {

  const navigation = useNavigation();

  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState(null);
  const [selectedImageOption, setSelectedImageOption] = useState(null);

  const [selectedOption, setSelectedOption] = useState(lossReduction[0]);
  const [isBtnType, setBtnType] = useState("Achievement");

  useEffect(() => {
    SqlData.createTablex("districtsTable");
    Geocoder.init(GOOGLE_API_KEY);
    getLocation();

    SqlData.createTablex(SqlTableName.LT_MAJOR_COMPONENT_TABLE);
    SqlData.createTablex(SqlTableName.HT_MAJOR_COMPONENT_TABLE
    );

    return () => {
      // getLocation();
    };
  }, []);

  const getLocation = () => {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization((info) => {
        subscribeLocationLocation()
      })
      subscribeLocationLocation();
    }
    else {
      requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then((statuses) => {

        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted") {
          subscribeLocationLocation();
        }
        else {
          Alert.alert("Alert", "This App needs access to your phone's location. Please enable location permissions in settings.",
            [
              {
                text: 'OKAY', onPress: () => {
                  openSettings().catch(() => { null });
                }
              },
            ]);
        }
      });
    }
  }
  const subscribeLocationLocation = () => {

    Geolocation.watchPosition((position) => {
    },
      (error) => { },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        distanceFilter: 0,
        fastestInterval: 100,
        useSignificantChanges: true,
      }
    );

  };

  useEffect(() => {
    setTimeout(() => {
      if (UserManager.is_password_reset == 1) {
        navigation.navigate("Changepassword");
      }
    }, 50)
  }, [])

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

      getCoomonMajorComponent();

      setTimeout(() => {
        SqlData.setDatax("districtsTable", true, arr);
      }, 100)
    },
      (err) => {
        onLoading(false);
      }
    );
  }, []);

  const getCoomonMajorComponent = () => {

    onLoading(true);

    Service.post(EndPoints.commonMajorComponentlist, {}, (response) => {
      onLoading(false);
      if (response.data) {
        UserManager.majorComonentDTR = response?.data?.dtr;
        UserManager.majorComonentSubstation = response?.data?.Substations;
        UserManager.majorComonentFeeder = response?.data?.feeder;
        UserManager.majorComonentOthers = response?.data?.others;

        const ltmajorComponents = response?.data?.lt_line.map((majorComponent) => (majorComponent.title));
        UserManager.majorComonentLT = ltmajorComponents;

        const htmajorComponents = response?.data?.ht_line.map((majorComponent) => (majorComponent.title));
        UserManager.majorComonentHT = htmajorComponents;

        SqlData.setDatax(SqlTableName.LT_MAJOR_COMPONENT_TABLE, false, (ltmajorComponents), (response) => {
          // Loger.onLog("LT-----", response)
        }, (error) => {
          // Loger.onLog("LTer-----", error)
        });

        SqlData.setDatax(SqlTableName.HT_MAJOR_COMPONENT_TABLE, false, (htmajorComponents), (response) => {
          //  Loger.onLog("HT-----", response)
        }, (error) => {
          // Loger.onLog("HTer-----", error)
        });



      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );

  }

  const onPressType = (btnType) => {
    setBtnType(btnType)
  }

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handlePress = () => {

    if (selectedDistricts == null) {
      showErrorToast("Please select District")
      return
    }
    else if (selectedOption === null) {
      showErrorToast("Please select Loss Reduction")
      return
    }
    else if (selectedImageOption === "Substations") {
      SqlData.getdatax('SELECT * FROM SaveSubstationGeotagTable;', (response) => {
        navigation.navigate("OffLineSubstationSaveGeoTagList");
      },
        (error) => {

          var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
          var Dist = str.replace(/[^a-zA-Z ]/g, "")

          navigation.navigate("SubstationsList", {
            selectedDistricts: selectedDistricts?.value,
            selectedDistrictsName: selectedDistricts?.title,
            selectedOption: selectedOption === "Loss Reduction" ? "LossReduction" : selectedOption,
            achievementButtonState: isBtnType == "Achievement" ? true : false,
            selectedImageOption,
            geotagType: "Achievement",
            sessionType: "Substations",
            tableName: "Substations" + Dist,
          });

        });


    }
    else if (selectedImageOption === "Feeders") {

      SqlData.getdatax('SELECT * FROM SaveFeederGeotagTable;', (response) => {
        navigation.navigate("OffLineFeederSaveGeoTagList");
      },
        (error) => {

          var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
          var Dist = str.replace(/[^a-zA-Z ]/g, "")

          navigation.navigate("FeederMain", {
            selectedDistricts: selectedDistricts?.value,
            selectedDistrictsName: selectedDistricts?.title,
            selectedOption: selectedOption === "Loss Reduction" ? "LossReduction" : selectedOption,
            achievementButtonState: isBtnType == "Achievement" ? true : false,
            geotagType: "Achievement",
            sessionType: "Feeders",
            tableName: Dist,
            tableName: "Feeders" + Dist,
          });
        });
    }
    else if (selectedImageOption === "DTR") {

      SqlData.getdatax('SELECT * FROM SaveDtrGeotagTable;', (response) => {
        navigation.navigate("OffLineSaveDtrGeoTagList");
      },
        (error) => {
          var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
          var Dist = str.replace(/[^a-zA-Z ]/g, "")

          navigation.navigate("DtrGeoGagList", {
            selectedDistricts: selectedDistricts?.value,
            selectedDistrictsName: selectedDistricts?.title,
            selectedOption: "LossReduction",
            achievementButtonState: isBtnType == "Achievement" ? true : false,
            selectedImageOption,
            geotagType: "Achievement",
            sessionType: "DTR",
            tableName: "DTR" + Dist,
          });

        });
    }
    else if (selectedImageOption === "Households") {

      if (__DEV__) {
        navigation.navigate("HouseholdsListScreen", {
          selectedDistricts: selectedDistricts,
          selectedOption: selectedOption,
          achievementButtonState: isBtnType,
          geotagType: "Achievement",
          sessionType: "Households",
        });
      }
      else {
        Alert.alert("Alert", "Households is under development", [
          {
            text: "OK",
          },
        ]);
      }
    }
    else if (selectedImageOption === "Others") {

      SqlData.getdatax('SELECT * FROM SaveOthersGeotagTable;', (response) => {
        navigation.navigate("OffLineSaveOthersGeoTagList");
      },
        (error) => {
          var str = ((selectedDistricts?.title).trim().split(/ +/).join(""))
          var Dist = str.replace(/[^a-zA-Z ]/g, "")

          navigation.navigate("OtherListScreen", {
            selectedDistricts: selectedDistricts,
            selectedOption: selectedOption,
            achievementButtonState: isBtnType,
            geotagType: "Achievement",
            sessionType: "Other",
            tableName: "Other" + Dist,
          });

        });
    }
    else {
      showErrorToast("Please select substations or feeder or DTR or households or Other")
    }
  };

  return (
    <SafeAreaView style={HomeScreenStyle.mainView}>
      <Header
        rightIcon={<IcnMpty />}
        leftIcon={<IcnLogout />}
        onLeftPress={() => { navigation.openDrawer() }}
        title="Geotagging of RDSS Assets"
      />
      <ScrollView style={HomeScreenStyle.container}>
        <View style={HomeScreenStyle.innerContainer}>
          <View style={HomeScreenStyle.dropdownview}>
            <SingleDropdownList title={"Select District"} data={districts} onSelectedSevice={(value) => { setSelectedDistricts(value) }} />
          </View>
        </View>

        <View style={HomeScreenStyle.radioView}>
          <View>
            <RadioButton
              options={lossReduction}
              selectedOption={selectedOption}
              disble={true}
              onSelect={handleSelectOption}
            />
            {/* <RadioButton
              options={smartMetering}
              selectedOption={selectedOption}
              onSelect={handleSelectOption}
            />
            <RadioButton
              options={modernization}
              selectedOption={selectedOption}
              onSelect={handleSelectOption}
            /> */}
          </View>
        </View>

        <View style={HomeScreenStyle.innerContainer}>

          <View style={HomeScreenStyle.bottomView}>

            <View style={[HomeScreenStyle.button1, { backgroundColor: isBtnType === "Survey" ? Colors.primary : Colors.disableViewColor, },]}>
              {/* <TouchableOpacity onPress={() => onPressType("Survey")}> */}
              <TouchableOpacity onPress={() => onPressType("Achievement")}>
                <Text style={[HomeScreenStyle.bottomText, { color: isBtnType === "Survey" ? Colors.white : Colors.black, },]}>
                  Survey
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[HomeScreenStyle.button2, { backgroundColor: isBtnType === "Achievement" ? Colors.primary : Colors.disableViewColor, },]}>
              <TouchableOpacity onPress={() => onPressType("Achievement")}>
                <Text style={[HomeScreenStyle.bottomText, { color: isBtnType === "Achievement" ? Colors.white : Colors.black, },]}>
                  Achievement
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={HomeScreenStyle.imageButtonView}>
          <RadioButtonImage
            options={options}
            selectedOption={selectedImageOption}
            onSelect={(option) => setSelectedImageOption(option)}
            imageSource={imageSource}
          />
        </View>
        <View style={[HomeScreenStyle.innerContainer, { marginBottom: 20 }]}>
          <SubmitBtn title="Geotag" onPress={handlePress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(HomeScreen);
