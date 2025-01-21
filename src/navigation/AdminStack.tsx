import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminHomeScreen from '../screens/AdminScreens/AdminHomeScreen/AdminHomeScreen';
import CreateEventScreen from '../screens/AdminScreens/CreateEventScreen/CreateEventScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import EventDetailScreen from '../screens/AdminScreens/EventDetail/EventDetailScreen';
import AddCoachScreen from '../screens/AdminScreens/Coach/AddCoachScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AdminStack = () => {
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
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="AddCoach" component={AddCoachScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Drawer.Navigator>
  );
};

export default AdminStack;
