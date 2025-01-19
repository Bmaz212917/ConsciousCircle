import React, {useEffect} from 'react';

import {AuthProvider} from './src/context/AuthProvider';
import {PaperProvider} from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView, StatusBar} from "react-native";

function App(): React.JSX.Element {
  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
