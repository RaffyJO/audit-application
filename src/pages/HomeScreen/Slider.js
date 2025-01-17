import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const sliders = [
  require("../../../assets/items/banner-1.jpg"),
  require("../../../assets/items/banner-2.jpg"),
  require("../../../assets/items/banner-3.jpg"),
];

export default function Slider() {
  return (
    <View>
        <Text style={styles.heading}>News</Text>
        <FlatList
          data={sliders}
          horizontal= {true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginRight: 16 }}>
              <Image source={item} style={styles.sliderImage} />
            </View>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 12
  },
  sliderImage: {
    width: 300,
    height: 150,
    borderRadius: 16,
    objectFit: "cover",
  },
});
