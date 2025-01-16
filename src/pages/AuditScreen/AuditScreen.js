import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import DatePickerInput from "../../components/DatePickerInput";
import PickerInput from "../../components/PickerInput";
import TextInput from "../../components/TextInput";

export default function AuditScreen({ navigation }) {
  const route = useRoute();
  const param = route.params;
  const [title, setTitle] = useState({ value: "", error: "" });
  const [auditArea, setAuditArea] = useState();
  const [auditDate, setAuditDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());

  const auditAreas = [
    { label: "Toko", value: "toko" },
    { label: "Pasar", value: "pasar" },
  ];

  return (
    <View style={{ padding: 16, paddingTop: 36 }}>
      {/* Header */}
      <BackButton navigation={navigation} param={param} />

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
            <DatePickerInput
              date={auditDate}
              setDate={setAuditDate}
              errorText=""
            />
        </View>

        <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "semiBold" }}>Close Date</Text>
            <DatePickerInput
              date={closeDate}
              setDate={setCloseDate}
              errorText=""
            />
        </View>

        <Button style={{ marginTop: 20 }} mode="contained" onPress={() => navigation.goBack()}>
            Save
        </Button>
      </View>
    </View>
  );
}
