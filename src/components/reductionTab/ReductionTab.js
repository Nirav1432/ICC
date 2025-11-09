import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ReductionTabStyle from "./ReductionTabStyle";
import { tabData } from "../../utils/CardData";

const ReductionTab = (props) => {
    const [data, setdata] = useState(tabData);
    
    const handleChangeTab = (index) => {
        var temp = [...data];
        temp.map((item, i) => {
            if(i == index){
                item.selected = true;
            }else{
                item.selected = false;
            }
        }
        )
        setdata(temp);
        props.getTab(index);

    }
  return (
    <View style={ReductionTabStyle.tabView}>
        {
            data.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={()=>handleChangeTab(index)} style={item.selected?ReductionTabStyle.selectedTabBtn:ReductionTabStyle.tabBtn}>
                        <Text style={item.selected?ReductionTabStyle.selectedTabText:ReductionTabStyle.tabText}>{item.title}</Text>
                    </TouchableOpacity>
                )
            })
        }
   
    </View>
  );
};

export default ReductionTab;
