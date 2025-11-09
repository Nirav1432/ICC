import { Dimensions } from "react-native";
import * as geolib from 'geolib';

export const AppUtil = {

  getWP: (percentage) => {
    const { width: viewportWidth } = Dimensions.get("window");
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  },

  getHP: (percentage) => {
    const { height: viewportHeight } = Dimensions.get("window");
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
  },
  getDistance: (latitude1: String, longitude1: String, latitude2: String, longitude2: String) => {
    let distance = geolib.getPreciseDistance(
      { latitude: latitude1, longitude: longitude1 },
      { latitude: latitude2, longitude: longitude2 }
    );
    return distance;
  },

  getFunctionValueinArr: (response) => {
    var arr = [];
    for (let i = 0; i < response.rows.length; i++) {
      let obj = JSON.parse(response.rows.item(i).list);
      obj.id = response.rows.item(i).id
      arr.push(obj);
    }

    return arr;
  },

  generateUniqueKey: () => {

    var _chare: Array = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var _num = ["1", "2", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    const number1 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    const number2 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

    const char1 = _chare[Math.floor(Math.random() * _chare.length)];
    const char2 = _chare[Math.floor(Math.random() * _chare.length)];
    const char3 = _chare[Math.floor(Math.random() * _chare.length)];

    return "_" + char1 + char2 + char3 + number1 + number2;
  },

  generateCaptcha: () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    return chars[Math.floor(Math.random() * chars.length)];
  },
  getTextSize: () => {
    return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  },

  getValidatePassword: (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
};

export const DrawerData = [
  { name: "Home", isSelected: false },
  { name: "Dashboard", isSelected: false },
  { name: "Revamped Distribution Sector Scheme (RDSS)", isSelected: false },
  { name: "Energy Accounting", isSelected: false },
  { name: "DISCOM Integrated Rating", isSelected: false },
  { name: "DISCOM Consumer Service Rating", isSelected: false },
  { name: "Power Utilities Performance", isSelected: false },
  { name: "Key Regulatory Parameters", isSelected: false },
  { name: "Additional GSDP Borrowing Space", isSelected: false },
  { name: "PRAAPTI", isSelected: false },
  { name: "Overview of SERC", isSelected: false },
  { name: "About Us", isSelected: false },
  { name: "Settings", isSelected: false },
  { name: "Contact us", isSelected: false },
];

export const boxTitles = {
  title1: "Sanctioned (nos.)",
  title2: "Awarded (nos.)",
  title3: "Surveyed (nos.)",
  title4: "Physical Progress (nos.)",
};
export const PhotoQualityOptions = { mediaType: "photo", quality: 0.5, maxWidth: 800, maxHeight: 800, saveToPhotos: false, includeBase64: false };
