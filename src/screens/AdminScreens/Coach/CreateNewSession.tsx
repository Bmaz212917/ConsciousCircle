import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import Header from '../../../components/Header';
import CommonButton from '../../../components/CommonButton';
import ImagePickerModal from '../../../components/ImagePickerModal';
import Fonts from '../../../assets/fonts';
import {Colors} from '../../../assets/Colors';
import {useFocusEffect} from '@react-navigation/native';

const CreateNewSession = ({navigation, route}) => {
  const {event} = route.params || {};
  console.log('CreateNewSession', event);

  const [eventName, setEventName] = useState(event?.title || '');
  const [eventType, setEventType] = useState(event?.coach?.category || '');
  const [eventDate, setEventDate] = useState(
    event?.date ? new Date(event.date) : new Date(),
  );
  const [eventDescription, setEventDescription] = useState(
    event?.description || '',
  );
  const [meetingLink, setMeetingLink] = useState('');
  const [imageUri, setImageUri] = useState(event?.imageUrl || null);
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [menuVisible, setMenuVisible] = useState(false);
  const {width} = useWindowDimensions();
  const eventTypes = [
    'Mindfulness & Meditation Coaching',
    'Emotional Well-Being & Relationship Coaching',
    'Career & Purpose Coaching',
  ];

  useFocusEffect(
    useCallback(() => {
      if (event) {
        setEventName(event?.title || '');
        setEventType(event?.coach?.category || '');
        setEventDate(event?.date ? new Date(event.date) : new Date());
        setEventDescription(event?.description || '');
        setImageUri(event?.imageUrl || null);
      }
    }, [event]),
  );

  const options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8,
  };

  const chooseFromGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0].uri;
        setImageUri(pickedImage); // Save the selected image URI
        setModalVisible(false); // Close modal
      }
    });
  };

  const takePhoto = () => {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.error('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const capturedImage = response.assets[0].uri;
        setImageUri(capturedImage); // Save the captured image URI
        setModalVisible(false); // Close modal
      }
    });
  };

  const handlePublish = async () => {
    if (!eventName || !eventType || !eventDescription || !imageUri) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      let downloadUrl = imageUri;

      // Upload image only if it's a new one (not the existing URL)
      if (!imageUri.startsWith('http')) {
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storageRef = storage().ref(`events/${filename}`);
        await storageRef.putFile(imageUri);
        downloadUrl = await storageRef.getDownloadURL();
      }

      const eventData = {
        name: eventName,
        type: eventType,
        date: eventDate.toISOString(),
        description: eventDescription,
        imageUrl: downloadUrl,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      if (event) {
        // Update existing event
        await firestore().collection('events').doc(event.id).update(eventData);
        Alert.alert('Success', 'Event updated successfully!');
      } else {
        // Create a new event
        await firestore()
          .collection('events')
          .add({
            ...eventData,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        Alert.alert('Success', 'Event published successfully!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'Could not save event. Please try again.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        leftIcon={'arrow-back-outline'}
        title={event ? 'Update Coaching' : 'Add Coaching'}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={styles.label}>Coaching Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={eventName}
          onChangeText={setEventName}
          placeholderTextColor={Colors.desiredDawn}
        />
        {/* 
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor={Colors.desiredDawn}
        /> */}

        {/* Event Type Dropdown */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchorPosition="bottom"
          contentStyle={{
            backgroundColor: '#fff',
            width: width - 40,
          }}
          anchor={
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}>
              <Text style={styles.menuButtonText}>
                {eventType || 'Select Category'}
              </Text>
              <Icon name="chevron-down-outline" size={20} color="#555" />
            </TouchableOpacity>
          }>
          {eventTypes.map(type => (
            <Menu.Item
              key={type}
              onPress={() => {
                setEventType(type);
                setMenuVisible(false);
              }}
              title={type}
              titleStyle={styles.menuItemText}
            />
          ))}
        </Menu>

        {/* Event Date & Time Picker */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setDatePickerVisible(true)}>
            <Text style={styles.datePickerText}>
              {eventDate.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setTimePickerVisible(true)}>
            <Text style={styles.datePickerText}>
              {selectedTime?.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Meeting Link"
          value={meetingLink}
          onChangeText={setMeetingLink}
          placeholderTextColor={Colors.desiredDawn}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={eventDescription}
          onChangeText={setEventDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <CommonButton
          label={event ? 'Update' : 'Publish'}
          containerStyle={{backgroundColor: 'black'}}
          textStyle={{color: 'white'}}
          onPress={handlePublish}
        />

        <ImagePickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onTakePhoto={takePhoto}
          onChooseFromGallery={chooseFromGallery}
        />
      </ScrollView>

      <DatePicker
        modal
        open={timePickerVisible}
        date={selectedTime}
        mode="time"
        onConfirm={time => {
          setSelectedTime(time);
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
      />

      <DatePicker
        modal
        open={datePickerVisible}
        date={eventDate}
        mode="date"
        onConfirm={date => {
          setEventDate(date);
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  imageUpload: {
    height: 200,
    backgroundColor: Colors.antiWhite,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.goshawkGrey,
  },
  imageUploadText: {
    color: '#aaa',
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: Fonts.Medium,
    color: Colors.goshawkGrey,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.ardcoat,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: Fonts.Medium,
    color: Colors.goshawkGrey,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    fontFamily: Fonts.Medium,
  },
  datePickerButton: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ardcoat,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
    flex: 1,
  },

  timePickerButton: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ardcoat,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
    marginLeft: 10,
    flex: 1,
  },
  datePickerText: {
    fontSize: 16,
    color: Colors.goshawkGrey,
    fontFamily: Fonts.Medium,
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
    fontFamily: Fonts.Medium,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ardcoat,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'space-between',
  },
  menuButtonText: {
    fontSize: 16,
    color: Colors.goshawkGrey,
    fontFamily: Fonts.Medium,
  },
  menuItemText: {
    fontSize: 14,
    color: Colors.goshawkGrey,
    fontFamily: Fonts.Medium,
    width: '100%',
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
    fontFamily: Fonts.Medium,
    color: Colors.goshawkGrey,
  },
  unitMenuStyle: {
    marginLeft: 10,
    backgroundColor: '#fff',
    marginTop: 0,
    flex: 1,
    width: 160,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreateNewSession;
