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
  Dimensions,
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

const CreateEventScreen = ({navigation}) => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [menuVisible, setMenuVisible] = useState(false);
  const {width, height} = useWindowDimensions();

  const eventTypes = ['Free', 'Premium'];
  const [duration, setDuration] = useState(''); // Numeric input
  const [unit, setUnit] = useState(''); // Selected unit: Hours or Minutes
  const [durationModalVisible, setDurationModalVisible] = useState(false); // Modal visibility

  const handleConfirmUnit = selectedUnit => {
    setUnit(selectedUnit);
    setDurationModalVisible(false);
  };

  const handleDurationChange = text => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Ensure only numbers
    setDuration(numericValue);
  };
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        leftIcon={'arrow-back-outline'}
        title={'Create Event'}
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
        <Text style={styles.label}>Event Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={eventName}
          onChangeText={setEventName}
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        {/* Event Type Dropdown */}
        {/* <Text style={styles.label}>Event Type</Text> */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchorPosition="bottom"
          contentStyle={{
            backgroundColor: '#fff',
            width: width - 40, // Set a fixed width for the menu
          }}
          anchor={
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}>
              <Text style={styles.menuButtonText}>
                {eventType || 'Select Event Type'}
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
            />
          ))}
        </Menu>

        {/* Event Date & Time Picker */}
        {/* <Text style={styles.label}>Event Date & Time</Text> */}
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

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

          <TouchableOpacity style={{flex: 1}}>
            <TextInput
              style={[styles.input,{flex:1}]}
              placeholder="Enter Duration"
              enterKeyHint="done"
              keyboardType="numeric" // Ensures numeric keyboard
              value={duration ? `${duration} ${unit}` : ''} // Show number with unit
              onChangeText={handleDurationChange}
              onBlur={() => setDurationModalVisible(true)} // Open modal on focus
              // editable={!unit} // Prevent editing when unit is selected
            />
          </TouchableOpacity>
          <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchorPosition="bottom"
              contentStyle={{
                flex:1,
                marginLeft:10,
                backgroundColor: '#fff',
               // width: width - 40, // Set a fixed width for the menu
              }}
              anchor={
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => setMenuVisible(true)}>
                  <Text style={styles.menuButtonText}>
                    {eventType || 'Select Event Type'}
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
                />
            ))}
          </Menu>
        </View>
        {/* Event Description */}

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={eventDescription}
          onChangeText={setEventDescription}
          multiline
          numberOfLines={4}
        />

        <CommonButton
          label="Publish Event"
          containerStyle={{backgroundColor: 'black'}}
          textStyle={{color: 'white'}}
        />
        {/* Image Picker Modal */}
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
          mode="time" // Only for time
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


      <Modal
        transparent={true}
        visible={durationModalVisible}
        animationType="slide"
        onRequestClose={() => setDurationModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleConfirmUnit('Hours')}>
              <Text style={styles.modalButtonText}>Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleConfirmUnit('Minutes')}>
              <Text style={styles.modalButtonText}>Minutes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setDurationModalVisible(false)}>
              <Text style={[styles.modalButtonText, {color: 'red'}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
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
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
    flex:1,
  },

  timePickerButton: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
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
    borderColor: '#ddd',
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
  },
});

export default CreateEventScreen;
