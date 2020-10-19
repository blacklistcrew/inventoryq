import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableRipple, Button, Modal, Portal} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import firestore from '@react-native-firebase/firestore';
import formatHarga from '../helpers/formatHarga';

const LaporanPenjualan = () => {
  // modal
  const [visible, setVisible] = useState(false);
  const toggleModal = () => setVisible(!visible);
  // data
  const [loading, setLoading] = useState(true);
  const [penjualans, setPenjualans] = useState([]);
  const ref = firestore().collection('penjualans').orderBy('createdAt', 'desc');

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

      setPenjualans(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  // total
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = penjualans
    .map((penjualan) => penjualan.total)
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
      <View style={globalStyles.whiteContainer}>
        <View style={globalStyles.flexRow}>
          {/* waktu */}
          <TouchableRipple
            onPress={toggleModal}
            rippleColor="rgba(0, 0, 0, .32)">
            <View style={globalStyles.flexRow}>
              <Text style={styles.sortbyText}>Waktu</Text>
              <Button icon="chevron-down" color="#6200ee" />
            </View>
          </TouchableRipple>

          {/* modal waktu */}
          <Portal>
            <Modal visible={visible} onDismiss={toggleModal}>
              <View style={styles.smallModal}>
                <Text>I am the modal content!</Text>
              </View>
            </Modal>
          </Portal>

          {/* waktu, totbayar, jumlahbeli, namabrg */}
          <TouchableRipple
            onPress={() => console.log('Urutkan')}
            rippleColor="rgba(0, 0, 0, .32)">
            <View style={globalStyles.flexRow}>
              <Text style={styles.sortbyText}>Urutkan</Text>
              <Button icon="chevron-down" color="#6200ee" />
            </View>
          </TouchableRipple>
        </View>
      </View>

      {/* summary penjualan */}
      <View style={globalStyles.whiteContainer}>
        <TextCard
          title="Total Keuntungan"
          desc="Hari Ini"
          icon="cash-multiple"
          right={formatHarga(total)}
        />
      </View>

      {/* daftar penjualan */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={globalStyles.whiteContainer}>
          <FlatList data={penjualans} renderItem={renderFlatlist} />
        </View>
      )}
    </>
  );
};

const styles = {
  smallModal: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  sortbyText: {
    color: '#6200ee',
    marginLeft: 20,
  },
  loadingText: {
    color: 'grey',
    textAlign: 'center',
    margin: 30,
  },
};

export default LaporanPenjualan;
