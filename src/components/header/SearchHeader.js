import React, { useState } from "react";
import { View, TouchableOpacity, Text, StatusBar, TextInput } from "react-native";
import { HeaderStyle } from "./HeaderStyle";
import { Colors } from "../../utils/Colors";
import IcnSearch from "../../assets/svg/IcnSearch";
import IcnFilter from "../../assets/svg/IcnFilter2";

const Header = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress, filterOpen, searchText, changeSearchText, onSearchClick }) => {

    return (
        <>
            <StatusBar backgroundColor={Colors.secondary} />

            <View style={HeaderStyle.container}>
                <TouchableOpacity onPress={onLeftPress} style={HeaderStyle.iconContainer}>
                    <View>{leftIcon}</View>
                </TouchableOpacity>

                <Text style={HeaderStyle.title}>{title}</Text>

                <TouchableOpacity onPress={onRightPress} style={HeaderStyle.iconContainer}>
                    <View>{rightIcon}</View>
                </TouchableOpacity>
            </View>

            <View style={HeaderStyle.searchView}>
                <View style={HeaderStyle.innerMainView}>
                    <TextInput
                    maxLength={70}
                        placeholder="Enter your keyword here"
                        placeholderTextColor={"black"}
                        style={HeaderStyle.search}
                        value={searchText}
                        onChangeText={(text) => { changeSearchText(text) }}
                    />
                    <TouchableOpacity style={HeaderStyle.btnSearch} onPress={() => onSearchClick()}>
                        <IcnSearch />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={filterOpen} style={HeaderStyle.filterView}>
                    <IcnFilter />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Header;
