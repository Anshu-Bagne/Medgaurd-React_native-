import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';

export default function Records() {
  const [documents, setDocuments] = useState<{ id: string; uri: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For showing a loader
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch images from Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const storageRef = storage().ref('medicalRecords/');
        const result = await storageRef.listAll();
        if (result.items.length === 0) {
          setErrorMessage('No medical records found.');
        } else {
          const urls = await Promise.all(
            result.items.map(async (fileRef) => {
              const uri = await fileRef.getDownloadURL();
              return { id: fileRef.name, uri };
            })
          );
          setDocuments(urls);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setErrorMessage('Failed to fetch medical records. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Records</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
              <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
          )}
          numColumns={4} // Display 4 images per row
          contentContainerStyle={styles.grid}
        />
      )}

      {selectedImage && (
        <Modal visible={isModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    justifyContent: 'space-between',
  },
  image: {
    width: 120, // Adjusted size for visibility
    height: 120,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red', // Use red for visibility
    fontSize: 16, // Slightly larger font for emphasis
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold', // Emphasized bold styling
  },
});


