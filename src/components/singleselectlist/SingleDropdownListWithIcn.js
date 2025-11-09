import React from "react";
import { View, Text } from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import IcnPole from "../../assets/svg/IcnPole";
import IcnDTR1 from "../../assets/svg/IcnDTR1";
import IcnPowerTransformers from "../../assets/svg/IcnPowerTransformers";
import IcnSubstations from "../../assets/svg/IcnSubstations";
import IcnFeeder from "../../assets/svg/IcnFeeder";
import Loader from "../Loader";
import { onLoading } from "../../../App";
import IcnRoutPointMarker from "../../assets/svg/IcnRoutPointMarker";
import IncFeederPillar from "../../assets/svg/IncFeederPillar";
import IcnLTDB from "../../assets/svg/IcnLTDB";

const SingleDropdownListWithIcn = (props) => {
    let { defoultVaule, defoultTitle, data, icn } = props;
    const [isSelectIndex, setSelectIndex] = React.useState(-1);

    React.useEffect(() => {

        if (defoultVaule && data.length > 0) {
            data.forEach(element => {
                if (defoultVaule == element.id) {
                    setTimeout(() => {
                        setSelectIndex(data?.indexOf(element));
                    }, 200);
                }
            });
        }
        else if (defoultTitle && data.length > 0) {
            data.forEach(element => {
                if (defoultTitle == element.title) {
                    setTimeout(() => {
                        setSelectIndex(data?.indexOf(element));
                    }, 100);
                }
            });
        }
    }, defoultVaule, defoultTitle, data);

    React.useEffect(() => {

    }, isSelectIndex);



    return (

        <View style={PageStyle.mainView}>

            {props.title && props.topMargin ?
                <Text style={[PageStyle.headText, { marginTop: props.topMargin }]}>
                    {props.title}
                </Text>
                :
                props.title ?
                    <Text style={PageStyle.headText}>
                        {props.title}
                    </Text>
                    :
                    null

            }
            <View style={PageStyle.dropBtn}>
                <SelectDropdown
                    data={props.data}
                    defaultValueByIndex={isSelectIndex}
                    buttonStyle={PageStyle.btnView}
                    rowStyle={PageStyle.dropdown3RowStyle}
                    onSelect={(selectedItem, index) => { props.onSelectedSevice(selectedItem); }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={PageStyle.dropdown3BtnChildStyle1}>
                                {selectedItem?.obj?.asset_type == "Substation" && <IcnSubstations />}
                                {selectedItem?.obj?.asset_type == "Feeder" && <IcnFeeder />}
                                {selectedItem?.obj?.asset_type == "Pole" && <IcnPole />}
                                {selectedItem?.obj?.asset_type == "DTR-RDSS" && <IcnDTR1 />}
                                {selectedItem?.obj?.asset_type == "DTR-Existing" && <IcnDTR1 />}
                                {selectedItem?.obj?.asset_type == "Others-Existing" && <IcnPowerTransformers />}
                                {selectedItem?.obj?.asset_type == "Others-RDSS" && <IcnPowerTransformers />}
                                {selectedItem?.obj?.asset_type == "Rout Point / Marker" && <IcnRoutPointMarker />}

                                <Text numberOfLines={1} style={PageStyle.txtCaption1}>{selectedItem ? selectedItem.title ? selectedItem.title : selectedItem.feeder_name : 'Select'}</Text>
                                <IcnGreyDown />
                            </View>
                        );
                    }}

                    // {data.asset_type == "Feeder" && <IcnFeeder />}
                    //     {data.asset_type == "Substation" && <IcnSubstations />}

                    //     {data.asset_type == "Pole" && <IcnPole />}
                    //     {data.asset_type == "DTR-RDSS" && <IcnDTR1 />}
                    //     {data.asset_type == "DTR-Existing" && <IcnDTR1 />}

                    renderCustomizedRowChild={(item, index) => {

                        return (
                            <View style={PageStyle.dropdown3RowChildStyle}>
                                {item?.obj?.asset_type == "Substation" && <IcnSubstations />}
                                {item?.obj?.asset_type == "Feeder" && <IcnFeeder />}
                                {item?.obj?.asset_type == "Pole" && <IcnPole />}
                                {item?.obj?.asset_type == "DTR-RDSS" && <IcnDTR1 />}
                                {item?.obj?.asset_type == "DTR-Existing" && <IcnDTR1 />}
                                {item?.obj?.asset_type == "Others-Existing" && <IcnPowerTransformers />}
                                {item?.obj?.asset_type == "Others-RDSS" && <IcnPowerTransformers />}
                                {item?.obj?.asset_type == "Rout Point / Marker" && <IcnRoutPointMarker />}
                                {item?.obj?.asset_type == "LTDB" && <IcnLTDB />}
                                {item?.obj?.asset_type == "Feeder Pillar" && <IncFeederPillar />}


                                <Text style={PageStyle.dropdown3RowTxt1}>{item.title ? "  " + item.title : "  " + item.feeder_name}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default React.memo(SingleDropdownListWithIcn);