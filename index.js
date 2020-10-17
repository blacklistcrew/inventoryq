import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import BottomNav from './routes/BottomNav';
import {navigationRef} from './helpers/aturNav';

const Main = () => (
  <PaperProvider>
    <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
    <NavigationContainer ref={navigationRef}>
      <App />
      <BottomNav />
    </NavigationContainer>
  </PaperProvider>
);

export default Main;

AppRegistry.registerComponent(appName, () => Main);
