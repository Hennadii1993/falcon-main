import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStateManager from './components/AppStateManager';
import {View, StatusBar} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={scrollStyle}>
        <StatusBar barStyle="light-content" />
        <AppStateManager>
          <Navigation />
        </AppStateManager>
      </View>
    </SafeAreaProvider>
  );
};

const scrollStyle = {
  flexGrow: 1,
  stickyHeaderIndices: 1,
};

export default App;
