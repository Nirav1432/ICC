import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import IcnRefresh from "../../assets/svg/icnRefresh";
import { Labels } from "../../utils/Labels";
import PageStyle from "./RandomCaptchaStyle";
import { AppUtil } from "../../utils/AppUtil";

const RandomCaptcha = React.forwardRef((props, ref) => {
  const [isNumberOne, setNumberOne] = React.useState();
  const [isNumberTwo, setNumberTwo] = React.useState();
  const [isNumberThree, setNumberThree] = React.useState();
  const [isNumberFour, setNumberFour] = React.useState();
  const [isNumberFive, setNumberFive] = React.useState();
  const [isNumberSix, setNumberSix] = React.useState();
  const [isEnterCaptcha, setEnterCaptcha] = React.useState("");

  React.useEffect(() => {
    getCaptcha();
  }, [props?.refresh]);

  const getCaptcha = () => {

    let one = AppUtil.generateCaptcha();
    let two = AppUtil.generateCaptcha();
    let three = AppUtil.generateCaptcha();
    let four = AppUtil.generateCaptcha();
    let five = AppUtil.generateCaptcha();
    let six = AppUtil.generateCaptcha();

    props.onAns(one + "" + two + "" + three + "" + four + "" + five + "" + six);

    setNumberOne(one);
    setNumberTwo(two);
    setNumberThree(three);
    setNumberFour(four);
    setNumberFive(five);
    setNumberSix(six);
  };

  return (
    <View style={PageStyle.mainView}>
      <View style={PageStyle.mainInnerView}>
        <Text style={PageStyle.txtCaption1}>{isNumberOne}</Text>
        <Text style={PageStyle.txtCaption2}>{isNumberTwo}</Text>
        <Text style={PageStyle.txtCaption3}>{isNumberThree}</Text>
        <Text style={PageStyle.txtCaption4}>{isNumberFour}</Text>
        <Text style={PageStyle.txtCaption5}>{isNumberFive}</Text>
        <Text style={PageStyle.txtCaption6}>{isNumberSix}</Text>
      </View>

      <TextInput
        maxLength={6}
        placeholder={Labels.entercaptcha}
        style={PageStyle.inputText}
        value={isEnterCaptcha}
        onChangeText={(val) => {
          setEnterCaptcha(val);
          props.onEnterCaptcha(val);
        }}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.returnKeyType}
        ref={ref}
      />

      <TouchableOpacity style={PageStyle.btnView} onPress={getCaptcha}>
        <IcnRefresh />
      </TouchableOpacity>
    </View>
  );
});

export default React.memo(RandomCaptcha);
