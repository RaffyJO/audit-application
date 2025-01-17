import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import DatePickerInput from "../../components/DatePickerInput";
import PickerInput from "../../components/PickerInput";
import TextInput from "../../components/TextInput";
import { updateAudit } from "../../services/AuditService";
import { parseDateToCustomFormat } from "../../utils/dateFormat";

export default function EditAuditScreen({ navigation }) {
  const route = useRoute();
  const audit = route.params?.audit;
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

    console.log("auditDate", auditDate);
    console.log("closeDate", closeDate);
    const data = {
      title: title.value,
      area: auditArea,
      start_date: auditDate.toISOString(),
      close_date: closeDate.toISOString(),
    };

    try {
      setLoading(true);
      await updateAudit(token, audit.id, data);
      Alert.alert("Success", "Audit updated successfully");
      navigation.goBack();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update audit";
      Alert.alert("Error", errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Received audit data:", audit);
    if (audit) {
      const startDate = parseDateToCustomFormat(audit.start_date);
      const closeDate = parseDateToCustomFormat(audit.close_date);
    
      setTitle({ value: audit.title, error: "" });
      setAuditArea(audit.area);
      setAuditDate(new Date(startDate));
      setCloseDate(new Date(closeDate));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} param={{ menu: "Edit Audit" }} />

      <View>
        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Audit Title</Text>
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
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Audit Area</Text>
          <PickerInput
            label="Audit Area"
            selectedValue={auditArea}
            onValueChange={(itemValue) => setAuditArea(itemValue)}
            items={auditAreas.map((area) => ({ ...area, key: area.value }))}
          />
        </View>

        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Audit Date</Text>
          <DatePickerInput date={auditDate} setDate={setAuditDate} errorText="" />
        </View>

        <View style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Close Date</Text>
          <DatePickerInput date={closeDate} setDate={setCloseDate} errorText="" />
        </View>

        <Button style={{ marginTop: 20 }} mode="contained" onPress={handleSave} loading={loading}>
          {loading ? "Updating..." : "Update"}
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
