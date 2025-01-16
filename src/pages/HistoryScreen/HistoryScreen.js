import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { axiosInstance } from '../../utils/axios';

const HistoryScreen = ({ navigation, route }) => {
  const [tableData, setTableData] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await axiosInstance.get('/audits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTableData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch audit data:', error);
        Alert.alert('Error', 'Failed to fetch audit data');
      }
    };

    fetchAudits();
  }, [token]);

  const alertIndex = (index) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { width: 40 }]}>{item.id}</Text>
      <Text style={[styles.cell, { width: 100 }]}>{item.auditor}</Text>
      <Text style={[styles.cell, { width: 120 }]}>{item.title}</Text>
      <Text style={[styles.cell, { width: 100 }]}>{item.area}</Text>
      <Text style={[styles.cell, { width: 180 }]}>{item.start_date}</Text>
      <Text style={[styles.cell, { width: 180 }]}>{item.close_date}</Text>
      <TouchableOpacity onPress={() => alertIndex(index)}>
        <View style={[styles.btn, { width: 52 }]}>
          <Text style={styles.btnText}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} param={route?.params} />
      <ScrollView horizontal={true}>
        <View style={styles.listContainer}>
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
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingHorizontal: 16, 
        paddingTop: 36, 
        backgroundColor: '#fff' 
    },
    listContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        backgroundColor: theme.colors.primary,
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
        elevation: 1,
        borderRadius: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    cell: {
        fontSize: 16,
        fontWeight: "semibold",
        flex: 1,
    },
    btn: { 
        width: 12, 
        height: 20, 
        backgroundColor: '#78B7BB', 
        borderRadius: 2 
    },
    btnText: { 
        textAlign: 'center', 
        color: '#fff' 
    }
});
