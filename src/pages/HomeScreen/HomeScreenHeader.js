import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../core/theme";

export default function HomeScreenHeader({ user }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        <View>
          <Text style={{ color: theme.colors.onPrimary, fontWeight: "500" }}>Welcome,</Text>
          <Text style={{ color: theme.colors.onPrimary, fontSize: 16, fontWeight: "500" }}>{user?.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 32,
        backgroundColor: theme.colors.primary,
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
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
