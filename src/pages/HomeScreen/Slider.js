import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const sliders = [
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexen_JC_JwH_Pum0EgkGKU1NQl_1Et_rT9A&s",
  },
  {
    imageUrl: "https://www.bee.id/wp-content/uploads/2024/08/5-sep-gambar-laporan-audit.jpg",
  },
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
              <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
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
    width: 270,
    height: 150,
    borderRadius: 16,
    objectFit: "cover",
  },
});
