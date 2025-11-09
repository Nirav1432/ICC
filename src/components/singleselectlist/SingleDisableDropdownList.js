import React from "react";
import { View, Text } from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SingleDisableDropdownList = (props) => {
    let { defoultTitle, data } = props;
    const [isSelectIndex, setSelectIndex] = React.useState(-1);
    const [isDisableList, setDisableList] = React.useState([]);

    React.useEffect(() => {
        if (defoultTitle && data.length > 0) {
            data.forEach(element => {
                if (defoultTitle == element.title) {
                    setTimeout(() => {
                        setSelectIndex(data?.indexOf(element));
                    }, 100);
                }
            });
        }
    }, defoultTitle, data);

    React.useEffect(() => {

        if (defoultTitle && data.length > 0) {
            AsyncStorage.getItem("@last_session_asset_id").then((response) => {
                if (response != 'null' && response != null) {
                    const res = JSON.parse(response);
                    const disList = [];
                    data.forEach(element => {
                        if (res.assetsId == element.title) {
                            setTimeout(() => {
                                setSelectIndex(data?.indexOf(element));
                                props.onSelectedSevice(element);
                            }, 100);
                        }
                        else {
                            setTimeout(() => {
                                disList.push(data?.indexOf(element));
                            }, 100);

                        }
                    });
                    setDisableList(disList)
                }
            });
        }

    }, defoultTitle, data);

    onSelecvalue = (selectedItem) => {
        props.onSelectedSevice(selectedItem);
    }

    return (

        <View style={PageStyle.mainView}>

            <View style={PageStyle.dropBtn}>
                <SelectDropdown
                    data={props.data}
                    disabledIndexs={isDisableList}
                    defaultValueByIndex={isSelectIndex}
                    buttonStyle={PageStyle.btnView}
                    rowStyle={PageStyle.dropdown3RowStyle}
                    onSelect={(selectedItem, index) => { onSelecvalue(selectedItem) }}
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
                                <Text style={PageStyle.dropdown3RowTxt}>{item.title ? item.title : item.feeder_name}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default React.memo(SingleDisableDropdownList);