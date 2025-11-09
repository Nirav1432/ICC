import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { SliderBox } from "react-native-image-slider-box";
import { image_base_url } from "../../service/appConfig";
import { Colors } from "../../utils/Colors";
import { AppUtil } from "../../utils/AppUtil";
import moment from "moment";
import { UserManager } from "../../manager/UserManager";
import { Fonts } from "../../utils/Fonts";

const TestCommonCard = ({ title, index_id, created_by_date, created_by_time, address, latitude, longitude, tag_by, images, imagePressed, editIconPress, deletIconPress, status, onCardPress, type, typeClick, othersAssetType }) => {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        var arr = [];

        if (images) {
            arr = [];
        }

        images &&
            images.map((item) => {
                if (item?.imageName)
                    arr.push(image_base_url + UserManager.image_path + item?.imageName);
                else
                    arr.push(image_base_url + UserManager.image_path + item);
            });
        setImageUrls(arr);
    }, [images]);

    let _date = created_by_date ? moment(created_by_date.toString()).format("DD/MM/YYYY") : "";
    let _time = created_by_time ? moment(created_by_time.toString()).format("hh:mm a") : "";


    return (
        <>
            <View style={SubstationsGeoTaggedStyle.card}>

                <View style={SubstationsGeoTaggedStyle.cardTitles}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={SubstationsGeoTaggedStyle.cardSr}>{title}</Text>
                    </View>


                    <Text style={SubstationsGeoTaggedStyle.cardTitle}>{index_id}</Text>
                </View>

                <View style={SubstationsGeoTaggedStyle.bottomBorder} />

                <View style={SubstationsGeoTaggedStyle.cardContainer}>
                    <View style={{ flexDirection: 'column' }}>

                        <TouchableOpacity onPress={() => imagePressed(0, imageUrls)}>
                            <Image source={{ uri: imageUrls[0] }} style={{ width: 80, height: 80, borderRadius: 10, }} />
                        </TouchableOpacity>

                        {status == "" && <Text style={SubstationsGeoTaggedStyle.status1}>{"Pending \n for \n Submission"}</Text>}
                        {status == "Pending" && <Text style={SubstationsGeoTaggedStyle.status3}>{status}</Text>}
                        {status == "Return" && <Text style={SubstationsGeoTaggedStyle.status1}>{status}</Text>}
                        {status == "Returned" && <Text style={SubstationsGeoTaggedStyle.status1}>{status}</Text>}
                        {status == "Approved" && <Text style={SubstationsGeoTaggedStyle.status2}>{status}</Text>}

                    </View>

                    <View style={SubstationsGeoTaggedStyle.cardRight}>

                        <View style={SubstationsGeoTaggedStyle.cardRightTop}>
                            <Text style={SubstationsGeoTaggedStyle.rightDate}>
                                <IcnCalendar />
                                <Text>
                                    {" "}
                                    {_date}
                                </Text>
                            </Text>
                            <Text style={SubstationsGeoTaggedStyle.rightTime}>
                                <IcnClock />
                                <Text>
                                    {" "}
                                    {_time}
                                </Text>
                            </Text>
                        </View>

                        <View style={SubstationsGeoTaggedStyle.cardRightAddress}>
                            <Text style={SubstationsGeoTaggedStyle.rightAddress}>{address}</Text>
                        </View>

                        {type &&
                            <View style={SubstationsGeoTaggedStyle.cardRightBottom}>
                                <Text style={SubstationsGeoTaggedStyle.rightAddress}>Type - </Text>

                                {(type == "Pole" || type == "DTR") ?
                                    <TouchableOpacity onPress={() => typeClick()} >
                                        <Text style={SubstationsGeoTaggedStyle.taggedByName1} >{type}</Text>
                                    </TouchableOpacity>
                                    :
                                    <Text style={SubstationsGeoTaggedStyle.taggedByName2} >{type}</Text>
                                }
                            </View>}

                        <View style={SubstationsGeoTaggedStyle.cardLatLong}>
                            <Text style={SubstationsGeoTaggedStyle.long}>Latitude</Text>
                            <Text style={SubstationsGeoTaggedStyle.lat}>Longitude</Text>
                        </View>
                        <View style={SubstationsGeoTaggedStyle.cardLatsLongs}>
                            <Text style={SubstationsGeoTaggedStyle.longs}>{latitude}</Text>
                            <Text style={SubstationsGeoTaggedStyle.lats}>{longitude}</Text>
                        </View>

                        <View style={SubstationsGeoTaggedStyle.cardRightBottom}>
                            <Text style={SubstationsGeoTaggedStyle.rightBottomText}>Tagged By: </Text>
                            <Text style={SubstationsGeoTaggedStyle.taggedByName}>{tag_by}</Text>
                        </View>

                        {othersAssetType &&
                            <View style={SubstationsGeoTaggedStyle.cardRightBottom}>
                                <Text style={SubstationsGeoTaggedStyle.rightAddress1}>Others Attributes: </Text>
                                <Text style={SubstationsGeoTaggedStyle.taggedByName}>{othersAssetType}</Text>
                            </View>
                        }
                    </View>
                </View>
                {
                    <View style={SubstationsGeoTaggedStyle.btnView}>
                        <TouchableOpacity style={SubstationsGeoTaggedStyle.buttonView1} onPress={() => deletIconPress(index_id)}>
                            <Text style={SubstationsGeoTaggedStyle.btnText}>DELETE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={SubstationsGeoTaggedStyle.buttonView2} onPress={() => editIconPress()}>
                            <Text style={SubstationsGeoTaggedStyle.btnText}>RE-SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </>
    );
}

const SubstationsGeoTaggedStyle = StyleSheet.create({
    cardSr: {
        width: "95%",
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: AppUtil.getHP(1),
    },
    cardTitle: {
        color: Colors.lightGray,
        fontSize: 14,
        fontWeight: 500,
        marginBottom: AppUtil.getHP(1),
    },
    cardTitles: {
        marginLeft: AppUtil.getWP(4),
        marginTop: AppUtil.getHP(2),
    },
    bottomBorder: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        padding: AppUtil.getHP(2),
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,

        marginVertical: AppUtil.getHP(1),
        marginHorizontal: AppUtil.getWP(5),
        width: "100%",
        alignSelf: "center",
    },
    cardLeft: {
        width: "30%",
        height: "30%",
    },
    cardRight: {
        width: "70%",
        flexDirection: "column",
    },
    cardRightTop: {
        flexDirection: "row",
        marginLeft: AppUtil.getWP(2),

    },
    rightDate: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: 500,
        width: "50%",
    },
    rightTime: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: 500,
        width: "50%",
    },
    cardRightAddress: {
        marginLeft: AppUtil.getWP(2),
        marginTop: 1,
    },
    rightAddress: {
        color: Colors.darkBlack,
        fontSize: 12
    },
    rightAddress1: {
        color: Colors.darkBlack,
        fontSize: 12,
        fontFamily: Fonts.RobotoMedium
    },
    cardLatLong: {
        flexDirection: "row",
        marginTop: 2,
        marginLeft: AppUtil.getWP(2),
    },
    long: {
        color: Colors.darkBlack,
        fontSize: 14,
        width: "50%",
    },
    lat: {
        color: Colors.darkBlack,
        fontSize: 14,
        width: "50%",
    },
    cardLatsLongs: {
        flexDirection: "row",
        marginLeft: AppUtil.getWP(2),
    },
    longs: {
        color: Colors.secondary,
        fontSize: 12,
        width: "50%",
        paddingRight: 20,
        fontFamily: Fonts.RobotoBold
    },
    lats: {
        color: Colors.secondary,
        fontSize: 12,
        width: "50%",
        fontFamily: Fonts.RobotoBold
    },
    cardRightBottom: {
        marginLeft: AppUtil.getWP(2),
        flexDirection: "row",
        marginTop: 2,
    },
    rightBottomText: {
        color: Colors.secondary,
        fontSize: 12,
    },
    taggedByName: {
        color: Colors.secondary,
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        borderRadius: 10,
        width: AppUtil.getWP(24.5),
        height: AppUtil.getHP(10),
    },
    btnView: {
        flexDirection: 'row',
    },
    buttonView1: {
        width: "50%",
        height: 30,
        backgroundColor: '#ACCFFD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView2: {
        width: "50%",
        height: 30,
        backgroundColor: '#F5C0BB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: Colors.secondary,
        fontSize: 12,
        fontWeight: "bold",
    },
    status1: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#DFD592", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
    status2: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#B1E7D5", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
    status3: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#DCD4FF", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
    taggedByName1: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "bold",
        borderBottomWidth: 1,
    },
    taggedByName2: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default memo(TestCommonCard);
