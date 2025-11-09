import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { memo, useState } from "react";
import { SubstationsAddStyle } from "./SubstationsAddStyle";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { Labels } from "../../../utils/Labels";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";

import SubmitButton from "../../../components/submit button/SubmitButton";
import { Colors } from "../../../utils/Colors";
import EnabledField from "../../../components/enabledField/EnabledField";
import CalendarView1 from "../../../components/calendarView/CalendarViewFourth";
import CalendarView2 from "../../../components/calendarView/CalendarViewFifth";
import { UserManager } from "../../../manager/UserManager";
import { useRoute } from "@react-navigation/native";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { onLoading } from "../../../../App";

import { StackActions } from '@react-navigation/native';
import RemarkPopup from "../../../components/submitRemark/RemarkPopup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";

var _remark = "";

function SubstationsAdd(props) {
  const route = useRoute();
  const [transformerData, setTransformerData] = useState([]);
  const [isRemarkVisible, setRemarkVisible] = React.useState(false);

  const { isItem, isNumberoftonsforms, isTotalCapacity, indexCode, selectedDistricts, selectedItem, sl_district_items_specification, sl_district_major_component, sl_district_sub_component, selectedOption, achievementButtonState, item_no, Package } = route.params;

  const handleNewTransformer = () => {
    const index = transformerData.length + 1;
    var trans = [...transformerData];

    trans.forEach((element) => {
      element.isDropVisible = false;
    });

    const newTransformer = {
      id: transformerData.length + 1,
      title: "Power Transformer " + index,
      existingPTRCapacity: "",
      ptCapacity: "",
      makeModel: "",
      manufacturingMonthYear: "",
      installationDate: "",
      isDropVisible: true,
    };

    trans.push(newTransformer);
    setTransformerData(trans);
  };
  const handleRemoveTransformer = () => {
    var trans = [...transformerData];

    trans.splice(trans.length - 1, 1)
    setTransformerData(trans);
  };
  const handleDrop = (index) => {
    var trans = [...transformerData];
    trans.forEach((element) => {
      element.isDropVisible = false;
    });
    trans[index].isDropVisible = true;
    setTransformerData(trans);

  };

  //.........................................................................................//
  const handleExistingPTRCapacity = (text, index) => {
    var trans = [...transformerData];
    trans[index].existingPTRCapacity = text;
    setTransformerData(trans);
  };
  const handlePTCapacity = (text, index) => {
    var trans = [...transformerData];
    trans[index].ptCapacity = text;
    setTransformerData(trans);
  };

  const handleMakeModel = (text, index) => {
    var trans = [...transformerData];
    trans[index].makeModel = text;
    setTransformerData(trans);
  };

  const handleManufacture = (text, index) => {
    var trans = [...transformerData];
    if (text?.currentDate === "Manufacturing Date") {
      trans[index].manufacturingMonthYear = text?.currentDate;
      setTransformerData(trans);
    } else {
      trans[index].manufacturingMonthYear = text?.defoultDate;
      setTransformerData(trans);
    }
  };
  const handleInstallationDate = (text, index) => {

    var trans = [...transformerData];

    if (text?.currentDate === "Installation Date") {
      trans[index].installationDate = text?.currentDate;
      setTransformerData(trans);
    } else {
      trans[index].installationDate = text?.defoultDate;
      setTransformerData(trans);
    }


  };
  const handleSubmit = (index) => {

    setRemarkVisible(false)
    var power_substation_data = []

    transformerData.forEach(element => {
      if (element.existingPTRCapacity == "" || element.ptCapacity == "" || element.makeModel == "") {
        return;
      }
      else if (element.manufacturingMonthYear == "" || element.manufacturingMonthYear == "Manufacturing Date") {
        return;
      }
      else if (element.installationDate == "" || element.installationDate == "Installation Date") {
        return;
      }

      const data = {
        "existing_PTR_Capacity": element.existingPTRCapacity,
        "pt_capacity": element.ptCapacity,
        "pt_make_model": element.makeModel,
        "manufacturing_month_year": element.manufacturingMonthYear == "Manufacturing Date" ? "" : element.manufacturingMonthYear,
        "date_of_installation": element.installationDate == "Installation Date" ? "" : element.installationDate,
      }
      power_substation_data.push(data)
    });

    const data = {
      "form_id": 33,
      "role_id": UserManager.role_id,
      "user_id": UserManager.id,
      "discom_id": UserManager.discom_id,
      "district_id": selectedDistricts,
      "item_no": item_no,
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
      "geotagData": {
        sl_district_major_component: [sl_district_major_component],
        sl_district_sub_component: [sl_district_sub_component],
        sl_district_items_specification: [sl_district_items_specification],
        "substations_details": {
          "substations_geotag_data": {
            "substations_name": isItem?.substation_name,
            "substations_code": isItem?.substation_code,
            "substations_Voltage": isItem?.voltage,
            "substations_type": selectedItem,
            "substations_augmentation_date": isItem?.ss_augmentation_date,
            "number_of_pts_Augmented": isItem?.number_of_pts_augmented,
            "Number_of_11kv_feeders": isItem?.umber_of_11kV_outgoing_Feeders,
            "ss_commissioning_date": isItem?.ss_commissioning_date,
            "number_of_pts": isNumberoftonsforms,
            "total_capacity_of_pts": isTotalCapacity,
            "voltage_of_incoming_feeder": isItem?.voltage_of_incoming_feeder,
            "voltage_of_outgoing_feeder": isItem?.voltage_of_outgoing_feeder,
            "number_of_11kv_outgoing_feeders": isItem?.number_of_11kV_outgoing_Feeders,
            "Substation_Package": Package,
          },
          "power_substation_data": power_substation_data
        }
      },
      "remarks": _remark
    }

    onLoading(true)
    Service.post(EndPoints.submitSSData, data, (response) => {
      if (response._resultflag) {
        Alert.alert('Success', response.message, [
          {
            text: 'OK', onPress: () => {
              AsyncStorage.setItem('@last_session_asset_id', JSON.stringify(null));
              const popAction = StackActions.pop(4);
              props.navigation.dispatch(popAction);
            }
          },
        ]);
      } else {
        Alert.alert("Alert", response.message)
      }
      onLoading(false);
    }, (err) => {
      onLoading(false);
    })

  }

  const onSubmit = () => {
    if (isNumberoftonsforms <= transformerData.length) {
      setRemarkVisible(true);
    }
    else {
      Alert.alert("Alert", "Add Power Transformer (New / Augmentation)  minimum " + isNumberoftonsforms + " is required");
      return;
    }
  }
  return (
    <SafeAreaView style={SubstationsAddStyle.mainView}>
      <Header
        title="Substations Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View style={SubstationsAddStyle.title}>
          <Text style={SubstationsAddStyle.text}>
            {selectedItem}
          </Text>
        </View>
        <View style={SubstationsAddStyle.subHeader}>
          <Text style={SubstationsAddStyle.subHeaderText}>
            {indexCode}
          </Text>
        </View>

        <View style={SubstationsAddStyle.modifySearch}>
          <Text style={SubstationsAddStyle.modifySearchText}>
            {Labels.generalDetails}
          </Text>
          <TouchableOpacity>
            <IcnGreyDown />
          </TouchableOpacity>
        </View>
        <View style={SubstationsAddStyle.container}>

          {transformerData.map((item, index) => {
            return (
              <>
                <TouchableOpacity onPress={() => { handleDrop(index); }} style={SubstationsAddStyle.modifySearch1}>
                  <Text style={SubstationsAddStyle.modifySearchText1}>
                    {item.title}
                  </Text>
                  <View>
                    <IcnGreyDown />
                  </View>
                </TouchableOpacity>
                <View style={SubstationsAddStyle.innerContainer}>
                  {item.isDropVisible && (
                    <View style={SubstationsAddStyle.drop}>
                      <EnabledField
                        title="Existing PTR Capacity (applicable for Augmentation)"
                        onChangeText={(text) => handleExistingPTRCapacity(text, index)}
                        value={item.existingPTRCapacity}
                        keyBordType="name-phone-pad"
                      />
                      <EnabledField
                        title="PT Capacity (MVA)"
                        onChangeText={(text) => handlePTCapacity(text, index)}
                        value={item.ptCapacity}
                        keyBordType="number-pad"
                      />

                      <EnabledField
                        title="Make Model"
                        onChangeText={(text) => handleMakeModel(text, index)}
                        value={item.makeModel}
                        keyBordType="name-phone-pad"
                      />

                      <View style={SubstationsAddStyle.marginBottom} />

                      <CalendarView1
                        title={"Manufacturing Month/Year"}
                        oldDate={item?.manufacturingMonthYear}
                        maximumDate={new Date()}
                        onChange={(value) => handleManufacture(value, index)}
                      />

                      <CalendarView2
                        title={"Date of installation"}
                        maximumDate={new Date()}
                        minimumDate={item?.manufacturingMonthYear}
                        oldDate={item?.installationDate}
                        onChange={(value) => { handleInstallationDate(value, index) }}
                      />

                    </View>
                  )}
                </View>
                <View style={SubstationsAddStyle.borderBottom} />
              </>
            );
          })}

          <SubmitButton
            buttonText="Add Power Transformer (New / Augmentation)"
            buttonColor={Colors.white}
            borderColor={Colors.primary}
            textColor={Colors.primary}
            handlePress={() => {
              handleNewTransformer();
            }}
          />
          {
            transformerData.length > 0 &&
            <SubmitButton
              buttonText="Remove Power Transformer"
              buttonColor={Colors.white}
              borderColor={Colors.primary}
              textColor={Colors.primary}
              handlePress={() => {
                handleRemoveTransformer();
              }}
            />
          }

          <SubmitButton
            buttonText="Submit"
            buttonColor={Colors.primary}
            borderColor={Colors.primary}
            textColor={Colors.white}
            handlePress={() => { onSubmit() }}
          />
        </View>

      </ScrollView>
      <RemarkPopup handleClose={() => setRemarkVisible(false)} isVisible={isRemarkVisible} txtRemark={(text) => _remark = text} submit={() => handleSubmit()} />

    </SafeAreaView>
  );
}
export default memo(SubstationsAdd);
