import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TextInput} from 'react-native';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import SortBy from '../components/SortBy';
import firestore from '@react-native-firebase/firestore';

const DaftarBarang = ({hideModal, tambahArr}) => {
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

  // utk modal
  const barangPress = () => {
    tambahArr && tambahArr();
    hideModal && hideModal();
  };

  return (
    <>
      {/* urutkan berdasarkan */}
      <View style={globalStyles.whiteContainer}>
        <TextInput
          placeholder="Cari barang"
          onChangeText={changeBarang}
          onBlur={() => setBarangs(cari)}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            margin: 10,
            paddingHorizontal: 20,
          }}
        />

        <View style={globalStyles.flexRow}>
          {/* waktu */}
          <SortBy title="Waktu" />
          {/* waktu, totbayar, jumlahbeli, namabrg */}
          <SortBy title="Urutkan" />
        </View>
      </View>

      {/* daftar barang */}

      {loading ? (
        <Text style={{color: 'grey', textAlign: 'center', margin: 30}}>
          Loading...
        </Text>
      ) : (
        <View style={globalStyles.whiteContainer}>
          <FlatList
            data={barangs}
            renderItem={({item}) => (
              <TextCard
                title={item.namaBrg}
                desc={`Stok: ${item.stok}`}
                icon="cube"
                right={`Rp ${item.hargaJual},-`}
                onPress={barangPress}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default DaftarBarang;
