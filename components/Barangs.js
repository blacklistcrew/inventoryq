import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TextInput} from 'react-native';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';

const Barangs = ({onPress}) => {
  const [loading, setLoading] = useState(true);
  const [barangs, setBarangs] = useState([]);
  const [cari, setCari] = useState([]);

  // SELECT * FROM barangs dr firestore
  const ref = firestore().collection('barangs').orderBy('createdAt', 'desc');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        if (route.params?.title == 'Penjualan') {
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
    const harga =
      route.params?.title == 'Penjualan' ? item.hargaJual : item.hargaBeli;

    return (
      <TextCard
        title={item.namaBrg}
        desc={`Stok: ${item.stok}`}
        icon="cube"
        right={formatHarga(harga)}
        onPress={onPress}
      />
    );
  };

  return (
    <>
      <TextInput
        placeholder="Cari barang"
        style={styles.textboxCari}
        onChangeText={changeBarang}
      />

      {/* daftar barang */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={globalStyles.whiteContainer} style={{flex: 1}}>
          <FlatList data={barangs} renderItem={RenderBrg} />
        </View>
      )}
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
  textboxCari: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 10,
    paddingHorizontal: 20,
  },
};

export default Barangs;
