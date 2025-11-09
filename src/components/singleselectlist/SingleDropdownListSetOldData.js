import React, {useState} from "react";
import { View, Text } from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

const SingleDropdownListSetOldData = (props) => {

    const dropdownRef = React.useRef({});

    const [isSelectIndex, setSelectIndex] = useState(-1);

    React.useEffect(() => {
        let { oldIndex } = props;
        setSelectIndex(oldIndex)
    }, []);

    React.useEffect(()=>{
        let { defoultVaule , data} = props;

        if (defoultVaule && data.length > 0) {
            data.forEach(element => {
                if (defoultVaule == element.title) {
                    setTimeout(() => {
                        setSelectIndex(data?.indexOf(element));
                    }, 200);
                }
            });
        }
    })
    
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
                    ref={dropdownRef}
                    buttonStyle={PageStyle.btnView}
                    rowStyle={PageStyle.dropdown3RowStyle}
                    defaultValueByIndex={isSelectIndex}
                    onSelect={(selectedItem, index) => {
                        props.onSelectedSevice(selectedItem);
                    }}
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

export default React.memo(SingleDropdownListSetOldData);