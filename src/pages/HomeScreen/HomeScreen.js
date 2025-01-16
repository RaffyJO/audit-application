import React from "react";

import { View } from "react-native";
import { useSelector } from "react-redux";
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

  return (
    <>
      {/* HEADER */}
      <HomeScreenHeader user={user} />
      
      {/* SLIDER */}
      <View style={{ padding: 16 }}>
        <Slider />
      </View>

      {/* MAIN MENU */}
      <View style={{ padding: 16 }}>
        <MainMenu />
      </View>

      {/* <HistoryScreen /> */}
    </>
  );
}
