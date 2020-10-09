import React from "react";
import { View, Modal, FlatList, Text } from "react-native";
import { Button } from "react-native-paper";
import globalStyles from "../styles/globalStyles";
import TextCard from "./TextCard";

export default function ModalCetak({ penjualans }) {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <View style={{ ...globalStyles.whiteContainer, paddingHorizontal: 20 }}>
        <Button mode="contained" onPress={showModal}>
          Simpan
        </Button>
      </View>

      {/* modal */}
      <Modal animationType="slide" visible={visible} onRequestClose={hideModal}>
        {/* judul */}
        <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
          Cetak Penjualan
        </Text>

        {/* daftar barang */}
        <View style={globalStyles.whiteContainer} style={{ flex: 1 }}>
          <FlatList
            data={penjualans}
            renderItem={({ item }) => (
              <TextCard
                title={`${item.jumlahBrg}x ${item.namaBrg}`}
                desc={`${item.jumlahBrg} x Rp ${item.harga},-`}
                icon="cash-multiple"
                right={`Rp ${parseInt(item.jumlahBrg) * item.harga},-`}
              />
            )}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>

        {/* tombol */}
        <View style={{ ...globalStyles.flexRow, paddingVertical: 50 }}>
          <Button mode="contained" onPress={hideModal} color="lightgrey">
            Batal
          </Button>

          <Button mode="contained" onPress={hideModal}>
            Simpan
          </Button>
        </View>
      </Modal>
    </>
  );
}
