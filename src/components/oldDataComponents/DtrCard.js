import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { image_base_url } from "../../service/appConfig";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import { UserManager } from "../../manager/UserManager";
import { AppUtil } from "../../utils/AppUtil";
import { Fonts } from "../../utils/Fonts";

const DtrCard = ({ title, index_id, created_by_date, created_by_time, address, latitude, longitude, tag_by, images, editIconPress, deletIconPress, status }) => {

    let _date = created_by_date ? moment(created_by_date.toString()).format("DD/MM/YYYY") : "";
    let _time = created_by_time ? moment(created_by_time.toString()).format("hh:mm a") : "";

    return (
        <>
            <View style={CommonCardStyle.card}>

                <View style={CommonCardStyle.cardTitles}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={CommonCardStyle.cardSr}>{title}</Text>
                    </View>


                    <Text style={CommonCardStyle.cardTitle}>{index_id}</Text>
                </View>

                <View style={CommonCardStyle.bottomBorder} />

                <View style={CommonCardStyle.cardContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: image_base_url + UserManager.image_path + images[0]?.imageName }} style={{ width: 75, height: 75, borderRadius: 10, borderWidth: 0.5, borderColor: Colors.skyBlue }} />

                        {status == "" && <Text style={CommonCardStyle.status1}>{"Pending \n for \n Submission"}</Text>}
                        {status == "Pending" && <Text style={CommonCardStyle.status3}>{status}</Text>}
                        {status == "Return" && <Text style={CommonCardStyle.status1}>{status}</Text>}
                        {status == "Returned" && <Text style={CommonCardStyle.status1}>{status}</Text>}
                        {status == "Approved" && <Text style={CommonCardStyle.status2}>{status}</Text>}

                    </View>

                    <View style={CommonCardStyle.cardRight}>

                        <View style={CommonCardStyle.cardRightTop}>
                            <Text style={CommonCardStyle.rightDate}>
                                <IcnCalendar />
                                <Text>
                                    {" "}
                                    {_date}
                                </Text>
                            </Text>
                            <Text style={CommonCardStyle.rightTime}>
                                <IcnClock />
                                <Text>
                                    {" "}
                                    {_time}
                                </Text>
                            </Text>
                        </View>

                        <View style={CommonCardStyle.cardRightAddress}>
                            <Text style={CommonCardStyle.rightAddress}>{address}</Text>
                        </View>

                        <View style={CommonCardStyle.cardLatLong}>
                            <Text style={CommonCardStyle.long}>Latitude</Text>
                            <Text style={CommonCardStyle.lat}>Longitude</Text>
                        </View>
                        <View style={CommonCardStyle.cardLatsLongs}>
                            <Text style={CommonCardStyle.longs}>{latitude}</Text>
                            <Text style={CommonCardStyle.lats}>{longitude}</Text>
                        </View>

                        <View style={CommonCardStyle.cardRightBottom}>
                            <Text style={CommonCardStyle.rightBottomText}>Tagged By: </Text>
                            <Text style={CommonCardStyle.taggedByName}>{tag_by}</Text>
                        </View>
                    </View>
                </View>

                <View style={CommonCardStyle.btnView}>
                    <TouchableOpacity style={CommonCardStyle.buttonView1} onPress={() => deletIconPress(index_id)}>
                        <Text style={CommonCardStyle.btnText}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonCardStyle.buttonView2} onPress={() => editIconPress()}>
                        <Text style={CommonCardStyle.btnText}>RE-SUBMIT</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
}

const CommonCardStyle = StyleSheet.create({
    card: { marginTop: 10, borderRadius: 10, width: "100%", alignSelf: "center", backgroundColor: Colors.white, },
    cardSr: { width: "95%", color: Colors.secondary, fontSize: 14, fontWeight: "bold", marginBottom: AppUtil.getHP(1), },
    cardTitle: { color: Colors.lightGray, fontSize: 14, fontWeight: 500, marginBottom: AppUtil.getHP(1), },
    cardTitles: { marginLeft: AppUtil.getWP(4), marginTop: AppUtil.getHP(2), },
    bottomBorder: { borderBottomColor: Colors.gray, borderBottomWidth: 1, },
    cardContainer: { flex: 1, flexDirection: "row", padding: AppUtil.getHP(2), },
    cardLeft: { width: "30%", height: "30%", },
    cardRight: { width: "70%", flexDirection: "column", },
    cardRightTop: { flexDirection: "row", marginLeft: AppUtil.getWP(2), },
    rightDate: { color: Colors.secondary, fontSize: 14, fontWeight: 500, width: "50%", },
    rightTime: { color: Colors.secondary, fontSize: 16, fontWeight: 500, width: "50%", },
    cardRightAddress: { marginLeft: AppUtil.getWP(2), marginTop: 1, },
    rightAddress: { color: Colors.darkBlack, fontSize: 12 },
    rightAddress1: { color: Colors.darkBlack, fontSize: 12, fontFamily: Fonts.RobotoMedium },
    cardLatLong: { flexDirection: "row", marginTop: 2, marginLeft: AppUtil.getWP(2), },
    long: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    lat: { color: Colors.darkBlack, fontSize: 14, width: "50%", },
    cardLatsLongs: { flexDirection: "row", marginLeft: AppUtil.getWP(2), },
    longs: { color: Colors.secondary, fontSize: 12, width: "50%", paddingRight: 20, fontFamily: Fonts.RobotoBold },
    lats: { color: Colors.secondary, fontSize: 12, width: "50%", fontFamily: Fonts.RobotoBold },
    cardRightBottom: { marginLeft: AppUtil.getWP(2), flexDirection: "row", marginTop: 2, },
    rightBottomText: { color: Colors.secondary, fontSize: 12, },
    taggedByName: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
    image: { borderRadius: 10, width: AppUtil.getWP(24.5), height: AppUtil.getHP(10), },
    btnView: { flexDirection: 'row', },
    buttonView1: { width: "50%", height: 30, backgroundColor: '#ACCFFD', justifyContent: 'center', alignItems: 'center' },
    buttonView2: { width: "50%", height: 30, backgroundColor: '#F5C0BB', justifyContent: 'center', alignItems: 'center' },
    btnText: { color: Colors.secondary, fontSize: 12, fontWeight: "bold", },
    status1: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#DFD592", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
    status2: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#B1E7D5", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
    status3: { marginTop: 20, paddingBottom: 2, textAlign: 'center', backgroundColor: "#DCD4FF", borderRadius: 10, fontSize: 12, fontWeight: "bold", },
    taggedByName1: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", borderBottomWidth: 1, },
    taggedByName2: { color: Colors.secondary, fontSize: 14, fontWeight: "bold", },
});
export default memo(DtrCard);
