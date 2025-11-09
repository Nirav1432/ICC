import { View, Text } from "react-native";
import React from "react";
import { AddressCardStyle } from "./AddressCardStyle";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import moment from "moment";
export default function AddressCard2({ data }) {
    return (
        <>
            <View style={AddressCardStyle.addressCard}>

                <View style={AddressCardStyle.cardTitles}>
                    <Text style={AddressCardStyle.cardSr}>{data?.title}</Text>
                    <Text style={AddressCardStyle.cardTitle}>{data?.subTitle}</Text>
                </View>

                <View style={AddressCardStyle.bottomBorder} />

                <View style={AddressCardStyle.cardRight}>

                    {data?.date && <View style={AddressCardStyle.cardRightTop}>
                        <Text style={AddressCardStyle.rightDate}>
                            <IcnCalendar /> {moment(data?.date).format("DD/MM/YYYY")}
                        </Text>
                        <Text style={AddressCardStyle.rightTime}>
                            <IcnClock /> {moment(data?.date).format("hh:mm a")}
                        </Text>
                    </View>}

                    {data?.assestType && <View style={AddressCardStyle.asstType}>
                        <Text style={AddressCardStyle.type}>Asset Type :</Text>
                        <Text style={AddressCardStyle.asset}>{data?.assestType}</Text>
                    </View>}

                    {data?.address && <View style={AddressCardStyle.cardRightAddress}>
                        <Text style={AddressCardStyle.rightAddress}>
                            {data?.address}
                        </Text>
                    </View>}

                    <View style={AddressCardStyle.cardLatLong}>
                        <Text style={AddressCardStyle.long}>Latitude</Text>
                        <Text style={AddressCardStyle.lat}>Longitude</Text>
                    </View>

                    <View style={AddressCardStyle.cardLatsLongs}>
                        <Text style={AddressCardStyle.longs}>{data?.longitude}</Text>
                        <Text style={AddressCardStyle.lats}>{data?.latitude}</Text>
                    </View>

                    {data?.tagg && <View style={AddressCardStyle.cardRightBottom}>
                        <Text style={AddressCardStyle.rightBottomText}>Tagged By - </Text>
                        <Text style={AddressCardStyle.taggedByName}>{data?.tagg}</Text>
                    </View>}
                </View>
            </View>
        </>
    );
}
