import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import SearchViewStyle from "./SearchViewStyle";
import IcnSearch from "../../assets/svg/IcnSearch";

const SearchView = (props) => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={SearchViewStyle.mainView}>
      <TextInput
        maxLength={70}
        placeholder="Enter your keyword here"
        placeholderTextColor={"black"}
        style={SearchViewStyle.btnDrop}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          props.onHandleSearch(text)
        }}
      />
      <TouchableOpacity onPress={() => {props.onSearch()}} style={SearchViewStyle.btnSearch}>
        <IcnSearch />
      </TouchableOpacity>
    </View>
  );
};

export default SearchView;
