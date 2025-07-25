import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProfileScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={require('../assets/Profile_image.jpg')} 
        />
        <Text style={styles.userName}>Aniruddha Moharir</Text>
        <Text style={styles.userDetails}>Age: 20 | Blood Type: A+</Text>
      </View>

      {/* Health Summary */}
      <View style={styles.healthSummary}>
        <Text style={styles.sectionTitle}>Health Summary</Text>
        <View style={styles.healthRow}>
          <Text style={styles.healthText}>Allergies:</Text>
          <Text style={styles.healthValue}>None</Text>
        </View>
        <View style={styles.healthRow}>
          <Text style={styles.healthText}>Medications:</Text>
          <Text style={styles.healthValue}>2</Text>
        </View>
        <View style={styles.healthRow}>
          <Text style={styles.healthText}>Last Visit:</Text>
          <Text style={styles.healthValue}>10 Oct 2024</Text>
        </View>
      </View>

      {/* Account Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={()=>{
        navigation.navigate('Records')
       }}>
          <Text style={styles.optionText}>Medical Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={()=>{
        navigation.navigate('Login')}}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  healthSummary: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  healthText: {
    fontSize: 16,
    color: '#555',
  },
  healthValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
