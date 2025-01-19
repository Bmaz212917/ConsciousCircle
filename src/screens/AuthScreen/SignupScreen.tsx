import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import CommonTextInput from '../../components/CommonTextInput';
import CommonButton from '../../components/CommonButton';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUpWithEmailPhoneAndName = async () => {
    try {
      // Create the user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = userCredential.user;
      await userCredential.user.sendEmailVerification();

      // Save additional user details in Firestore
      await firestore().collection('users').doc(uid).set({
        name,
        email,
        phone,
        createdAt: firestore.FieldValue.serverTimestamp(), // Track when the user signed up
      });
      Alert.alert(
        'Success',
        'Account created successfully. Please verify your email before logging in.',
      );
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error; // Pass the error to the caller for error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      signUpWithEmailPhoneAndName();
      // const userCredential = await auth().createUserWithEmailAndPassword(
      //   email,
      //   password,
      // );
      // const user = userCredential.user;

      // // Send email verification
      // await user.sendEmailVerification();
      // Redirect to Login screen
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <CommonTextInput
          iconSource={require('../../assets/icons/Profile.png')}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.margin}>
        <CommonTextInput
          iconSource={require('../../assets/icons/Mail.png')}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.margin}>
        <CommonTextInput
          iconSource={require('../../assets/icons/Call.png')}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.margin}>
        <CommonTextInput
          iconSource={require('../../assets/icons/Password.png')}
          placeholder="Your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          // style={styles.input}
        />
      </View>
      <View style={styles.margin}>
        <CommonTextInput
          iconSource={require('../../assets/icons/Password.png')}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          // style={styles.input}
        />
      </View>
      <CommonButton
        containerStyle={styles.buttonStyle}
        onPress={handleSignUp}
        label="SIGN UP"
        isLoading={isLoading}
      />
      <Text
        style={styles.memberText}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  input: {marginBottom: 10, fontSize: 16},
  link: {marginTop: 20, color: 'blue', textAlign: 'center'},
  margin: {marginBottom: 20},
  buttonStyle: {marginTop: 10},

  memberText: {
    color: 'white',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBlockColor: 'white',
    marginTop: 20,
  },
});

export default SignUpScreen;
