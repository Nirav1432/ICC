import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonCardStyle } from "./FeederHistoryCardStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { SliderBox } from "react-native-image-slider-box";
import { image_base_url } from "../../service/appConfig";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import moment from "moment";

export default function FeederHistoryCard({ data, approvePress, returnPress, cardPress, }) {

    return (
        <TouchableOpacity style={CommonCardStyle.card} onPress={cardPress}>

            <View style={CommonCardStyle.cardTitles}>
                <Text style={CommonCardStyle.cardSr}>{data?.geotag_list?.title}</Text>
                <Text style={CommonCardStyle.cardTitle}>{data?.geotag_list?.index_id}</Text>
            </View>

            <View style={CommonCardStyle.innerVuew}>

                <View style={CommonCardStyle.cardRightBottom}>
                    <Text style={CommonCardStyle.rightBottomText}>Tagged By -</Text>
                    <Text style={CommonCardStyle.taggedByName}>{data?.geotag_list?.tag_by}</Text>
                </View>

                {(data?.feeder_status == "Pending") && <Text style={CommonCardStyle.status3}>{"Pending"}</Text>}
                {(data?.feeder_status == "Returned") && <Text style={CommonCardStyle.status1}>{"Returned"}</Text>}
                {(data?.feeder_status == "Approved") && <Text style={CommonCardStyle.status2}>{"Approved"}</Text>}

            </View>

        </TouchableOpacity>
    );
}
