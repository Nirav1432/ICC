import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import DtrGeo2Styles from "../dtrGeo2/DtrGeo2Style";
import HalfDropDown from "../../../components/halfDropDown/HalfDropDown";
import { onLoading } from "../../../../App";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { showErrorToast } from "./../../../components/toastFunc/ToastFunc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserManager } from "../../../manager/UserManager";
import IcnSearch from "../../../assets/svg/IcnSearch";
import { Loger } from "../../../utils/Loger";
import { SqlData } from "../../../database/SqlData";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { SafeAreaView } from "react-native-safe-area-context";

const DtrGeoGagList = (props) => {


  const [componentTitles, setComponentTitles] = useState([]);
  const [majorComponents, setMajorComponents] = useState([]);
  const [selectedMajorComponent, setMajorComponentId] = useState("");
  const [subComponents, setSubComponents] = useState([]);
  const [selectedSubComponent, setSubComponentID] = useState("");

  const [resultArray, setResultArray] = useState([]);
  const [isFeederList, setFeederList] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [ids, setIds] = useState(null);
  const route = useRoute();

  const { selectedDistricts, selectedOption, achievementButtonState, geotagType, selectedDistrictsName, sessionType, tableName } = route.params;

  useEffect(() => {
    SqlData.createTablex(tableName);
    onFetchFeederComponentList();
  }, []);

  const onFetchFeederComponentList = () => {
    onLoading(true);
    const data = { district_id: JSON.stringify(selectedDistricts), };

    Service.post(EndPoints.getFeederbydistrict, data, (response) => {
      if (response.resultflag == "1") {
        setFeederList(response?.data);
        onFetchMajorData();
      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );
  };

  const onFetchMajorData = () => {
    onLoading(true);
    Service.post(EndPoints.majorComponent, { monitoring_id: "3" }, (response) => {
      onLoading(false);
      if (response.data) {

        const majorComponents = response.data.map((majorComponent) => ({
          label: majorComponent.title,
          value: majorComponent.id,
        }));
        majorComponents.unshift({ label: "Select", value: "-1" });
        setMajorComponents(majorComponents);
        onFetchUpdateList("", "", "")

      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );
  }

  const onSelectMajorComponent = (_id) => {

    let id = _id == "-1" ? "" : _id

    setMajorComponentId(id);
    setSubComponentID("")
    onFetchSubComponentData(id);

    setTimeout(() => {
      onFetchUpdateList(id, "", searchText)
    }, 500)

  }

  const onFetchSubComponentData = (id) => {
    setSubComponents([]);
    setComponentTitles([]);

    onLoading(true);

    Service.post(EndPoints.subComponent, { lr_major_component_id: JSON.stringify(id), monitoring_id: "3" }, (response) => {
      onLoading(false);
      if (response.data) {

        const subComponents = response.data.map((subComponent) => ({
          label: subComponent.title,
          value: subComponent.id,
        }));
        subComponents.unshift({ label: "Select", value: "-1" });
        setSubComponents(subComponents);

      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );
  }

  const onSelectSubComponent = (_id) => {
    let id = _id == "-1" ? "" : _id

    setSubComponentID(id)
    onFetchUpdateList(selectedMajorComponent, id, searchText)
  }

  const onFetchUpdateList = (majorComponent, subComponentid, searchText) => {


    onLoading(true);
    const body = {
      district_id: JSON.stringify(selectedDistricts),
      discom_id: UserManager.discom_id,
      majorcomponent_id: majorComponent + "",
      subcomp_id: subComponentid + "",
      searchText: searchText,
      asset_type: 'DTR'
    };

    Service.post(EndPoints.getItemsUpdateList, body, (response) => {
      onLoading(false);
      if (response.data) {
        setResultArray(response.data);

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

  const handleItemPress = React.useCallback((item) => {

    props.navigation.navigate("CreateDtrGeoTag", {

      parentData: item,
      selectedDistricts: selectedDistricts,
      feederList: isFeederList,
      geotagType: geotagType,
      selectedOption,
      achievementButtonState,
      selectedDistrictsName,
      countlist: item?.sanctioned,
      sessionType
    });
  },
    [props.navigation, resultArray, selectedDistricts, selectedMajorComponent, selectedSubComponent,]
  );

  const OnsetText = (text) => {
    setSearchText(text);

    if (text == "")
      onFetchUpdateList(selectedMajorComponent, selectedSubComponent, "")

  }
  const handleSearch = () => {
    if (searchText !== "")
      onFetchUpdateList(selectedMajorComponent, selectedSubComponent, searchText);
  }

  return (
    <SafeAreaView style={DtrGeo2Styles.container}>

      <Header onLeftPress={() => props.navigation.goBack()} title="DTR Geotag" leftIcon={<IcnBack />} />

      <View style={DtrGeo2Styles.firstView}>

        <View style={DtrGeo2Styles.flexView}>

          <HalfDropDown
            title={"Major Components"}
            data={majorComponents}
            onValueChange={(value) => { onSelectMajorComponent(value.value) }}
          />
          <HalfDropDown
            title={"Sub Component"}
            data={subComponents}
            onValueChange={(value) => {
              onSelectSubComponent(value.value);
            }
            }
          />
        </View>

        <View style={DtrGeo2Styles.mainView}>
          <TextInput
            maxLength={70}
            placeholder="Enter your keyword here"
            placeholderTextColor={"black"}
            style={DtrGeo2Styles.btnDrop}
            value={searchText}
            onChangeText={(text) => { OnsetText(text) }}
          />
          <TouchableOpacity onPress={() => { handleSearch() }} style={DtrGeo2Styles.btnSearch}>
            <IcnSearch />
          </TouchableOpacity>
        </View>

      </View>

      <View style={DtrGeo2Styles.secondView}>
        <FlatList
          removeClippedSubviews={true}
          windowSize={5}
          initialNumToRender={10}
          style={DtrGeo2Styles.flatList}
          scrollEnabled
          data={resultArray}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { handleItemPress(item); }} style={DtrGeo2Styles.cell} >
              <Text numberOfLines={2} style={DtrGeo2Styles.cellText}>{item?.major_components + " - " + item?.item_summary}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(DtrGeoGagList);
