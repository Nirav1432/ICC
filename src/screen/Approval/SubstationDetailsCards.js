import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonStyle } from "./CardsStyle";
import { Images } from "../../utils/Images";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { SliderBox } from "react-native-image-slider-box";
import { image_base_url } from "../../service/appConfig";
import { Colors } from "../../utils/Colors";
import moment from "moment";

export default function SubstationDetailsCards({ title, index_id, created_by_date, created_by_time, address, latitude, longitude, tag_by, images, imagePressed, midalPath, innerbutton, deletIconPress, editIconPress }) {
  const [imageUrls, setImageUrls] = useState([]);


  useEffect(() => {

  }, [imageUrls]);

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
            <TouchableOpacity onPress={() => imagePressed(0, imageUrls)}>
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

            <View style={CommonStyle.cardRightAddress}>
              <Text style={CommonStyle.rightAddress}>{address}</Text>
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
          </View>
        </View>

        {(innerbutton == "" || innerbutton == "Return" || innerbutton == "Returned") && <View style={CommonStyle.btnView}>
          <TouchableOpacity style={CommonStyle.buttonView1} onPress={() => editIconPress()}>
            <Text style={CommonStyle.btnText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={CommonStyle.buttonView2} onPress={() => deletIconPress(index_id)}>
            <Text style={CommonStyle.btnText}>DELETE</Text>
          </TouchableOpacity>
        </View>}

      </View>
    </>
  );
}
