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
          list: pengeluarans.sort((a, b) => a.total - b.total),
        });
        break;

      case 'Besar ke Kecil':
        dispatchPengeluarans({
          type: 'PUSH_ITEM',
          list: pengeluarans.sort((a, b) => b.total - a.total),
        });
        break;

      default:
        dispatchPengeluarans({
          type: 'PUSH_ITEM',
          list: pengeluarans.sort(
            (a, b) => b.createdAt.toDate() - a.createdAt.toDate(),
          ),
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
        <RenderSortby
          pressDismiss={toggleModal}
          buttonTitle={waktuDropdown}
          itemList={waktuList}
          visible={visible}
          pressItem={pressWaktu}
        />

        {/* waktu, totbayar, jumlahbeli, namabrg */}
        <RenderSortby
          pressDismiss={toggleModal2}
          buttonTitle={totalDropdown}
          itemList={totalList}
          visible={visible2}
          pressItem={pressTotal}
        />
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

const RenderSortby = ({
  pressDismiss,
  buttonTitle,
  itemList,
  visible,
  pressItem,
}) => (
  <>
    {/* button */}
    <TouchableRipple onPress={pressDismiss} rippleColor="rgba(0, 0, 0, .32)">
      <View style={globalStyles.flexRow}>
        <Text style={styles.sortbyText}>{buttonTitle}</Text>
        <Button icon="chevron-down" color="#6200ee" />
      </View>
    </TouchableRipple>

    {/* item list */}
    <Portal>
      <Modal visible={visible} onDismiss={pressDismiss}>
        <View style={styles.smallModal}>
          {itemList.map((item, i) => (
            <TouchableRipple
              onPress={() => pressItem(item)}
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.sortbyItem}
              key={i.toString()}>
              <Text>{item}</Text>
            </TouchableRipple>
          ))}
        </View>
      </Modal>
    </Portal>
  </>
);

export default SortBy;
