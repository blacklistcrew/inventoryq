import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableRipple, Button} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import Modal from 'react-native-modal';
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
  const total = penjualans.map((penjualan) => penjualan.total).reduce(reducer, 0);

  return (
    <>
      <View style={globalStyles.whiteContainer}>
        <View style={globalStyles.flexRow}>
          {/* waktu */}
          <TouchableRipple
            onPress={toggleModal}
            rippleColor="rgba(0, 0, 0, .32)">
            <View style={globalStyles.flexRow}>
              <Text style={{color: '#6200ee', marginLeft: 20}}>Waktu</Text>
              <Button icon="chevron-down" color={'#6200ee'} />
            </View>
          </TouchableRipple>

          {/* modal waktu */}
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={visible}
            onBackButtonPress={toggleModal}
            onBackdropPress={toggleModal}>
            <View style={styles.smallModal}>
              <Text>I am the modal content!</Text>
            </View>
          </Modal>

          {/* waktu, totbayar, jumlahbeli, namabrg */}
          <TouchableRipple
            onPress={() => console.log('Urutkan')}
            rippleColor="rgba(0, 0, 0, .32)">
            <View style={globalStyles.flexRow}>
              <Text style={{color: '#6200ee', marginLeft: 20}}>Urutkan</Text>
              <Button icon="chevron-down" color={'#6200ee'} />
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
        <Text style={{color: 'grey', textAlign: 'center', margin: 30}}>
          Loading...
        </Text>
      ) : (
        <View style={globalStyles.whiteContainer}>
          <FlatList
            data={penjualans}
            renderItem={({item}) => (
              <TextCard
                title={item.createdAt.toDate().toDateString().toString()}
                desc={item.items.map((item) => {
                  return `${item.jumlahBrg} x ${item.namaBrg}\n`;
                })}
                icon="cash-multiple"
                right={formatHarga(item.total)}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = {
  smallModal: {
    backgroundColor: '#fff',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
};

export default LaporanPenjualan;
