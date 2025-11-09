import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { memo, useState } from "react";
import { useRoute } from "@react-navigation/native";

import { FeederFormStyle } from "./FeederFormStyle";
import Header from "../../../components/header/Header";
import IcnBack from "../../../assets/svg/headerSvgs/IcnBack";
import IcnMap from "../../../assets/svg/IcnMap";
import IcnEdit from "../../../assets/svg/IcnEdit";
import IcnDelet from "../../../assets/svg/IcnDelet";
import { ScrollView } from "react-native-gesture-handler";
import SubmitBtn from "../../../components/clogin/commonButton/SubmitBtn";
import IcnGreyDown from "../../../assets/svg/IcnGreyDown";
import InputFields from "../../../components/inputFields/InputFields";
import { Labels } from "../../../utils/Labels";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields2 from "../../../components/inputFields/InputFields2";
import { onLoading } from "../../../../App";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { UserManager } from "../../../manager/UserManager";
import { useFocusEffect } from '@react-navigation/native';
import TestCommonCard from "../../../components/commonCards/TestCommonCard";
import ImageViewer from "../../../components/imageViewr/ImageViewer";
import { image_base_url } from "../../../service/appConfig";
import DTRDetailePopup from "../../Approval/DTRDetailePopup";
import PolDetailePopup from "../../Approval/PolDetailePopup";

var _typeItemDetails = "";

function FeederForm(props) {

  const route = useRoute();
  const { type, feederData, selectedDistricts, selectedOption, achievementButtonState, selectedDistrictsName } = route.params;

  const [isFeederDetails, setFeederDetails] = React.useState(null);
  const [isDTRList, setDTRList] = React.useState([]);
  const [isStatus, setStatus] = React.useState('');

  const [visible, setIsVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState([]);

  const [isTotalKM, setTotalKM] = useState(0);
  const [isManualLength, setManualLength] = useState(0);

  const [isDTRpopupVisible, setDTRpopupVisible] = useState(false);
  const [isPolPopupVisible, setPolPopupVisible] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      onFetchFeederDetailse();
    }, [])
  );

  const onFetchFeederDetailse = () => {
    onLoading(true);

    Service.post(EndPoints.getFeederDetails, { feeder_id: feederData.id }, (response) => {

      if (response.resultflag == 1) {
        setFeederDetails(response?.data);
        onFetchFeederList(response?.data);
      } else {

      }
    },
      (err) => {
        onLoading(false);
      }
    );
  }

  const onFetchFeederList = (dt) => {
    onLoading(true);
    let data = {
      "role_id": UserManager.role_id,
      "user_id": UserManager.id,
      "discom_id": UserManager.discom_id,
      "district_id": JSON.stringify(selectedDistricts),
      "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
      "taging_for": selectedOption,
      "fedeer_id": dt?.id,
      "fedeer_code": dt?.feeder_code
    }

    Service.post(EndPoints.getFedderGeoTagList, data, (response) => {
      onLoading(false);
      if (response._resultflag == 1) {
        setDTRList(response?.data);
        setStatus(response?.status);
        var totalKM: Number = 0;
        var manualKM: Number = 0;

        response?.data.forEach(element => {
          var len: Number = element?.estimatedDistance ? Number(element?.estimatedDistance) : 0;
          totalKM = totalKM + len;

          var len2: Number = element?.actualDistance ? Number(element?.actualDistance) : 0;
          manualKM = manualKM + len2;
        });

        setTotalKM(totalKM);
        setManualLength(manualKM);
      } else { }
    },
      (err) => {
        onLoading(false);
      }
    );
  }

  const onViewMoreClick = () => {

    props.navigation.navigate("FeederViewMoreScreen", {
      selectedDistricts,
      achievementButtonState,
      selectedOption,
      feeder_id: isFeederDetails.id,
      feeder_code: isFeederDetails.feeder_code,
      feederDetails: isFeederDetails,
      feederData,
      selectedDistrictsName
    });

  }

  const handleClick = () => {

    var firstFeeder = false

    isDTRList.forEach((myFunction) => {
      if (myFunction?.asset_type_geotag_type == "Feeder" || myFunction?.asset_type_geotag_type == "Substation")
        firstFeeder = true;
    });

    if (firstFeeder) {
      props.navigation.navigate("FeederAssets", {
        feederDetails: isFeederDetails,
        feederData: feederData,
        selectedDistricts: selectedDistricts,
        selctOP: selectedOption,
        achievementButtonState,
        isDTRList: isDTRList,
        selectedDistrictsName: selectedDistrictsName,
        backJump: false,
      });
    }
    else {
      props.navigation.navigate("FeederGeneralAssetOptions", {
        feederDetails: isFeederDetails,
        feederData: feederData,
        selectedDistricts: selectedDistricts,
        selectedOption,
        achievementButtonState,
        isDTRList: isDTRList,
        selectedDistrictsName: selectedDistrictsName,
        backJump: true,
      });
    }
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
    if (item.asset_type_geotag_type == "Substation" || item.asset_type_geotag_type == "Feeder") {
      props.navigation.navigate("EditeFeederGeneralAssetOptions", {
        oldItem: item,
        feederDetails: isFeederDetails,
        feederData: feederData,
        selectedDistricts: selectedDistricts,
        selectedOption,
        achievementButtonState,
        isDTRList: isDTRList,
        selectedDistrictsName: selectedDistrictsName,
      });
    }
    else {
      props.navigation.navigate("EditFeederAssets", {
        oldItem: item,
        feederDetails: isFeederDetails,
        feederData: feederData,
        selectedDistricts: selectedDistricts,
        selctOP: selectedOption,
        achievementButtonState,
        isDTRList: isDTRList,
        selectedDistrictsName: selectedDistrictsName,
      });
    }

  }

  const onDelet = (delteItem) => {

    Alert.alert("Alert", "Are you sure you want to delete?",
      [
        {
          text: 'Yes', onPress: () => {

            var obj = {
              "role_id": UserManager.role_id,
              "user_id": UserManager.id,
              "discom_id": UserManager.discom_id,
              "district_id": JSON.stringify(selectedDistricts),
              "geotag_type": achievementButtonState === true ? "Achievement" : "Survey",
              "taging_for": selectedOption,
              "fedeer_id": isFeederDetails?.id,
              "fedeer_code": isFeederDetails?.feeder_code,
              "remove_id": delteItem,
            }

            onLoading(true);

            Service.post(EndPoints.deletFedderGeotag, obj, (response) => {
              onLoading(false);
              if (response._resultflag) {
                onFetchFeederDetailse();
              }
              else { }
            },
              (err) => {
                onLoading(false);
              }
            );

          }
        },
        { text: 'No', onPress: () => { } },
      ]);


  }

  const onTestCommonCardPress = (dt) => {

    let obj = {
      title: dt?.title,
      index_id: dt?.index_id,
      tag_by: dt?.tag_by,
      item: dt,

      taging_for: selectedOption,
      fedeer_id: isFeederDetails?.id,
      fedeer_code: isFeederDetails?.feeder_code,
      district_id: selectedDistricts,
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
    };
    props.navigation.navigate("FeederDdeDetailsDetailsScreen", { obj });
  }

  const onTypeTextClick = (obj) => {

    _typeItemDetails = obj?.poleDetails;

    if (obj.asset_type == "DTR") {
      setDTRpopupVisible(true);
    }
    else if (obj.asset_type == "Pole") {
      setPolPopupVisible(true);
    }
  }

  const onSubmitAll = () => {

    obj = {
      role_id: UserManager.role_id,
      user_id: UserManager.id,
      discom_id: UserManager.discom_id,
      district_id: JSON.stringify(selectedDistricts),
      geotag_type: achievementButtonState === true ? "Achievement" : "Survey",
      taging_for: selectedOption,
      fedeer_id: feederData?.id,
      fedeer_code: feederData?.feeder_code,
      task: "save",
      action: "submit_all"
    }

    onLoading(true);
    Service.post(EndPoints.submitAllFeeder, obj, (res) => {
      onLoading(false);
      if (res._resultflag) {

        Alert.alert('', res.message, [
          {
            text: 'OK', onPress: () => {
              onFetchFeederDetailse();
            }
          },
        ]);

      } else { }
    },
      (err) => {
        onLoading(false);
        // Loger.onLog("Error", err)
      }
    );

  }

  return (
    <SafeAreaView style={FeederFormStyle.mainView}>
      <Header
        title="Feeder Geotag"
        leftIcon={<IcnBack />}
        onLeftPress={() => type ? props.navigation.navigate("FeederForm", { type: "FeederForm", feederData, selectedDistricts, selectedOption, achievementButtonState }) : props.navigation.goBack()}
        rightIcon={<IcnMap />}
        onRightPress={() => props.navigation.navigate("MapScreen", { type: "Feeder", district_id: selectedDistricts, feeder_id: isFeederDetails.id })}
      />
      <ScrollView>

        <View style={FeederFormStyle.title}>
          <Text style={[FeederFormStyle.text, { color: "black" }]}>
            {feederData.feeder_name}
          </Text>
        </View>
        <View style={FeederFormStyle.container}>

          <View style={FeederFormStyle.modifySearch}>
            <Text style={FeederFormStyle.modifySearchText}>
              {Labels.generalDetails}
            </Text>

          </View>

          <View style={FeederFormStyle.innerContainer}>

            <InputFields2
              title1={"Manual Length of Feeder (CMtrs) "}
              value1={isManualLength}
              title2={"Total Aerial Length Geotagged (CMtrs)"}
              value2={isTotalKM}
            />

            <Text style={FeederFormStyle.assetsText}>
              {isDTRList.length + " geo-coordinates saved"}
            </Text>

            <SubmitBtn title="Geotag" onPress={() => { handleClick() }} />
          </View>
        </View>

        <View style={FeederFormStyle.recentView}>
          <Text style={FeederFormStyle.leftTitle}>
            {Labels.recentlyTagged}
          </Text>
          <TouchableOpacity onPress={() => onViewMoreClick()}>
            <Text style={FeederFormStyle.rightTitle}>
              {isDTRList.length > 2 && "View More"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={FeederFormStyle.commonCardView}>
          {isDTRList.slice(0, 2).map((item, index) => (
            <TestCommonCard
              key={index}
              title={item.title}
              index_id={item.index_id}
              created_by_date={item.created_at ? item.created_at : item.updated_at}
              created_by_time={item.created_at ? item.created_at : item.updated_at}
              address={item.block + " " + item.address}
              latitude={item.latitude}
              longitude={item.longitude}
              tag_by={item.tag_by}
              images={item.images}
              othersAssetType={item.sub_asset_type}
              status={item?.approval_status}
              imagePressed={(index, imageUrl) => { handlePressImage(index, imageUrl) }}
              editIcon={<IcnEdit />}
              editIconPress={() => onEdit(item)}
              deletIconPress={(item) => onDelet(item)}
              onCardPress={() => onTestCommonCardPress(item)}
              type={item?.asset_type}
              typeClick={() => onTypeTextClick(item)}
            />
          ))}
        </View>

        {isDTRList.length > 0 &&
          <View style={FeederFormStyle.innerContainer}>
            <SubmitBtn title="Submit All" onPress={() => { onSubmitAll(); }} />
          </View>
        }

      </ScrollView>
      <ImageViewer isVisible={visible} handleClose={() => setIsVisible(false)} images={images} index={imgIndex} />
      <DTRDetailePopup data={_typeItemDetails} isVisible={isDTRpopupVisible} handleClose={() => setDTRpopupVisible(false)} />
      <PolDetailePopup data={_typeItemDetails} isVisible={isPolPopupVisible} handleClose={() => setPolPopupVisible(false)} />
    </SafeAreaView>
  );
}

export default memo(FeederForm)
