import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AdminStack from './AdminStack'; // Import AdminStack
import UserStack from './UserStack';
import {useAuth} from '../context/AuthProvider';
import AuthStack from './AuthStack';

const RootNavigator = () => {
  const {userRole} = useAuth();

  return (
    <NavigationContainer>
      {userRole === 'admin' ? (
        <AdminStack />
      ) : userRole === 'user' ? (
        <UserStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
