import { View, Text, FlatList, TouchableOpacity, Touchable, } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import Header from "../../components/header/Header";
import PageStyle from "../households/HosehodlsStyle";
import { onLoading } from "../../../App";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import moment from "moment";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import { UserManager } from "../../manager/UserManager";
import { SafeAreaView } from "react-native-safe-area-context";

const HouseholdsCreateGeotagScreen = (props) => {
  const route = useRoute();
  const { data, selectedDistricts, taluka, village, scheme } = route.params;

  const navigation = useNavigation();
  const [isDataList, setDataList] = useState([]);

  useEffect(() => {
    onFetachDataList();
  }, [])

  const onFetachDataList = () => {
    onLoading(true);
    var obj = {
      "user_id": UserManager.id,
      "district_id": taluka?.id,
      "village_id": village?.id,
      "pvtg_id": data?.pvtg_id,
      "scheme": scheme?.title,
    };
    Service.post(EndPoints.getVVPTData, obj, (success) => {
      if (success?.resultflag) {
        setDataList(success?.data);
      }
      onLoading(false);
    },
      (error) => {
        onLoading(false);
      }
    );
  }

  const onClickNavigate = (item) => {
    navigation.navigate("HouseholdsGeotagScreen", { data: item, selectedDistricts, taluka, village, scheme })
  }

  const callCard = (item) => {
    return (
      <View style={PageStyle.card}>

        <View style={PageStyle.cardTitles}>
          <Text style={PageStyle.cardSr}>{"Beneficiary Names"}</Text>
          <Text style={PageStyle.cardTitle}>{item?.beneficiary_name}</Text>
        </View>
        <View style={PageStyle.bottomBorder} />

        <View style={PageStyle.rightDate}>
          <IcnCalendar />
          {item &&
            <Text style={PageStyle.txtDate}>
              {moment(item?.date_electrification.toString()).format("DD/MM/YYYY")}
            </Text>
          }
        </View>
        <View style={PageStyle.cardRightAddress}>
          <Text style={PageStyle.cardSr}>{"Address"}</Text>
          <Text style={PageStyle.cardTitle}>{item?.address}</Text>
        </View>

        <View style={PageStyle.bottomBorderWithPadding} />

        <View style={PageStyle.cardLatLong}>
          <Text style={PageStyle.long}>Latitude</Text>
          <Text style={PageStyle.lat}>Longitude</Text>
        </View>

        <View style={PageStyle.cardLatsLongs}>
          <Text style={PageStyle.longs}>{item?.latitude}</Text>
          <Text style={PageStyle.lats}>{item?.longitude}</Text>
        </View>

        <View style={PageStyle.bottomBorderWithPadding} />

        <View style={PageStyle.contactTitles}>
          <Text style={PageStyle.cardSr}>{"Contact Details"}</Text>
          <Text style={PageStyle.cardTitle}>{item?.contact_details}</Text>
        </View>

        <TouchableOpacity style={PageStyle.btnLogin} onPress={() => onClickNavigate(item)}>
          <Text style={PageStyle.btnLoginText}>Geotag</Text>
        </TouchableOpacity>
      </View>

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
        <View style={PageStyle.firstView1}>
          <View style={PageStyle.boder}>
            <Text style={PageStyle.cardSr1}>Block</Text>
            <Text style={PageStyle.cardTitle}>{taluka?.title}</Text>
          </View >
          <View style={PageStyle.boder}>
            <Text style={PageStyle.cardSr1}>Village</Text>
            <Text style={PageStyle.cardTitle}>{village?.title}</Text>
          </View>
          <View style={PageStyle.boder}>
            <Text style={PageStyle.cardSr1}>Village LGD code</Text>
            <Text style={PageStyle.cardTitle}>{data?.lgd_code}</Text>
          </View>

        </View>


        <FlatList
          removeClippedSubviews={true}
          windowSize={5}
          initialNumToRender={10}
          style={PageStyle.flatList}
          scrollEnabled
          data={isDataList}
          renderItem={({ item }) => callCard(item)}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HouseholdsCreateGeotagScreen);
