import React, { useState } from "react";
import { View, Text } from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

const SingleDropdownList1 = (props) => {

    const [isSelectIndex, setSelectIndex] = useState(-1);

    React.useEffect(() => {
        let { oldData, data } = props;

        // if (oldData != null && data.length > 0) {
        if (oldData != null && data != null && data.length && data.length > 0) {
            setSelectIndex(data.indexOf(oldData))
        }
    }, []);

    return (

        <View style={PageStyle.mainView}>

            {props.title &&
                <Text style={[PageStyle.headText, { marginTop: 10 }]}>
                    {props.title}
                </Text>
            }

            <View style={PageStyle.dropBtn}>
                <SelectDropdown
                    data={props.data}
                    buttonStyle={PageStyle.btnView}
                    rowStyle={PageStyle.dropdown3RowStyle}
                    defaultValueByIndex={isSelectIndex}
                    onSelect={(selectedItem, index) => {
                        props.onSelectedSevice(selectedItem);
                    }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={PageStyle.dropdown3BtnChildStyle}>
                                <Text style={PageStyle.txtCaption}>{selectedItem?.name != null ? selectedItem?.name : 'Select'}</Text>
                                <IcnGreyDown />
                            </View>
                        );
                    }}

                    renderCustomizedRowChild={(item, index) => {
                        return (
                            <View style={PageStyle.dropdown3RowChildStyle}>
                                <Text style={PageStyle.dropdown3RowTxt}>{item?.name}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default React.memo(SingleDropdownList1);