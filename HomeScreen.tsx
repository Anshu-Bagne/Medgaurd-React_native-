import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  Linking,
  Animated,
} from 'react-native';

type Medicine = {
  id: string;
  name: string;
  dosage: string;
  time: string;
};

export default function HomeScreen({ navigation }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', dosage: '', time: '' });
  const [buttonScale] = useState(new Animated.Value(1));

  const addMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.time) {
      setMedicines([...medicines, { ...newMedicine, id: Date.now().toString() }]);
      setNewMedicine({ name: '', dosage: '', time: '' });
      openOnlineAlarm();
    } else {
      Alert.alert('Please fill out all fields');
    }
  };

  const openOnlineAlarm = () => {
    const url = 'https://regtool.net/en/alarm';
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open the link:', err)
    );
  };

  const renderMedicineCard = ({ item }: { item: Medicine }) => (
    <View style={styles.card}>
      <Text style={styles.medicineText}>Name: {item.name}</Text>
      <Text style={styles.medicineText}>Dosage: {item.dosage}</Text>
      <Text style={styles.medicineText}>Time: {item.time}</Text>
    </View>
  );

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Medications</Text>
      </View>

      {/* Medicine Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Medicine Name"
          value={newMedicine.name}
          onChangeText={(text) => setNewMedicine({ ...newMedicine, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Dosage"
          value={newMedicine.dosage}
          onChangeText={(text) => setNewMedicine({ ...newMedicine, dosage: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={newMedicine.time}
          onChangeText={(text) => setNewMedicine({ ...newMedicine, time: text })}
        />
      </View>

      {/* Medicine List */}
      <FlatList
        data={medicines}
        renderItem={renderMedicineCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.medicineList}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <Animated.View style={[styles.addButtonContainer, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity
            style={styles.addButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              addMedicine();
              //openOnlineAlarm();
            }}
          >
            <Text style={styles.buttonText}>Add Medicine</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.documentButton}
          onPress={() => {
            navigation.navigate('UploadImage');
          }}
        >
          <Text style={styles.buttonText}>Add Document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6FF',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#B0C4DE',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  medicineText: {
    fontSize: 16,
    color: '#333',
  },
  medicineList: {
    paddingBottom: 100,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonContainer: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  documentButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
