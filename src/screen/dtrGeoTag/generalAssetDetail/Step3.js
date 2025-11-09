import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import GeneralAssetDetailStyle from "./GeneralAssetDetailStyle";
import FullDropDown from "../../../components/fullDropDown/FullDropDown";
import DisableView from "../../../components/disableView/DisableView";
import { Colors } from "../../../utils/Colors";
import { Labels } from "../../../utils/Labels";
import SubmitButton from "../../../components/submit button/SubmitButton";
import SingleDropdownList from "../../../components/singleselectlist/SingleDropdownList";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/Endpoints";
import { onLoading } from "../../../../App";
import { showErrorToast } from "../../../components/toastFunc/ToastFunc";
import RemarkPopup from "../../../components/submitRemark/RemarkPopup";
import { AppUtil } from "../../../utils/AppUtil";
import { Fonts } from "../../../utils/Fonts";

var _remark = "";
var _action = "";
const Step3 = ({ handleButtonPress, data, oldData, onChange, substationList, selectedDistricts }) => {

  const [isExistingScheme, setExistingScheme] = React.useState(null);
  const [isKvFidderName, setKvFidderName] = React.useState(null);
  const [isFeederNameList, setFeederNameList] = React.useState(null);
  const [isRemarkVisible, setRemarkVisible] = React.useState(false);
  const [isFeederList, setFeederList] = React.useState([]);
  const [isSelectSubstation, setSelectSubstation] = React.useState(null);

  useEffect(() => {

    if (oldData) {
      data?.the_schemes?.forEach(element => {
        if (oldData?.if_existing_mention_scheme == element.id) {
          setExistingScheme(element);
        }
      });

    }
  }, [oldData]);

  const onGetFeederList = (item) => {

    setFeederList([]);
    setKvFidderName(null);
    setSelectSubstation(item);
    onLoading(true);
    const data = { district_id: JSON.stringify(selectedDistricts), substation_id: item?.value, };

    Service.post(EndPoints.getFeederbydistrict, data, (response) => {
      onLoading(false);
      if (response.resultflag == 1) {

        setFeederList(response?.data);

      } else showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );
  };

  const onGetListData = (item) => {

    setKvFidderName(item);

    onLoading(true);

    Service.post(EndPoints.getFeederDetails, { feeder_id: item.id }, (res) => {
      onLoading(false);

      if (res.resultflag == "1" && res.data)
        setFeederNameList(res.data);
      else
        showErrorToast(res.message);
    },
      (err) => {
        onLoading(false);
      }
    );
  };

  const onChangeItem = (item) => {
    setExistingScheme(item)
    if (item) {
      onChange({
        "if_existing_mention_scheme": isExistingScheme?.id,
        "if_existing_mention_scheme_name": isExistingScheme?.title,
        "substaion_value": isSelectSubstation?.value,
        "substaion_title": isSelectSubstation?.title,
        "feeder_name_on_which_dtr_is_erected": isKvFidderName?.feeder_name,
        "feeder_id_is_erected": isKvFidderName?.id,
        "feeder_code_on_which_dtr_is_erected": isFeederNameList?.feeder_code,
        "scheme_11_kV_line": isFeederNameList?.scheme_of_11_kv_line,
        "emanating_ss_name": isFeederNameList?.substation_name,
        "emanating_ss_code": isFeederNameList?.substation_code,
        "scheme_of_emanating_ss": isFeederNameList?.scheme_of_emanating_ss,
        "emanating_ss_village_name": isFeederNameList?.ss_village_name,
        "emanating_ss_census_code": isFeederNameList?.ss_village_census_code,
      })
    }
  }

  const onSubmit = () => {

    setRemarkVisible(false)

    if (isExistingScheme == null) {
      Alert.alert("Alert", "Please add Mention the scheme")
      return
    }
    else if (isSelectSubstation == null) {
      Alert.alert("Alert", "Please add substation")
      return
    }
    else if (isKvFidderName == null) {
      Alert.alert("Alert", "Please add Feeder")
      return
    }

    handleButtonPress({
      "if_existing_mention_scheme": isExistingScheme?.id,
      "if_existing_mention_scheme_name": isExistingScheme?.title,
      "substaion_value": isSelectSubstation?.value,
      "substaion_title": isSelectSubstation?.title,
      "feeder_name_on_which_dtr_is_erected": isKvFidderName?.feeder_name,
      "feeder_id_is_erected": isKvFidderName?.id,
      "feeder_code_on_which_dtr_is_erected": isFeederNameList?.feeder_code,
      "scheme_11_kV_line": isFeederNameList?.scheme_of_11_kv_line,
      "emanating_ss_name": isFeederNameList?.substation_name,
      "emanating_ss_code": isFeederNameList?.substation_code,
      "scheme_of_emanating_ss": isFeederNameList?.scheme_of_emanating_ss,
      "emanating_ss_village_name": isFeederNameList?.ss_village_name,
      "emanating_ss_census_code": isFeederNameList?.ss_village_census_code,
      "remark": _remark,
      "task": _action,
    })
  }

  return (
    <>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={"If existing, mention the scheme*"} defoultVaule={oldData && oldData?.if_existing_mention_scheme} data={data?.the_schemes} onSelectedSevice={(value) => onChangeItem(value)} />
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={Labels.SelectFilterbySubstationName + "*"} defoultVaule={oldData && oldData?.if_existing_mention_scheme} data={substationList} onSelectedSevice={(item) => onGetFeederList(item)} />
      </View>
      {
        isFeederList.length > 0 &&
        <View style={GeneralAssetDetailStyle.marginTop}>
          <SingleDropdownList title={"11 kV Feeder Name on which DTR is Erected*"} data={isFeederList} onSelectedSevice={(item) => onGetListData(item)} />
        </View>
      }
      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"11 kV Feeder code on which DTR is Erected"} value={isFeederNameList?.feeder_code} />
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Emanating SS Name"} value={isFeederNameList?.substation_name} />
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Emanating SS Code"} value={isFeederNameList?.substation_code} />
      </View>


      {/* <View style={GeneralAssetDetailStyle.marginTop}>
        <SubmitButton
          textColor={Colors.white}
          borderColor={Colors.transparent}
          // handlePress={() => onSubmit()}
          handlePress={() => setRemarkVisible(true)}
          buttonColor={Colors.orange}
          buttonText={Labels.submit}
        />

      </View> */}
      <View style={GeneralAssetDetailStyle.marginTop}>
        <View style={GeneralAssetDetailStyle.twobtn}>
          <TouchableOpacity style={{width: "48%", padding: 12, borderRadius: 10, backgroundColor: Colors.primary, alignItems: "center" }} onPress={() => {_action = "save", setRemarkVisible(true)}}>
            <Text style={{ color: "#fff", fontSize: 14, fontFamily: Fonts.RobotoMedium, }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: "48%", padding: 12, borderRadius: 10, backgroundColor: Colors.primary, alignItems: "center" }} onPress={() => {_action = "submit", setRemarkVisible(true)}}>
            <Text style={{ color: "#fff", fontSize: 14, fontFamily: Fonts.RobotoMedium, }}>Submit</Text>
          </TouchableOpacity>

        </View>
      </View>

      <RemarkPopup handleClose={() => setRemarkVisible(false)} isVisible={isRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubmit()} />
    </>
  );
};

export default Step3;
