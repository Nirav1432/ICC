import React, { useState, useEffect, memo } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LocationBarStyle } from "./LocationBarStyle";

const locationBar = (props) => {

    const [isLocationDetail, setLocationDetail] = useState(null);

    useEffect(() => {
        if (props?.getdata)
            setLocationDetail(props?.getdata)
        else if (props?.getdata == null || props?.getdata == "")
            setLocationDetail(null)


    }, [props?.getdata])

    useEffect(() => {
        props.setData(isLocationDetail)
    }, [isLocationDetail])

    return <>
        <View style={LocationBarStyle.addressSearchBar}>

            <Text style={LocationBarStyle.titleText}>{props.title}</Text>

            <View style={LocationBarStyle.row}>
                <TextInput
                maxLength={70}
                    style={LocationBarStyle.textInput}
                    placeholderTextColor="black"
                    value={isLocationDetail}
                    onChangeText={(text) => { setLocationDetail(text) }}
                />
                <TouchableOpacity onPress={() => props.handlePress()} style={LocationBarStyle.buttonIcon}>
                    {props.icon}
                </TouchableOpacity>
            </View>

        </View>
    </>
}

export default memo(locationBar);