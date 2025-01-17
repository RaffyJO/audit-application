import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";

export default function PickerInput({ label, selectedValue, onValueChange, items, errorText }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Input Area */}
      <TouchableOpacity
        style={[styles.input, errorText ? styles.errorInput : null]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={selectedValue ? styles.text : styles.placeholder}>
          {items.find((item) => item.value === selectedValue)?.label || `Select ${label}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      {/* Error Text */}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

      {/* Modal for Dropdown */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select {label}</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  placeholder: {
    color: "gray",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  errorInput: {
    borderColor: "red",
  },
  error: {
    fontSize: 13,
    color: "red",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
