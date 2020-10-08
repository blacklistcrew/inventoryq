import React from "react";
import { View, FlatList } from "react-native";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";
import SortBy from "../components/SortBy";

export default function LaporanPengeluaran() {
  return (
    <>
      {/* urutkan berdasarkan */}
      <View style={globalStyles.whiteContainer}>
        <View style={globalStyles.flexRow}>
          {/* waktu */}
          <SortBy title="Waktu" />
          {/* waktu, totbayar, jumlahbeli, namabrg */}
          <SortBy title="Urutkan" />
        </View>
      </View>

      {/* summary pengeluaran */}
      <View style={globalStyles.whiteContainer}>
        <TextCard
          title="Total Pengeluaran"
          desc="Oktober 2020"
          icon="chevron-left-circle-outline"
          right="Rp 5000.000,-"
        />
      </View>

      {/* daftar pengeluaran */}
      <View style={globalStyles.whiteContainer}>
        <FlatList
          data={arrPengeluaran}
          renderItem={({ item }) => (
            <TextCard
              title={item.namaBrg}
              desc={`Jumlah Barang: ${item.jumlahBrg}`}
              icon="chevron-left-circle-outline"
              right={`Rp ${item.totBayar},-`}
            />
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </>
  );
}

const arrPengeluaran = [
  { namaBrg: "Beras Rojo Lele", jumlahBrg: 20, totBayar: 50000 },
  { namaBrg: "Minyak Goreng", jumlahBrg: 50, totBayar: 10000 },
  { namaBrg: "Gula Pasir", jumlahBrg: 100, totBayar: 5000 },
  { namaBrg: "Mie Instan", jumlahBrg: 80, totBayar: 2500 },
];
