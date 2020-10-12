import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import globalStyles from "../styles/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import firebase from "../config/firebase";

const TambahBarang = () => {
  const { control, handleSubmit, errors } = useForm();

  // menambah brg ke db
  const addBarang = (data) => {
    const db = firebase.firestore();
    db.collection("barangs")
      .add(data)
      .then(() => console.log("barang added"))
      .catch((err) => console.log("add barang failed", err));
  };

  return (
    <ScrollView>
      {inputs.map((input, i) => (
        <View key={i.toString()}>
          {/* dr react hook form */}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={[globalStyles.whiteContainer, globalStyles.flexRow]}>
                <MaterialCommunityIcons
                  name={input.icon}
                  size={30}
                  color="grey"
                  style={styles.inputIcon}
                />

                {/* component buatan sendiri */}
                <TextInput
                  label={input.label}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.inputStyle}
                  keyboardType={input.keyboardType ? "default" : "numeric"}
                />
              </View>
            )}
            name={input.name}
            rules={
              input.rules
                ? { required: true }
                : { required: true, pattern: /^[1-9]\d*$/g }
            }
            defaultValue=""
          />

          {/* error */}
          {errors[input.name] && (
            <Text style={styles.error}>
              Jumlah barang harus diisi dengan benar.
            </Text>
          )}
        </View>
      ))}

      <View style={{ padding: 20 }}>
        <Button mode="contained" onPress={handleSubmit(addBarang)}>
          Simpan
        </Button>
      </View>
    </ScrollView>
  );
};

// style
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inputIcon: {
    padding: 15.5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  error: {
    color: "red",
    marginLeft: 20,
  },
});

// input field
const inputs = [
  {
    label: "Nama barang",
    name: "namaBarang",
    icon: "cube",
    rules: true,
    keyboardType: true,
  },
  {
    label: "Harga beli",
    name: "hargaBeli",
    icon: "cash-multiple",
  },
  {
    label: "Harga jual",
    name: "hargaJual",
    icon: "cash-multiple",
  },
  {
    label: "Stok",
    name: "stok",
    icon: "database",
  },
];

export default TambahBarang;
