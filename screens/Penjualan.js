import React from "react";
import { View } from "react-native";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";
import InputKotak from "../components/InputKotak";
import Fab from "../components/Fab";

export default function Penjualan() {
  const [penjualans, setPenjualans] = React.useState([
    { namaBrg: "Beras Rojo Lele", stok: 20, harga: 20000, jumlahBrg: 2 },
  ]);

  // jika barang yg ad di modal diklik, maka barang akan msk ke daftar beli
  const tambahBeli = (namaBrg, stok, harga) => {
    setPenjualans((prevPenjualan) =>
      prevPenjualan.concat({
        namaBrg,
        stok,
        harga,
        jumlahBrg: 3,
      })
    );
  };

  return (
    <>
      <View style={globalStyles.whiteContainer}>
        {penjualans.map((penjualan, i) => (
          <TextCard
            title={penjualan.namaBrg}
            desc={`Stok: ${penjualan.stok}, Rp ${penjualan.harga},-`}
            icon="cash-multiple"
            rightComponent={<InputKotak />}
            key={i.toString()}
          />
        ))}
      </View>

      <Fab tambahBeli={tambahBeli} />
    </>
  );
}
