import { View, Text, ScrollView, TouchableOpacity, Alert, } from "react-native";
import React, { useState, useEffect, memo } from "react";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import UserIcon from "../../../assets/svg/UserIcon";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/header/Header";
import GeneralAssetDetailStyle from "./GeneralAssetDetailStyle";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import { Labels } from "../../../utils/Labels";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { onLoading } from "../../../../App";
import { useRoute } from "@react-navigation/native";
import { UserManager } from "../../../manager/UserManager";
import moment from "moment";
import { StackActions } from '@react-navigation/native';
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loger } from "../../../utils/Loger";
import { AppUtil } from "../../../utils/AppUtil";
import { SafeAreaView } from "react-native-safe-area-context";

var _obj1 = {};
var _obj2 = {};
var _obj3 = {};
var images = [];
var _codeIndex = ""

const GeneralAssetDetail = (props) => {
  const navigation = useNavigation();
  const [isSubmitTab, setSubmit] = useState(1);
  const [isDropDownList, setDropDownList] = useState([]);
  const [isIndexCode, setIndexCode] = useState(null);
  const [isSubstationList, setSubstationList] = useState(null);

  const route = useRoute();

  const { selectedItem, selectedDistricts, selectedOption, achievementButtonState, sl_district_major_component, sl_district_sub_component, sl_district_items_specification, indexCode, selectedDistrictsName, cardData, sessionType, pacageList, } = route.params;

  useEffect(() => {
    if (cardData.length) {
      let strToNum = parseInt(cardData[0]?.item_no) || 0;
      _codeIndex = "000" + (strToNum + 1);
      setIndexCode(indexCode + "_" + _codeIndex + AppUtil.generateUniqueKey());
    }
    else {
      _codeIndex = "0001";
      setIndexCode(indexCode + "_" + _codeIndex + AppUtil.generateUniqueKey());
    }
    onGetListData();
  }, []);

  const onGetListData = () => {
    onLoading(true);
    Service.post(EndPoints.getSettingListData, {}, (res) => {
      onLoading(false);
      if (res.data) {
        setDropDownList(res.data);
        getSubstationList();

        if (res.data.length < 1) {
          Alert.alert("Alert", "Setting Data is Empty. try some time later", [
            {
              text: "OK",

            },

          ]);
        }

      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
        Alert.alert("Alert", "Setting Data is Empty. try some time later --" + err, [
          {
            text: "OK",

          },

        ]);
      }
    );
  };

  const onGoback = () => {
    if (isSubmitTab == 1) {
      _obj1 = {};
      _obj2 = {};
      _obj3 = {};
      images = [];
      navigation.goBack();
    }
    else if (isSubmitTab == 2) setSubmit(1);
    else if (isSubmitTab == 3) setSubmit(2);
  };

  const onNextStep = (step, object, img) => {

    if (indexCode == "")
      return

    if (step == 1) {
      _obj1 = object;
      img?.forEach((element) => {
        images.push(element);
      });
      setSubmit(2);
    } else if (step == 2) {
      _obj2 = object;
      setSubmit(3);
    } else if (step == 3) {
      _obj3 = object;

      var data = {
        item_no: _codeIndex,
        role_id: UserManager.role_id,
        user_id: UserManager.id,
        discom_id: UserManager.discom_id,
        geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
        taging_for: selectedOption,
        district_id: selectedDistricts,
        task: _obj3?.task,
        geotagData: {
          sl_district_major_component: sl_district_major_component,
          sl_district_sub_component: sl_district_sub_component,
          sl_district_items_specification: sl_district_items_specification,

          sl_lattitude: {
            title: selectedItem,
            tag_by: UserManager.first_name + " " + UserManager.last_name,
            index_id: _obj1.subTitle,
            item_no: _codeIndex,
            latitude: _obj1.latitude,
            longitude: _obj1.longitude,
            address: _obj1.address,
            block: _obj1.block,
            village: _obj1.village,

            images: images,

            dtr_details: {
              dtr_capacity: _obj2.dtr_capacity,
              dtr_voltage_ratio: _obj2.dtr_voltage_ratio,
              dtr_model: _obj2.dtr_model,
              dtr_manufacturing_month_year: _obj2.dtr_manufacturing_month_year,
              dtr_year_installation: _obj2.dtr_year_installation,
              dtr_mounting: _obj2.dtr_mounting,
              dtr_number_of_dtr: _obj2.dtr_number_of_dtr,
              dtr_Package: _obj2?.dtr_Package,

              if_existing_mention_scheme: _obj3?.if_existing_mention_scheme,
              "if_existing_mention_scheme_name": _obj3?.if_existing_mention_scheme_name,
              "substaion_value": _obj3?.substaion_value,
              "substaion_title": _obj3?.substaion_title,
              "feeder_name_on_which_dtr_is_erected": _obj3?.feeder_name_on_which_dtr_is_erected,
              "11_feeder_name_on_which_dtr_is_erected": _obj3?.feeder_name_on_which_dtr_is_erected,
              "11_feeder_code_on_which_dtr_is_erected": _obj3?.feeder_code_on_which_dtr_is_erected,
              feeder_id_is_erected: _obj3?.feeder_id_is_erected,
              emanating_ss_name: _obj3?.emanating_ss_name,
              emanating_ss_code: _obj3?.emanating_ss_code,
            },
          },
        },
        remarks: _obj3?.remark
      };

      onLoading(true);

      Service.post(EndPoints.addgeotag, data, (res) => {
        onLoading(false);
        if (res._resultflag) {
          Alert.alert("Alert", res.message, [
            {
              text: "OK",
              onPress: () => {
                _obj1 = {};
                _obj2 = {};
                _obj3 = {};
                images = [];

                if (sessionType == "DTR") {
                  const popAction = StackActions.pop(2);
                  navigation.dispatch(popAction);
                }
                else {
                  const popAction = StackActions.pop(3);
                  navigation.dispatch(popAction);
                }
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
  };

  const getSubstationList = () => {
    onLoading(true);

    var data = { district_id: selectedDistricts };

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

  if (isDropDownList.length < 1) {
    return null
  }

  else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          onLeftPress={() => onGoback()}
          title="DTR Geotag"
          leftIcon={<IcnBack />}
        // rightIcon={<UserIcon />}
        />
        <KeyboardAwareScrollView>
          <ScrollView>
            <View style={GeneralAssetDetailStyle.title}>
              <Text style={GeneralAssetDetailStyle.text}>{selectedItem} </Text>
            </View>
            <View style={GeneralAssetDetailStyle.subHeader}>
              <Text style={GeneralAssetDetailStyle.subHeaderText}>{indexCode}</Text>
            </View>

            <View style={GeneralAssetDetailStyle.modifySearch}>
              <Text style={GeneralAssetDetailStyle.modifySearchText}>
                {Labels.generalDetails}
              </Text>
              <TouchableOpacity>
                <IcnGreyDown />
              </TouchableOpacity>
            </View>
            {/* {isSubmitTab == 1 && (
              <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <SingleDropdownList defoultTitle={_codeIndex} data={list} onSelectedSevice={(value) => { onSelectValue(value) }} />
              </View>
            )} */}

            {isSubmitTab == 1 && (
              <Step1
                item={{ title: selectedItem, subTitle: isIndexCode, selectedDistrictsName: selectedDistrictsName }}
                oldData={_obj1}
                oldImg={images}
                cardData={cardData}
                handleButtonPress={(obj1, imgObj) => onNextStep(1, obj1, imgObj)}
              />
            )}
            {isSubmitTab == 2 && (
              <Step2
                data={isDropDownList}
                pacageList={pacageList}
                oldData={_obj2}
                handleButtonPress={(obj2) => onNextStep(2, obj2, null)}
              />
            )}
            {isSubmitTab == 3 && (
              <Step3
                data={isDropDownList}
                selectedDistricts={selectedDistricts}
                substationList={isSubstationList}
                oldData={_obj3}
                onChange={(obj3) => _obj3 = obj3}
                handleButtonPress={(obj3) => onNextStep(3, obj3, null)}
              />
            )}
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
};

export default memo(GeneralAssetDetail);
