import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CommonButton from '../../../components/CommonButton';
import ImagePickerModal from '../../../components/ImagePickerModal';

const AddCoachScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [coachDetails, setCoachDetails] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    category: [],
    description: '',
  });

  const categories = [
    'Mindfulness & Meditation Coaching',
    'Emotional Well-Being & Relationship Coaching',
    'Career & Purpose Coaching',
  ];

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

  const toggleCategory = category => {
    setCoachDetails(prev => {
      const isSelected = prev.category.includes(category);
      return {
        ...prev,
        category: isSelected
          ? prev.category.filter(item => item !== category)
          : [...prev.category, category],
      };
    });
  };

  const handleSave = () => {
    console.log('Saving Coach Details:', coachDetails);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={'arrow-back-outline'}
        title="Add Coach"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.imageContainer}>
          <Image
            source={
              imageUri
                ? {uri: imageUri}
                : require('../../../assets/images/yoga.png')
            }
            style={styles.image}
          />
          <View style={styles.editIconContainer}>
            <Icon name="pencil-outline" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Coach Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={coachDetails.name}
          onChangeText={text =>
            setCoachDetails(prev => ({...prev, name: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Phone No"
          keyboardType="phone-pad"
          value={coachDetails.phone}
          onChangeText={text =>
            setCoachDetails(prev => ({...prev, phone: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={coachDetails.email}
          onChangeText={text =>
            setCoachDetails(prev => ({...prev, email: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={coachDetails.location}
          onChangeText={text =>
            setCoachDetails(prev => ({...prev, location: text}))
          }
        />
        <Text style={styles.label}>Select Category</Text>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.checkboxContainer}
            onPress={() => toggleCategory(category)}>
            <Icon
              name={
                coachDetails.category.includes(category)
                  ? 'checkbox-outline'
                  : 'square-outline'
              }
              size={20}
              color="#000"
            />
            <Text style={styles.checkboxLabel}>{category}</Text>
          </TouchableOpacity>
        ))}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          multiline
          value={coachDetails.description}
          onChangeText={text =>
            setCoachDetails(prev => ({...prev, description: text}))
          }
        />
        <CommonButton
          onPress={handleSave}
          label="SAVE"
          containerStyle={{backgroundColor: 'black'}}
          textStyle={{color: 'white'}}
        />
        <ImagePickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onTakePhoto={takePhoto}
          onChooseFromGallery={chooseFromGallery}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  textArea: {
    height: 100,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    // marginHorizontal: 30,
    borderRadius: 8,
    padding: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default AddCoachScreen;
