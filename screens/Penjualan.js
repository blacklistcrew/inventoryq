import React, {useState} from 'react';
import {View, ScrollView, Text, StyleSheet, Modal} from 'react-native';
import {FAB} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import InputKotak from '../components/InputKotak';
import ModalCetak from '../components/ModalCetak';
import {useForm, Controller} from 'react-hook-form';
import DaftarBarang from './DaftarBarang';

const Penjualan = ({navigation}) => {
  // react-hook-form
  const {control, handleSubmit, errors} = useForm();
  // data penjualan yg ditambahkan lewat modal
  const [penjualans, setPenjualans] = useState([]);
  // penjualan yg dipilih
  const [pilih, setPilih] = useState([]);
  // modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // hapus brg yg dipilih
  const hapusPilih = () => {
    // hapus brg di state penjualans
    for (let i = 0; i < pilih.length; i++) {
      setPenjualans((prevPenjualan) =>
        prevPenjualan.filter((penj) => penj.namaBrg != pilih[i].namaBrg),
      );
    }

    // hapus brg di state pilih
    setPilih((prevPilih) =>
      prevPilih.filter((pil) => pil.namaBrg != pilih[i].namaBrg),
    );
  };

  // jika icon brg di penjualan diklik, maka icon akan berubah jd ceklist
  const togglePilih = (namaBrg) => {
    // maka brg akan msk ke state pilih
    const ada = pilih.find((pilih) => pilih.namaBrg == namaBrg);

    if (ada) {
      setPilih((prevPilih) =>
        prevPilih.filter((pilih) => pilih.namaBrg != namaBrg),
      );
    } else {
      setPilih((prevPilih) => prevPilih.concat({namaBrg}));
    }
  };

  // jika brg yg ad di modal diklik
  const tambahArr = (namaBrg, stok, harga) => {
    // maka brg akan msk ke state penjualans
    setPenjualans((prevPenjualan) =>
      prevPenjualan.concat({
        namaBrg,
        stok,
        harga,
        jumlahBrg: '',
      }),
    );
  };

  // update jumlahBrg
  const updateJumlah = (text, item) => {
    // ubah properti jumlahBrg
    const penjualanBaru = penjualans.map((penjualan) =>
      penjualan.namaBrg == item.namaBrg
        ? {...penjualan, jumlahBrg: text}
        : penjualan,
    );

    // ubah state penjualans
    setPenjualans(penjualanBaru);
  };

  // reset penjualans
  const resetPenjualan = () => setPenjualans([]);

  return (
    <>
      <ScrollView>
        {/* daftar brg yg mau dicetak */}
        {penjualans &&
          penjualans.map((penjualan) => (
            <View style={globalStyles.whiteContainer} key={penjualan.namaBrg}>
              {/* component dr react-hook-form */}
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  // component buatan sendiri berisi card & textinput
                  <TextCard
                    title={penjualan.namaBrg}
                    desc={`Stok: ${penjualan.stok}`}
                    icon={
                      pilih.find((pilih) => pilih.namaBrg == penjualan.namaBrg)
                        ? 'check-circle'
                        : 'cash-multiple'
                    }
                    rightComponent={
                      // component buatan sendiri berisi textinput
                      <InputKotak
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          updateJumlah(text, penjualan);
                          onChange(text);
                        }}
                      />
                    }
                    iconPress={() => togglePilih(penjualan.namaBrg)}
                  />
                )}
                name={penjualan.namaBrg}
                rules={{required: true, pattern: /^[1-9]\d*$/g}}
                defaultValue=""
                key={penjualan.namaBrg}
              />

              {/* error */}
              {errors[penjualan.namaBrg] && (
                <Text style={{color: 'red', marginLeft: 20}}>
                  Jumlah barang harus diisi dengan benar.
                </Text>
              )}
            </View>
          ))}

        {/* tombol simpan & modal cetak */}
        {penjualans.length == 0 ? (
          <Text style={{color: 'grey', textAlign: 'center', marginTop: 30}}>
            Belum ada barang yang dipilih.
          </Text>
        ) : (
          <ModalCetak
            items={penjualans}
            resetItems={resetPenjualan}
            handleSubmit={handleSubmit}
          />
        )}
      </ScrollView>

      {/* jika brg ad yg dipilih */}
      {pilih.length > 0 ? (
        // tombol hapus
        <FAB style={styles.fab} icon="delete" onPress={hapusPilih} />
      ) : (
        <>
          {/* tombol apung */}
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => navigation.navigate('Tambah Item Penjualan')}
          />

          {/* modal pencarian brg */}
          <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={hideModal}>
            {/* daftar barang */}
            <DaftarBarang hideModal={hideModal} tambahArr={tambahArr} />

            {/* tombol hide modal */}
            <FAB style={styles.fab} icon="close" onPress={hideModal} />
          </Modal>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    color: '#fff',
    backgroundColor: '#6200ee',
  },
});

export default Penjualan;
