import React, { useState } from "react";

import { Alert } from "react-native";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";
import { emailValidator } from "../../helpers/emailValidator";
import { resetPassword as apiResetPassword } from "../../services/AuthService";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoading(true);
    try {
      await apiResetPassword(email.value);
      navigation.navigate("LoginScreen");
    } catch (error) {
      Alert.alert("Reset Password Failed", error.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Reset your password!</Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with the reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Reset Password
      </Button>
    </Background>
  );
}
