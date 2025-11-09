import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonCardStyle } from "./SubstationHistoryCardStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { SliderBox } from "react-native-image-slider-box";
import { image_base_url } from "../../service/appConfig";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import moment from "moment";

export default function SubstationHistoryCard({ data, approvePress, returnPress, cardPress, }) {


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

                {(data?.status == "Pending") && <Text style={CommonCardStyle.status3}>{"Pending"}</Text>}
                {(data?.status == "Returned") && <Text style={CommonCardStyle.status1}>{"Returned"}</Text>}
                {(data?.status == "Approved") && <Text style={CommonCardStyle.status2}>{"Approved"}</Text>}
            </View>

            {/* {(data?.status == "Pending") &&
                <View style={CommonCardStyle.btnView}>
                    <TouchableOpacity style={CommonCardStyle.buttonView1} onPress={() => returnPress(data)}>
                        <Text style={CommonCardStyle.btnText}>Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonCardStyle.buttonView2} onPress={() => approvePress(data)}>
                        <Text style={CommonCardStyle.btnText}>Approve</Text>
                    </TouchableOpacity>
                </View>}

            {(data?.geotag_list?.status == "Returned") &&
                <View style={CommonCardStyle.buttonView3} onPress={() => returnPress(data)}>
                    <Text style={CommonCardStyle.btnText}>Returned</Text>
                </View>
            }
            {(data?.status == "Approved") &&
                <View style={CommonCardStyle.buttonView4} onPress={() => returnPress(data)}>
                    <Text style={CommonCardStyle.btnText}>Approved</Text>
                </View>
            } */}
        </TouchableOpacity>
    );
}
