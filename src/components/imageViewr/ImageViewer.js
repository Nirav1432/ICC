import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ImageView from "react-native-image-viewing";
import { image_base_url } from "../../service/appConfig";

const ImageViewer = ({images, isVisible, handleClose, index}) => {

  return (
    <ImageView
      images={images}
      imageIndex={index}
      visible={isVisible}
      onRequestClose={() => handleClose()}
    />
  );
};

export default ImageViewer;
