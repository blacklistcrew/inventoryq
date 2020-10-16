import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from './TextCard';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const ModalCetak = ({items, resetItems, handleSubmit, title, toggleNotif}) => {
  // trigger transaksi (tambah / krg stok)
  const [trigger, setTrigger] = useState(false);
  // modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // total pengeluaran
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = items
    .map((item) => item.jumlahBrg * item.harga)
    .reduce(reducer);

  // mengurangi / menambah stok brg
  useEffect(() => {
    if (trigger) {
      // tambah stok
      items.map((item) => {
        firestore()
          .collection('barangs')
          .doc(item.key)
          .update({
            stok: firebase.firestore.FieldValue.increment(item.jumlahBrg),
          })
          .then(() => console.log(`stok ${item.namaBrg} ditambah`))
          .catch((err) =>
            console.log(`stok ${item.namaBrg} gagal ditambah`, err),
          );
      });

      // cetak setelah tambah stok / krg stok brg selesai
      setTrigger(false);
      cetak();
    }
  }, [trigger]);

  // menentukan doc
  const doc = title == 'Penjualan' ? 'penjualans' : 'pengeluarans';

  // simpan ke doc penjualans / pengeluarans
  const cetak = () => {
    firestore()
      .collection(doc)
      .add({
        items: items.map(({stok, key, ...other}) => other),
        total,
        createdAt: new Date(),
      })
      .then(() => {
        console.log(doc + ' added');
        resetSubmit();
      })
      .catch((err) => console.log(`add ${doc} failed`, err));
  };

  // reset setelah submit
  const resetSubmit = () => {
    resetItems();
    hideModal();
    toggleNotif();
  };

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
                right={`Rp ${item.jumlahBrg * item.harga},-`}
              />
            )}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>

        <Text style={{textAlign: 'center', fontSize: 20}}>
          <Text>Total {title} : </Text>
          <Text style={{color: 'green'}}>Rp {total},-</Text>
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

export default ModalCetak;
