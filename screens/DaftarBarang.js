import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import SortBy from '../components/SortBy';
import firestore from '@react-native-firebase/firestore';

const DaftarBarang = () => {
  const [loading, setLoading] = useState(true);
  const [barangs, setBarangs] = useState([]);

  const ref = firestore().collection('barangs');

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
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

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
        {loading && (
          <Text style={{color: 'grey', textAlign: 'center', marginTop: 30}}>
            Belum ada barang yang dipilih.
          </Text>
        )}

        <FlatList
          data={barangs}
          renderItem={({item}) => (
            <TextCard
              title={item.namaBrg}
              desc={`Stok: ${item.stok}`}
              icon="cube"
              right={`Rp ${item.hargaJual},-`}
            />
          )}
        />
      </View>
    </>
  );
};

export default DaftarBarang;
