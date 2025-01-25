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
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon library

const CustomDrawerContent = props => {
  const [userData, setUserData] = useState(null);
  const {setUserRole, setUser} = useAuth(); // Access context functions

  const navigationItems=[
    {
      id:1,
      title:'Home',
      navigationPath:'AdminHome',
      iconName:'home-outline'
    },
    {
      id:2,
      title:'My Profile',
      navigationPath:'Profile',
      iconName:'person-outline'
    },
    {
      id:3,
      title:'Upcoming Sessions',
      navigationPath:'UpcomingSessions',
      iconName:'person-outline'
    },
    {
      id:4,
      title:'Coaches',
      navigationPath:'CoachListing',
      iconName:'people-outline'
    },
    {
      id:5,
      title:'Subscriptions',
      navigationPath:'UpcomingSessions',
      iconName:'diamond'
    }
  ]

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

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
            uri: userData?.profilePicture || 'https://picsum.photos/200', // Replace with user's profile picture URL
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userData?.name || 'User Name'}</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        {navigationItems?.map((e,index)=>{
          return (
              <TouchableOpacity key={index.toString()}
                  style={styles.menuItem}
                  onPress={() => props.navigation.navigate(e.navigationPath)}>
                <Icon name={e.iconName} size={24} color="black" />
                <Text style={styles.menuItemText}>{e.title}</Text>
              </TouchableOpacity>
          )
        })}

       {/* <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('Profile')}>
          <Icon name="person-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('UpcomingSessions')}>
          <Icon name="person-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Upcoming Sessions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('CoachListing')}>
          <Icon name="people-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Coaches</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('Subscription')}>
          <Icon name="diamond" size={24} color="black" />
          <Text style={styles.menuItemText}>Subscription</Text>
        </TouchableOpacity>*/}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Icon name="log-out-outline" size={24} color="#E53935" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'flex-start',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  drawerItems: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  logoutText: {
    fontSize: 16,
    color: '#E53935',
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
