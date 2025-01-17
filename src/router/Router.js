import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import TabBarIcon from "../components/TabBarIcon";
import TabBarText from "../components/TabBarText";
import { setToken } from "../store/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  AuditScreen,
  ComingSoonScreen,
  EditAuditScreen,
  HistoryScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  ResetPasswordScreen,
  StartScreen
} from "../pages";
import { getToken } from "../utils/secureStore";

const Stack = createStackNavigator();
const RouterNavigator = () => {
  // Check token on app startup
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getToken("userToken");
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
    };
    checkToken();
  }, [dispatch]);

  return (
    <Stack.Navigator
      initialRouteName={token ? "MainTabs" : "StartScreen"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AuditScreen" component={AuditScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditAuditScreen" component={EditAuditScreen} />
      <Stack.Screen name="ComingSoonScreen" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
};

export default RouterNavigator;

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "#c0c0c0",
          backgroundColor: "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};