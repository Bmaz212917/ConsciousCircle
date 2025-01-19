import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminHomeScreen from '../screens/AdminScreens/AdminHomeScreen/AdminHomeScreen';
import CreateEventScreen from '../screens/AdminScreens/CreateEventScreen/CreateEventScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AdminStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    </Drawer.Navigator>
  );
};

export default AdminStack;
