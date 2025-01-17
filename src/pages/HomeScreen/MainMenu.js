import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from '../../core/theme';

const icons = [
  {
    name: "Audit",
    color: "green",
    icon: "newspaper-outline",
    screen: "AuditScreen",
  },
  {
    name: "History",
    color: "blue",
    icon: "albums-outline",
    screen: "HistoryScreen",
  },
  {
    name: "Monitoring",
    color: "red",
    icon: "speedometer-outline",
    screen: "ComingSoonScreen",
  },
  {
    name: "Report",
    color: "purple",
    icon: "stats-chart-outline",
    screen: "ComingSoonScreen",
  },
];

export default function MainMenu() {
  const navigation = useNavigation();

  return (
    <View>
        <Text style={styles.heading}>Main Menu</Text>
        <FlatList
          data={icons}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container} onPress={() => navigation.push(item.screen, {
                menu: item.name,
            })}>
                <View style={styles.iconContainer}>
                    <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={{ marginTop: 8}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 12
  },
  iconContainer: {
    backgroundColor: theme.colors.elevation.level5,
    padding: 16,
    borderRadius: 32,
  },
});
