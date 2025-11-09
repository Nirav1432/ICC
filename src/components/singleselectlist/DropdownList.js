import React from "react";
import { View, Text} from "react-native";
import PageStyle from "./SingleDropdownListStyle";
import SelectDropdown from 'react-native-select-dropdown';
import IcnGreyDown from "../../assets/svg/IcnGreyDown";

const DropdownList = (props) => {
    let { data, defoutItem } = props;

    const [isSelectIndex, setSelectIndex] = React.useState(-1);

    React.useEffect(() => {
        setTimeout(() => {
            setSelectIndex(data?.indexOf(defoutItem));
        }, 100);
    }, data);


    return (

        <View style={PageStyle.mainView}>

            {props.title &&
                <Text style={PageStyle.headText}>
                    {props.title}
                </Text>
            }
            <View style={PageStyle.dropBtn}>
                <SelectDropdown
                    data={data}
                    defaultValueByIndex={isSelectIndex}
                    buttonStyle={PageStyle.btnView}
                    rowStyle={PageStyle.dropdown3RowStyle}
                    maxHeight={300}

                    onSelect={(selectedItem, index) => { props.onSelectedSevice(selectedItem) }}

                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={PageStyle.dropdown3BtnChildStyle}>
                                <Text style={PageStyle.txtCaption}>{selectedItem ? selectedItem : 'Select'}</Text>
                                <IcnGreyDown />
                            </View>
                        );
                    }}

                    renderCustomizedRowChild={(item, index) => {
                        return (
                            <View style={PageStyle.dropdown3RowChildStyle}>
                                <Text style={PageStyle.dropdown3RowTxt}>{item}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default React.memo(DropdownList);