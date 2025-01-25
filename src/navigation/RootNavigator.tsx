import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AdminStack from './AdminStack'; // Import AdminStack
import UserStack from './UserStack';
import {useAuth} from '../context/AuthProvider';
import AuthStack from './AuthStack';
import {SafeAreaView, StyleSheet} from 'react-native';
import CoachStack from './CoachStack';

const RootNavigator = () => {
  const {userRole, isAdmin, isCoach, isUser} = useAuth();

  return (
    <NavigationContainer independent={true}>
      <SafeAreaView style={styles.safeAreaViewStyle}>
        {isAdmin ? (
          <AdminStack />
        ) : isCoach ? (
          <CoachStack />
        ) : isUser ? (
          <UserStack />
        ) : (
          <AuthStack />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default RootNavigator;
const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
});
