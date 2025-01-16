import React from "react";

import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome to the Audit Management App</Header>
      <Paragraph>
        A comprehensive tool for managing audits, providing secure access to
        your audit data, and supporting a seamless workflow for auditors.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Create an account
      </Button>
    </Background>
  );
}
