import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { useDispatch } from "react-redux";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { nameValidator } from "../../helpers/nameValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { register as apiRegister } from "../../services/AuthService";
import { register } from "../../store/slices/userSlice";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    try {
      const userData = await apiRegister(email.value, password.value, name.value);
      const token = userData.data.access_token;
      dispatch(register(token));
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      Alert.alert("Register Failed", error.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome to the registration page!</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
        loading={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
      <View style={styles.row}>
        <Text>I already have an account! </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
