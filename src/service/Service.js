import { Alert } from "react-native";
import { onLoading } from "../../App";
import { BASE_URL, image_base_url } from "./appConfig";
import { Loger } from "../utils/Loger";

export const postAPI = async (endpoint, body) => {

  // Loger.onServerLog("Req", BASE_URL + endpoint, body);

  const url = BASE_URL + endpoint;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // Loger.onServerLog("Res", BASE_URL + endpoint, response);
  return await response.json();
};

export const getAPI = async (endpoint) => {
  const url = BASE_URL + endpoint;
  const response = await fetch(url);
  return await response.json();
};

export const postFormDataAPI = (endpoint, body, success, error) => {
  const url = BASE_URL + endpoint;
  // Loger.onServerLog("Req", url, body);

  fetch(url, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      "cache-control": "no-cache",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // Loger.onServerLog("Res", BASE_URL + endpoint, responseJson);

      return success(responseJson);
    })
    .catch((err) => {
      console.error("eror of catch", err);
      Alert.alert('Alert', 'server is busy. try some time')
      onLoading(false)
      return error(error);
    });


};

export const ImageUploadAPI = (endpoint, body, success, error) => {
  const url = BASE_URL + endpoint;
  Loger.onServerLog("Req", url, body);

  fetch(url, {
    method: "POST",
    headers: {
      Accept: 'application/json', "cache-control": "no-cache",
      //'Content-Type': 'multipart/form-data',
    },
    body: body,
  }).then((response) => response.json()).then((responseJson) => {
    Loger.onServerLog("Res", url, responseJson);
    return success(responseJson);
  }).catch((error) => {
    Loger.onLog("❌ Upload Error:", error);
    Alert.alert('Alert', 'server is busy. try some time')
    onLoading(false)
    return error(error);
  });


};

export const Service = {

  post: (endPoint, data, success, error) => {

    const url = BASE_URL + endPoint;
    Loger.onServerLog("Req", url, data);
    fetch(url, {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      Loger.onServerLog("Res", url, res);
      return success(res)
    }).catch((err) => {
      Loger.onLog("", err);
      return error(err)
    })

  },
}


export const ServiceLogin = {
  post: async (endPoint, data, success, error) => {
    const url = BASE_URL + endPoint;
    Loger.onServerLog("Req", url, data);

    try {
      // ⏳ Timeout (10 सेकंड)
      const response = await Promise.race([
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('RequestTimeout')), 30000)
        ),
      ]);

      const result = await response.json();
      Loger.onServerLog("Res", url, result);
      success(result);
    } catch (err) {
      // ⚠️ Custom error messa
      // ge logic

      Loger.onLog("Error", err);
      let errorMessage = '';

      if (err.message === 'RequestTimeout') {
        errorMessage = 'Server is taking too long to respond. Please try again later.';
      } else if (err.message === 'Network request failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = 'Something went wrong. Please try again later.';
      }

      Loger.onLog("Error", errorMessage);
      Alert.alert('Alert', errorMessage);
      error({ message: errorMessage });
    }
  },
};




