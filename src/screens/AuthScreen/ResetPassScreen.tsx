import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import CommonTextInput from '../../components/CommonTextInput';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../../components/CommonButton';

const ResetPassScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendPasswordResetEmail = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(`A password reset link has been sent to ${email}.`);
      navigation.goBack();
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Please provide a valid email address.');
      } else {
        Alert.alert('An error occurred. Please try again later.');
        console.error('Error sending password reset email:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetPassword = async () => {
    setIsLoading(true);
    if (!email) {
      setErrorMessage('Email is required.');
      setIsLoading(false);

      return;
    }

    try {
      await sendPasswordResetEmail(email);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/Back.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Reset Password</Text>
      <Text>Please enter your email address to request a password reset</Text>
      <View style={{marginTop: 20}}>
        <CommonTextInput
          placeholder="abc@email.com"
          placeholderTextColor="black"
          iconSource={require('../../assets/icons/Mail.png')}
          enablesReturnKeyAutomatically
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          style={{color: 'black'}}
        />
      </View>
      <CommonButton
        label="SEND"
        onPress={handleResetPassword}
        textStyle={{color: 'white'}}
        containerStyle={{backgroundColor: 'black', marginTop: 20}}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ResetPassScreen;
