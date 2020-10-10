import "react-native-gesture-handler";
import React from "react";
import { AppRegistry, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";

import Drawers from "./routes/Drawers";

const App = () => (
  <PaperProvider>
    <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
    <NavigationContainer>
      <Drawers />
    </NavigationContainer>
  </PaperProvider>
);

export default App;
AppRegistry.registerComponent(appName, () => App);
