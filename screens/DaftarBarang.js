import React from "react";
import { View } from "react-native";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";
import arrBarang from "../data/arrBarang";
import SortBy from "../components/SortBy";

export default function Barang() {
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

      {/* daftar barang */}
      <View style={globalStyles.whiteContainer}>
        <FlatList
          data={arrBarang}
          renderItem={({ item }) => (
            <TextCard
              title={item.nama}
              desc={`Stok: ${item.stok}`}
              icon="cube"
              right={`Rp ${item.harga},-`}
            />
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </>
  );
}
