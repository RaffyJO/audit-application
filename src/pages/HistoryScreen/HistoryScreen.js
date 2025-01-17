import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { fetchAudits } from '../../services/AuditService';

const HistoryScreen = ({ navigation, route }) => {
  const [tableData, setTableData] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAudits(token);
        setTableData(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch audit data');
      }
    };

    fetchData();
  }, [tableData]);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { width: 40 }]}>{index + 1}</Text>
      <Text style={[styles.cell, { width: 100 }]}>{item.auditor}</Text>
      <Text style={[styles.cell, { width: 120 }]}>{item.title}</Text>
      <Text style={[styles.cell, { width: 100 }]}>{item.area}</Text>
      <Text style={[styles.cell, { width: 180 }]}>{item.start_date}</Text>
      <Text style={[styles.cell, { width: 180 }]}>{item.close_date}</Text>
      <TouchableOpacity onPress={() => navigation.push('EditAuditScreen', { audit: item })}>
        <View style={[styles.btn, { width: 52 }]}>
          <Text style={styles.btnText}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} param={route.params} />
      <ScrollView horizontal={true}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.headerText, { width: 40 }]}>No</Text>
            <Text style={[styles.headerText, { width: 100 }]}>Auditor</Text>
            <Text style={[styles.headerText, { width: 120 }]}>Title</Text>
            <Text style={[styles.headerText, { width: 100 }]}>Area</Text>
            <Text style={[styles.headerText, { width: 180 }]}>Audit Date</Text>
            <Text style={[styles.headerText, { width: 180 }]}>Close Date</Text>
            <Text style={[styles.headerText, { width: 52 }]}>Action</Text>
          </View>
          <FlatList
            data={tableData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: theme.colors.primary,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  cell: {
    fontSize: 14,
    flex: 1,
  },
  btn: {
    backgroundColor: '#78B7BB',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
});
