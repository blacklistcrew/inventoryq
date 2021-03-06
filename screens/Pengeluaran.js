import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {FAB, Snackbar, Colors} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';
import InputKotak from '../components/InputKotak';
import Fab from '../components/Fab';
import ModalCetak from '../components/ModalCetak';
import {useForm, Controller} from 'react-hook-form';

const Pengeluaran = ({navigation}) => {
  // react-hook-form
  const {control, handleSubmit, errors} = useForm();
  // data pengeluaran yg ditambahkan lewat modal
  const [pengeluarans, setPengeluarans] = useState([]);
  // pengeluaran yg dipilih
  const [pilih, setPilih] = useState([]);
  // snackbar
  const [notif, setNotif] = useState(false);
  const toggleNotif = () => setNotif(!notif);
  const dismissNotif = () => setNotif(false);

  // hapus brg yg dipilih
  const hapusPilih = () => {
    for (let i = 0; i < pilih.length; i++) {
      // hapus brg di state pengeluarans
      setPengeluarans((prevPengeluaran) =>
        prevPengeluaran.filter((penj) => penj.namaBrg != pilih[i].namaBrg),
      );

      // hapus brg di state pilih
      setPilih((prevPilih) =>
        prevPilih.filter((pil) => pil.namaBrg != pilih[i].namaBrg),
      );
    }
  };

  // jika icon brg di pengeluaran diklik, maka icon akan berubah jd ceklist
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
  const tambahArr = (key, namaBrg, stok, hargaBeli) => {
    // maka brg akan msk ke state pengeluarans
    setPengeluarans((prevPengeluaran) =>
      prevPengeluaran.concat({
        key,
        namaBrg,
        stok,
        hargaBeli,
        jumlahBrg: '',
      }),
    );
  };

  // update jumlahBrg
  const updateJumlah = (text, item) => {
    // ubah properti jumlahBrg
    const pengeluaranBaru = pengeluarans.map((pengeluaran) =>
      pengeluaran.namaBrg == item.namaBrg
        ? {...pengeluaran, jumlahBrg: parseInt(text)}
        : pengeluaran,
    );

    // ubah state pengeluarans
    setPengeluarans(pengeluaranBaru);
  };

  // reset pengeluarans
  const resetPengeluaran = () => setPengeluarans([]);

  // pindah ke screen Laporan Pengeluaran
  const laporan = () => navigation.navigate('Laporan Pengeluaran');

  return (
    <>
      <ScrollView>
        {/* daftar brg yg mau dicetak */}
        {pengeluarans &&
          pengeluarans.map((pengeluaran) => (
            <View style={globalStyles.whiteContainer} key={pengeluaran.namaBrg}>
              {/* component dr react-hook-form */}
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  // component buatan sendiri berisi card & textinput
                  <TextCard
                    title={pengeluaran.namaBrg}
                    desc={`Stok: ${pengeluaran.stok}`}
                    icon={
                      pilih.find(
                        (pilih) => pilih.namaBrg == pengeluaran.namaBrg,
                      )
                        ? 'check-circle'
                        : 'cash-multiple'
                    }
                    rightComponent={
                      // component buatan sendiri berisi textinput
                      <InputKotak
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          updateJumlah(text, pengeluaran);
                          onChange(text);
                        }}
                      />
                    }
                    iconPress={() => togglePilih(pengeluaran.namaBrg)}
                  />
                )}
                name={pengeluaran.namaBrg}
                rules={{required: true, pattern: /^[1-9]\d*$/g}}
                defaultValue=""
                key={pengeluaran.namaBrg}
              />

              {/* error */}
              {errors[pengeluaran.namaBrg] && (
                <Text style={{color: 'red', marginLeft: 20}}>
                  Jumlah barang harus diisi dengan benar.
                </Text>
              )}
            </View>
          ))}

        {/* tombol simpan & modal cetak */}
        {pengeluarans.length == 0 ? (
          <Text style={styles.loadingText}>Belum ada barang yang dipilih.</Text>
        ) : (
          <ModalCetak
            items={pengeluarans}
            resetItems={resetPengeluaran}
            handleSubmit={handleSubmit}
            title="Pengeluaran"
            toggleNotif={toggleNotif}
          />
        )}
      </ScrollView>

      {/* pindah ke screen Laporan Penjualan */}
      <FAB
        style={{...styles.fab, bottom: 100, backgroundColor: Colors.purple500}}
        icon="newspaper"
        onPress={laporan}
      />

      {/* jika brg ad yg dipilih */}
      {pilih.length > 0 ? (
        // tombol apung & modal pencarian brg
        <FAB style={styles.fab} icon="delete" onPress={hapusPilih} />
      ) : (
        // tombol hapus
        <Fab tambahArr={tambahArr} title="Pengeluaran" />
      )}

      {/* Notif */}
      <Snackbar
        visible={notif}
        onDismiss={dismissNotif}
        action={{
          label: 'TUTUP',
          onPress: dismissNotif,
        }}>
        Pengeluaran telah disimpan.
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
    backgroundColor: 'red',
  },
  loadingText: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 30,
  },
};

export default Pengeluaran;
