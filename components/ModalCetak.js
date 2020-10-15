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

  // menentukan tbl
  const tbl = title == 'Penjualan' ? 'penjualans' : 'pengeluarans';

  // tombol cetak
  const cetak = () => {
    firestore()
      .collection(tbl)
      .add({
        items: items.map(({stok, ...other}) => other),
        total,
        createdAt: new Date(),
      })
      .then(() => {
        console.log(tbl + ' added');
        resetSubmit();
      })
      .catch((err) => console.log(`add ${tbl} failed`, err));
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

          <Button mode="contained" onPress={cetak}>
            Simpan
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default ModalCetak;
