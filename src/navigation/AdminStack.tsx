import {createStackNavigator} from '@react-navigation/stack';
import AdminHomeScreen from '../screens/AdminScreens/AdminHomeScreen/AdminHomeScreen';
import CreateEventScreen from '../screens/AdminScreens/CreateEventScreen/CreateEventScreen';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    </Stack.Navigator>
  );
};

export default AdminStack;
