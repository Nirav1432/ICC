import { View, Text } from "react-native";
import React from "react";
import { AddressCardStyle } from "./AddressCardStyle";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import moment from "moment";
import { UserManager } from "../../manager/UserManager";
export default function AddressCard({ data }) {

  return (
    <>
      <View style={AddressCardStyle.addressCard}>
        <View style={AddressCardStyle.cardTitles}>
          <Text style={AddressCardStyle.cardSr}>{data?.title}</Text>
          <Text style={AddressCardStyle.cardTitle}>
            {data?.subTitle && data?.subTitle}
            {data?.index_id && data?.index_id}
          </Text>
        </View>

        <View style={AddressCardStyle.bottomBorder} />

        <View style={AddressCardStyle.cardRight}>
          <View style={AddressCardStyle.cardRightTop}>
            <Text style={AddressCardStyle.rightDate}>
              <IcnCalendar /> {moment(data?.date).format("DD/MM/YYYY")}
            </Text>
            <Text style={AddressCardStyle.rightTime}>
              <IcnClock /> {moment(data?.date).format("hh:mm a")}
            </Text>
          </View>

          {
            data?.assestType &&
            <View style={AddressCardStyle.asstType}>
              <Text style={AddressCardStyle.type}>Asset Type :</Text>
              <Text style={AddressCardStyle.asset}>{data?.assestType}</Text>
            </View>
          }
          <View style={AddressCardStyle.cardRightAddress}>
            <Text style={AddressCardStyle.rightAddress}>
              {data?.address}
            </Text>
          </View>

          <View style={AddressCardStyle.cardLatLong}>
            <Text style={AddressCardStyle.long}>Latitude</Text>
            <Text style={AddressCardStyle.lat}>Longitude</Text>
          </View>

          <View style={AddressCardStyle.cardLatsLongs}>
            <Text style={AddressCardStyle.longs}>{data?.latitude}</Text>
            <Text style={AddressCardStyle.lats}>{data?.longitude}</Text>
          </View>

          <View style={AddressCardStyle.cardRightBottom}>
            <Text style={AddressCardStyle.rightBottomText}>Tagged By -</Text>
            <Text style={AddressCardStyle.taggedByName}>{UserManager.first_name} {UserManager.last_name}</Text>
          </View>

          {
            data?.assetAttribut &&
            <View style={AddressCardStyle.cardRightBottom}>
              <Text style={AddressCardStyle.rightBottomText}>Select asset attributes: </Text>
              <Text style={AddressCardStyle.taggedByName}>{data?.assetAttribut}</Text>
            </View>
          }


        </View>
      </View>
    </>
  );
}
