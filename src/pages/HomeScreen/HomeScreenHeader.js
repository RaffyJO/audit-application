import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../core/theme";

export default function HomeScreenHeader({ user }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        <View>
          <Text style={styles.text}>Welcome Back,</Text>
          <Text style={styles.text}>{user?.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: theme.colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        gap: 12,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    text: {
        color: theme.colors.onPrimary,
        fontSize: 16,
        fontWeight: "500",
    },
});
