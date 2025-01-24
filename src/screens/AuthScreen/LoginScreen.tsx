import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CommonTextInput from '../../components/CommonTextInput';
import CommonButton from '../../components/CommonButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../../context/AuthProvider';
import EmailIcon from '../../assets/icons/email.svg';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('Test1@yopmail.com');
  const [password, setPassword] = useState('Test@123');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setUserRole, setUser} = useAuth(); // Access context functions
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSignInPress = async () => {
    setIsLoading(true);
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      console.log('USER', user);

      if (!user.emailVerified) {
        Alert.alert(
          'Email not verified',
          'Please verify your email before logging in. Resend verification email?',
          [
            {
              text: 'Resend',
              onPress: async () => {
                await user.sendEmailVerification();
                Alert.alert('Success', 'Verification email sent.');
              },
            },
            {text: 'Cancel', style: 'cancel'},
          ],
        );
        return;
      }

      if (user.email === 'test1@yopmail.com') {
        setUserRole('admin');
      } else {
        setUserRole('user');
      } // Redirect to the main screen
    } catch (err) {
      Alert.alert('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/Login.png')}
        style={styles.backgroundImage}>
        <Image
          source={require('../../assets/icons/logowhite.png')}
          style={styles.logoStyle}
        />
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View style={styles.formContainer}>
            <CommonTextInput
              placeholder="abc@email.com"
              placeholderTextColor="white"
              // iconSource={<EmailIcon />}
              isSvg={true}
              enablesReturnKeyAutomatically
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <View style={styles.passContainer}>
              <Image
                source={require('../../assets/icons/Password.png')}
                style={styles.passIcon}
              />
              <TextInput
                style={styles.passInput}
                placeholder="Your password"
                placeholderTextColor="white"
                secureTextEntry={!showPass}
                onChangeText={setPassword}
                value={password}
              />
              <Icon
                onPress={() => setShowPass(!showPass)}
                name={!showPass ? 'eye-off-sharp' : 'eye-sharp'}
                size={20}
                color="white"
                style={styles.eyeIcon}
              />
            </View>
            <View style={styles.forgotPassContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPass')}>
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CommonButton
              containerStyle={styles.buttonStyle}
              onPress={onSignInPress}
              label="SIGN IN"
              isLoading={isLoading}
            />
            <View style={styles.memberContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.memberText}>Become A Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 15,
  },
  logoStyle: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 150,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: 25,
    paddingVertical: 15,
  },
  memberContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  passIcon: {
    marginRight: 8,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  passInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: 'white',
  },
  forgotPassContainer: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  forgotPassText: {
    color: 'white',
  },
  memberText: {
    color: 'white',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBlockColor: 'white',
    marginTop: 20,
  },
  buttonStyle: {marginTop: 10},
});
