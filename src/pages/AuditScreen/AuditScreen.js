import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import DatePickerInput from "../../components/DatePickerInput";
import PickerInput from "../../components/PickerInput";
import TextInput from "../../components/TextInput";
import { createAudit } from "../../services/AuditService";

export default function AuditScreen({ navigation, route }) {
  const [title, setTitle] = useState({ value: "", error: "" });
  const [auditArea, setAuditArea] = useState();
  const [auditDate, setAuditDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.token);

  const auditAreas = [
    { label: "Keuangan", value: "KEUANGAN" },
    { label: "SDM", value: "SDM" },
    { label: "Operasional", value: "OPERASIONAL" },
    { label: "K3", value: "K3" },
  ];

  const handleSave = async () => {
    // Validasi input
    if (!title.value) {
      setTitle({ ...title, error: "Title is required" });
      return;
    }
    if (!auditArea) {
      Alert.alert("Error", "Please select an audit area");
      return;
    }
    if (closeDate < auditDate) {
      Alert.alert("Error", "Close date must be after or the same as the audit date");
      return;
    }

    const data = {
      title: title.value,
      area: auditArea,
      start_date: auditDate.toISOString(),
      close_date: closeDate.toISOString(),
    };

    try {
      setLoading(true);
      await createAudit(token, data);
      Alert.alert("Success", "Audit created successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to create audit");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BackButton navigation={navigation} param={route.params} />

      {/* Content */}
      <View>
        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "semiBold" }}>Audit Title</Text>
          <TextInput
            label="Title"
            returnKeyType="next"
            value={title.value}
            onChangeText={(text) => setTitle({ value: text, error: "" })}
            error={!!title.error}
            errorText={title.error}
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "semiBold" }}>Audit Area</Text>
          <PickerInput
            label="Audit Area"
            selectedValue={auditArea}
            onValueChange={(itemValue) => setAuditArea(itemValue)}
            items={auditAreas}
          />
        </View>

        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "semiBold" }}>Audit Date</Text>
          <DatePickerInput date={auditDate} setDate={setAuditDate} errorText="" />
        </View>

        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "semiBold" }}>Close Date</Text>
          <DatePickerInput date={closeDate} setDate={setCloseDate} errorText="" />
        </View>

        <Button style={{ marginTop: 20 }} mode="contained" onPress={handleSave} loading={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
});
