import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function CardItem({ title, area, auditDate, auditor }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="newspaper-outline" size={24} color="black" />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={[styles.title , {width: 120}]}>{title}</Text>
          <Text style={styles.auditDate}>{auditDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.area}>{area}</Text>
          <Text style={styles.auditor}>{auditor}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
    elevation: 0.5,
    borderRadius: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  area: {
    fontSize: 14,
    color: "black",
  },
  auditDate: {
    fontSize: 14,
    color: "black",
  },
  auditor: {
    fontSize: 14,
    color: "black",
  },
});
