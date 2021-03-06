import React, {useState, useEffect} from 'react';
import {View, FlatList, Modal, Text} from 'react-native';
import {FAB, TextInput} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';

const Fab = ({tambahArr, title}) => {
  const [loading, setLoading] = useState(true);
  const [barangs, setBarangs] = useState([]);
  const [cari, setCari] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // SELECT * FROM barangs dr firestore
  const ref = firestore().collection('barangs').orderBy('createdAt', 'desc');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        if (title == 'Penjualan') {
          const {namaBrg, hargaJual, stok} = doc.data();
          list.push({
            key: doc.id,
            namaBrg,
            hargaJual,
            stok,
          });
        } else {
          const {namaBrg, hargaBeli, stok} = doc.data();
          list.push({
            key: doc.id,
            namaBrg,
            hargaBeli,
            stok,
          });
        }
      });

      setBarangs(list);
      setCari(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  // utk pencarian barang
  const changeBarang = (text) => {
    const data = cari.filter((barang) =>
      barang.namaBrg.toLowerCase().includes(text.toLowerCase()),
    );
    setBarangs(data);
  };

  // render brg yg akan dipilih
  const RenderBrg = ({item}) => {
    // menentukan harga yg akan akumulasi
    const harga = title == 'Penjualan' ? item.hargaJual : item.hargaBeli;

    return (
      <TextCard
        title={item.namaBrg}
        desc={`Stok: ${item.stok}`}
        icon="cube"
        right={formatHarga(harga)}
        onPress={() => {
          tambahArr(item.key, item.namaBrg, item.stok, harga);
          hideModal();
        }}
      />
    );
  };

  return (
    <>
      {/* tombol modal */}
      <FAB style={styles.fab} icon="plus" onPress={showModal} />

      {/* modal */}
      <Modal animationType="slide" visible={visible} onRequestClose={hideModal}>
        <TextInput label="Cari barang" onChangeText={changeBarang} />

        {/* daftar barang */}
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <View style={globalStyles.whiteContainer} style={{flex: 1}}>
            <FlatList data={barangs} renderItem={RenderBrg} />
          </View>
        )}

        {/* tombol modal */}
        <FAB style={styles.fab} icon="close" onPress={hideModal} />
      </Modal>
    </>
  );
};

const styles = {
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    color: '#fff',
    backgroundColor: '#6200ee',
  },
  loadingText: {
    color: 'grey',
    textAlign: 'center',
    margin: 30,
  },
};

export default Fab;
