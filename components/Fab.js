import React from "react";
import { StyleSheet, View, FlatList, Modal } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import globalStyles from "../styles/globalStyles";
import arrBarang from "../data/arrBarang";
import TextCard from "../components/TextCard";

const Fab = ({ tambahArr }) => {
  const [listBarang, setListBarang] = React.useState(arrBarang);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // utk pencarian barang
  const changeBarang = (text) => {
    const data = arrBarang.filter((barang) =>
      barang.nama.toLowerCase().includes(text.toLowerCase())
    );
    setListBarang(data);
  };

  return (
    <>
      {/* modal */}
      <Modal animationType="slide" visible={visible} onRequestClose={hideModal}>
        <TextInput label="Cari barang" onChangeText={changeBarang} />

        {/* daftar barang */}
        <View style={globalStyles.whiteContainer} style={{ flex: 1 }}>
          <FlatList
            data={listBarang}
            renderItem={({ item }) => (
              <TextCard
                title={item.nama}
                desc={`Stok: ${item.stok}`}
                icon="cube"
                right={`Rp ${item.harga},-`}
                onPress={() => {
                  tambahArr(item.nama, item.stok, item.harga);
                  hideModal();
                }}
              />
            )}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
      </Modal>

      {/* tombol modal */}
      <FAB style={styles.fab} icon="plus" onPress={showModal} />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 30,
    bottom: 30,
    color: "#fff",
    backgroundColor: "#6200ee",
  },
});

export default Fab;
