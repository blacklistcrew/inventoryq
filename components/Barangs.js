import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TextInput} from 'react-native';
import globalStyles from '../styles/globalStyles';
import firestore from '@react-native-firebase/firestore';

const Barangs = ({renderFlatlist, title}) => {
  const [loading, setLoading] = useState(true);
  const [barangs, setBarangs] = useState([]);
  const [cari, setCari] = useState([]);

  // SELECT * FROM barangs dr firestore
  const ref = firestore().collection('barangs').orderBy('createdAt', 'desc');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        if (title == 'Pengeluaran') {
          const {namaBrg, hargaBeli, stok} = doc.data();
          list.push({
            key: doc.id,
            namaBrg,
            hargaBeli,
            stok,
          });
        } else {
          const {namaBrg, hargaJual, stok} = doc.data();
          list.push({
            key: doc.id,
            namaBrg,
            hargaJual,
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
          <FlatList data={barangs} renderItem={renderFlatlist} />
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
