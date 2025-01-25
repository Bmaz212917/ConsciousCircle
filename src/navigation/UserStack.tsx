import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

import CustomDrawerContent from './CustomDrawerContent';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import UpcomingCoachingScreen from '../screens/UpcomingCoaching/UpcomingCoachingScreen';
import {createStackNavigator} from '@react-navigation/stack';
import EventDetailScreen from '../screens/EventDetail/EventDetailScreen';
import CoachingDetailScreen from '../screens/CoachingDetail/CoachingDetailScreen';
import AdminHomeScreen from '../screens/AdminScreens/AdminHomeScreen/AdminHomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 250,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Stack.Screen name="Home" component={AdminHomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="CoachingDetail" component={CoachingDetailScreen} />
      <Stack.Screen
        name="UpcomingSessions"
        component={UpcomingCoachingScreen}
      />
    </Drawer.Navigator>
  );
};

export default UserStack;
