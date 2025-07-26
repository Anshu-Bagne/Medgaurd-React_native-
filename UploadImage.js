import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function UploadImage({ navigation }) {
  const [imageData, setImageData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    if (!result.didCancel) {
      setImageData(result);
      console.log(result);
    }
  };

  const uploadImage = async () => {
    if (!imageData) {
      Alert.alert('No image selected!', 'Please take a photo before uploading.');
      return;
    }
    setUploading(true);
    try {
      const reference = storage().ref(`medicalRecords/${imageData.assets[0].fileName}`);
      const pathToFile = imageData.assets[0].uri;
      await reference.putFile(pathToFile);
      Alert.alert('Image uploaded successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Upload Failed', 'There was an issue uploading your image.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Upload Medical Records</Text>
      <Text style={styles.subHeader}>
        Easily capture and upload your medical documents for safe storage.
      </Text>

      {/* Image Preview */}
      <View style={styles.previewContainer}>
        {imageData !== null ? (
          <Image
            source={{ uri: imageData.assets[0].uri }}
            style={styles.imagePreview}
          />
        ) : (
          <Text style={styles.placeholderText}>
            No Image Captured. Take a photo to preview here.
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>📷 Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>☁️ Upload Image</Text>
      </TouchableOpacity>

      {/* Upload Feedback */}
      {uploading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Uploading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  previewContainer: {
    width: 220,
    height: 220,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
