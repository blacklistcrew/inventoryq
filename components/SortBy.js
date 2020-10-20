import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {TouchableRipple, Button, Portal, Modal} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import intToBulan from '../helpers/intToBulan';
import firestore from '@react-native-firebase/firestore';

const SortBy = ({updateSesudah, pengeluarans, dispatchPengeluarans}) => {
  // modal
  const [visible, setVisible] = useState(false);
  const toggleModal = () => setVisible(!visible);
  // modal2
  const [visible2, setVisible2] = useState(false);
  const toggleModal2 = () => setVisible2(!visible2);
  // judul sortby total
  const [totalDropdown, setTotalDropdown] = useState('Terbaru');
  // judul sortby waktu
  const [waktuDropdown, setWaktuDropdown] = useState('Hari Ini');
  const [waktuList, setWaktuList] = useState([
    'Hari Ini',
    '7 Hari Terakhir',
    '30 Hari Terakhir',
  ]);

  // generate sortby waktu list
  useEffect(() => {
    firestore()
      .collection('sortby')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          const {tahunIni, bulanIni} = doc.data();
          list.push(`${intToBulan(bulanIni)} ${tahunIni}`);
        });

        setWaktuList((prevWaktu) => prevWaktu.concat(list));
      });
  }, []);

  // jika salah satu dropdown waktu dipilih
  const pressWaktu = (ygDipilih) => {
    // ubah urutan
    switch (ygDipilih) {
      case '7 Hari Terakhir':
        updateSesudah(new Date(tahunIni, bulanIni, hariIni - 7));
        break;

      case '30 Hari Terakhir':
        updateSesudah(new Date(tahunIni, bulanIni, hariIni - 30));
        break;

      default:
        updateSesudah(new Date(new Date().toLocaleDateString()));
        break;
    }

    // update tulisan dropdown
    setWaktuDropdown(ygDipilih);
    // sembunyikan modal
    toggleModal();
  };

  // jika salah satu dropdown total dipilih
  const pressTotal = (ygDipilih) => {
    // ubah urutan
    switch (ygDipilih) {
      case 'Kecil ke Besar':
        dispatchPengeluarans({
          type: 'PUSH_ITEM',
          list: pengeluarans.sort((a, b) => b.total - a.total),
        });
        break;

      case 'Besar ke Kecil':
        dispatchPengeluarans({
          type: 'PUSH_ITEM',
          list: pengeluarans.sort((a, b) => a.total - b.total),
        });
        break;

      default:
        dispatchPengeluarans({
          type: 'PUSH_ITEM',
          list: pengeluarans.sort((a, b) => a.createdAt - b.createdAt),
        });
        break;
    }

    // update tulisan dropdown
    setTotalDropdown(ygDipilih);
    // sembunyikan modal
    toggleModal2();
  };

  return (
    <View style={globalStyles.whiteContainer}>
      <View style={globalStyles.flexRow}>
        {/* waktu */}
        <TouchableRipple onPress={toggleModal} rippleColor="rgba(0, 0, 0, .32)">
          <View style={globalStyles.flexRow}>
            <Text style={styles.sortbyText}>{waktuDropdown}</Text>
            <Button icon="chevron-down" color="#6200ee" />
          </View>
        </TouchableRipple>

        {/* modal waktu */}
        <Portal>
          <Modal visible={visible} onDismiss={toggleModal}>
            <View style={styles.smallModal}>
              {waktuList.map((item, i) => (
                <TouchableRipple
                  onPress={() => pressWaktu(item)}
                  rippleColor="rgba(0, 0, 0, .32)"
                  style={styles.sortbyItem}
                  key={i.toString()}>
                  <Text>{item}</Text>
                </TouchableRipple>
              ))}
            </View>
          </Modal>
        </Portal>

        {/* waktu, totbayar, jumlahbeli, namabrg */}
        <TouchableRipple
          onPress={toggleModal2}
          rippleColor="rgba(0, 0, 0, .32)">
          <View style={globalStyles.flexRow}>
            <Text style={styles.sortbyText}>{totalDropdown}</Text>
            <Button icon="chevron-down" color="#6200ee" />
          </View>
        </TouchableRipple>

        <Portal>
          <Modal visible={visible2} onDismiss={toggleModal2}>
            <View style={styles.smallModal}>
              {totalList.map((item, i) => (
                <TouchableRipple
                  onPress={() => pressTotal(item)}
                  rippleColor="rgba(0, 0, 0, .32)"
                  style={styles.sortbyItem}
                  key={i.toString()}>
                  <Text>{item}</Text>
                </TouchableRipple>
              ))}
            </View>
          </Modal>
        </Portal>
      </View>
    </View>
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
  sortbyItem: {
    minHeight: 50,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const date = new Date();
const hariIni = date.getDate();
const bulanIni = date.getMonth();
const tahunIni = date.getFullYear();

const totalList = ['Terbaru', 'Kecil ke Besar', 'Besar ke Kecil'];

export default SortBy;
