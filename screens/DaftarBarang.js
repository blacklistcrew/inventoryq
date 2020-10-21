import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TextInput} from 'react-native';
import {FAB} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';

const DaftarBarang = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [barangs, setBarangs] = useState([]);
  const [cari, setCari] = useState([]);
  const ref = firestore().collection('barangs').orderBy('createdAt', 'desc');

  // firestore
  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {namaBrg, hargaJual, stok} = doc.data();
        list.push({
          key: doc.id,
          namaBrg,
          hargaJual,
          stok,
        });
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

  // pindah ke screen TambahBarang
  const tambahBarang = () => navigation.navigate('Tambah Barang');

  return (
    <View style={{flex: 1}}>
      {/* urutkan berdasarkan */}
      <View style={globalStyles.whiteContainer}>
        <TextInput
          placeholder="Cari barang"
          onChangeText={changeBarang}
          style={styles.textboxCari}
        />
      </View>

      {/* daftar barang */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={{...globalStyles.whiteContainer, flex: 1}}>
          <FlatList
            data={barangs}
            renderItem={({item}) => (
              <TextCard
                title={item.namaBrg}
                desc={`Stok: ${item.stok}`}
                icon="cube"
                right={formatHarga(item.hargaJual)}
              />
            )}
          />
        </View>
      )}

      <FAB style={styles.fab} icon="plus" onPress={tambahBarang} />
    </View>
  );
};

const styles = {
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
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    color: '#fff',
    backgroundColor: '#6200ee',
  },
};

export default DaftarBarang;
