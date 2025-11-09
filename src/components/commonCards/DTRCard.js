import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { CommonCardStyle } from "./CommonCardStyle";
import IcnCalendar from "../../assets/svg/dtrSvgs/IcnCalendar";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import { image_base_url } from "../../service/appConfig";
import moment from "moment";
import { UserManager } from "../../manager/UserManager";

const DTRCard = ({ title, index_id, created_by_date, created_by_time, address, latitude, longitude, tag_by, images, imagePressed, editIconPress, deletIconPress, status, onCardPress, type, typeClick, othersAssetType }) => {
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
      <TouchableOpacity style={CommonCardStyle.card} onPress={onCardPress}>

        <View style={CommonCardStyle.cardTitles}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={CommonCardStyle.cardSr1}>{title}</Text>
          </View>
          <Text style={CommonCardStyle.cardTitle}>{index_id}</Text>
        </View>

        <View style={CommonCardStyle.bottomBorder} />

        <View style={CommonCardStyle.cardContainer}>
          <View style={{ flexDirection: 'column' }}>

            <TouchableOpacity onPress={() => imagePressed(0, imageUrls)}>
            <Image source={{ uri: imageUrls[0] }} style={{width:80, height:80, borderRadius: 10,}} />
            </TouchableOpacity>

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

            {type &&
              <View style={CommonCardStyle.cardRightBottom}>
                <Text style={CommonCardStyle.rightAddress}>Type - </Text>

                {(type == "Pole" || type == "DTR") ?
                  <TouchableOpacity onPress={() => typeClick()} >
                    <Text style={CommonCardStyle.taggedByName1} >{type}</Text>
                  </TouchableOpacity>
                  :
                  <Text style={CommonCardStyle.taggedByName2} >{type}</Text>
                }
              </View>}

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

            {othersAssetType &&
              <View style={CommonCardStyle.cardRightBottom}>
                <Text style={CommonCardStyle.rightAddress1}>Others Attributes: </Text>
                <Text style={CommonCardStyle.taggedByName}>{othersAssetType}</Text>
              </View>
            }
          </View>
        </View>


        {
          (status == "" || status == "Return" || status == "Returned") &&
          <View style={CommonCardStyle.btnView}>
            <TouchableOpacity style={CommonCardStyle.buttonView1} onPress={() => editIconPress()}>
              <Text style={CommonCardStyle.btnText}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={CommonCardStyle.buttonView2} onPress={() => deletIconPress(index_id)}>
              <Text style={CommonCardStyle.btnText}>DELETE</Text>
            </TouchableOpacity>
          </View>}
      </TouchableOpacity>
    </>
  );
}
export default memo(DTRCard);
