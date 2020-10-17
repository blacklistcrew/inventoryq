import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from './TextCard';
import {aturStok, cetak} from '../helpers/aturFirebase';
import formatHarga from '../helpers/formatHarga';

const ModalCetak = ({items, resetItems, handleSubmit, title, toggleNotif}) => {
  // trigger transaksi (tambah / krg stok)
  const [trigger, setTrigger] = useState(false);
  // modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // mengurangi / menambah stok brg
  useEffect(() => {
    const status = title == 'Pengeluaran' ? 'ditambah' : 'dikurang';

    if (trigger) {
      // tambah stok / krg stok
      items.map((item) => {
        aturStok(item.key, item.namaBrg, item.jumlahBrg, status);
      });

      // cetak setelah tambah stok / krg stok brg selesai
      setTrigger(false);
      cetak(status, items);
      resetSubmit();
    }
  }, [trigger]);

  // reset setelah submit
  const resetSubmit = () => {
    resetItems();
    hideModal();
    toggleNotif();
  };

  // menampilkan waktu terkini saat mau cetak brg
  const newDate = new Date().toDateString().toString();

  // total pengeluaran / penjualan
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = items
    .map((item) => item.jumlahBrg * item.harga)
    .reduce(reducer);

  return (
    <>
      <View style={{padding: 20}}>
        <Button mode="contained" onPress={handleSubmit(showModal)}>
          Cetak
        </Button>
      </View>

      {/* modal */}
      <Modal animationType="slide" visible={visible} onRequestClose={hideModal}>
        {/* judul */}
        <Text style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>
          Cetak {title}
        </Text>

        {/* daftar barang */}
        <View style={globalStyles.whiteContainer} style={{flex: 1}}>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <TextCard
                title={`${item.jumlahBrg}x ${item.namaBrg}`}
                desc={`${item.jumlahBrg} x Rp ${item.harga},-`}
                icon="cash-multiple"
                right={formatHarga(item.jumlahBrg * item.harga)}
              />
            )}
          />
        </View>

        <Text style={{...styles.textCetak, color: 'grey'}}>{newDate}</Text>

        <Text style={styles.textCetak}>
          <Text>Total {title} : </Text>
          <Text style={{color: 'green'}}>{formatHarga(total)}</Text>
        </Text>

        {/* tombol */}
        <View style={{...globalStyles.flexRow, paddingVertical: 50}}>
          <Button mode="contained" onPress={hideModal} color="lightgrey">
            Batal
          </Button>

          <Button mode="contained" onPress={() => setTrigger(true)}>
            Simpan
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = {
  textCetak: {
    textAlign: 'center',
    fontSize: 20,
  },
};

export default ModalCetak;
