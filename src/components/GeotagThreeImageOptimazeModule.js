//import liraries
import React, { Component, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppUtil } from '../utils/AppUtil';
import { Colors } from '../utils/Colors';
import { image_base_url } from '../service/appConfig';
import FastImage from 'react-native-fast-image';
import { UserManager } from '../manager/UserManager';

// create a component
const GeotagThreeImageOptimazeModule = ({ type, item, handlePressImage, removeImage }) => {


    return (
        <View style={styles.imageContainer}>

            {item.map((items, index) => {
                return (

                    <TouchableOpacity style={styles.imagebtn} onPress={() => handlePressImage(index)}>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: type == "DTR" ? (image_base_url + UserManager.image_path + items?.imageName) : (image_base_url + items.imagepath),
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.low,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <TouchableOpacity onPress={() => removeImage(index)} style={styles.touc}>
                            <Text style={{ color: Colors.white }}>X</Text>
                        </TouchableOpacity>
                    </TouchableOpacity >
                )

            })
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    imagebtn: { marginHorizontal: AppUtil.getWP(1), width: "30%", height: AppUtil.getHP(10), borderRadius: 10, backgroundColor: Colors.white, },
    image: { width: "100%", height: AppUtil.getHP(10), borderRadius: 10, },
    touc: { height: 25, width: 25, position: "absolute", alignItems: "center", justifyContent: "center", backgroundColor: Colors.orange, right: -5, top: -5, borderRadius: 15, },
    imageContainer: { width: "100%", flexDirection: "row", marginVertical: AppUtil.getHP(2), flexWrap: "wrap", },
});

//make this component available to the app
export default memo(GeotagThreeImageOptimazeModule);
