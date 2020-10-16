import React from 'react';
import {View, FlatList, Text, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from './TextCard';
import firestore from '@react-native-firebase/firestore';

const ModalCetak = ({items, resetItems, handleSubmit, title, toggleNotif}) => {
  // modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // total pengeluaran
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = items
    .map((item) => parseInt(item.jumlahBrg) * item.harga)
    .reduce(reducer);

  // menentukan doc
  const doc = title == 'Penjualan' ? 'penjualans' : 'pengeluarans';

  // mengurangi / menambah stok brg
  const transaksi = () => {
    return firestore()
      .runTransaction(function (transaction) {
        items.map((item) => {
          const docRef = firestore().collection(doc).doc(item.namaBrg);
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(docRef).then(function (sfDoc) {
            if (!sfDoc.exists) {
              throw `document ${item.key} does not exist`;
            }

            // menambah stok brg sesuai jumlahBrg
            const newStok = sfDoc.data().stok + item.jumlahBrg;
            transaction.update(docRef, {stok: newStok});
          });
        });
      })
      .then(() => {
        console.log(`stok brg berhasil ditambah`);
        cetak();
      })
      .catch((error) => console.log(`transaction failed: `, error));
  };

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
                right={`Rp ${parseInt(item.jumlahBrg) * item.harga},-`}
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

          <Button mode="contained" onPress={() => transaksi()}>
            Simpan
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default ModalCetak;
