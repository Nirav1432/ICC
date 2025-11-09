import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ModalViewStyle } from "./ModalViewStyle";
import SubmitBtn from "../clogin/commonButton/SubmitBtn";
import EnabledField from "../enabledField/EnabledField";


export default function PoleModalView({ handleClose, isModalVisible, saveObj, poleName, poleType, poleLengh, getPoleName, getPoleType, getPoleLengh }) {

  const [isPoleName, setPoleName] = React.useState("");
  const [isPoleType, setPoleType] = React.useState("");
  const [isPoleLengh, setPoleLengh] = React.useState("");

  React.useEffect(() => {
    setPoleName(poleName);
    setPoleType(poleType);
    setPoleLengh(poleLengh);
  }, [isModalVisible]);

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={ModalViewStyle.container}>
        <View>
          <View style={ModalViewStyle.header}>
            <View style={ModalViewStyle.headerLeft}>
              <Text style={ModalViewStyle.title}>Pole Details</Text>
            </View>
            <View style={ModalViewStyle.headerRight}>
              <TouchableOpacity onPress={handleClose}>
                <Text style={{ color: "black" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={ModalViewStyle.marginTop}>
            <Text style={ModalViewStyle.headerText}>{"Pole Name*"}</Text>
            <TextInput
              value={isPoleName}
              style={ModalViewStyle.inpView}
              onChangeText={(txt) => {setPoleName(txt), getPoleName(txt)}}
            />
          </View> */}
          <View style={ModalViewStyle.marginTop}>
            <Text style={ModalViewStyle.headerText}>{"Pole Type*"}</Text>
            <TextInput
            maxLength={70}
              value={isPoleType}
              style={ModalViewStyle.inpView}
              onChangeText={(txt) => {setPoleType(txt), getPoleType(txt)}}
            />
          </View>
          <View style={ModalViewStyle.marginTop}>
            <Text style={ModalViewStyle.headerText}>{"Pole Length (Meters)*"}</Text>
            <TextInput
            maxLength={70}
              value={isPoleLengh}
              style={ModalViewStyle.inpView}
              keyboardType="numeric"
              onChangeText={(txt) => {setPoleLengh(txt), getPoleLengh(txt)}}
            />
          </View>


          <SubmitBtn title={"Submit"} onPress={saveObj} />
        </View>
      </View>
    </Modal>
  );
}
