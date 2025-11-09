import Toast from "react-native-toast-message";

export const showErrorToast = (message) => {
  Toast.show({
    type: "error",
    position: "bottom",
    text1: "Error",
    text2: message,
  });
};

export const showSuccessToast = (message) => {
  Toast.show({
    type: "success",
    position: "bottom",
    text1: message,
  });
};
