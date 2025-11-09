import React, { memo, useRef, useState } from "react";
import { View, ScrollView, Image, Dimensions, StyleSheet, Animated, Text, } from "react-native";

const { width } = Dimensions.get("window");

const CustomImageSlider = () => {
  const images = [
    "https://picsum.photos/id/1011/400/250",
    "https://picsum.photos/id/1012/400/250",
    "https://picsum.photos/id/1013/400/250",
    "https://picsum.photos/id/1014/400/250",
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* <Text style={styles.counterText}>
        {currentIndex + 1}/{images.length}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:80,
    height:80,
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    backgroundColor: "#999",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007BFF",
    width: 12,
  },
  counterText: {
    position: "absolute",
    right: 15,
    bottom: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default memo(CustomImageSlider);
