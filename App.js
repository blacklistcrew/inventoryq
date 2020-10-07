import React from "react";
import { StyleSheet, View, AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Penjualan from "./screens/Penjualan";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Penjualan />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
  },
});

AppRegistry.registerComponent(appName, () => Main);
