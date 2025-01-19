import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

const CreateEventScreen = ({navigation}) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handlePublish = async () => {
    if (!eventName || !eventType || !eventDescription || !imageUri) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`events/${filename}`);
      await storageRef.putFile(imageUri);
      const downloadUrl = await storageRef.getDownloadURL();

      // Save event data to Firestore
      await firestore().collection('events').add({
        name: eventName,
        type: eventType,
        date: eventDate.toISOString(),
        description: eventDescription,
        imageUrl: downloadUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Event published successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error publishing event:', error);
      Alert.alert('Error', 'Could not publish event. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Upload Section */}
      <TouchableOpacity
        style={styles.imageUpload}
        onPress={() => setModalVisible(true)}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageUploadText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      {/* Event Name */}
      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event name"
        value={eventName}
        onChangeText={setEventName}
      />

      {/* Event Type */}
      <Text style={styles.label}>Event Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event type"
        value={eventType}
        onChangeText={setEventType}
      />

      {/* Event Date & Time Picker */}
      <Text style={styles.label}>Event Date & Time</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>{eventDate.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setEventDate(selectedDate);
          }}
        />
      )}

      {/* Event Description */}
      <Text style={styles.label}>Event Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter event description"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={4}
      />

      {/* Publish Event Button */}
      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>Publish Event</Text>
      </TouchableOpacity>

      {/* Image Picker Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleImagePick}>
              <Icon name="image-outline" size={24} color="#000" />
              <Text style={styles.modalButtonText}>Pick from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Icon name="close-outline" size={24} color="#000" />
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageUploadText: {
    color: '#aaa',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: '#555',
  },
  publishButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CreateEventScreen;
