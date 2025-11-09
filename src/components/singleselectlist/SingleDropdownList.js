import React from "react";
import { View, Text } from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import Loader from "../Loader";

const SingleDropdownList = (props) => {
    let { defoultVaule, defoultTitle, defoultEliment, data } = props;
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
        else if (defoultEliment && data.length > 0) {
            data.forEach(element => {
                if (defoultEliment == element.feeder_name) {
                    setTimeout(() => {
                        setSelectIndex(data?.indexOf(element));
                    }, 100);
                }
            });
        }
    }, defoultVaule, defoultTitle, data);


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
                    search={true}
                    searchPlaceHolder="Search..."
                    maxHeight={300}
                    onSelect={(selectedItem, index) => { props.onSelectedSevice(selectedItem) }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={PageStyle.dropdown3BtnChildStyle}>
                                <Text style={PageStyle.txtCaption}>{selectedItem ? selectedItem.title ? selectedItem.title : selectedItem.feeder_name : 'Select'}</Text>
                                <IcnGreyDown />
                            </View>
                        );
                    }}

                    renderCustomizedRowChild={(item, index) => {
                        return (
                            <View style={PageStyle.dropdown3RowChildStyle}>
                                {item?.title && <Text style={PageStyle.dropdown3RowTxt}>{item?.title}</Text>}
                                {(item?.feeder_name || item.feeder_code) && <Text style={PageStyle.dropdown3RowTxt}>{item?.feeder_name + " - " + item?.feeder_code}</Text>}
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default React.memo(SingleDropdownList);