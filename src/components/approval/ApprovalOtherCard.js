import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonCardStyle } from "./ApprovalCommonCardStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { image_base_url } from "../../service/appConfig";
import moment from "moment";
import { Colors } from "../../utils/Colors";

function ApprovalOtherCard({ data, imageCenterPath, approvePress, returnPress, cardPress}) {
    
    let dt: String = data?.geotag_list?.created_at;
    let obj = data?.geotag_list[0]


    return (
        <>
            <TouchableOpacity style={CommonCardStyle.card} onPress={cardPress}>


                <View style={CommonCardStyle.cardTitles}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={CommonCardStyle.cardSr}>{obj.title}</Text>
                    </View>
                    <Text style={CommonCardStyle.cardTitle}>{obj.index_id}</Text>
                </View>

                <View style={CommonCardStyle.bottomBorder} />

                <View style={CommonCardStyle.cardContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: image_base_url+imageCenterPath+obj.images[0].imageName }} style={{ width: 75, height: 75, borderRadius: 10, borderWidth:0.5, borderColor:Colors.skyBlue }} />
                        {obj.status == "Pending" && <Text style={CommonCardStyle.status3}>{obj.status}</Text>}
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
                            <Text style={CommonCardStyle.rightAddress}>{obj.block + " " + obj.address}</Text>
                        </View>

                        <View style={CommonCardStyle.cardLatLong}>
                            <Text style={CommonCardStyle.long}>Latitude</Text>
                            <Text style={CommonCardStyle.lat}>Logitude</Text>
                        </View>
                        <View style={CommonCardStyle.cardLatsLongs}>
                            <Text style={CommonCardStyle.longs}>{obj.latitude}</Text>
                            <Text style={CommonCardStyle.lats}>{obj.longitude}</Text>
                        </View>

                        <View style={CommonCardStyle.cardRightBottom}>
                            <Text style={CommonCardStyle.rightBottomText}>Tagged By -</Text>
                            <Text style={CommonCardStyle.taggedByName}>{obj.tag_by}</Text>
                        </View>
                    </View>
                </View>

                {(obj.status == "Pending") &&
                    <View style={CommonCardStyle.btnView}>
                        <TouchableOpacity style={CommonCardStyle.buttonView1} onPress={() => returnPress(data)}>
                            <Text style={CommonCardStyle.btnText}>Return</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={CommonCardStyle.buttonView2} onPress={() => approvePress(data)}>
                            <Text style={CommonCardStyle.btnText}>Approve</Text>
                        </TouchableOpacity>
                    </View>}

                {(obj.status == "Returned") &&
                    <View style={CommonCardStyle.buttonView3} onPress={() => returnPress(data)}>
                        <Text style={CommonCardStyle.btnText}>Returned</Text>
                    </View>
                }
                {(obj.status == "Approved") &&
                    <View style={CommonCardStyle.buttonView4} onPress={() => returnPress(data)}>
                        <Text style={CommonCardStyle.btnText}>Approved</Text>
                    </View>
                }


            </TouchableOpacity>
        </>
    );
}
export default memo(ApprovalOtherCard)