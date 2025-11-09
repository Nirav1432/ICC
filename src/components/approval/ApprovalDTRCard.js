import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonCardStyle } from "./ApprovalCommonCardStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { image_base_url } from "../../service/appConfig";
import moment from "moment";
import { Colors } from "../../utils/Colors";

function ApprovalDTRCard({ data, imageCenterPath, imagePressed, approvePress, returnPress, cardPress, keva}) {
    
    let dt: String = data?.geotag_list?.created_at;

    return (
        <>
            <TouchableOpacity style={CommonCardStyle.card} onPress={cardPress}>


                <View style={CommonCardStyle.cardTitles}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={CommonCardStyle.cardSr}>{data?.geotag_list?.title}</Text>
                    </View>
                    <Text style={CommonCardStyle.cardTitle}>{data?.geotag_list?.index_id}</Text>
                </View>

                <View style={CommonCardStyle.bottomBorder} />

                <View style={CommonCardStyle.cardContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: image_base_url+imageCenterPath+data?.geotag_list?.images[0].imageName }} style={{ width: 75, height: 75, borderRadius: 10, borderWidth:0.5, borderColor:Colors.skyBlue }} />
                        {data?.geotag_list?.status == "Pending" && <Text style={CommonCardStyle.status3}>{data?.geotag_list?.status}</Text>}
                    </View>

                    <View style={CommonCardStyle.cardRight}>

                        <View style={CommonCardStyle.cardRightTop}>
                            <Text style={CommonCardStyle.rightDate}>
                                <IcnCalendar />
                                <Text>
                                    {" "}
                                    {moment(dt).format("DD/MM/YYYY")}
                                </Text>
                            </Text>
                            <Text style={CommonCardStyle.rightTime}>
                                <IcnClock />
                                <Text>
                                    {" "}
                                    {moment(dt).format("hh:mm a")}
                                </Text>
                            </Text>
                        </View>

                        <View style={CommonCardStyle.cardRightAddress}>
                            <Text style={CommonCardStyle.rightAddress}>{data?.geotag_list?.block + " " + data?.geotag_list?.address}</Text>
                        </View>

                        <View style={CommonCardStyle.cardLatLong}>
                            <Text style={CommonCardStyle.long}>Latitude</Text>
                            <Text style={CommonCardStyle.lat}>Logitude</Text>
                        </View>
                        <View style={CommonCardStyle.cardLatsLongs}>
                            <Text style={CommonCardStyle.longs}>{data?.geotag_list?.latitude}</Text>
                            <Text style={CommonCardStyle.lats}>{data?.geotag_list?.longitude}</Text>
                        </View>

                        <View style={CommonCardStyle.cardRightBottom}>
                            <Text style={CommonCardStyle.rightBottomText}>Tagged By -</Text>
                            <Text style={CommonCardStyle.taggedByName}>{data?.geotag_list?.tag_by}</Text>
                        </View>
                    </View>
                </View>

                {(data?.geotag_list?.status == "Pending") &&
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
                {(data?.geotag_list?.status == "Approved") &&
                    <View style={CommonCardStyle.buttonView4} onPress={() => returnPress(data)}>
                        <Text style={CommonCardStyle.btnText}>Approved</Text>
                    </View>
                }


            </TouchableOpacity>
        </>
    );
}
export default memo(ApprovalDTRCard);
