import React from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Barang from "./screens/Barang";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Barang />
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
