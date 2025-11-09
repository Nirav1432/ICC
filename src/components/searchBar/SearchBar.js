import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SearchBarStyle } from "./SearchBarStyle";
import IcnSearch from "../../assets/svg/IcnSearch";

export default function SearchBar() {
  return (
    <>
      <View style={SearchBarStyle.searchBar}>
        <TextInput
        maxLength={70}
          placeholder="Enter Your Keyword Here"
          style={SearchBarStyle.searchInput}
          placeholderTextColor="grey"
        />
        <TouchableOpacity style={SearchBarStyle.searchButton}>
          <IcnSearch />
        </TouchableOpacity>
      </View>
    </>
  );
}
