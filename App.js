import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './routes/BottomNav';
import {navigationRef} from './helpers/aturNav';
import Drawers from './routes/Drawers';

const App = () => (
  <PaperProvider>
    <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
    <NavigationContainer ref={navigationRef}>
      <Drawers />
      <BottomNav />
    </NavigationContainer>
  </PaperProvider>
);

export default App;
