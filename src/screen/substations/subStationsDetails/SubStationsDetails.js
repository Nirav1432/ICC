import React, { useState, useEffect, memo } from "react";
import {  View,  Text,  ScrollView,  TextInput,  Alert,} from "react-native";
import { SubStationsDetailsStyle } from "./SubstationsDetailsStyle";
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
import SingleValueDropdownListSetOldData from "../../../components/singleselectlist/SingleValueDropdownListSetOldData";

const SubStationsDetails = (props)=> {
  const route = useRoute();
  const {
    geotagType,
    indexCode,
    selectedDistricts,
    selectedItem,
    sl_district_items_specification,
    sl_district_major_component,
    sl_district_sub_component,
    selectedOption,
    achievementButtonState,
    item_no, pacageList
  } = route.params;

  const [isDisticList, setDisticList] = useState(false);
  const [isDisticItem, setDisticItem] = useState(null);
  const [isItem, setItem] = useState(null);
  const [isNumberoftonsforms, setNumberoftonsforms] = useState("");
  const [isTotalCapacity, setTotalCapacity] = useState("");

  const [showCalendar1, setShowCalendar1] = useState(false);
  const [selected1, setSelected1] = useState("");
  const [monthYear1, setMonthYear1] = useState("MM/YY");
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPackege, setPackege] = React.useState(null);

  useEffect(() => {
    onGetDistic();
  }, []);

  const onGetDistic = () => {
    // var data = { state_id: selectedDistricts };
    var data = { district_id: selectedDistricts };
    Service.post(EndPoints.getSubstationByDistrict, data, (success) => {
      const transformedDistricts = success.data.map((district) => ({
        title: district.substation_name,
        value: district.id,
        // substation_code: substation_code,
      }));

      setDisticList(transformedDistricts);
    },
      (error) => {
      }
    );
  };

  const onSelectedFeeder = (value) => {
    setDisticItem(value);
    var data = { substation_id: value?.value };
    Service.post(EndPoints.getSubstationDetails, data, (res) => {
      if (res.resultflag == "1") {
        setItem(res?.data);
      }
    },
      (error) => {
      }
    );
  };

  const handleDropDownChange = (value) => {
    if (value === "Augmentation") {
      setIsModalVisible(true);
    }
  };

  const handleDayPress = (day, setMonthYear, setSelected, setShowCalendar) => {
    setSelected(day.dateString);
    setShowCalendar(false);

    const selectedDate = new Date(day.dateString);
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const updatedMonthYear = `${selectedMonth}/${selectedYear}`;
    setMonthYear(updatedMonthYear);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={SubStationsDetailsStyle.mainView}>
      <Header
        title="Substations Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />

      <ScrollView>
        <View style={[SubStationsDetailsStyle.container, isModalVisible && { opacity: 0.5 },]}>
          <View style={SubStationsDetailsStyle.title}>
            <Text style={SubStationsDetailsStyle.text}>
              {selectedItem}
            </Text>
          </View>

          <View style={SubStationsDetailsStyle.subHeader}>
            <Text style={SubStationsDetailsStyle.subHeaderText}>
              {indexCode}
            </Text>
          </View>

          <View style={SubStationsDetailsStyle.modifySearch}>
            <Text style={SubStationsDetailsStyle.modifySearchText}>
              {Labels.generalDetails}
            </Text>
          </View>

          <View style={SubStationsDetailsStyle.innerContainer}>

            <View>
              <SingleValueDropdownListSetOldData oldIndex={""} title={"Package No."} data={pacageList} onSelectedSevice={(value) => setPackege(value)} />
              <Text style={SubStationsDetailsStyle.asaText}>*Package No. field: “Data is fetched from rdss.powermin.gov.in (Form: RDSS> Input forms> Sanction and Award details>  Award Items). If no values are visible in the drop-down, please enter data on the portal and then resume geotagging”</Text>
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
              <Text style={SubStationsDetailsStyle.fieldTitle}>
                {"Number of Power Transformers (Nos.)*"}
              </Text>
              <View style={SubStationsDetailsStyle.container}>
                <TextInput
                  maxLength={70}
                  style={SubStationsDetailsStyle.disabledField}
                  value={isNumberoftonsforms}
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    // setNumberoftonsforms(value);
                    setNumberoftonsforms(value == 0 || value == "," || value == "." ? value.replace(/[^1-9]/g, '') : value);
                  }}
                />
              </View>
            </View>

            <View>
              <Text style={SubStationsDetailsStyle.fieldTitle}>
                {"Total Capacity of PTs (MVA)*"}
              </Text>
              <View style={SubStationsDetailsStyle.container}>
                <TextInput
                  maxLength={70}
                  style={SubStationsDetailsStyle.disabledField}
                  value={isTotalCapacity}
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    setTotalCapacity(value == 0 || value == "," || value == "." ? value.replace(/[^1-9]/g, '') : value);
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
                  // if (isNumberoftonsforms == "" || isTotalCapacity == "") {
                  Alert.alert("Alert", "Please fill all the fields");
                  return;
                }
                props.navigation.navigate("SubstationsAdd", {
                  isDisticItem,
                  isItem,
                  isNumberoftonsforms,
                  isTotalCapacity,
                  geotagType,
                  indexCode,
                  selectedDistricts,
                  selectedItem,
                  sl_district_items_specification,
                  sl_district_major_component,
                  sl_district_sub_component,
                  selectedOption,
                  achievementButtonState,
                  item_no,
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

export default  memo(SubStationsDetails)
