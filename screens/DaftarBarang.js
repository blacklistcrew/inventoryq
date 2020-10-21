import React from 'react';
import {FAB} from 'react-native-paper';
import Barangs from '../components/Barangs';
import TextCard from '../components/TextCard';
import formatHarga from '../helpers/formatHarga';

const DaftarBarang = ({navigation}) => {
  // pindah ke screen TambahBarang
  const tambahBarang = () => navigation.navigate('Tambah Barang');

  // render brg di DaftarBarang.js
  const renderFlatlist = ({item}) => (
    <TextCard
      title={item.namaBrg}
      desc={`Stok: ${item.stok}`}
      icon="cube"
      right={formatHarga(item.hargaJual)}
      onPress={() => console.log(item.namaBrg)}
    />
  );

  return (
    <>
      <Barangs renderFlatlist={renderFlatlist} />

      <FAB style={styles.fab} icon="plus" onPress={tambahBarang} />
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
};

export default DaftarBarang;
