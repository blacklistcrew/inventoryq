import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';
import SortBy from '../components/SortBy';

const LaporanPengeluaran = () => {
  // data
  const [loading, setLoading] = useState(true);
  const [pengeluarans, setPengeluarans] = useState([]);
  const [sesudah, setSesudah] = useState(
    new Date(new Date().toLocaleDateString()),
  );
  // function ini utk di-passdown ke SortBy component
  const updateSesudah = (dateObj) => setSesudah(dateObj);
  const updatePengeluarans = (pengeluaransBaru) =>
    setPengeluarans(pengeluaransBaru);
  const pengeluaransHolder = pengeluarans.sort((a, b) => b.total - a.total);

  // firestore ref
  const ref = firestore()
    .collection('pengeluarans')
    .where('createdAt', '>', sesudah)
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
  }, [sesudah]);

  // total
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = pengeluarans
    .map((pengeluaran) => pengeluaran.total)
    .reduce(reducer, 0);

  return (
    <>
      <SortBy
        updateSesudah={updateSesudah}
        pengeluarans={pengeluaransHolder}
        updatePengeluarans={updatePengeluarans}
      />

      {/* summary pengeluaran */}
      <View style={globalStyles.whiteContainer}>
        <TextCard
          title="Total Pengeluaran"
          icon="chevron-left-circle-outline"
          right={formatHarga(total)}
        />
      </View>

      {/* daftar pengeluaran */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={{...globalStyles.whiteContainer, flex: 1}}>
          <FlatList data={pengeluarans} renderItem={renderFlatlist} />
        </View>
      )}
    </>
  );
};

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

const styles = {
  loadingText: {
    color: 'grey',
    textAlign: 'center',
    margin: 30,
  },
};

export default LaporanPengeluaran;
