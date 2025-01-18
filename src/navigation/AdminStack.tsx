import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="AdminHome" component={HomeScreen} /> */}
      {/* <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default AdminStack;
