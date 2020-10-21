import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {FAB, Snackbar, Colors} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import InputKotak from '../components/InputKotak';
import ModalCetak from '../components/ModalCetak';
import {useForm, Controller} from 'react-hook-form';

const Penjualan = ({navigation, route}) => {
  // react-hook-form
  const {control, handleSubmit, errors} = useForm();
  // data penjualan yg ditambahkan lewat modal
  const [penjualans, setPenjualans] = useState([]);
  // penjualan yg dipilih
  const [pilih, setPilih] = useState([]);
  // snackbar
  const [notif, setNotif] = useState(false);
  const toggleNotif = () => setNotif(!notif);
  const dismissNotif = () => setNotif(false);

  // hapus brg yg dipilih
  const hapusPilih = () => {
    for (let i = 0; i < pilih.length; i++) {
      // hapus brg di state penjualans
      setPenjualans((prevPenjualan) =>
        prevPenjualan.filter((penj) => penj.namaBrg != pilih[i].namaBrg),
      );

      // hapus brg di state pilih
      setPilih((prevPilih) =>
        prevPilih.filter((pil) => pil.namaBrg != pilih[i].namaBrg),
      );
    }
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
  useEffect(() => {
    // maka brg akan msk ke state penjualans
    if (route.params) {
      setPenjualans((prevPenjualan) =>
        prevPenjualan.concat({
          key: route.params?.brgKey,
          namaBrg: route.params?.namaBrg,
          stok: route.params?.stok,
          hargaJual: route.params?.harga,
          jumlahBrg: '',
        }),
      );
    }
  }, [route.params]);

  // update jumlahBrg
  const updateJumlah = (text, item) => {
    // ubah properti jumlahBrg
    const penjualanBaru = penjualans.map((penjualan) =>
      penjualan.namaBrg == item.namaBrg
        ? {...penjualan, jumlahBrg: parseInt(text)}
        : penjualan,
    );

    // ubah state penjualans
    setPenjualans(penjualanBaru);
  };

  // reset penjualans
  const resetPenjualan = () => setPenjualans([]);

  // pindah ke screen TambahItem
  const tambahItem = () =>
    navigation.navigate('Tambah Item', {
      screen: 'Tambah Item',
      params: {title: 'Penjualan'},
    });

  // pindah ke screen Laporan Penjualan
  const laporan = () => navigation.navigate('Laporan Penjualan');

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
                <Text style={styles.errorText}>
                  Jumlah barang harus diisi dengan benar.
                </Text>
              )}
            </View>
          ))}

        {/* tombol simpan & modal cetak */}
        {penjualans.length == 0 ? (
          <Text style={styles.loadingText}>Belum ada barang yang dipilih.</Text>
        ) : (
          <ModalCetak
            items={penjualans}
            resetItems={resetPenjualan}
            handleSubmit={handleSubmit}
            title="Penjualan"
            toggleNotif={toggleNotif}
          />
        )}
      </ScrollView>

      {/* pindah ke screen Laporan Penjualan */}
      <FAB
        style={{...styles.fab, bottom: 100, backgroundColor: Colors.blue500}}
        icon="newspaper"
        onPress={laporan}
      />

      {/* jika brg ad yg dipilih */}
      {pilih.length > 0 ? (
        // tombol hapus
        <FAB style={styles.fab} icon="delete" onPress={hapusPilih} />
      ) : (
        // tombol apung & modal pencarian brg
        <FAB
          style={{...styles.fab, backgroundColor: '#6200ee'}}
          icon="plus"
          onPress={tambahItem}
        />
      )}

      {/* Notif */}
      <Snackbar
        visible={notif}
        onDismiss={dismissNotif}
        action={{
          label: 'TUTUP',
          onPress: dismissNotif,
        }}>
        Penjualan telah disimpan.
      </Snackbar>
    </>
  );
};

const styles = {
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    color: '#fff',
    backgroundColor: Colors.red500,
  },
  loadingText: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
  },
};

export default Penjualan;
