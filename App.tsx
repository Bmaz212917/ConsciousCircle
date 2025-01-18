import React, {useEffect} from 'react';

import {AuthProvider} from './src/context/AuthProvider';
import {PaperProvider} from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
