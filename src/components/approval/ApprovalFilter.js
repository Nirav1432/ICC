import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ApprovalFilterStyle } from "./ApprovalFilterStyle";
import DatePicker from 'react-native-date-picker'
import SubmitBtn from "../clogin/commonButton/SubmitBtn";
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/Endpoints";

import SingleDropdownList1 from "../singleselectlist/SingleDropdownList1";
import SingleDropdownList2 from "../singleselectlist/SingleDropdownList2";
import FillRadio from "../../assets/svg/FillRadio";
import Radio from "../../assets/svg/Radio";
import IcnCalendar from "../../assets/svg/IcnCalendar";
import moment from "moment";
import Loader from "../Loader";
import SingleDropdownList3 from "../singleselectlist/SingleDropdownList3";
import { ddrFeederStatus } from "../../utils/CardData";

export default function ApprovalFilter({ handleClose, modalVisible, oldFilter, newFilter, data, feederName }) {

    const [isLoader, setLoader] = useState(false);

    const [isDest, setDest] = useState(-1);
    const [isFeeder, setFeeder] = useState("");
    const [isSubstation, setSubstation] = useState("");
    const [isDTRsstyle, setDTRsstyle] = useState(-1);
    const [isProject, setProject] = useState(-1);
    const [isStatus, setStatus] = useState(-1);
    const [isTagged, setTagged] = useState("");
    const [isRadioButton, setRadioButton] = useState(false);

    const [isOpenFrom, setOpenFrom] = React.useState(false)
    const [isDateFrom, setDateFrom] = React.useState(new Date())
    const [isFrom, setFrom] = React.useState("From")

    const [isOpenTo, setOpenTo] = React.useState(false)
    const [isDateTo, setDateTo] = React.useState(new Date())
    const [isTo, setTo] = React.useState("To")
    const [isFeederListByDisticList, setFeederListByDisticList] = useState([]);
    const [isSubstationList, setSubstationList] = useState([]);


    useEffect(() => {
        if (oldFilter != null && oldFilter != undefined) {
            setDTRsstyle(oldFilter?.DTRstype);
            setDest(oldFilter?.Dest);
            setFeeder(oldFilter?.Feeder);
            setSubstation(oldFilter?.Substation)
            setProject(oldFilter?.Project);
            setStatus(oldFilter?.Status);
            setTagged(oldFilter?.Tagged);
            setRadioButton(oldFilter?.Survey);
            setDateFrom(oldFilter?.fromDate == 'From' ? new Date() : oldFilter?.fromDate);
            setFrom(oldFilter?.fromDate == 'From' ? "From" : moment(oldFilter?.fromDate).format("MM/YYYY"));
            setDateTo(oldFilter?.toDate == 'To' ? new Date() : oldFilter?.toDate);
            setTo(oldFilter?.toDate == 'To' ? "To" : moment(oldFilter?.toDate).format("MM/YYYY"));

            if (oldFilter?.Dest?.name == "") {
                setFeeder("");
                setFeederListByDisticList([])
                setSubstationList([])
            }
        }
        else {
            setDTRsstyle("");
            setDest("");
            setFeeder("");
            setSubstation("");
            setProject("");
            setStatus("");
            setTagged("");
            setFrom("From")
            setDateFrom(new Date())
            setFrom("To")
            setDateFrom(new Date())

        }
    }, [modalVisible, handleClose]);

    const onSelectItem = (type, value) => {

        if (type == "Asset")
            setDTRsstyle(value)
        else if (type == "Desc") {
            if (feederName) {
                setSubstation('')
                setSubstationList([]);

                setFeeder("");
                setFeederListByDisticList([])

                getSubstatoinList(value)
            }
            setDest(value);
        }
        else if (type == "Project")
            setProject(value);
        else if (type == "Status")
            setStatus(value);
        else if (type == "Tagged")
            setTagged(value);
        else if (type == "Feeder")
            setFeeder(value);
        else if (type == "Substation") {
            setFeeder("");
            setFeederListByDisticList([])
            setSubstation(value);
            onGetFeederByDistrict(value)
        }
    }
    const onSelectRadioBuuton = (value) => {
        setRadioButton(value);
    }
    const onShowDateAlert = () => {
        Alert.alert("Alert", "Please Select From Date First!")
    }
    const onClose = () => {
        setDTRsstyle("")
        setDest("");
        setProject("");
        setStatus("");
        setTagged("");

        handleClose();

    }
    const onSave = () => {

        if (isFrom != "From" && isTo == "To") {
            Alert.alert("Alert", "Please Select To Date", [
                {
                    text: "OK",
                    onPress: () => {
                    },
                },
                {
                    text: "Cancle",
                    onPress: () => {

                        setFrom("From")
                        setDateFrom(new Date())
                        setFrom("To")
                        setDateFrom(new Date())
                        var obj = {
                            DTRstype: isDTRsstyle, Dest: isDest, Project: isProject, Status: isStatus,
                            Tagged: isTagged, Survey: isRadioButton, fromDate: "From", toDate: "To", Feeder: isFeeder, Substation: isSubstation,
                        }
                        newFilter(obj);
                        onClose();
                    },
                },
            ]);

        }
        else {
            var obj = {
                DTRstype: isDTRsstyle, Dest: isDest, Project: isProject, Status: isStatus,
                Tagged: isTagged, Survey: isRadioButton,
                fromDate: isFrom == "From" ? isFrom : isDateFrom,
                toDate: isTo == "To" ? isTo : isDateTo,
                Feeder: isFeeder,
                Substation: isSubstation,
            }
            newFilter(obj);
            onClose();

        }
    }

    function getSubstatoinList(value) {

        var data = { district_id: value?.id };
        Service.post(EndPoints.getSubstationByDistrict, data, (success) => {

            const sub = success.data.map((district) => ({
                name: district.substation_name,
                value: district.id,
            }));

            setSubstationList(sub);
            setLoader(false);
        },
            (error) => {
                setLoader(false);
            }
        );
    }
    const onGetFeederByDistrict = (value) => {

        setLoader(true);

        const data = {
            district_id: JSON.stringify(isDest?.id),
            substation_id: value?.id,
        };


        Service.post(EndPoints.getFeederbydistrict, data, (success) => {
            const transformedDistricts = success.data.map((district) => ({
                name: district?.feeder_name,
                code: district?.feeder_code,
                value: district?.id,
            }));

            setFeederListByDisticList(transformedDistricts);
            setLoader(false);
        },
            (error) => {
                setLoader(false);
            }
        );
    }

    return (

        <Modal animationType="none" visible={modalVisible} transparent={true}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={ApprovalFilterStyle.container}>
                    <KeyboardAwareScrollView>
                        <View style={ApprovalFilterStyle.header}>
                            <View style={ApprovalFilterStyle.headerLeft}>
                                <Text style={ApprovalFilterStyle.title}>Filter</Text>
                            </View>
                            <View style={ApprovalFilterStyle.headerRight}>
                                <TouchableOpacity onPress={onClose} >
                                    <Text style={{ color: "black" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={ApprovalFilterStyle.fields}>
                            <SingleDropdownList2 oldData={isDest} title={"Select District"} data={data?.dest} onSelectedSevice={(value) => onSelectItem("Desc", value)} />
                            {feederName &&
                                <>
                                    <SingleDropdownList2 oldData={isSubstation} title={"Substation name"}
                                        data={isSubstationList} onSelectedSevice={(value) => onSelectItem("Substation", value)} />

                                    <SingleDropdownList3 oldData={isFeeder} title={"Select Feeder name (feeder code)"}
                                        data={isFeederListByDisticList} onSelectedSevice={(value) => onSelectItem("Feeder", value)} />
                                </>
                            }
                            <SingleDropdownList1 oldData={isProject} title={"Type of Project"} data={data?.type_of_project} onSelectedSevice={(value) => onSelectItem("Project", value)} />

                            {feederName ?
                                <SingleDropdownList1 oldData={isStatus} title={"Select Status"} data={ddrFeederStatus} onSelectedSevice={(value) => onSelectItem("Status", value)} />
                                :
                                <SingleDropdownList1 oldData={isStatus} title={"Select Status"} data={data?.status_list} onSelectedSevice={(value) => onSelectItem("Status", value)} />
                            }
                            <View style={ApprovalFilterStyle.btnRadioView}>
                                <TouchableOpacity style={ApprovalFilterStyle.btnRadioInnerView} onPress={() => onSelectRadioBuuton(!isRadioButton)}>
                                    {isRadioButton ? <Radio /> : <FillRadio />}
                                    <Text style={ApprovalFilterStyle.headText}>Survey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[ApprovalFilterStyle.btnRadioInnerView, { marginLeft: 10 }]} onPress={() => onSelectRadioBuuton(!isRadioButton)}>
                                    {isRadioButton ? <FillRadio /> : <Radio />}
                                    <Text style={ApprovalFilterStyle.headText}>Achievement</Text>
                                </TouchableOpacity>
                            </View>

                            <SingleDropdownList1 oldData={isTagged} title={"Select Tagged By"} data={data?.tagged_by_list} onSelectedSevice={(value) => onSelectItem("Tagged", value)} />

                            <Text style={[ApprovalFilterStyle.headText, { marginTop: 10 }]}>
                                {"Select Tagged Date"}
                            </Text>

                            <View style={ApprovalFilterStyle.timeView}>
                                <TouchableOpacity style={ApprovalFilterStyle.fromDateView} onPress={() => setOpenFrom(true)}>

                                    <Text style={ApprovalFilterStyle.txtFrom}>{isFrom}</Text>
                                    <IcnCalendar />

                                    <DatePicker modal mode='date' open={isOpenFrom} date={isDateFrom} onConfirm={(date) => {
                                        setOpenFrom(false);
                                        setDateFrom(date);
                                        setFrom(moment(date).format("MM/YYYY"))
                                    }}
                                        onCancel={() => {
                                            setOpenFrom(false);
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={ApprovalFilterStyle.fromDateView} onPress={() => isFrom != 'From' ? setOpenTo(true) : onShowDateAlert()}>

                                    <Text style={ApprovalFilterStyle.txtFrom}>{isTo}</Text>
                                    <IcnCalendar />

                                    <DatePicker modal mode='date' open={isOpenTo} minimumDate={isDateFrom} date={isDateTo} onConfirm={(date) => {
                                        setOpenTo(false)
                                        setDateTo(date)
                                        setTo(moment(date).format("MM/YYYY"))
                                    }}
                                        onCancel={() => {
                                            setOpenTo(false)
                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                        <SubmitBtn title={"Save"} onPress={() => onSave()} />
                    </KeyboardAwareScrollView>

                </View>
            </View>

            {isLoader && <Loader />}
        </Modal>
    );
}
