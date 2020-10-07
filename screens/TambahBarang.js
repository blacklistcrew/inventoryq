import React from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import globalStyles from "../styles/globalStyles";

export default function TambahBarang() {
  const [submit, setSubmit] = React.useState({
    nama: "",
    stok: "",
    hargaBeli: "",
    hargaJual: "",
  });

  console.log(submit);

  return (
    <View>
      <View style={globalStyles.whiteContainer}>
        <TextInput
          label="Nama barang"
          value={submit.nama}
          onChangeText={(text) => setSubmit({ ...submit, nama: text })}
        />

        <TextInput
          label="Stok"
          value={submit.stok}
          onChangeText={(text) => setSubmit({ ...submit, stok: text })}
          keyboardType="numeric"
        />

        <TextInput
          label="Harga beli"
          value={submit.hargaBeli}
          onChangeText={(text) => setSubmit({ ...submit, hargaBeli: text })}
          keyboardType="numeric"
        />

        <TextInput
          label="Harga jual"
          value={submit.hargaJual}
          onChangeText={(text) => setSubmit({ ...submit, hargaJual: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={{ ...globalStyles.whiteContainer, paddingHorizontal: 20 }}>
        <Button mode="contained" onPress={() => console.log("Tambah")}>
          Simpan
        </Button>
      </View>
    </View>
  );
}
