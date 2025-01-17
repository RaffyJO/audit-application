import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CardList from "./CardList";
import HomeScreenHeader from "./HomeScreenHeader";
import MainMenu from "./MainMenu";
import Slider from "./Slider";

export default function HomeScreen({ navigation }) {
  const { id, email, name, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  }

  const user = {
    id,
    email,
    name,
    imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
  };

  const sections = [
    { key: "header", component: <HomeScreenHeader user={user} /> },
    { key: "slider", component: <Slider /> },
    { key: "menu", component: <MainMenu /> },
    { key: "history", component: <CardList /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View style={styles.section}>{item.component}</View>}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
});
