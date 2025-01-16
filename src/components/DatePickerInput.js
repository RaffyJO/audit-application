import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";

export default function DatePickerInput({ date, setDate, errorText, description }) {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(new Date(currentDate.setSeconds(0, 0)));
  };

  const onChangeTime = (event, selectedTime) => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const updatedDate = new Date(date);
      updatedDate.setHours(hours, minutes);
      setDate(updatedDate);
    }
    setShowTime(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Date Picker Button */}
        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={[styles.input, styles.datePicker]}
        >
          <Text style={{ fontSize: 15 }}>
            {date ? date.toLocaleString() : "Select date"}
          </Text>
        </TouchableOpacity>

        {/* Time Picker Button */}
        <TouchableOpacity
          onPress={() => setShowTime(true)}
          style={[styles.timePicker]}
        >
          <Ionicons name="time" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showDate && (
        <DateTimePicker
          testID="datePicker"
          value={date || new Date()} // Default ke waktu saat ini jika date belum dipilih
          mode="date"
          is24Hour={true}
          onChange={onChangeDate}
        />
      )}

      {/* Time Picker Modal */}
      {showTime && (
        <DateTimePicker
          testID="timePicker"
          value={date || new Date()} // Default ke waktu saat ini jika date belum dipilih
          mode="time"
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}

      {/* Description or Error */}
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
    marginRight: 8,
  },
  timePicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    height: 48,
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: "gray",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "red",
    paddingTop: 8,
  },
});
