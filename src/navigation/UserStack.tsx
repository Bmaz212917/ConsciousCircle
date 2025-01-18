import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserHome" component={HomeScreen} />
      {/* <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default UserStack;
