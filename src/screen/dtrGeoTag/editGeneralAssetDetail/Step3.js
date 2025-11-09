import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import GeneralAssetDetailStyle from "./EditGeneralAssetDetailStyle";
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

var _remark = "";
const Step3 = ({ handleButtonPress, data, feederList, item, substationList, selectedDistricts }) => {

  const [isExistingScheme, setExistingScheme] = React.useState(null);
  const [isKvFidderName, setKvFidderName] = React.useState(null);
  const [isRemarkVisible, setRemarkVisible] = React.useState(false);

  const [isFeederNameList, setFeederNameList] = React.useState(null);

  const [isSelectSubstation, setSelectSubstation] = React.useState(null);
  const [isFeederList, setFeederList] = React.useState([]);


  useEffect(() => {
    setExistingScheme(item.dtr_details.if_existing_mention_scheme);
    setTimeout(() => {
      onGetFeederList({"title": item?.dtr_details?.substaion_value, "value": item?.dtr_details?.substaion_value});
      onGetListData({"id": item?.dtr_details?.feeder_id_is_erected});
    }, 500);

  }, []);


  const onGetFeederList = (item) => {
  
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

  const onSubmit = () => {

    setRemarkVisible(false)
    if (isExistingScheme == null) {
      Alert.alert("Alert", "Please add Mention the scheme")
      return
    }

    handleButtonPress({
      "if_existing_mention_scheme": isExistingScheme?.id ? isExistingScheme?.id : isExistingScheme,
      "feeder_name_on_which_dtr_is_erected": isKvFidderName?.feeder_name,
      "feeder_id_is_erected": isKvFidderName?.id,
      "feeder_code_on_which_dtr_is_erected": isFeederNameList?.feeder_code,
      "scheme_11_kV_line": isFeederNameList?.scheme_of_11_kv_line,
      "emanating_ss_name": isFeederNameList?.substation_name,
      "emanating_ss_code": isFeederNameList?.substation_code,
      "scheme_of_emanating_ss": isFeederNameList?.scheme_of_emanating_ss,
      "emanating_ss_village_name": isFeederNameList?.ss_village_name,
      "emanating_ss_census_code": isFeederNameList?.ss_village_census_code,
      "remark": _remark
    })
  }

  return (
    <>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={"If existing, mention the scheme*"} defoultVaule={item?.dtr_details?.if_existing_mention_scheme} data={data?.the_schemes} onSelectedSevice={(value) => setExistingScheme(value)} />
      </View>
      {/* <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={"11 kV Feeder Name on which DTR is Erected"} defoultEliment={item?.dtr_details["11_feeder_name_on_which_dtr_is_erected"]} data={feederList} onSelectedSevice={(item) => onGetListData(item)} />
      </View> */}


      <View style={GeneralAssetDetailStyle.marginTop}>
        <SingleDropdownList title={Labels.SelectFilterbySubstationName} defoultTitle={item?.dtr_details?.substaion_title} data={substationList} onSelectedSevice={(item) => onGetFeederList(item)} />
      </View>
      {
        isFeederList.length > 0 &&
        <View style={GeneralAssetDetailStyle.marginTop}>
          <SingleDropdownList title={"11 kV Feeder Name on which DTR is Erected"} defoultVaule={item?.dtr_details?.feeder_id_is_erected} data={isFeederList} onSelectedSevice={(item) => onGetListData(item)} />
        </View>
      }

      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"11 kV Feeder code on which DTR is Erected"} value={isFeederNameList?.feeder_code} />
      </View>

      {/* <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Scheme of 11 kV Line"} value={isFeederNameList?.scheme_of_11_kv_line} />
      </View> */}
      {/* <View style={GeneralAssetDetailStyle.marginTop}>
        <FullDropDown title={"Scheme of 11 kV Line"} />
      </View> */}

      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Emanating SS Name"} value={isFeederNameList?.substation_name} />
      </View>
      {/* <View style={GeneralAssetDetailStyle.marginTop}>
        <FullDropDown title={"Emanating SS Name"} />
      </View> */}
      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Emanating SS Code"} value={isFeederNameList?.substation_code} />
      </View>
      {/* <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Scheme of Emanating SS"} value={isFeederNameList?.scheme_of_emanating_ss} />
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Emanating SS Village Name"} value={isFeederNameList?.ss_village_name} />
      </View>
      <View style={GeneralAssetDetailStyle.marginTop}>
        <DisableView title={"Emanating SS Village Census Code"} value={isFeederNameList?.ss_village_census_code} />
      </View> */}

      <View style={GeneralAssetDetailStyle.marginTop}>
        <SubmitButton
          textColor={Colors.white}
          borderColor={Colors.transparent}
          // handlePress={() => onSubmit()}
          handlePress={() => setRemarkVisible(true)}
          buttonColor={Colors.orange}
          buttonText={Labels.submit}
        />
      </View>

      <RemarkPopup handleClose={() => setRemarkVisible(false)} isVisible={isRemarkVisible} txtRemark={(text) => _remark = text} submit={() => onSubmit()} />
    </>
  );
};

export default Step3;
