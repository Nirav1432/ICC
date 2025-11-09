import React, { useState, useEffect, memo } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LocationBarStyle } from "./LocationBarStyle";

const LocationBarDisble = (props) => {

    // const [isLocationDetail, setLocationDetail] = useState(null);

    // useEffect(() => {
    //     if (props?.getdata)
    //         setLocationDetail(props?.getdata)
    //     else if (props?.getdata == null || props?.getdata == "")
    //         setLocationDetail(null)
    // }, [props?.getdata])

    // useEffect(() => {
    //     props.setData(isLocationDetail)
    // }, [isLocationDetail])

    return <>
        <View style={LocationBarStyle.addressSearchBar}>

            <Text style={LocationBarStyle.titleText}>{props.title}</Text>

            <View style={LocationBarStyle.rowDisbleView}>
                <Text style={LocationBarStyle.textInputDisbleView}>{props?.getdata}</Text>
                {/* <TextInput
                    maxLength={70}
                    style={LocationBarStyle.textInputDisbleView}
                    placeholderTextColor="black"
                    value={isLocationDetail}
                    onChangeText={(text) => { setLocationDetail(text) }}
                /> */}
            </View>

        </View>
    </>
}

export default memo(LocationBarDisble);