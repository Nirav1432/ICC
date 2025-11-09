import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { OthersHistoryCardStyle } from "./OthersHistoryCardStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { image_base_url } from "../../service/appConfig";
import moment from "moment";
import { Colors } from "../../utils/Colors";

function OthersHistoryCard({ data, imageCenterPath, cardPress }) {

    let dt: String = data?.geotag_list?.created_at;
    let obj = data?.geotag_list[0]

    return (
        <>
            <TouchableOpacity style={OthersHistoryCardStyle.card} onPress={cardPress}>


                <View style={OthersHistoryCardStyle.cardTitles}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={OthersHistoryCardStyle.cardSr}>{obj.title}</Text>
                    </View>
                    <Text style={OthersHistoryCardStyle.cardTitle}>{obj.index_id}</Text>
                </View>

                <View style={OthersHistoryCardStyle.bottomBorder} />

                <View style={OthersHistoryCardStyle.cardContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: image_base_url + imageCenterPath + obj.images[0].imageName }} style={{ width: 75, height: 75, borderRadius: 10, borderWidth: 0.5, borderColor: Colors.skyBlue }} />
                        {obj.status == "Pending" && <Text style={OthersHistoryCardStyle.status3}>{obj.status}</Text>}
                    </View>

                    <View style={OthersHistoryCardStyle.cardRight}>

                        <View style={OthersHistoryCardStyle.cardRightTop}>
                            <Text style={OthersHistoryCardStyle.rightDate}>
                                <IcnCalendar />
                                <Text>
                                    {" "}
                                    {moment(dt).format("DD/MM/YYYY")}
                                </Text>
                            </Text>
                            <Text style={OthersHistoryCardStyle.rightTime}>
                                <IcnClock />
                                <Text>
                                    {" "}
                                    {moment(dt).format("hh:mm a")}
                                </Text>
                            </Text>
                        </View>

                        <View style={OthersHistoryCardStyle.cardRightAddress}>
                            <Text style={OthersHistoryCardStyle.rightAddress}>{obj.block + " " + obj.address}</Text>
                        </View>

                        <View style={OthersHistoryCardStyle.cardLatLong}>
                            <Text style={OthersHistoryCardStyle.long}>Latitude</Text>
                            <Text style={OthersHistoryCardStyle.lat}>Logitude</Text>
                        </View>
                        <View style={OthersHistoryCardStyle.cardLatsLongs}>
                            <Text style={OthersHistoryCardStyle.longs}>{obj.latitude}</Text>
                            <Text style={OthersHistoryCardStyle.lats}>{obj.longitude}</Text>
                        </View>

                        <View style={OthersHistoryCardStyle.cardRightBottom}>
                            <Text style={OthersHistoryCardStyle.rightBottomText}>Tagged By -</Text>
                            <Text style={OthersHistoryCardStyle.taggedByName}>{obj.tag_by}</Text>
                        </View>
                    </View>
                </View>
{/* 
                {(obj.status == "Pending") &&
                    <View style={OthersHistoryCardStyle.btnView}>
                        <TouchableOpacity style={OthersHistoryCardStyle.buttonView1} onPress={() => returnPress(data)}>
                            <Text style={OthersHistoryCardStyle.btnText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={OthersHistoryCardStyle.buttonView2} onPress={() => approvePress(data)}>
                            <Text style={OthersHistoryCardStyle.btnText}>Approve</Text>
                        </TouchableOpacity>
                    </View>} */}

            </TouchableOpacity>
        </>
    );
}
export default memo(OthersHistoryCard)