import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CardItem from "../../components/CardItem";
import { fetchHistoryAudits } from "../../services/AuditService";

export default function CardList() {
  const [dataAudit, setDataAudit] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistoryAudits(token, 3);
        setDataAudit(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch audit data");
      }
    };

    fetchData();
  }, [dataAudit]);

  const renderItem = ({ item }) => (
    <CardItem
      title={item.title}
      area={item.area}
      auditDate={item.start_date}
      auditor={item.auditor}
    />
  );

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Audit History</Text>
        <TouchableOpacity onPress={() => navigation.push("HistoryScreen", {
                menu: 'History All',
          })}>
          <Text style={styles.subHeading}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataAudit}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "semiBold",
    paddingBottom: 8,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
});
