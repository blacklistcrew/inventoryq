import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputKotak({ onChangeText }) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder="Jumlah"
      keyboardType="numeric"
      autoFocus
      onChangeText={onChangeText}
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
