import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import LoseReductionTabStyle from "./LoseReductionTabStyle";
import { loseTabData, tabData } from "../../utils/CardData";

const LoseReductionTab = (props) => {
    const [data, setdata] = useState(loseTabData);
    
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
    <View style={LoseReductionTabStyle.tabView}>
        {
            data.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={()=>handleChangeTab(index)} style={item.selected?LoseReductionTabStyle.selectedTabBtn:LoseReductionTabStyle.tabBtn}>
                        <Text style={item.selected?LoseReductionTabStyle.selectedTabText:LoseReductionTabStyle.tabText}>{item.title}</Text>
                    </TouchableOpacity>
                )
            })
        }
   
    </View>
  );
};

export default LoseReductionTab;
