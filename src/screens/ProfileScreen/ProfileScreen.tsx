import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Colors} from '../../assets/Colors';

const ProfileScreen = ({navigation}) => {
  const profile = {
    name: 'Tamim Ikram',
    dob: '10 June 1995',
    address: '36 Guild Street London, UK',
    aboutMe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    profileImage: 'https://i.imgur.com/6VBx3io.png', // Placeholder image
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile', {profile});
  };

  return (
    <View style={styles.container}>
      {/* Reusable Header */}
      <Header
        title="Profile"
        leftIcon="arrow-back"
        rightIcon="create-outline"
        onLeftPress={() => navigation.goBack()}
        onRightPress={navigateToEditProfile}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/yoga.png')}
            style={styles.profileImage}
          />
        </View>

        {/* Profile Information */}
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.infoRow}>
          <Icon name="calendar-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{profile.dob}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{profile.address}</Text>
        </View>
        <View style={styles.aboutMeContainer}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{profile.aboutMe}</Text>
        </View>
      </ScrollView>
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
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  aboutText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'justify',
  },
  aboutMeContainer: {
    borderTopWidth: 1,
    marginTop: 20,
    borderColor: Colors.desiredDawn,
  },
});

export default ProfileScreen;
