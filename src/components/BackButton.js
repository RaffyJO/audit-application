import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function BackButton({ navigation, param }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 4 }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ marginLeft: 8, fontSize: 20, fontWeight: "bold" }}>{param.menu}</Text>
    </View>
  );
}