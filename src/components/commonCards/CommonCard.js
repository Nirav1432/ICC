import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { CommonCardStyle } from "./CommonCardStyle";
import { Images } from "../../utils/Images";

export default function CommonCard() {
  return (
    <>
      <View style={CommonCardStyle.card}>
        <View style={CommonCardStyle.cardTitles}>
          <Text style={CommonCardStyle.cardSr}>HVDS: DTR - 63 MVA</Text>
          <Text style={CommonCardStyle.cardTitle}>
            3. APD_Baj_DTR100_HVDS_0003
          </Text>
        </View>
        <View style={CommonCardStyle.bottomBorder} />
        <View style={CommonCardStyle.cardContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            indicatorStyle="black"
            scrollEnabled={true}
            scrollIndicatorInsets={{ right: 10 }}
          >
            {/* Add more images here as needed */}
            <Image
              source={Images.cardImage}
              style={CommonCardStyle.image}
              resizeMode={"cover"}
            />
            <Image
              source={Images.cardImage}
              style={CommonCardStyle.image}
              resizeMode={"cover"}
            />
            <Image
              source={Images.cardImage}
              style={CommonCardStyle.image}
              resizeMode={"cover"}
            />
          </ScrollView>
          <View style={CommonCardStyle.cardRight}>
            <View style={CommonCardStyle.cardRightTop}>
              <Text style={CommonCardStyle.rightDate}>02/03/2323</Text>
              <Text style={CommonCardStyle.rightTime}>05:04 PM</Text>
            </View>
            <View style={CommonCardStyle.cardRightAddress}>
              <Text style={CommonCardStyle.rightAddress}>
                36, Bawana Road, Vijay Nagar, Bawana, Delhi, 110039. Block No.
                50C
              </Text>
            </View>
            <View style={CommonCardStyle.cardLatLong}>
              <Text style={CommonCardStyle.long}>DTR Lat</Text>
              <Text style={CommonCardStyle.lat}>DTR Long</Text>
            </View>
            <View style={CommonCardStyle.cardLatsLongs}>
              <Text style={CommonCardStyle.longs}>50.0254</Text>
              <Text style={CommonCardStyle.lats}>43.7215</Text>
            </View>
            <View style={CommonCardStyle.cardRightBottom}>
              <Text style={CommonCardStyle.rightBottomText}>Tagged By -</Text>
              <Text style={CommonCardStyle.taggedByName}>Malay Tiwari</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
