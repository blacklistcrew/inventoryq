import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputKotak() {
  const [jumlah, setJumlah] = React.useState("");

  return (
    <TextInput
      style={styles.textInput}
      placeholder="Jumlah"
      keyboardType="numeric"
      autoFocus
      value={jumlah}
      onChangeText={(text) => setJumlah(text)}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    margin: 15,
    fontSize: 12,
    paddingHorizontal: 5,
  },
});
