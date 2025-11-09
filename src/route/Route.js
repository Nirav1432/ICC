import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyDrawerr from "../MyDrawer/Drawer";
import Splash from "../screen/splash/Splash";
import Login from "../screen/login/Login";
import OtpVerify from "../screen/otpverify/OtpVerify";
import Profile from "../screen/profile/Profile";
import Changepassword from "../screen/login/Changepassword";
import MapScreen from "../screen/map/MapScreen";
import HomeScreen from "../screen/homeScreen/HomeScreen";
import ApproverDrawer from "../MyDrawer/ApproverDrawer";
import GeneralAssetDetail from "../screen/dtrGeoTag/generalAssetDetail/GeneralAssetDetail";
import CreateDtrGeoTag from "../screen/dtrGeoTag/dtrGeoTagged/CreateDtrGeoTag";
import SubstationsDetails from "../screen/substations/subStationsDetails/SubStationsDetails";
import FeederForm from "../screen/Feeder/feederForm/FeederForm";
import FeederMain from "../screen/Feeder/feederMain/FeederMain";
import SubstationsAdd from "../screen/substations/subStationsAdd.js/SubstationsAdd";
import FeederAssets from "../screen/Feeder/feederAssets/FeederAssets";
import FeederGeneralAssetOptions from "../screen/Feeder/feederGeneralAssetOptions/FeederGeneralAssetOptions";
import EditSubstationsGeoTaggedCapturePhoto from "../screen/substations/editSubstationsGeoTaggedCapturePhoto/EditSubstationsGeoTaggedCapturePhoto";
import EditeFeederGeneralAssetOptions from "../screen/Feeder/feederGeneralAssetOptions/EditeFeederGeneralAssetOptions";
import EditFeederAssets from "../screen/Feeder/feederAssets/EditFeederAssets";
import EditGeneralAssetDetail from "../screen/dtrGeoTag/editGeneralAssetDetail/EditGeneralAssetDetail";
import EditSubstationsDetails from "../screen/substations/editSubStationsDetails/EditSubStationsDetails";
import EditSubstationsAdd from "../screen/substations/editSubStationsAdd/EditSubstationsAdd";
import DtrViewMoreScreen from "../screen/dtrGeoTag/dtrViewMore/DtrViewMoreScreen";
import ApprovalHomeScreen from "../screen/Approval/ApprovalHomeScreen";
import ApprovarRDSSdashboard from "../screen/Approval/ApprovarRDSSdashboard";
import FeederViewMoreScreen from "../screen/Feeder/FeederMoreView/FeederViewMoreScreen";
import SubstationViewMoreScreen from "../screen/substations/substationViewMore/SubstationViewMoreScreen";
import SubstationsDetailsScreen from "../screen/Approval/SubstationsDetailsScreen";
import DDRFeederDetailsScreen from "../screen/Approval/DDRFeederDetailsScreen";
import DtrDetailsScreen from "../screen/Approval/DtrDetailsScreen";
import ApprovarProfile from "../screen/Approval/ApprovarProfile";
import UserSubstationsDetailsScreen from "../screen/substations/UserSubstationsDetailsScreen";
import UserFeederDetailsScreen from "../screen/Feeder/UserFeederDetailsScreen";
import UserDTRDetailsScreen from "../screen/dtrGeoTag/UserDTRDetailsScreen";
import HistoryScreen from "../screen/history/HistoryScreen";
import ApprovarMapScreen from "../screen/Approval/ApprovarMapScreen";
import RDSSdashboard from "../screen/rdss/RDSSdashboard";
import SubstationsList from "../screen/substations/substationsHome/SubstationsList";
import CreateSubstationsGeoTag from "../screen/substations/subStationsGeoTagged/CreateSubstationsGeoTag";
import HouseholdsListScreen from "../screen/households/HouseholdsListScreen";
import OtherListScreen from "../screen/other/OtherListScreen";
import OtherGeotagScreen from "../screen/other/OtherGeotagScreen";
import OtherGeotagFormScreen from "../screen/other/OtherGeotagFormScreen";
import FeederDdeDetailsDetailsScreen from "../screen/Feeder/FeederDdeDetailsDetailsScreen";
import DDRFeederListScreen from "../screen/Approval/DDRFeederListScreen";
import HouseholdsGeotagScreen from "../screen/households/HouseholdsGeotagScreen";
import HouseholdsCreateGeotagScreen from "../screen/households/HouseholdsCreateGeotagScreen";
import OffLineHomeScreen from "../screen/OffLine/OffLineHomeScreen";
import OffLineCreateDtrGeoTag from "../screen/OffLine/OffLineCreateDtrGeoTag";
import OffLineGeneralAssetDetail from "../screen/OffLine/OffLineGeneralAssetDetail";
import OffLineCreateSubstationGeoTag from "../screen/OffLine/OffLineCreateSubstationGeoTag";
import OffLineSubstationGeneralAssetDetail from "../screen/OffLine/OffLineSubstationGeneralAssetDetail";
import OffLineSubstationSaveGeoTagList from "../screen/OffLine/OfflineSubstationSaveGeoTagList";
import OffLineSaveDtrGeoTagList from "../screen/OffLine/OffLineSaveDtrGeoTagList";
import OffLineSubstationList from "../screen/OffLine/OffLineSubstationList";
import OffLineDtrList from "../screen/OffLine/OffLineDtrList";
import OffLineFeederList from "../screen/OffLine/OffLineFeederList";
import OffLineCreateFeederGeoTag from "../screen/OffLine/OffLineCreateFeederGeoTag";
import OffLineAddFeederGeneralAssetDetailFirstOption from "../screen/OffLine/OffLineAddFeederGeneralAssetDetailFirstOption";
import OffLineFeederSaveGeoTagList from "../screen/OffLine/OffLineFeederSaveGeoTagList";

// // Other by Khasiya Sagar. done
import OffLineFeederGeneralAssetDetail from "../screen/OffLine/OffLineFeederGeneralAssetDetail";
import OffLinedownlodDetailsScreen from "../screen/OffLine/OffLinedownlodDetailsScreen"

import FeederViewMoreAssetScreen from "../screen/Feeder/FeederMoreView/FeederViewMoreAssetScreen";
import DDRFeederInnerDetailsScreen from "../screen/Approval/DDRFeederInnerDetailsScreen";
import FeederDdeInnerDetailsScreen from "../screen/Feeder/FeederDdeInnerDetailsScreen";
import OtherCreateGeotagScreen from "../screen/other/OtherCreateGeotagScreen";
import OtherViewMoreScreen from "../screen/other/OtherViewMoreScreen";
import EditOtherGeotagScreen from "../screen/other/EditOtherGeotagScreen";
import EditOtherGeotagFormScreen from "../screen/other/EditOtherGeotagFormScreen";
import DdeOtherDetailsScreen from "../screen/other/DdeOtherDetailsScreen";
import DDROtherDetailsScreen from "../screen/Approval/DDROtherDetailsScreen";
import OffLineOthersList from "../screen/OffLine/OffLineOthersList";
import OffLineCreateOthersGeoTag from "../screen/OffLine/OffLineCreateOthersGeoTag";
import OffLineOthersGeotag from "../screen/OffLine/OffLineOthersGeotag";
import OffLineSaveOthersGeoTagList from "../screen/OffLine/OffLineSaveOthersGeoTagList";
import OffLineOthersGeotagSaveScreen from "../screen/OffLine/OffLineOthersGeotagSaveScreen";
import OffLineOtherGeotagFormScreen from "../screen/OffLine/OffLineOtherGeotagFormScreen";
import SubstationsGeneralAssetScreen from "../screen/substations/SubstationsGeneralAssetScreen";
import OffLineSubstationsGeneralAssetScreen from "../screen/OffLine/OffLineSubstationsGeneralAssetScreen";
import OldDataHomeScreen from "../screen/oldData/OldDataHomeScreen";
import OldSubstationsList from "../screen/oldData/OldSubstationsList";
import OldCreateSubstationsGeoTag from "../screen/oldData/OldCreateSubstationsGeoTag";
import OldSubstationGoetagSubmiteScreen from "../screen/oldData/OldSubstationGoetagSubmiteScreen";
import OldSubstationGoetagFormScreen from "../screen/oldData/OldSubstationGoetagFormScreen";
import OldDtrGeoTagList from "../screen/oldData/OldDtrGeoTagList";
import OldCreateDtrGeoTag from "../screen/oldData/OldCreateDtrGeoTag";
import OldDTRGeneralAssetDetailOne from "../screen/oldData/OldDTRGeneralAssetDetailOne";
import OldLineGeneralAssetDetailTwo from "../screen/oldData/OldLineGeneralAssetDetailTwo";
import OldLineGeneralAssetDetailThree from "../screen/oldData/OldLineGeneralAssetDetailThree";
import DtrGeoGagList from "../screen/dtrGeoTag/dtrGeo2/DtrGeoGagList";
import OldFeederListScreen from "../screen/oldData/OldFeederListScreen";
import OldCreateFeederGeotag from "../screen/oldData/OldCreateFeederGeotag";
import OldFeederAssetsScreen from "../screen/oldData/OldFeederAssetsScreen";
import OffLineGeneralAssetDetailOne from "../screen/OffLine/OfflineGeneralAssetDetailOne";
import OffLineGeneralAssetDetailTwo from "../screen/OffLine/OfflineGeneralAssetDetailTwo";
import OffLineGeneralAssetDetailThree from "../screen/OffLine/OfflineGeneralAssetDetailThree";
//-------------------------------------------------------------------------------------------------------///

import { enableScreens } from 'react-native-screens';
import ContactUs from "../screen/contactUs/ContactUs";
import DeleteAccount from "../screen/contactUs/DeleteAccount";
enableScreens();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function SplashRoot() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
}

function LoginRoot() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="VerifyOTP" component={OtpVerify} />
    </Stack.Navigator>
  );
}

function HomeRoot() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, animation: "none" }} initialRouteName="HomeScreen">

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RDSSdashboard" component={RDSSdashboard} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="OffLinedownlodDetailsScreen" component={OffLinedownlodDetailsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />

      <Stack.Screen name="DtrGeoGagList" component={DtrGeoGagList} />
      <Stack.Screen name="CreateDtrGeoTag" component={CreateDtrGeoTag} />
      <Stack.Screen name="GeneralAssetDetail" component={GeneralAssetDetail} />
      <Stack.Screen name="EditGeneralAssetDetail" component={EditGeneralAssetDetail} />
      <Stack.Screen name="UserDTRDetailsScreen" component={UserDTRDetailsScreen} />
      <Stack.Screen name="DtrViewMoreScreen" component={DtrViewMoreScreen} />

      <Stack.Screen name="OffLineSaveDtrGeoTagList" component={OffLineSaveDtrGeoTagList} />
      <Stack.Screen name="OffLineGeneralAssetDetailOne" component={OffLineGeneralAssetDetailOne} />
      <Stack.Screen name="OffLineGeneralAssetDetailTwo" component={OffLineGeneralAssetDetailTwo} />
      <Stack.Screen name="OffLineGeneralAssetDetailThree" component={OffLineGeneralAssetDetailThree} />

      <Stack.Screen name="FeederMain" component={FeederMain} />
      <Stack.Screen name="FeederForm" component={FeederForm} />
      <Stack.Screen name="FeederViewMoreScreen" component={FeederViewMoreScreen} />
      <Stack.Screen name="FeederGeneralAssetOptions" component={FeederGeneralAssetOptions} />
      <Stack.Screen name="EditeFeederGeneralAssetOptions" component={EditeFeederGeneralAssetOptions} />
      <Stack.Screen name="FeederAssets" component={FeederAssets} />
      <Stack.Screen name="EditFeederAssets" component={EditFeederAssets} />
      <Stack.Screen name="FeederViewMoreAssetScreen" component={FeederViewMoreAssetScreen} />
      <Stack.Screen name="UserFeederDetailsScreen" component={UserFeederDetailsScreen} />
      <Stack.Screen name="FeederDdeInnerDetailsScreen" component={FeederDdeInnerDetailsScreen} />

      <Stack.Screen name="OffLineFeederSaveGeoTagList" component={OffLineFeederSaveGeoTagList} />
      <Stack.Screen name="OffLineAddFeederGeneralAssetDetailFirstOption" component={OffLineAddFeederGeneralAssetDetailFirstOption} />
      <Stack.Screen name="FeederDdeDetailsDetailsScreen" component={FeederDdeDetailsDetailsScreen} />

      {/* ----------------------- */}
      <Stack.Screen name="SubstationsList" component={SubstationsList} />
      <Stack.Screen name="CreateSubstationsGeoTag" component={CreateSubstationsGeoTag} />
      <Stack.Screen name="SubstationsGeneralAssetScreen" component={SubstationsGeneralAssetScreen} />
      <Stack.Screen name="SubstationsDetails" component={SubstationsDetails} />
      <Stack.Screen name="SubstationsAdd" component={SubstationsAdd} />
      <Stack.Screen name="EditSubstationsGeoTaggedCapturePhoto" component={EditSubstationsGeoTaggedCapturePhoto} />
      <Stack.Screen name="EditSubstationsDetails" component={EditSubstationsDetails} />
      <Stack.Screen name="EditSubstationsAdd" component={EditSubstationsAdd} />

      <Stack.Screen name="UserSubstationsDetailsScreen" component={UserSubstationsDetailsScreen} />
      <Stack.Screen name="OffLineSubstationSaveGeoTagList" component={OffLineSubstationSaveGeoTagList} />
      <Stack.Screen name="OffLineSubstationsGeneralAssetScreen" component={OffLineSubstationsGeneralAssetScreen} />
      <Stack.Screen name="SubstationViewMoreScreen" component={SubstationViewMoreScreen} />

      <Stack.Screen name="OtherListScreen" component={OtherListScreen} />
      <Stack.Screen name="OtherCreateGeotagScreen" component={OtherCreateGeotagScreen} />
      <Stack.Screen name="OtherGeotagScreen" component={OtherGeotagScreen} />
      <Stack.Screen name="OtherGeotagFormScreen" component={OtherGeotagFormScreen} />
      <Stack.Screen name="EditOtherGeotagScreen" component={EditOtherGeotagScreen} />
      <Stack.Screen name="EditOtherGeotagFormScreen" component={EditOtherGeotagFormScreen} />
      <Stack.Screen name="OtherViewMoreScreen" component={OtherViewMoreScreen} />
      <Stack.Screen name="DdeOtherDetailsScreen" component={DdeOtherDetailsScreen} />
      <Stack.Screen name="OffLineSaveOthersGeoTagList" component={OffLineSaveOthersGeoTagList} />
      <Stack.Screen name="OffLineOthersGeotagSaveScreen" component={OffLineOthersGeotagSaveScreen} />
      <Stack.Screen name="OffLineOtherGeotagFormScreen" component={OffLineOtherGeotagFormScreen} />

      <Stack.Screen name="HouseholdsListScreen" component={HouseholdsListScreen} />
      <Stack.Screen name="HouseholdsCreateGeotagScreen" component={HouseholdsCreateGeotagScreen} />
      <Stack.Screen name="HouseholdsGeotagScreen" component={HouseholdsGeotagScreen} />

      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Changepassword" component={Changepassword} />

      {/* {/----------------------------------FOR OLD DATA MANAGEMENT----------------------------------/} */}

      <Stack.Screen name="OldDataHomeScreen" component={OldDataHomeScreen} />

      <Stack.Screen name="OldSubstationsList" component={OldSubstationsList} />
      <Stack.Screen name="OldCreateSubstationsGeoTag" component={OldCreateSubstationsGeoTag} />
      <Stack.Screen name="OldSubstationGoetagSubmiteScreen" component={OldSubstationGoetagSubmiteScreen} />
      <Stack.Screen name="OldSubstationGoetagFormScreen" component={OldSubstationGoetagFormScreen} />

      <Stack.Screen name="OldDtrGeoTagList" component={OldDtrGeoTagList} />
      <Stack.Screen name="OldCreateDtrGeoTag" component={OldCreateDtrGeoTag} />
      <Stack.Screen name="OldDTRGeneralAssetDetailOne" component={OldDTRGeneralAssetDetailOne} />
      <Stack.Screen name="OldLineGeneralAssetDetailTwo" component={OldLineGeneralAssetDetailTwo} />
      <Stack.Screen name="OldLineGeneralAssetDetailThree" component={OldLineGeneralAssetDetailThree} />

      <Stack.Screen name="OldFeederListScreen" component={OldFeederListScreen} />
      <Stack.Screen name="OldCreateFeederGeotag" component={OldCreateFeederGeotag} />
      <Stack.Screen name="OldFeederAssetsScreen" component={OldFeederAssetsScreen} />

    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MyDrawerr {...props} />}
      drawerPosition="left"
      screenOptions={{ headerShown: false, drawerType: 'front', animation: 'none', }} >
      <Drawer.Screen name="HomeRoot" component={HomeRoot} options={{ swipeEnabled: true }} />
    </Drawer.Navigator>
  );
}

function Approval() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, animation: "none" }} initialRouteName="ApprovalHomeScreen">
      <Stack.Screen name="ApprovarRDSSdashboard" component={ApprovarRDSSdashboard} />

      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />

      <Stack.Screen name="ApprovalHomeScreen" component={ApprovalHomeScreen} />
      <Stack.Screen name="SubstationsDetailsScreen" component={SubstationsDetailsScreen} />
      <Stack.Screen name="DDRFeederDetailsScreen" component={DDRFeederDetailsScreen} />
      <Stack.Screen name="DDRFeederInnerDetailsScreen" component={DDRFeederInnerDetailsScreen} />
      <Stack.Screen name="DtrDetailsScreen" component={DtrDetailsScreen} />
      <Stack.Screen name="ApprovarProfile" component={ApprovarProfile} />
      <Stack.Screen name="ApprovarMapScreen" component={ApprovarMapScreen} />
      <Stack.Screen name="DDROtherDetailsScreen" component={DDROtherDetailsScreen} />

      {/* // no user screen */}
      <Stack.Screen name="DDRFeederListScreen" component={DDRFeederListScreen} />
    </Stack.Navigator>
  );
}

function ApproverRoot() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ApproverDrawer {...props} />}
      //  drawerPosition="left" screenOptions={{ headerShown: false, drawerStyle: { width: "85%" } }}
      screenOptions={{ headerShown: false, drawerType: 'back', }}
    >
      <Drawer.Screen name="Approval" component={Approval} options={{ swipeEnabled: true }} />
    </Drawer.Navigator>
  );
}

function OffLineRoot() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, animation: "none" }} initialRouteName="OffLineHomeScreen">
      <Stack.Screen name="OffLineHomeScreen" component={OffLineHomeScreen} />

      <Stack.Screen name="OffLineDtrList" component={OffLineDtrList} />
      <Stack.Screen name="OffLineCreateDtrGeoTag" component={OffLineCreateDtrGeoTag} />
      <Stack.Screen name="OffLineGeneralAssetDetail" component={OffLineGeneralAssetDetail} />

      <Stack.Screen name="OffLineSubstationList" component={OffLineSubstationList} />
      <Stack.Screen name="OffLineCreateSubstationGeoTag" component={OffLineCreateSubstationGeoTag} />
      <Stack.Screen name="OffLineSubstationGeneralAssetDetail" component={OffLineSubstationGeneralAssetDetail} />

      <Stack.Screen name="OffLineFeederList" component={OffLineFeederList} />
      <Stack.Screen name="OffLineCreateFeederGeoTag" component={OffLineCreateFeederGeoTag} />
      <Stack.Screen name="OffLineFeederGeneralAssetDetail" component={OffLineFeederGeneralAssetDetail} />

      <Stack.Screen name="OffLineOthersList" component={OffLineOthersList} />
      <Stack.Screen name="OffLineCreateOthersGeoTag" component={OffLineCreateOthersGeoTag} />
      <Stack.Screen name="OffLineOthersGeotag" component={OffLineOthersGeotag} />
    </Stack.Navigator>
  );
}

function ScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SplashRoot"}>
      <Stack.Screen name="SplashRoot" component={SplashRoot} />
      <Stack.Screen name="LoginRoot" component={LoginRoot} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="ApproverRoot" component={ApproverRoot} />
      <Stack.Screen name="OffLineRoot" component={OffLineRoot} />
    </Stack.Navigator>
  );
}

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ScreenStack" component={ScreenStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
