import React, { useState, useEffect, memo } from "react";
import { View, Text, ScrollView, TextInput, Alert, } from "react-native";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { Labels } from "../../../utils/Labels";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import DisabledField from "../../../components/disabledField/DisabledField";
import DatePicker from "./../../../components/datePicker/DatePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { EditSubStationsDetailsStyle } from "./EditSubstationsDetailsStyle";
import { onLoading } from "../../../../App";
import SingleValueDropdownListSetOldData from "../../../components/singleselectlist/SingleValueDropdownListSetOldData";

function EditSubstationsDetails(props) {
  const route = useRoute();

  const { indexCode, selectedDistricts, selectedItem, sl_district_items_specification,
    sl_district_major_component, sl_district_sub_component, selectedOption, achievementButtonState,
    item, substationData, pacageList } = route.params;

  const [isDisticList, setDisticList] = useState(false);
  const [isDisticItem, setDisticItem] = useState(null);
  const [isItem, setItem] = useState(null);
  const [isNumberoftonsforms, setNumberoftonsforms] = useState("");
  const [isTotalCapacity, setTotalCapacity] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPackege, setPackege] = useState(false);

  useEffect(() => {
    onGetDistic();
    setDisticItem(substationData?.substations_geotag_data?.substations_name);
    setNumberoftonsforms(substationData?.substations_geotag_data?.number_of_pts);
    setTotalCapacity(substationData?.substations_geotag_data?.total_capacity_of_pts);
  }, []);

  const onGetDistic = () => {

    onLoading(true);
    var data = { district_id: selectedDistricts };

    Service.post(
      EndPoints.getSubstationByDistrict,
      data,
      (success) => {
        const transformedDistricts = success.data.map((district) => ({
          title: district.substation_name,
          value: district.id,
        }));

        setDisticList(transformedDistricts);
        onLoading(false);
      },
      (error) => {
        onLoading(false);
      }
    );
  };

  const onSelectedFeeder = (value) => {
    setDisticItem(value);
    onLoading(true);
    var data = { substation_id: value?.value };
    Service.post(
      EndPoints.getSubstationDetails,
      data,
      (res) => {
        if (res.resultflag == "1") {
          setItem(res?.data);
        }
        onLoading(false);
      },
      (error) => {
        onLoading(false);
      }
    );
  };

  return (
    <SafeAreaView style={EditSubStationsDetailsStyle.mainView}>
      <Header
        title="Substations Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />

      <ScrollView>
        <View style={[EditSubStationsDetailsStyle.container, isModalVisible && { opacity: 0.5 },]}        >
          <View style={EditSubStationsDetailsStyle.title}>
            <Text style={EditSubStationsDetailsStyle.text}>{item?.title}</Text>
          </View>

          <View style={EditSubStationsDetailsStyle.subHeader}>
            <Text style={EditSubStationsDetailsStyle.subHeaderText}>
              {indexCode}
            </Text>
          </View>

          <View style={EditSubStationsDetailsStyle.modifySearch}>
            <Text style={EditSubStationsDetailsStyle.modifySearchText}>
              {Labels.generalDetails}
            </Text>
          </View>

          <View style={EditSubStationsDetailsStyle.innerContainer}>

            <View style={{ marginTop: 10 }}>
              <SingleValueDropdownListSetOldData oldIndex={""} title={"Package No."} data={pacageList} onSelectedSevice={(value) => setPackege(value)} />
              <Text style={EditSubStationsDetailsStyle.asaText}>*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”</Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <SingleDropdownList title={"SS name*"} data={isDisticList} onSelectedSevice={(value) => { onSelectedFeeder(value); }} />
            </View>

            <DisabledField title="SS Code" value={isItem == null ? "" : isItem?.substation_code} />
            <DisabledField title="Voltage" value={isItem == null ? "" : isItem?.voltage} />
            <DisabledField title="Substation Type(New/AUG)" value={selectedItem} />
            <DatePicker title={"SS Augmentation date"} monthYear={isItem == null ? "" : isItem?.ss_augmentation_date} />
            <DisabledField title="Number of PTs Augmented" value={isItem == null ? "" : isItem?.number_of_pts_augmented} />
            <DisabledField title="Number of 11KV newly added outgoing feeders" value={isItem == null ? "" : isItem?.number_of_11KV_newly_added_outgoing_feeders} />
            <DatePicker title={"SS commissioning date"} monthYear={isItem == null ? "" : isItem?.ss_commissioning_date} />

            <View>
              <Text style={EditSubStationsDetailsStyle.fieldTitle}>
                {"Number of Power Transformers (MVA)*"}
              </Text>
              <View style={EditSubStationsDetailsStyle.container}>
                <TextInput
                  maxLength={70}
                  style={EditSubStationsDetailsStyle.disabledField}
                  value={isNumberoftonsforms}
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    setNumberoftonsforms(value);
                  }}
                />
              </View>
            </View>

            <View>
              <Text style={EditSubStationsDetailsStyle.fieldTitle}>
                {"Total Capacity of PTs*"}
              </Text>
              <View style={EditSubStationsDetailsStyle.container}>
                <TextInput
                  maxLength={70}
                  style={EditSubStationsDetailsStyle.disabledField}
                  value={isTotalCapacity}
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    setTotalCapacity(value);
                  }}
                />
              </View>
            </View>

            <DisabledField title="Voltage of Incoming Feeder" value={isItem == null ? "" : isItem?.voltage_of_incoming_feeder} />
            <DisabledField title="Voltage of Outgoing Feeder" value={isItem == null ? "" : isItem?.voltage_of_outgoing_feeder} />
            <DisabledField title="Number of 11kV Outgoing Feeders" value={isItem == null ? "" : isItem?.number_of_11kV_outgoing_Feeders} />

            <SubmitBtn
              title="Next"
              onPress={() => {
                if (isDisticItem == null || isItem == null || isNumberoftonsforms == "" || isTotalCapacity == "") {
                  Alert.alert("Please fill all the fields");
                  return;
                }
                props.navigation.navigate("EditSubstationsAdd", {
                  isDisticItem,
                  isItem,
                  isNumberoftonsforms,
                  isTotalCapacity,
                  indexCode,
                  selectedDistricts,
                  selectedItem,
                  sl_district_items_specification,
                  sl_district_major_component,
                  sl_district_sub_component,
                  selectedOption,
                  achievementButtonState,
                  item,
                  substationData,
                  Package: isPackege,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default memo(EditSubstationsDetails)
