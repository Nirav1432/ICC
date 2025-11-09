import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import UserPassInputStyles from "./UserPassInputStyles";
import IcnMail from "../../../assets/svg/IcnMail";
import IcnLock from "../../../assets/svg/IcnLock";
import IcnEyes from "../../../assets/svg/IcnEyes";

const ConfirmPassInput = React.forwardRef((props, ref) => {
    return (
        <View>
            <Text style={UserPassInputStyles.inputText}>{props.title}</Text>
            <View style={UserPassInputStyles.inputView}>
                {<IcnLock />}

                <TextInput
                maxLength={70}
                    value={props.value}
                    style={UserPassInputStyles.input}
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.secureTextEntry}
                    onSubmitEditing={props.onSubmitEditing}
                    returnKeyType={props.returnKeyType}
                    ref={ref}
                />
                {props.isPass && (
                    <TouchableOpacity onPress={props.onTogglePasswordVisibility}>
                        <IcnEyes />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

export default React.memo(ConfirmPassInput);
