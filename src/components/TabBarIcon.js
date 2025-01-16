import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../core/theme";

export default (props) => {
  return (
    <Ionicons
      name={props.icon}
      style={{ marginBottom: -4 }}
      size={24}
      color={props.focused ? theme.colors.primary : "rgb(143, 155, 179)"}
    />
  );
};