import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminHomeScreen from '../screens/AdminScreens/AdminHomeScreen/AdminHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import CoachingDetailScreen from '../screens/CoachingDetail/CoachingDetailScreen';
import UpcomingCoachingScreen from '../screens/UpcomingCoaching/UpcomingCoachingScreen';
import CreateNewSession from '../screens/AdminScreens/Coach/CreateNewSession';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CoachStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 250,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="CreateSession" component={CreateNewSession} />
      <Stack.Screen name="CoachingDetail" component={CoachingDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="UpcomingSessions"
        component={UpcomingCoachingScreen}
      />
    </Drawer.Navigator>
  );
};

export default CoachStack;
