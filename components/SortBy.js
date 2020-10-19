import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableRipple, Button, Portal, Modal} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';

const SortBy = ({updateSesudah, pengeluarans, updatePengeluarans}) => {
  // modal
  const [visible, setVisible] = useState(false);
  const toggleModal = () => setVisible(!visible);
  // modal2
  const [visible2, setVisible2] = useState(false);
  const toggleModal2 = () => setVisible2(!visible2);
  // judul sortby total
  const [totalDropdown, setTotalDropdown] = useState('Urutkan');
  // judul sortby waktu
  const [waktuDropdown, setWaktuDropdown] = useState('Hari Ini');

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
        updatePengeluarans(pengeluarans.sort((a, b) => b.total - a.total));
        break;

      default:
        updatePengeluarans(pengeluarans.sort((a, b) => a.total - b.total));
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
              <TouchableRipple
                onPress={() => pressWaktu('Hari Ini')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.sortbyItem}>
                <Text>Hari Ini</Text>
              </TouchableRipple>

              <TouchableRipple
                onPress={() => pressWaktu('7 Hari Terakhir')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.sortbyItem}>
                <Text>7 Hari Terakhir</Text>
              </TouchableRipple>

              <TouchableRipple
                onPress={() => pressWaktu('30 Hari Terakhir')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.sortbyItem}>
                <Text>30 Hari Terakhir</Text>
              </TouchableRipple>
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
              <TouchableRipple
                onPress={() => pressTotal('Kecil ke Besar')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.sortbyItem}>
                <Text>Kecil ke Besar</Text>
              </TouchableRipple>

              <TouchableRipple
                onPress={() => pressTotal('Besar ke Kecil')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.sortbyItem}>
                <Text>Besar ke Kecil</Text>
              </TouchableRipple>
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

export default SortBy;
