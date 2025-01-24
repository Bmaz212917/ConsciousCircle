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
import Fonts from '../../assets/fonts';

const ProfileScreen = ({navigation}) => {
  const profile = {
    name: 'Tamim Ikram',
    dob: '10 June 1995',
    address: '36 Guild Street London, UK',
    phone: '+1 234 567 890',
    email: 'tamimikram@gmail.com',
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
        <View style={styles.phoneMailContainer}>
          <View style={styles.phoneContainer}>
            <Icon name="call-outline" size={20} color={Colors.goshawkGrey} />
            <Text style={styles.infoText}>{profile.phone}</Text>
          </View>
          <View style={styles.mailContainer}>
            <Icon name="mail-outline" size={20} color={Colors.goshawkGrey} />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.infoText}>
              {profile.email}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-clear-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{profile.dob}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-sharp" size={20} color="#555" />
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
    marginVertical: 0,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    fontFamily: Fonts.Medium,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: Colors.goshawkGrey,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.goshawkGrey,
    marginTop: 20,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Medium,
  },
  aboutText: {
    fontSize: 16,
    color: Colors.goshawkGrey,
    marginTop: 10,
    textAlign: 'justify',
    fontFamily: Fonts.Medium,
  },
  aboutMeContainer: {
    borderTopWidth: 1,
    marginTop: 20,
    borderColor: Colors.desiredDawn,
    borderTopColor: Colors.ardcoat,
  },
  phoneMailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  mailContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 1,
    flex: 1,
    justifyContent: 'flex-start',
    borderColor: Colors.ardcoat,
    paddingLeft: 10,
  },
});

export default ProfileScreen;
