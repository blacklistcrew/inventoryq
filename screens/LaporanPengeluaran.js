import React, {useState, useEffect, useReducer} from 'react';
import {View, Text, FlatList} from 'react-native';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';
import SortBy from '../components/SortBy';

// useReducer spy state pengeluarans bs di-passdown & di-edit di component SortBy
const initState = {
  pengeluarans: [],
  loading: true,
};

const pengeluaransReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PUSH_ITEM':
      return {...state, pengeluarans: action.list};

    case 'SET_LOADING':
      return {...state, loading: action.loading};

    default:
      return state;
  }
};

const LaporanPengeluaran = () => {
  // data
  const [statePengeluarans, dispatchPengeluarans] = useReducer(
    pengeluaransReducer,
    initState,
  );
  // sort data
  const [sesudah, setSesudah] = useState(
    new Date(new Date().toLocaleDateString()),
  );
  // function ini utk di-passdown ke SortBy component
  const updateSesudah = (dateObj) => setSesudah(dateObj);

  // firestore ref
  const ref = firestore()
    .collection('pengeluarans')
    .where('createdAt', '>', sesudah)
    .orderBy('createdAt', 'desc');

  // firestore
  useEffect(() => {
    // setiap kali ref berubah, maka tulisan loading akan muncul
    dispatchPengeluarans({type: 'SET_LOADING', loading: true});

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

      dispatchPengeluarans({type: 'PUSH_ITEM', list});
      dispatchPengeluarans({type: 'SET_LOADING', loading: false});
    });
  }, [sesudah]);

  // total
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = statePengeluarans.pengeluarans
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
      <SortBy
        updateSesudah={updateSesudah}
        pengeluarans={statePengeluarans.pengeluarans}
        dispatchPengeluarans={dispatchPengeluarans}
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
      {statePengeluarans.loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : statePengeluarans.pengeluarans.length > 0 ? (
        <View style={{...globalStyles.whiteContainer, flex: 1}}>
          <FlatList
            data={statePengeluarans.pengeluarans}
            renderItem={renderFlatlist}
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Belum ada pengeluaran.</Text>
      )}
    </>
  );
};

const styles = {
  loadingText: {
    color: 'grey',
    textAlign: 'center',
    margin: 30,
  },
};

export default LaporanPengeluaran;
