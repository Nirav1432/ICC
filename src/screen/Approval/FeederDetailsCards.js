import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, } from "react-native";
import { CommonStyle } from "./CardsStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { SliderBox } from "react-native-image-slider-box";
import { image_base_url } from "../../service/appConfig";
import { Colors } from "../../utils/Colors";
import moment from "moment";

export default function FeederDetailsCards({ title, index_id, created_by_date, created_by_time, address, latitude, longitude, tag_by, images, onPressImage, midalPath, innerbutton, ddrInnerbutton, moreDetails, deletIconPress, editIconPress, type, typeClick, onDetails, othersAssetType }) {

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        var arr = [];

        if (images) {
            arr = [];
        }

        images &&
            images.map((item) => {
                arr.push(image_base_url + midalPath + item.imageName);
            });

        setImageUrls(arr);

    }, [images]);

    return (
        <>
            <View style={CommonStyle.card}>
                <View style={CommonStyle.cardTitles}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={CommonStyle.cardSr}>{title}</Text>
                    </View>
                    <Text style={CommonStyle.cardTitle}>{index_id}</Text>
                </View>

                <View style={CommonStyle.bottomBorder} />

                <View style={CommonStyle.cardContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => onPressImage(0, imageUrls)}>
                            <Image source={{ uri: imageUrls[0] }} style={{ width: 80, height: 80, borderRadius: 10, }} />
                        </TouchableOpacity>
                    </View>

                    <View style={CommonStyle.cardRight}>

                        <View style={CommonStyle.cardRightTop}>
                            <Text style={CommonStyle.rightDate}>
                                <IcnCalendar />
                                <Text style={{ marginLeft: "20" }}>
                                    {" "}
                                    {moment(created_by_date.toString()).format("DD/MM/YYYY")}
                                </Text>
                            </Text>
                            <Text style={CommonStyle.rightTime}>
                                <IcnClock />
                                <Text style={{ marginLeft: "20" }}>
                                    {" "}
                                    {moment(created_by_time.toString()).format("hh:mm a")}
                                </Text>
                            </Text>
                        </View>

                        {type && <View style={CommonStyle.cardRightAddress}>
                            <Text style={CommonStyle.rightAddress}>{address}</Text>
                        </View>}

                        <View style={CommonStyle.cardRightBottom}>
                            <Text style={CommonStyle.rightBottomText1}>Type - </Text>

                            {(type == "Pole" || type == "DTR") ?
                                <TouchableOpacity onPress={() => typeClick()} >
                                    <Text style={CommonStyle.taggedByName1} >{type}</Text>
                                </TouchableOpacity>
                                :
                                <Text style={CommonStyle.taggedByName2} >{type}</Text>
                            }
                        </View>

                        <View style={CommonStyle.cardLatLong}>
                            <Text style={CommonStyle.long}>Latitude</Text>
                            <Text style={CommonStyle.lat}>Longitude</Text>
                        </View>
                        <View style={CommonStyle.cardLatsLongs}>
                            <Text style={CommonStyle.longs}>{latitude}</Text>
                            <Text style={CommonStyle.lats}>{longitude}</Text>
                        </View>



                        <View style={CommonStyle.cardRightBottom}>
                            <Text style={CommonStyle.rightBottomText}>Tagged By -</Text>
                            <Text style={CommonStyle.taggedByName}>{tag_by}</Text>
                        </View>

                        {othersAssetType &&
                            <View style={CommonStyle.cardRightBottom}>
                                <Text style={CommonStyle.rightAddress1}>Others Attributes: </Text>
                                <Text style={CommonStyle.taggedByName}>{othersAssetType}</Text>
                            </View>
                        }

                    </View>
                </View>
                {innerbutton && <View style={CommonStyle.btnView}>
                    <TouchableOpacity style={CommonStyle.buttonView1} onPress={() => editIconPress()}>
                        <Text style={CommonStyle.btnText}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyle.buttonView2} onPress={() => deletIconPress(index_id)}>
                        <Text style={CommonStyle.btnText}>DELETE</Text>
                    </TouchableOpacity>
                </View>}
                {ddrInnerbutton && <View style={CommonStyle.btnView}>
                    <TouchableOpacity style={CommonStyle.buttonView1} onPress={() => editIconPress()}>
                        <Text style={CommonStyle.btnText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyle.buttonView2} onPress={() => deletIconPress(index_id)}>
                        <Text style={CommonStyle.btnText}>Return</Text>
                    </TouchableOpacity>
                </View>}

                {moreDetails &&
                    <TouchableOpacity style={CommonStyle.buttonView3} onPress={() => onDetails()}>
                        <Text style={CommonStyle.btnText}>View Details</Text>
                    </TouchableOpacity>
                }

            </View>
        </>
    );
}
