import React from "react";
import { View, ScrollView, Text } from "react-native";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";
import InputKotak from "../components/InputKotak";
import Fab from "../components/Fab";
import ModalCetak from "../components/ModalCetak";
import { useForm, Controller } from "react-hook-form";

const Penjualan = () => {
  // react-hook-form
  const { control, handleSubmit, errors } = useForm();

  // data penjualan yg ditambahkan lewat modal
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
      <ScrollView>
        {/* daftar brg yg mau dicetak */}
        {penjualans ? (
          penjualans.map((penjualan) => (
            <View style={globalStyles.whiteContainer} key={penjualan.namaBrg}>
              {/* component dr react-hook-form */}
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  // component buatan sendiri berisi card & textinput
                  <TextCard
                    title={penjualan.namaBrg}
                    desc={`Stok: ${penjualan.stok}`}
                    icon="cash-multiple"
                    rightComponent={
                      // component buatan sendiri berisi textinput
                      <InputKotak
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          updateJumlah(text, penjualan);
                          onChange(text);
                        }}
                      />
                    }
                  />
                )}
                name={penjualan.namaBrg}
                rules={{ required: true, pattern: /^[1-9]\d*$/g }}
                defaultValue=""
                key={penjualan.namaBrg}
              />

              {/* error */}
              {errors[penjualan.namaBrg] && (
                <Text style={{ color: "red", marginLeft: 20 }}>
                  Jumlah barang harus diisi dengan benar.
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 20 }}>Belum ada barang yang dipilih.</Text>
        )}

        {/* tombol simpan & modal cetak */}
        <ModalCetak penjualans={penjualans} handleSubmit={handleSubmit} />
      </ScrollView>

      {/* tombol apung & modal pencarian brg */}
      <Fab tambahArr={tambahArr} />
    </>
  );
};

export default Penjualan;
