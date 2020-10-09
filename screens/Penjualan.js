import React from "react";
import { View, FlatList } from "react-native";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";
import InputKotak from "../components/InputKotak";
import Fab from "../components/Fab";
import ModalCetak from "../components/ModalCetak";

const Penjualan = () => {
  const [penjualans, setPenjualans] = React.useState([
    { namaBrg: "Beras Rojo Lele", stok: 20, harga: 20000, jumlahBrg: "" },
  ]);

  // jika barang yg ad di modal diklik, maka barang akan msk ke daftar beli
  const tambahArr = (namaBrg, stok, harga) => {
    setPenjualans((prevPenjualan) =>
      prevPenjualan.concat({
        namaBrg,
        stok,
        harga,
        jumlahBrg: "",
      })
    );
  };

  // update jumlahBrg
  const updateJumlah = (text, item) => {
    // ubah properti jumlahBrg
    const penjualanBaru = penjualans.map((penjualan) =>
      penjualan.namaBrg == item.namaBrg
        ? { ...penjualan, jumlahBrg: text }
        : penjualan
    );

    // ubah state penjualans
    setPenjualans(penjualanBaru);
  };

  return (
    <>
      {/* daftar brg yg mau dicetak */}
      <View style={globalStyles.whiteContainer}>
        <FlatList
          data={penjualans}
          renderItem={({ item }) => (
            <TextCard
              title={item.namaBrg}
              desc={`Stok: ${item.stok}`}
              icon="cash-multiple"
              rightComponent={
                <InputKotak onChangeText={(text) => updateJumlah(text, item)} />
              }
            />
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>

      {/* tombol simpan & modal cetak */}
      <ModalCetak penjualans={penjualans} />

      {/* tombol apung & modal pencarian brg */}
      <Fab tambahArr={tambahArr} />
    </>
  );
};

export default Penjualan;
