import React, { useState } from "react";
import Route from "./src/route/Route";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import Loader from "./src/components/Loader";
import { Component } from "react";
import Geolocation from '@react-native-community/geolocation';

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

var self;
export const onLoading = (status) => {
  self.setState({ isLoading: status });
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentDidMount() {
    self = this;
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: "whenInUse",
      locationProvider: "auto"
    });
   
  }
  render() {
    return (
      <>
        <Route />
        <Toast />
        {this.state.isLoading && <Loader />}
      </>
    );
  }
}