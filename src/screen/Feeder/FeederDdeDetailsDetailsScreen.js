//import liraries
import React, { useEffect, useState, memo } from "react";
import { View, Text,  ScrollView, TouchableOpacity, TextInput, FlatList, Alert, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";
import { onLoading } from "../../../App";
import Header from "../../components/header/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IcnBack from "../../assets/svg/headerSvgs/IcnBack";
import { Colors } from "../../utils/Colors";
import ImageViewer from "../../components/imageViewr/ImageViewer";
import { UserManager } from "../../manager/UserManager";
import FeederDetailsCards from "../../components/FeederCard/FeederDetailsCards";
import IcnDetails from "../../assets/svg/IcnDetails";
import { AppUtil } from "../../utils/AppUtil";
import DisableView from "../../components/disableView/DisableView";
import { FeederDdeDetailsDetailsScreenStyle } from "./FeederDdeDetailsDetailsScreenStyle";
import HTlineDisablePopup from "../../components/HTlineDisablePopup";
import LTlineDisablePopup from "../../components/LTlineDisablePopup";
import PoleDisablePopup from "../../components/PoleDisablePopup";
import DtrRdssDisablePopup from "../../components/DtrRdssDisablePopup";
import IcnClock from "../../assets/svg/powerTransformersSvgs/IcnClock";
import IcnToFrom from "../../assets/svg/IcnToFrom";
import OthersAssetAttributesPopup from "../../components/OthersAssetAttributesPopup";
import { SafeAreaView } from "react-native-safe-area-context";

// create a component
var _path = ""
var _status = ""
const FeederDdeDetailsDetailsScreen = (props) => {
    const route = useRoute();

    const { obj } = route.params;


    const [isSelectTab, setSelectTab] = useState(1);
    const [isHistoreList, setHistoreList] = useState([]);
    const [isDTRRDSSDetailsPopupDetails, setDTRRDSSDetailsPopupDetails] = useState(false);
    const [isPolePopupVisible, setPolePopupVisible] = useState(false);
    const [isLTLinepopupVisible, setLTLinepopupVisible] = useState(false);
    const [isHTLinepopupVisible, setHTLinepopupVisible] = useState(false);
    const [isOthersAssetAttributePopupVisible, setOthersAssetAttributePopupVisible] = useState(false);
    const [isAttributes, setAttributes] = useState(false);

    const [visible, setIsVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setAttributes((obj?.item?.sub_asset_type == "Capacitor Bank") || (obj?.item?.sub_asset_type == "Capacitor Banks") || (obj?.item?.sub_asset_type == "Circuit Breaker") || (obj?.item?.sub_asset_type == "RMU") || (obj?.item?.sub_asset_type == "RTU") || (obj?.item?.sub_asset_type == "FRTU"))
    }, [])

    const onFetchActionHistory = () => {
        const data = {
            "role_id": UserManager.role_id,
            "user_id": UserManager.id,
            "discom_id": UserManager.discom_id,
            "fedeer_id": obj?.fedeer_id,
            "district_id": obj?.district_id,
            "geotag_type": obj?.geotag_type,
            "taging_for": obj?.taging_for,
        };


        onLoading(true);
        Service.post(EndPoints.federHActionHistory, data, (res) => {
            if (res._resultflag) {
                setHistoreList(res.data.list);
                onLoading(false);
            } else {
                Alert.alert("Alert", res.message);
                onLoading(false);
            }
        }, (err) => {
            onLoading(false);
        })
    }

    const onSelectTab = (btn) => {

        if (btn !== isSelectTab) {
            setSelectTab(btn);
            if (btn == 2) {
                onFetchActionHistory()
            }
        }
    }

    const handlePressImage = (index, image) => {
        var img = [];
        image.forEach((element) => {
            const obj = { uri: element };
            img.push(obj);
        });
        setImages(img);
        setImgIndex(index);
        setIsVisible(true);
    };

    const feederList = (item) => {


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
                    onPressImage={(index, imageUrl) => { handlePressImage(index, imageUrl) }}
                    innerbutton={false}
                    type={item?.asset_type}
                />

                <View style={{ backgroundColor: Colors.white, width: "90%", alignSelf: "center", paddingBottom: AppUtil.getHP(2) }}>

                    {
                        obj?.item?.type_of_segment == "LTline" &&
                        <TouchableOpacity style={FeederDdeDetailsDetailsScreenStyle.heading1} onPress={() => setLTLinepopupVisible(true)}>
                            <View style={FeederDdeDetailsDetailsScreenStyle.textView}>
                                <Text style={FeederDdeDetailsDetailsScreenStyle.headingText}>{"LT Line"}</Text>
                            </View>
                            <View style={FeederDdeDetailsDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }

                    {
                        obj?.item?.type_of_segment == "HTline" &&
                        <TouchableOpacity style={FeederDdeDetailsDetailsScreenStyle.heading1} onPress={() => setHTLinepopupVisible(true)}>
                            <View style={FeederDdeDetailsDetailsScreenStyle.textView}>
                                <Text style={FeederDdeDetailsDetailsScreenStyle.headingText}>{"HT Line"}</Text>
                            </View>
                            <View style={FeederDdeDetailsDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }


                    {
                        obj?.item?.poleDetails &&
                        <TouchableOpacity style={FeederDdeDetailsDetailsScreenStyle.heading1} onPress={() => { setPolePopupVisible(true) }}>
                            <View style={FeederDdeDetailsDetailsScreenStyle.textView}>
                                <Text style={FeederDdeDetailsDetailsScreenStyle.headingText}>{"Pole Details"}</Text>
                            </View>
                            <View style={FeederDdeDetailsDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        item?.asset_type == "DTR-RDSS" && obj?.item?.dtr_existing &&
                        <TouchableOpacity style={FeederDdeDetailsDetailsScreenStyle.heading1} onPress={() => { setDTRRDSSDetailsPopupDetails(true) }}>
                            <View style={FeederDdeDetailsDetailsScreenStyle.textView}>
                                <Text style={FeederDdeDetailsDetailsScreenStyle.headingText}>{"DTR-RDSS Details"}</Text>
                            </View>
                            <View style={FeederDdeDetailsDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }

                    {
                        isAttributes &&
                        <TouchableOpacity style={FeederDdeDetailsDetailsScreenStyle.heading1} onPress={() => { setOthersAssetAttributePopupVisible(true) }}>
                            <View style={FeederDdeDetailsDetailsScreenStyle.textView}>
                                <Text style={FeederDdeDetailsDetailsScreenStyle.headingText}>{"View asset attibutes details"}</Text>
                            </View>
                            <View style={FeederDdeDetailsDetailsScreenStyle.icnView}>
                                <IcnDetails />
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        obj?.item?.preceding_geotagged_asset_ID &&
                        <View style={FeederDdeDetailsDetailsScreenStyle.ViewmarginTop}>
                            <DisableView title={"Preceding Geotagged asset ID"} value={obj?.item?.preceding_geotagged_asset_ID} />
                        </View>
                    }
                    {
                        obj?.item?.estimatedDistance ?
                            <View style={FeederDdeDetailsDetailsScreenStyle.ViewmarginTop}>
                                <DisableView title={"Estimated aerial length of line from preceding geotagged asset ID (kms.)"} value={obj?.item?.estimatedDistance} />
                            </View>
                            :
                            <></>
                    }
                    {
                        obj?.item?.actualDistance ?
                            <View style={FeederDdeDetailsDetailsScreenStyle.ViewmarginTop}>
                                <DisableView title={"Actual length of line from preceding geotagged asset ID (CMtrs.)"} value={obj?.item?.actualDistance} />
                            </View>
                            :
                            <></>
                    }

                </View>
            </>
        )
    }

    const actionList = (item, index) => {
        return (
            <View style={FeederDdeDetailsDetailsScreenStyle.actionMainView} >
                <View style={FeederDdeDetailsDetailsScreenStyle.actionMainInnerView}>

                    <View style={FeederDdeDetailsDetailsScreenStyle.roundView}>
                        <Text style={FeederDdeDetailsDetailsScreenStyle.txt1}>{isHistoreList.length - index}</Text>
                    </View>

                    <View style={FeederDdeDetailsDetailsScreenStyle.centerView}>

                        <View>
                            <View style={FeederDdeDetailsDetailsScreenStyle.view1}>
                                <IcnClock width={15} height={15} />
                                <Text style={FeederDdeDetailsDetailsScreenStyle.txt2}>{item.timestamp}</Text>
                            </View>

                            <View style={FeederDdeDetailsDetailsScreenStyle.view1}>
                                <Text style={FeederDdeDetailsDetailsScreenStyle.txt3}>{item.sender}</Text>
                                <IcnToFrom />
                                <Text style={FeederDdeDetailsDetailsScreenStyle.txt4}>{item.receiver}</Text>
                            </View>

                        </View>
                        <Text style={FeederDdeDetailsDetailsScreenStyle.txt5}>{item.remarks}</Text>
                    </View>

                    <View style={FeederDdeDetailsDetailsScreenStyle.view2}>
                        {item?.action == "Pending" && <Text style={FeederDdeDetailsDetailsScreenStyle.status3}>{item?.action}</Text>}
                        {item?.action == "Return" && <Text style={FeederDdeDetailsDetailsScreenStyle.status1}>{item?.action}</Text>}
                        {item?.action == "Returned" && <Text style={FeederDdeDetailsDetailsScreenStyle.status1}>{item?.action}</Text>}
                        {item?.action == "Approved" && <Text style={FeederDdeDetailsDetailsScreenStyle.status2}>{item?.action}</Text>}
                    </View>

                </View>
                <View style={FeederDdeDetailsDetailsScreenStyle.line} />
            </View>

        )
    }

    return (
        <SafeAreaView style={FeederDdeDetailsDetailsScreenStyle.mainView}>
            <Header
                title="Feeder"
                leftIcon={<IcnBack />}
                rightIcon={null}
                onLeftPress={() => props.navigation.goBack()}
                onRightPress={() => props.navigation.navigate("MapScreen", { type: "Feeder", district_id: obj?.district_id, feeder_id: obj?.fedeer_id })}
            />

            <KeyboardAwareScrollView>

                <View style={FeederDdeDetailsDetailsScreenStyle.cardTitles}>
                    <Text style={FeederDdeDetailsDetailsScreenStyle.cardSr}>{obj?.title}</Text>
                    <Text style={FeederDdeDetailsDetailsScreenStyle.cardSr}>{obj?.index_id}</Text>

                    <View style={FeederDdeDetailsDetailsScreenStyle.cardView1}>
                        <Text style={FeederDdeDetailsDetailsScreenStyle.rightBottomText}>Tagged By - </Text>
                        <Text style={FeederDdeDetailsDetailsScreenStyle.taggedByName}>{obj?.tag_by}</Text>
                    </View>
                    <View style={FeederDdeDetailsDetailsScreenStyle.cardView2}>
                        <Text style={FeederDdeDetailsDetailsScreenStyle.rightBottomText}>Status - </Text>
                        {_status == "" && <Text style={FeederDdeDetailsDetailsScreenStyle.status3}>{"Pending for Submission"}</Text>}
                        {_status == "Pending" && <Text style={FeederDdeDetailsDetailsScreenStyle.status3}>{_status}</Text>}
                        {_status == "Return" && <Text style={FeederDdeDetailsDetailsScreenStyle.status1}>{_status}</Text>}
                        {_status == "Returned" && <Text style={FeederDdeDetailsDetailsScreenStyle.status1}>{_status}</Text>}
                        {_status == "Approved" && <Text style={FeederDdeDetailsDetailsScreenStyle.status2}>{_status}</Text>}
                    </View>
                </View>


                <View style={FeederDdeDetailsDetailsScreenStyle.descriptiontabView}>
                    <TouchableOpacity onPress={() => onSelectTab(1)} style={[FeederDdeDetailsDetailsScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 1 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[FeederDdeDetailsDetailsScreenStyle.txtTab, { color: isSelectTab == 1 ? Colors.white : "#000" }]}>Geotags</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectTab(2)} style={[FeederDdeDetailsDetailsScreenStyle.descriptiontab, { backgroundColor: isSelectTab == 2 ? Colors.orange : "#C3CFE4" }]}>
                        <Text style={[FeederDdeDetailsDetailsScreenStyle.txtTab, { color: isSelectTab == 2 ? Colors.white : "#000" }]}>Action History</Text>
                    </TouchableOpacity>
                </View>

                {isSelectTab == 1 &&
                    <View style={FeederDdeDetailsDetailsScreenStyle.recentMainView}>
                        {isSelectTab == 1 && (feederList(obj?.item))}
                    </View>
                }
                {isSelectTab == 2 &&
                    <View style={FeederDdeDetailsDetailsScreenStyle.recentMainView1}>
                        {isSelectTab == 2 && isHistoreList?.map((item, index) => (actionList(item, index)))}
                    </View>
                }
            </KeyboardAwareScrollView>

            <ImageViewer isVisible={visible} handleClose={() => setIsVisible(false)} images={images} index={imgIndex} />
            <HTlineDisablePopup data={obj?.item?.segmet} isVisible={isHTLinepopupVisible} handleClose={() => setHTLinepopupVisible(false)} />
            <LTlineDisablePopup data={obj?.item?.segmet} isVisible={isLTLinepopupVisible} handleClose={() => setLTLinepopupVisible(false)} />
            <PoleDisablePopup data={obj?.item?.poleDetails} isVisible={isPolePopupVisible} handleClose={() => setPolePopupVisible(false)} />
            <DtrRdssDisablePopup data={obj?.item?.dtr_existing} isVisible={isDTRRDSSDetailsPopupDetails} handleClose={() => setDTRRDSSDetailsPopupDetails(false)} />
            {obj?.item?.sub_asset_type &&
                <OthersAssetAttributesPopup type={obj?.item?.sub_asset_type} data={obj?.item?.sub_asset_attributes} handleClose={() => setOthersAssetAttributePopupVisible(false)} isVisible={isOthersAssetAttributePopupVisible} />
            }
        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(FeederDdeDetailsDetailsScreen);
