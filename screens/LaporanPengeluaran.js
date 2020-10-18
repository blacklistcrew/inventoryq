import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import SortBy from '../components/SortBy';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';

const LaporanPengeluaran = () => {
  // data
  const [loading, setLoading] = useState(true);
  const [pengeluarans, setPengeluarans] = useState([]);
  const ref = firestore()
    .collection('pengeluarans')
    .orderBy('createdAt', 'desc');

  // firestore
  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        const {createdAt, items, total} = doc.data();
        list.push({
          key: doc.id,
          createdAt,
          items,
          total,
        });
      });

      setPengeluarans(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  // total
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = pengeluarans
    .map((pengeluaran) => pengeluaran.total)
    .reduce(reducer, 0);

  // render flatlist
  const renderFlatlist = ({item}) => (
    <TextCard
      title={item.createdAt.toDate().toDateString().toString()}
      desc={item.items.map((item) => {
        return `${item.jumlahBrg} x ${item.namaBrg}\n`;
      })}
      icon="cash-multiple"
      right={formatHarga(item.total)}
    />
  );

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

      {/* summary pengeluaran */}
      <View style={globalStyles.whiteContainer}>
        <TextCard
          title="Total Pengeluaran"
          desc="Oktober 2020"
          icon="chevron-left-circle-outline"
          right={formatHarga(total)}
        />
      </View>

      {/* daftar pengeluaran */}
      <View style={globalStyles.whiteContainer}>
        <FlatList data={pengeluarans} renderItem={renderFlatlist} />
      </View>
    </>
  );
};

export default LaporanPengeluaran;
