import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, } from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

var _data = [];
const SingleDropdownList2 = (props) => {

    const dropdownRef = React.useRef({});
    // _data = props.data;

    const [isSelectIndex, setSelectIndex] = useState(-1);

    let { oldData, defoultVaule, data } = props;
    React.useEffect(() => {
        if (oldData != null && data != null && data.length && data.length > 0) {
            setSelectIndex(data.indexOf(oldData))
        }

        if (defoultVaule && data.length > 0) {
            data.forEach(element => {
                if (defoultVaule == element.value) {
                    setTimeout(() => {
                        setSelectIndex(data?.indexOf(element));
                    }, 200);
                }
            });
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

                {_data.length > 0 ?
                    <SelectDropdown
                        data={props.data}
                        ref={dropdownRef}
                        buttonStyle={PageStyle.btnView}
                        rowStyle={PageStyle.dropdown3RowStyle}
                        defaultValueByIndex={isSelectIndex}
                        search={_data}
                        searchPlaceHolder="Search..."
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
                    :
                    <TouchableOpacity style={PageStyle.btnView1} onPress={() => { Alert.alert("Alert", "No data found")  }}>
                        <View style={PageStyle.dropdown3BtnChildStyle1}>
                            <Text style={PageStyle.txtCaption}>Select</Text>
                            <IcnGreyDown />
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

export default React.memo(SingleDropdownList2);