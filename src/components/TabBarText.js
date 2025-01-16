import React from "react";
import { Text } from "react-native";
import { theme } from "../core/theme";

export default (props) => {
  return (
    <Text
      style={{
        fontWeight: "bold",
        marginBottom: 5,
        color: props.focused ? theme.colors.primary : "rgb(143, 155, 179)",
        fontSize: 12,
      }}
    >
      {props.title}
    </Text>
  );
};
