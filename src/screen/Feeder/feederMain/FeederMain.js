import { View, Text,  FlatList, TouchableOpacity, } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import UserIcon from "../../../assets/svg/UserIcon";
import FeederMainStyle from "./FeederMainStyle";
import Header from "../../../components/header/Header";
import SearchView from "../../../components/searchView/SearchView";
import FullDropDown from "../../../components/fullDropDown/FullDropDown";
import SearchBar from "../../../components/searchBar/SearchBar";
import DtrGeo2Style from "../../dtrGeoTag/dtrGeo2/DtrGeo2Style";
import HalfDropDown from "../../../components/halfDropDown/HalfDropDown";
import { onLoading } from "../../../../App";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { Labels } from "../../../utils/Labels";
import { UserManager } from "../../../manager/UserManager";
import { SqlData, SqlTableName } from "../../../database/SqlData";
import { SafeAreaView } from "react-native-safe-area-context";

const FeederMain = (props) => {
  const route = useRoute();
  const { selectedDistricts, selectedOption, tableName, achievementButtonState, selectedDistrictsName } = route.params;


  const navigation = useNavigation();

  const [isSubstationId, setSubstationId] = useState("");
  const [isSearchItem, setSearchItem] = useState("");
  const [isDisticList, setDisticList] = useState([]);
  const [isFeederList, setFeederList] = useState([]);



  useEffect(() => {
    SqlData.createTablex(tableName);
    onFetchMajorData();
  }, []);


  const onFetchMajorData = () => {
    onLoading(true);

    var data = { district_id: selectedDistricts };

    Service.post(EndPoints.getSubstationByDistrict, data, (success) => {

      const transformedDistricts = success.data.map((district) => ({
        title: district?.substation_name,
        value: district?.id,
      }));

      transformedDistricts.push({ "title": "Select", "value": -1 })
      setDisticList(transformedDistricts.reverse());

      onFetchFeederComponentList(isSearchItem, isSubstationId);
      // onLoading(false);
    },
      (error) => {
        onLoading(false);
      }
    );
  }

  const onFetchFeederComponentList = (searchValue, substationId) => {
    onLoading(true);
    const data = {
      district_id: JSON.stringify(selectedDistricts),
      search_name: searchValue,
      substation_id: substationId,
    };

    Service.post(EndPoints.getFeederbydistrict, data, (response) => {
      onLoading(false);
      if (response.resultflag == 1) {
        setFeederList(response?.data);

        if ((response.data).length > 0) {
          setTimeout(() => {
            SqlData.setDatax(tableName, false, (response.data), (response) => {
            }, (error) => {
            });
          }, 100)
        }

      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );
  }

  const onSelectSubstation = (value) => {
    setSubstationId(value.value == -1 ? "" : value.value)
    onFetchFeederComponentList(isSearchItem, value.value == -1 ? "" : value.value);
  }

  const onSearch = (text) => {
    setSearchItem(text);
    onFetchFeederComponentList(text, isSubstationId);
  }

  const onClickNavigate = (item) => {
    navigation.navigate("FeederForm", { feederData: item, selectedDistricts: selectedDistricts, selectedOption: selectedOption, achievementButtonState: achievementButtonState, selectedDistrictsName: selectedDistrictsName })
  }


  return (
    <SafeAreaView style={FeederMainStyle.mainView}>
      <Header
        title="Feeder Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
      />
      <View style={FeederMainStyle.container}>
        <View style={FeederMainStyle.headerView}>
          <Text style={FeederMainStyle.headerText}>Loss Reduction</Text>
        </View>

        <View style={FeederMainStyle.firstView}>
          <View style={FeederMainStyle.flexView}>

            <SingleDropdownList title={Labels.FilterbySubstationName} data={isDisticList} onSelectedSevice={(value) => { onSelectSubstation(value) }} />

          </View>
          <View style={FeederMainStyle.flexView}>
            <SearchView onHandleSearch={(text) => { onSearch(text) }} onSearch={() => null} />
          </View>
        </View>


        <FlatList
          removeClippedSubviews={true}
          windowSize={5}
          initialNumToRender={10}
          style={DtrGeo2Style.flatList}
          scrollEnabled
          data={isFeederList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onClickNavigate(item)} style={DtrGeo2Style.cell}>
              <Text style={DtrGeo2Style.cellText}>
                {item?.feeder_name + " - " + item?.feeder_code}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(FeederMain);
