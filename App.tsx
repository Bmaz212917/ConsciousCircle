import React, {useEffect} from 'react';

import {AuthProvider} from './src/context/AuthProvider';
import {PaperProvider} from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import toastConfig from './src/wrappers/ToastConfig';
import {KeyboardAvoidingView, Platform} from 'react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <RootNavigator />
            <Toast config={toastConfig} />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </KeyboardAvoidingView>
  );
}

export default App;
