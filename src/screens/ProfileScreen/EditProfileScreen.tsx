import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Colors} from '../../assets/Colors';
import CommonButton from '../../components/CommonButton';
import ImagePickerModal from '../../components/ImagePickerModal';

const EditProfileScreen = ({navigation, route}) => {
  const {profile} = route.params;
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleInputChange = (key, value) => {
    setUpdatedProfile({...updatedProfile, [key]: value});
  };

  const options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8,
  };

  const chooseFromGallery = () => {
    launchImageLibrary(options, response => {
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
    launchCamera(options, response => {
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
  const saveProfile = () => {
    // Save logic here
    console.log('Profile updated:', updatedProfile);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Editable Profile Image */}
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/images/yoga.png')}
            style={styles.profileImage}
          />
          <View style={styles.editIcon}>
            <Icon name="camera-outline" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Editable Fields */}
        <TextInput
          style={styles.input}
          value={updatedProfile.name}
          onChangeText={text => handleInputChange('name', text)}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={updatedProfile.dob}
          onChangeText={text => handleInputChange('dob', text)}
          placeholder="Date of Birth"
        />
        <TextInput
          style={styles.input}
          value={updatedProfile.address}
          onChangeText={text => handleInputChange('address', text)}
          placeholder="Address"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          value={updatedProfile.aboutMe}
          onChangeText={text => handleInputChange('aboutMe', text)}
          placeholder="About Me"
          multiline
        />

        <CommonButton
          label={'SAVE CHANGES'}
          containerStyle={{
            backgroundColor: 'black',
            width: '100%',
            marginTop: 20,
          }}
          textStyle={{color: 'white'}}
        />
      </ScrollView>
      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTakePhoto={takePhoto}
        onChooseFromGallery={chooseFromGallery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.ardcoat,
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
    fontSize: 16,
    color: Colors.black,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;
