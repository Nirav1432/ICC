//import liraries
import React, { Component, memo, useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Platform, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getDistance } from 'geolib';
import IcnBack from '../assets/svg/headerSvgs/IcnBack';
import IcnRight from '../assets/svg/IcnRight';
import { Colors } from '../utils/Colors';
import IcnAddress from '../assets/svg/powerTransformersSvgs/IcnAddress';
import { Fonts } from '../utils/Fonts';

// create a component
const LocationComponent = ({ handleClose, isVisible, lett, long, finalPont }) => {


    const mapRef = React.useRef(null);

    const [isInitialRegion, setInitialRegion] = useState(
        {
            latitude: 23,
            longitude: 79,
            latitudeDelta: 30,
            longitudeDelta: 30,
        }
    );

    const [isManuleLongitude, setManuleLongitude] = useState(-1);
    const [isManuleLatitude, setManuleLatitude] = useState(-1);

    const [isMapview, setMapview] = useState("standard");

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(lett),
                    longitude: parseFloat(long),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }, 200);
        }
    }, [isVisible]);

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setManuleLongitude(longitude)
        setManuleLatitude(latitude)
    };

    const onSelectLocationPoint = () => {
        let distance = distanceInMeters.toString();

        if (isManuleLatitude != -1 && distance > 99) {
            Alert.alert("Alert", "Selected location is " + distance + "m form the device’s current location. To enable geotagging, please ensure that the device is located within 100M of the asset’s location", [
                {
                    text: "OK",
                },
            ]);
        }
        else {
            if (isManuleLatitude !== -1)
                finalPont({ latitude: isManuleLatitude, longitude: isManuleLongitude })
            else
                finalPont({ latitude: lett, longitude: long })
            onReset()
        }
    };

    const distanceInMeters = getDistance(
        { latitude: lett, longitude: long },
        { latitude: isManuleLatitude, longitude: isManuleLongitude }
    );

    const onReset = () => {
        setManuleLongitude(-1)
        setManuleLatitude(-1)
        setMapview("standard")
        handleClose()
    };

    return (
        <Modal visible={isVisible} >
            <SafeAreaView>
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => { onReset() }}>
                        <IcnBack fill={"#000"} />
                    </TouchableOpacity>

                    <Text style={styles.text}>Select Location</Text>

                    <TouchableOpacity onPress={() => onSelectLocationPoint()}>
                        <IcnRight />
                    </TouchableOpacity>
                </View>

                <MapView style={styles.mapView} ref={mapRef} mapType={isMapview == "satellite" ? "satellite" : "standard"} >
                    <Marker draggable onDrag={handleMapPress} coordinate={{ latitude: parseFloat(lett), longitude: parseFloat(long) }} />
                </MapView>

                {isManuleLatitude != -1 &&
                    <View style={[styles.distanView,{top:Platform.OS == "ios" ? "13%" : "7%"}]}>
                        <Text style={styles.distantxt}>Selected location is {distanceInMeters.toString()}M from the device’s current location.</Text>
                    </View>
                }

                <TouchableOpacity style={styles.btnMapview}
                    onPress={() => { setMapview(isMapview == "standard" ? "satellite" : "standard") }}>
                    <IcnAddress />
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({

    header: {
        width: "100%",
        height: "7%",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    text: {
        color: Colors.secondary,
        fontSize: 16,
        fontfamily: Fonts.RobotoBold,
    },
    mapView: { width: '100%', height: '93%' },
    distanView: { width: "100%", top: "7%", alignItems: 'center', position: 'absolute', backgroundColor: Colors.backTansColor, paddingVertical: 15 },
    distantxt: { color: Colors.white, fontSize: 14, textAlign: 'center' },
    btnMapview: { width: 40, height: 40, bottom: "1%", end: "2%", padding: 10, borderRadius: 40, margin: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: "rgba(245, 120, 2, 0.7)" },
});
export default memo(LocationComponent);
