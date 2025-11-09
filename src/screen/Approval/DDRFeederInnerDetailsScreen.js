// Other by Khasiya Sagar.
//import liraries
import React, { useEffect, useState, memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/header/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { Colors } from "../../utils/Colors";
import FeederDetailsCards from "../../components/FeederCard/FeederDetailsCards";
import IcnDetails from "../../assets/svg/IcnDetails";
import { AppUtil } from "../../utils/AppUtil";
import DisableView from "../../components/disableView/DisableView";
import { DDRFeederInnerDetailsScreenStyle } from "./DDRFeederInnerDetailsScreenStyle";
import HTlineDisablePopup from "../../components/HTlineDisablePopup";
import LTlineDisablePopup from "../../components/LTlineDisablePopup";
import PoleDisablePopup from "../../components/PoleDisablePopup";
import DtrRdssDisablePopup from "../../components/DtrRdssDisablePopup";
import OthersAssetAttributesPopup from "../../components/OthersAssetAttributesPopup";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
var _path = ""
var _status = ""
const DDRFeederInnerDetailsScreen = (props) => {
    const route = useRoute();
    const { obj } = route.params;

    const [isDTRRDSSDetailsPopupDetails, setDTRRDSSDetailsPopupDetails] = useState(false);
    const [isPolePopupVisible, setPolePopupVisible] = useState(false);
    const [isLTLinepopupVisible, setLTLinepopupVisible] = useState(false);
    const [isHTLinepopupVisible, setHTLinepopupVisible] = useState(false);
    const [isOthersAssetAttributePopupVisible, setOthersAssetAttributePopupVisible] = useState(false);
    const [isAttributes, setAttributes] = useState(false);

    const [isImageVisible, setImageVisible] = useState(false);
    const [isImageIndex, setImageIndex] = useState(0);
    const [isImages, setImages] = useState([]);

    useEffect(() => {
        setAttributes((obj?.sub_asset_type == "Capacitor Bank") || (obj?.sub_asset_type == "Capacitor Banks") || (obj?.sub_asset_type == "Circuit Breaker") || (obj?.sub_asset_type == "RMU") || (obj?.sub_asset_type == "RTU") || (obj?.sub_asset_type == "FRTU"))
    }, [])

    const feederList = (item) => {

        const handlePressImage = (index, image) => {
            var img = [];
            image.forEach((element) => {
                const obj = { uri: element };
                img.push(obj);
            });
            setImages(img);
            setImageIndex(index);
            setImageVisible(true);
        };

        return (
            <>
                <FeederDetailsCards
                    key={"-1"}
                    title={item?.title}
                    index_id={item?.index_id}
                    created_by_date={item?.created_at ? item?.created_at : item?.created_at}
                    created_by_time={item?.created_at ? item?.created_at : item?.created_at}
                    address={item?.block + " " + item?.address}
                    latitude={item?.latitude}
                    longitude={item?.longitude}
                    tag_by={item?.tag_by}
                    images={item?.images}
                    midalPath={_path}
                    onPressImage={(index, imageUrl) => { handlePressImage(index, imageUrl); }}
                    innerbutton={false}
                    type={item?.asset_type}
                    othersAssetType={item.sub_asset_type}
                />

                <View style={{ backgroundColor: Colors.white, width: "90%", alignSelf: "center", paddingBottom: AppUtil.getHP(2) }}>

                    {
                        item?.type_of_segment == "LTline" &&
                        <TouchableOpacity style={DDRFeederInnerDetailsScreenStyle.heading1} onPress={() => setLTLinepopupVisible(true)}>
                            <View style={DDRFeederInnerDetailsScreenStyle.textView}>
                                <Text style={DDRFeederInnerDetailsScreenStyle.headingText}>{"LT Line"}</Text>
                            </View>
                            <View style={DDRFeederInnerDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }

                    {
                        item?.type_of_segment == "HTline" &&
                        <TouchableOpacity style={DDRFeederInnerDetailsScreenStyle.heading1} onPress={() => setHTLinepopupVisible(true)}>
                            <View style={DDRFeederInnerDetailsScreenStyle.textView}>
                                <Text style={DDRFeederInnerDetailsScreenStyle.headingText}>{"HT Line"}</Text>
                            </View>
                            <View style={DDRFeederInnerDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }


                    {
                        item?.poleDetails &&
                        <TouchableOpacity style={DDRFeederInnerDetailsScreenStyle.heading1} onPress={() => { setPolePopupVisible(true) }}>
                            <View style={DDRFeederInnerDetailsScreenStyle.textView}>
                                <Text style={DDRFeederInnerDetailsScreenStyle.headingText}>{"Pole Details"}</Text>
                            </View>
                            <View style={DDRFeederInnerDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        item?.dtr_existing && (item?.asset_type == "DTR-RDSS" || item?.asset_type == "DTR-Existing") &&
                        <TouchableOpacity style={DDRFeederInnerDetailsScreenStyle.heading1} onPress={() => { setDTRRDSSDetailsPopupDetails(true) }}>
                            <View style={DDRFeederInnerDetailsScreenStyle.textView}>
                                <Text style={DDRFeederInnerDetailsScreenStyle.headingText}>{"DTR-RDSS Details"}</Text>
                            </View>
                            <View style={DDRFeederInnerDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }

                    {
                        isAttributes &&
                        <TouchableOpacity style={DDRFeederInnerDetailsScreenStyle.heading1} onPress={() => { setOthersAssetAttributePopupVisible(true) }}>
                            <View style={DDRFeederInnerDetailsScreenStyle.textView}>
                                <Text style={DDRFeederInnerDetailsScreenStyle.headingText}>{"View asset attibutes details"}</Text>
                            </View>
                            <View style={DDRFeederInnerDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        item?.preceding_geotagged_asset_ID &&
                        <View style={DDRFeederInnerDetailsScreenStyle.ViewmarginTop}>
                            <DisableView title={"Preceding Geotagged asset ID"} value={item?.preceding_geotagged_asset_ID} />
                        </View>
                    }
                    {
                        item?.estimatedDistance ?
                            <View style={DDRFeederInnerDetailsScreenStyle.ViewmarginTop}>
                                <DisableView title={"Estimated aerial length of line from preceding geotagged asset ID (kms.)"} value={item?.estimatedDistance} />
                            </View>
                            :
                            <></>
                    }
                    {
                        item?.actualDistance ?
                            <View style={DDRFeederInnerDetailsScreenStyle.ViewmarginTop}>
                                <DisableView title={"Actual length of line from preceding geotagged asset ID (CMtrs.)"} value={item?.actualDistance} />
                            </View>
                            :
                            <></>
                    }

                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={DDRFeederInnerDetailsScreenStyle.mainView}>
            <Header
                title="Feeder"
                leftIcon={<IcnBack />}
                rightIcon={null}
                onLeftPress={() => props.navigation.goBack()}
                onRightPress={() => props.navigation.navigate("MapScreen", { type: "Feeder", district_id: obj?.district_id, feeder_id: obj?.fedeer_id })}
            />

            <KeyboardAwareScrollView>

                <View style={DDRFeederInnerDetailsScreenStyle.cardTitles}>
                    <Text style={DDRFeederInnerDetailsScreenStyle.cardSr}>{obj?.title}</Text>
                    <Text style={DDRFeederInnerDetailsScreenStyle.cardSr}>{obj?.index_id}</Text>

                    <View style={DDRFeederInnerDetailsScreenStyle.cardView1}>
                        <Text style={DDRFeederInnerDetailsScreenStyle.rightBottomText}>Tagged By - </Text>
                        <Text style={DDRFeederInnerDetailsScreenStyle.taggedByName}>{obj?.tag_by}</Text>
                    </View>
                    <View style={DDRFeederInnerDetailsScreenStyle.cardView2}>
                        <Text style={DDRFeederInnerDetailsScreenStyle.rightBottomText}>Status - </Text>
                        {obj?.approval_status == "" && <Text style={DDRFeederInnerDetailsScreenStyle.status3}>{"Pending"}</Text>}
                        {obj?.approval_status == "Pending" && <Text style={DDRFeederInnerDetailsScreenStyle.status3}>{obj?.approval_status}</Text>}
                        {obj?.approval_status == "Return" && <Text style={DDRFeederInnerDetailsScreenStyle.status1}>{obj?.approval_status}</Text>}
                        {obj?.approval_status == "Returned" && <Text style={DDRFeederInnerDetailsScreenStyle.status1}>{obj?.approval_status}</Text>}
                        {obj?.approval_status == "Approved" && <Text style={DDRFeederInnerDetailsScreenStyle.status2}>{obj?.approval_status}</Text>}
                    </View>
                </View>


                <View style={DDRFeederInnerDetailsScreenStyle.recentMainView}>
                    {(feederList(obj))}
                </View>

            </KeyboardAwareScrollView>

            <ImageViewer isVisible={isImageVisible} handleClose={() => setImageVisible(false)} images={isImages} index={isImageIndex} />
            <HTlineDisablePopup data={obj?.segmet} isVisible={isHTLinepopupVisible} handleClose={() => setHTLinepopupVisible(false)} />
            <LTlineDisablePopup data={obj?.segmet} isVisible={isLTLinepopupVisible} handleClose={() => setLTLinepopupVisible(false)} />
            <PoleDisablePopup data={obj?.poleDetails} isVisible={isPolePopupVisible} handleClose={() => setPolePopupVisible(false)} />
            <DtrRdssDisablePopup data={obj?.dtr_existing} isVisible={isDTRRDSSDetailsPopupDetails} handleClose={() => setDTRRDSSDetailsPopupDetails(false)} />
            {obj?.sub_asset_type &&
                <OthersAssetAttributesPopup type={obj?.sub_asset_type} data={obj?.sub_asset_attributes} handleClose={() => setOthersAssetAttributePopupVisible(false)} isVisible={isOthersAssetAttributePopupVisible} />
            }
        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(DDRFeederInnerDetailsScreen);
