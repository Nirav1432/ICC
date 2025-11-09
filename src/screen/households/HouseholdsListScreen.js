import { View, Text, TouchableOpacity, } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import Header from "../../components/header/Header";
import SearchView from "../../components/searchView/SearchView";
import PageStyle from "../households/HosehodlsStyle";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { showErrorToast } from "../../components/toastFunc/ToastFunc";
import SingleDropdownList from "../../components/singleselectlist/SingleDropdownList";
import { Labels } from "../../utils/Labels";
import { HouseHoldDropDown } from "../../utils/CardData";
import MultiDropdownList from "../../components/singleselectlist/MultiDropdownList";
import moment from "moment";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import { UserManager } from "../../manager/UserManager";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";

const HouseholdsListScreen = (props) => {
  const route = useRoute();
  const { selectedDistricts } = route.params;

  const navigation = useNavigation();

  const [isScheme, setScheme] = useState("");

  const [isTalukaList, setTalukaList] = useState([]);
  const [isSelectTaluka, setSelectTaluka] = useState("");

  const [isVillageList, setVillageList] = useState([]);
  const [isSelectVillage, setSelectVillage] = useState("");

  const [isDataList, setDataList] = useState([]);


  const onScheme = (value) => {
    setScheme(value);
    onFetchTalukaData();
  }

  const onFetchTalukaData = () => {
    onLoading(true);

    var data = { discom_id: UserManager.discom_id };
    Service.post(EndPoints.getTaluka, data, (success) => {

      const taluka = success.data.map((dt) => ({
        title: dt?.block_taluka,
        id: dt?.district_id,
      }));
      setTalukaList(taluka);
      onLoading(false);
    },
      (error) => {
        onLoading(false);
      }
    );
  }

  const onSelectTaluka = (item) => {
    setSelectTaluka(item);

    setSelectVillage("");
    setVillageList([]);

    onFetchVillageData(item?.id);
  }

  const onFetchVillageData = (id) => {
    onLoading(true);

    var data = { district_id: id };
    Service.post(EndPoints.getVillage, data, (success) => {

      const villages = success.villages.map((dt) => ({
        title: dt?.village_name,
        id: dt?.id,
        code: dt?.lgd_code,

      }));
      setVillageList(villages);
      onLoading(false);
    },
      (error) => {
        onLoading(false);
      }
    );
  }

  const onSelectVillage = (item) => {
    setSelectVillage(item);
    onFetachDataList(item)
  }

  const onFetachDataList = () => {
    onLoading(true);
    var data = {
      "user_id": UserManager?.id,
      "district_id": isSelectTaluka?.id,
      "discom_id": UserManager.discom_id,
      "scheme": isScheme?.title,
    };
    Service.post(EndPoints.getVVPTList, data, (success) => {
      if (success?.resultflag) {
        setDataList(success?.pvtgData);
      }
      else {
        setDataList([]);
      }
      onLoading(false);
    },
      (error) => {
        onLoading(false);
      }
    );
  }

  const onSearch = (text) => {
    // setSearchItem(text);
    // onFetchFeederComponentList(text, isSubstationId);
  }

  const callCard = (item) => {
    return (
      <TouchableOpacity style={PageStyle.houseHoldListCard} onPress={() => navigation.navigate("HouseholdsCreateGeotagScreen", { data: item, selectedDistricts, taluka: isSelectTaluka, village: isSelectVillage, scheme: isScheme })}>

        <View style={PageStyle.cardTitles}>
          <Text style={PageStyle.cardSr}>{"PVTG Habitation Name"}</Text>
          <Text style={PageStyle.cardTitle}>{item?.taluka}</Text>
        </View>

        <View style={PageStyle.card1}>

          <View style={PageStyle.cardTitles1}>
            <Text style={PageStyle.cardSr1}>{"No.of PVTG HHs"}</Text>
            <Text style={PageStyle.cardTitle}>{item?.no_pvtg_hhs}</Text>
          </View>

          <View style={PageStyle.cardTitles1}>
            <Text style={PageStyle.cardSr1}>{"No.of PVTG HHs electrified progress"}</Text>
            <Text style={PageStyle.cardTitle}>{item?.no_pvtg_hhs_electrified_progress}</Text>
          </View> 

        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={PageStyle.mainView}>
      <Header
        title="Household Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />

      <View style={PageStyle.container}>
        {/* <View style={PageStyle.headerView}>
          <Text style={PageStyle.headerText}>Loss Reduction</Text>
        </View> */}

        <View style={PageStyle.firstView}>

          <View style={PageStyle.flexView}>
            <SingleDropdownList title={Labels.Scheme} data={HouseHoldDropDown} onSelectedSevice={(value) => { onScheme(value) }} />
          </View>
          {
            isScheme != "" &&
            <View style={PageStyle.flexView1}>
              <MultiDropdownList title={Labels.Taluka} data={isTalukaList} onSelectedSevice={(value) => { onSelectTaluka(value) }} />
              <MultiDropdownList title={Labels.Village} data={isVillageList} onSelectedSevice={(value) => { onSelectVillage(value) }} />
            </View>
          }

          {
            isScheme != "" && isSelectTaluka != "" && isSelectVillage != "" &&
            <View style={PageStyle.flexView}>
              <SearchView onHandleSearch={(text) => { onSearch(text) }} />
            </View>
          }

        </View>

        {
          isScheme != "" && isSelectTaluka != "" && isSelectVillage != "" &&
          <View style={PageStyle.flatList}>
            <FlashList
              scrollEnabled
              data={isDataList}
              renderItem={({ item }) => callCard(item)}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HouseholdsListScreen);
