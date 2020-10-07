import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import globalStyles from "../styles/globalStyles";
import TextCard from "../components/TextCard";
import arrBarang from "../data/arrBarang";

export default function Barang() {
  return (
    <View>
      <View style={globalStyles.whiteContainer}>
        <TouchableRipple
          onPress={() => console.log("Urutkan")}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.flexRow}>
            <Text style={{ color: "grey", marginLeft: 20 }}>
              Urutkan berdasarkan
            </Text>
            <Button icon="chevron-down" color="grey" />
          </View>
        </TouchableRipple>
      </View>

      <View style={globalStyles.whiteContainer}>
        {arrBarang.map((barang, i) => (
          <TextCard
            title={barang.nama}
            desc={`Stok: ${barang.stok}`}
            icon="cube"
            right={`Rp ${barang.harga},-`}
            key={i.toString()}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
