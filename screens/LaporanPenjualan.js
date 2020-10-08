import React from "react";
import { View, Text, FlatList } from "react-native";
import { TouchableRipple, Button, Colors } from "react-native-paper";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";

export default function LaporanPenjualan() {
  return (
    <>
      {/* urutkan berdasarkan */}
      <View style={globalStyles.whiteContainer}>
        <View style={globalStyles.flexRow}>
          {/* waktu */}
          <TouchableRipple
            onPress={() => console.log("Urutkan")}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <View style={globalStyles.flexRow}>
              <Text style={{ color: Colors.purple500, marginLeft: 20 }}>
                Waktu
              </Text>
              <Button icon="chevron-down" color={Colors.purple500} />
            </View>
          </TouchableRipple>

          {/* waktu, totbayar, jumlahbeli, namabrg */}
          <TouchableRipple
            onPress={() => console.log("Urutkan")}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <View style={globalStyles.flexRow}>
              <Text style={{ color: Colors.purple500, marginLeft: 20 }}>
                Urutkan
              </Text>
              <Button icon="chevron-down" color={Colors.purple500} />
            </View>
          </TouchableRipple>
        </View>
      </View>

      {/* summary penjualan */}
      <View style={globalStyles.whiteContainer}>
        <TextCard
          title="Total Keuntungan"
          desc="Oktober 2020"
          icon="cash-multiple"
          right="Rp 5000.000,-"
        />
      </View>

      {/* daftar penjualan */}
      <View style={globalStyles.whiteContainer}>
        <FlatList
          data={arrPenjualan}
          renderItem={({ item }) => (
            <TextCard
              title={item.namaBrg}
              desc={`Jumlah Barang: ${item.jumlahBrg}`}
              icon="cash-multiple"
              right={`Rp ${item.totBayar},-`}
            />
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </>
  );
}

const arrPenjualan = [
  { namaBrg: "Beras Rojo Lele", jumlahBrg: 20, totBayar: 50000 },
  { namaBrg: "Minyak Goreng", jumlahBrg: 50, totBayar: 10000 },
  { namaBrg: "Gula Pasir", jumlahBrg: 100, totBayar: 5000 },
  { namaBrg: "Mie Instan", jumlahBrg: 80, totBayar: 2500 },
];
