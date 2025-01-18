import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SignupScreen from '../screens/AuthScreen/SignupScreen';
import ResetPassScreen from '../screens/AuthScreen/ResetPassScreen';
import VerificationScreen from '../screens/AuthScreen/VerificationScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="ResetPass" component={ResetPassScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
