import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonCardStyle } from "./ApprovalFeederCardStyle";

export default function ApprovalSubstationCard({ data, approvePress, returnPress, cardPress, }) {



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

                {(data?.geotag_list?.approval_status == "") && <Text style={CommonCardStyle.status3}>{"Pending"}</Text>}
                {(data?.geotag_list?.approval_status == "Pending") && <Text style={CommonCardStyle.status3}>{"Pending"}</Text>}
                {(data?.geotag_list?.approval_status == "Returned") && <Text style={CommonCardStyle.status1}>{"Returned"}</Text>}
                {(data?.geotag_list?.approval_status == "Approved") && <Text style={CommonCardStyle.status2}>{"Approved"}</Text>}

            </View>

            {/* {(data?.geotag_list?.approval_status == "Pending" || data?.geotag_list?.approval_status == "") &&
                <View style={CommonCardStyle.btnView}>
                    <TouchableOpacity style={CommonCardStyle.buttonView1} onPress={() => returnPress(data)}>
                        <Text style={CommonCardStyle.btnText}>Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonCardStyle.buttonView2} onPress={() => approvePress(data)}>
                        <Text style={CommonCardStyle.btnText}>Approve</Text>
                    </TouchableOpacity>
                </View>}

            {(data?.geotag_list?.approval_status == "Returned") &&
                <View style={CommonCardStyle.buttonView3} onPress={() => returnPress(data)}>
                    <Text style={CommonCardStyle.btnText}>Returned</Text>
                </View>
            }
            {(data?.geotag_list?.approval_status == "Approved") &&
                <View style={CommonCardStyle.buttonView4} onPress={() => returnPress(data)}>
                    <Text style={CommonCardStyle.btnText}>Approved</Text>
                </View>
            } */}
            <View style={CommonCardStyle.buttonView4} >
                <Text style={CommonCardStyle.btnText}>{data?.status}</Text>
            </View>

        </TouchableOpacity>
    );
}
