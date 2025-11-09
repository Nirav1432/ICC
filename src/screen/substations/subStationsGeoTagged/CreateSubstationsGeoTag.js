import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { SubstationsGeoTaggedStyle } from "./SubstationsGeoTaggedStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import InputFields from "../../../components/inputFields/InputFields";
import { Labels } from "../../../utils/Labels";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { boxTitles } from "../../../utils/AppUtil";
import { onLoading } from "../../../../App";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import { UserManager } from "../../../manager/UserManager";
import { Fonts } from "../../../utils/Fonts";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { useFocusEffect } from '@react-navigation/native';
import IcnMap from "../../../assets/svg/IcnMap";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loger } from "../../../utils/Loger";
import SubstationCard from "../../../components/commonCards/SubstationCard";

var _list = [];
function CreateSubstationsGeoTag(props) {


  const route = useRoute();
  const { parentData, selectedOption, achievementButtonState, selectedItem, selectedDistricts, feederList, geotagType, sl_district_major_component, sl_district_sub_component, selectedDistrictsName, countlist } = route.params;

  const [cardData, setCardData] = useState([]);
  const [indexCode, setIndexCode] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [substationData, setSubstationData] = useState(null);
  const [isSubmittedItem, setSubmittedItem] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    var arr = [];
    for (let i = 0; i < 99; i++) {
      if (i < 9)
        arr.push({ title: "00" + (i + 1) });
      else
        arr.push({ title: "0" + (i + 1) });
    }
    _list = findCommonValues(arr, isSubmittedItem);

  }, [countlist, isSubmittedItem]);

  const findCommonValues = (arr1, arr2) => {
    let commonValues = [];

    if (arr1 && arr2 && arr1.length > 0 && arr2.length > 0) {

      arr1.forEach((value) => {
        if (arr2.includes(value?.title)) {
        }
        else {
          commonValues.push(value);
        }
      });
    }
    else {
      commonValues = arr1;
    }

    return commonValues;
  };

  // Fetch card data
  const fetchData = async () => {

    const body = {
      form_id: 33,
      role_id: UserManager.role_id,
      user_id: UserManager.id,
      discom_id: UserManager.discom_id,

      district_id: selectedDistricts,
      major_component: parentData?.major_component_id,
      sub_component: parentData?.sub_component_id,
      items_specification: parentData?.item_specification_id,
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
    };

    onLoading(true);
    Service.post(EndPoints.getSsGeoTagData, body, (response) => {
      if (response._resultflag) {

        // _status = response?.list?.status;
        setIndexCode(response.index_code);
        setCardData(response.data);
        setSubstationData(response.substations_data);
        setSubmittedItem(response?.submitted_item ? response?.submitted_item : []);

        onLoading(false);

        if (response.data.length < 1)
          AsyncStorage.setItem('@last_session_asset_id', JSON.stringify(null));

      } else {
        Alert.alert("Alert", response.message);
        onLoading(false);
      }
    },
      (error) => {
        // Alert.alert("Alert", error.message);
        onLoading(false);
      }
    );
  };

  const handleViewAll = () => {

    props.navigation.navigate("SubstationViewMoreScreen", {
      selectedDistricts,
      selectedMajorComponent: parentData?.major_component_id,
      selectedSubComponent: parentData?.sub_component_id,
      sl_district_items_specification: parentData?.item_specification_id,
      achievementButtonState,
      selectedOption,
      selectedItem,
      feederList,
      geotagType,
    });
  };

  const handleClick = () => {

    props.navigation.navigate("SubstationsGeneralAssetScreen", {
      selectedOption,
      achievementButtonState,
      geotagType,
      indexCode,
      selectedDistricts,
      selectedItem: parentData?.major_components + " " + parentData?.sub_components,
      selectedMajorComponent: parentData?.major_component_id,
      selectedSubComponent: parentData?.sub_component_id,
      sl_district_items_specification: parentData?.item_specification_id,
      selectedDistrictsName,
      list: _list,
      pacageList: parentData?.package_data,
      countlist,
      recentList: cardData.length,
      isDTRList: cardData,


    });
    // }
  };
  const handlePressImage = (index, image) => {
    var img = [];
    image.forEach((element) => {
      const obj = { uri: element };
      img.push(obj);
    });
    setImages(img);
    setImgIndex(index);
    setIsVisible(true);
  };

  const onEdit = (item) => {

    var itemNomber = item?.item_no;
    var getSubmitedItemFormData = substationData[itemNomber];

    props.navigation.navigate("EditSubstationsGeoTaggedCapturePhoto", {
      selectedOption,
      achievementButtonState,
      selectedItem,
      feederList,
      indexCode,
      selectedDistricts,
      selectedMajorComponent: parentData?.major_component_id,
      selectedSubComponent: parentData?.sub_component_id,
      sl_district_items_specification: parentData?.item_specification_id,
      sl_district_major_component,
      sl_district_sub_component,
      item,
      substationData: getSubmitedItemFormData ? getSubmitedItemFormData : null,
      pacageList: parentData?.package_data,
    });

  };

  const onDelet = (id) => {
    onLoading(true);
    const data = {
      role_id: UserManager.role_id,
      user_id: UserManager.id,
      discom_id: UserManager.discom_id,
      district_id: selectedDistricts,
      major_component_id: parentData?.major_component_id,
      sub_component_id: parentData?.sub_component_id,
      items_specification_id: parentData?.item_specification_id,
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
      remove_id: id,
    };

    Service.post(EndPoints.deleteSSGeoTagbyId, data, (res) => {
      if (res._resultflag) {
        fetchData();
      } else {
        Alert.alert("Alert", res.message);
        onLoading(false);
      }
    }, (err) => {
      onLoading(false);
    })
  };
  const handleDeletePress = (id) => {
    Alert.alert('Alert', "Are you sure you want to delete? ", [
      {
        text: 'Yes', onPress: () => {
          onDelet(id)

        }
      },
      {
        text: 'No', onPress: () => { }
      }
    ]);
  }

  const onSubstationCardPress = (dt) => {

    let obj = {
      title: dt?.title,
      index_id: dt?.index_id,
      tag_by: dt?.tag_by,
      item_no: dt?.item_no,
      district_id: selectedDistricts,
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
      major_component_id: parentData?.major_component_id,
      sub_component_id: parentData?.sub_component_id,
      items_specification_id: parentData?.item_specification_id,
      selectedItem: selectedItem,
      feederList: feederList,
      indexCode: indexCode,
      substationData: substationData,
      sl_district_major_component: sl_district_major_component,
      sl_district_sub_component: sl_district_sub_component,
    };

    props.navigation.navigate("UserSubstationsDetailsScreen", { obj: obj, type: "SubstationsGeoTagged" });
  }

  return (
    <SafeAreaView style={SubstationsGeoTaggedStyle.mainView}>
      <Header
        title="Substations Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => props.navigation.goBack()}
        rightIcon={<IcnMap />}
        onRightPress={() => props.navigation.navigate("MapScreen",
          {
            type: "Substation",
            district_id: selectedDistricts,
            major_component_id: parentData?.major_component_id,
            sub_component_id: parentData?.sub_component_id,
            items_specification_id: parentData?.item_specification_id
          })}
      />
      <ScrollView>
        <View style={SubstationsGeoTaggedStyle.container}>
          <View style={SubstationsGeoTaggedStyle.title}>
            <Text style={SubstationsGeoTaggedStyle.text}>{parentData?.major_components + " " + parentData?.sub_components}</Text>
          </View>
          <View style={SubstationsGeoTaggedStyle.modifySearch}>
            <Text style={SubstationsGeoTaggedStyle.modifySearchText}>
              {Labels.generalAssetDetails}
            </Text>
            <TouchableOpacity>
              <IcnGreyDown />
            </TouchableOpacity>
          </View>
          <View style={SubstationsGeoTaggedStyle.innerContainer}>
            <InputFields
              title1={boxTitles.title1}
              value1={parentData?.sanctioned || "0"}
              title2={boxTitles.title2}
              value2={parentData?.award_items || "0"}
              title3={boxTitles.title3}
              value3={parentData?.charged || "0"}
              title4={boxTitles.title4}
              value4={parentData?.achievment || "0"}
            />

            <Text style={SubstationsGeoTaggedStyle.assetsText}>
              {cardData.length}{" "}
              {Labels.geoTagged}
            </Text>
            <SubmitBtn title="Geotag" onPress={handleClick} />

            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ fontSize: 14, fontFamily: Fonts.RobotoBlack }}>
                {"Please capture the"}{" "}
                <Text style={{ color: "#1B2F68" }}>nameplate,</Text>
              </Text>
              <Text style={{ fontSize: 14, fontFamily: Fonts.RobotoBlack }}>
                <Text style={{ color: "#1B2F68" }}>control room,</Text> and the{" "}
                <Text style={{ color: "#1B2F68" }}>power transformer</Text>
              </Text>
              <Text style={{ fontSize: 14, fontFamily: Fonts.RobotoBlack }}>
                of the substation
              </Text>
            </View>

            <View style={SubstationsGeoTaggedStyle.cardsContainer}>

              {cardData.length > 2 &&
                <View style={SubstationsGeoTaggedStyle.titles}>
                  <Text style={SubstationsGeoTaggedStyle.leftTitle}>
                    {Labels.recentlyTagged}
                  </Text>
                  {(
                    <TouchableOpacity onPress={handleViewAll}>
                      <Text style={SubstationsGeoTaggedStyle.rightTitle}>
                        {Labels.viewAll}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
              <View style={SubstationsGeoTaggedStyle.commonCardView}>
                {cardData.slice(0, 2).map((item, index) => (
                  <SubstationCard
                    key={index}
                    title={item.title}
                    index_id={item.index_id}
                    created_by_date={item.updated_at ? item.updated_at : item.created_at}
                    created_by_time={item.updated_at ? item.updated_at : item.created_at}
                    address={item.block + " " + item.address}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    tag_by={item.tag_by}
                    images={item.images}
                    status={item?.status ? item?.status : ""}
                    imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                    editIconPress={() => onEdit(item)}
                    deletIconPress={(id) => handleDeletePress(id)}
                    onCardPress={() => onSubstationCardPress(item)}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ImageViewer
        isVisible={visible}
        handleClose={() => setIsVisible(false)}
        images={images}
        index={imgIndex}
      />
    </SafeAreaView>
  );
}

export default memo(CreateSubstationsGeoTag);
