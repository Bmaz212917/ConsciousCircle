import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../context/AuthProvider';

const CustomDrawerContent = props => {
  const [userData, setUserData] = useState(null);
  const {setUserRole, setUser} = useAuth(); // Access context functions

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        console.log('currentUser', currentUser);

        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          console.log('userDoc', userDoc);

          if (userDoc.exists) {
            setUserData(userDoc.data());
            setUser(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const onLogout = async () => {
    await auth().signOut();
    setUserRole(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/150', // Replace with user's profile picture URL
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userData?.name}</Text>
        {/* <Text style={styles.userEmail}>johndoe@example.com</Text> */}
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        {/* <Icon name="log-out-outline" size={20} color="white" /> */}
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    // backgroundColor: '#6200EE', // Customize background color
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    // color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    // color: 'white',
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935', // Customize logout button color
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
