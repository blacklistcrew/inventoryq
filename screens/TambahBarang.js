import React, {useState, useReducer} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import {
  Button,
  Snackbar,
  TouchableRipple,
  Portal,
  Modal,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import globalStyles from '../styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const initSatuan = 'Pcs';
const satuanReducer = (state = initSatuan, action) => {
  switch (action.type) {
    case 'CHANGE_SATUAN':
      return action.satuan;

    default:
      return state;
  }
};

const TambahBarang = ({navigation}) => {
  // react-hook-form
  const {control, handleSubmit, errors, reset} = useForm();
  // snackbar
  const [notif, setNotif] = useState(false);
  const toggleNotif = () => setNotif(!notif);
  const dismissNotif = () => setNotif(false);
  // satuan
  const [stateSatuan, dispatchSatuan] = useReducer(satuanReducer, initSatuan);

  // menambah brg ke db
  const addBarang = ({namaBrg, hargaBeli, hargaJual}) => {
    firestore()
      .collection('barangs')
      .add({
        namaBrg,
        hargaBeli: parseInt(hargaBeli),
        hargaJual: parseInt(hargaJual),
        satuan: stateSatuan,
        stok: 0,
        createdAt: new Date(),
      })
      .then(() => {
        console.log('barang added');
        reset();
        toggleNotif();
      })
      .catch((err) => console.log('add barang failed', err));
  };

  // tombol snackbar utk pindah ke Daftar Barang
  const snackbarAction = () => navigation.navigate('Daftar Barang');

  return (
    <ScrollView>
      {inputs.map((input, i) => (
        <View key={i.toString()}>
          {/* dr react hook form */}
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <View style={[globalStyles.whiteContainer, globalStyles.flexRow]}>
                <MaterialCommunityIcons
                  name={input.icon}
                  size={30}
                  color="grey"
                  style={styles.inputIcon}
                />

                {/* component buatan sendiri */}
                <TextInput
                  placeholder={input.label}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.textboxCari}
                  keyboardType={input.keyboardType ? 'default' : 'numeric'}
                  autoCapitalize="words"
                />
              </View>
            )}
            name={input.name}
            rules={
              input.rules
                ? {required: true}
                : {required: true, pattern: /^[1-9]\d*$/g}
            }
            defaultValue=""
          />

          {/* error */}
          {errors[input.name] && (
            <Text style={styles.error}>
              {input.error
                ? input.error
                : 'Jumlah barang harus diisi dengan benar.'}
            </Text>
          )}
        </View>
      ))}

      {/* satuan */}
      <Satuan stateSatuan={stateSatuan} dispatchSatuan={dispatchSatuan} />

      {/* tombol simpan */}
      <View style={{padding: 20}}>
        <Button mode="contained" onPress={handleSubmit(addBarang)}>
          Simpan
        </Button>
      </View>

      {/* notif */}
      <Snackbar
        visible={notif}
        onDismiss={dismissNotif}
        action={{
          label: 'Daftar Barang',
          onPress: snackbarAction,
        }}>
        Barang telah disimpan.
      </Snackbar>
    </ScrollView>
  );
};

// style
const styles = {
  textboxCari: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  inputIcon: {
    padding: 15.5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginLeft: 20,
  },
  smallModal: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  sortbyItem: {
    minHeight: 50,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// input field
const inputs = [
  {
    label: 'Nama barang',
    name: 'namaBrg',
    icon: 'cube',
    rules: true,
    keyboardType: true,
    error: 'Nama barang harus diisi.',
  },
  {
    label: 'Harga beli',
    name: 'hargaBeli',
    icon: 'chevron-left-circle',
  },
  {
    label: 'Harga jual',
    name: 'hargaJual',
    icon: 'cash-multiple',
  },
];

const Satuan = ({stateSatuan, dispatchSatuan}) => {
  // modal
  const [visible, setVisible] = useState(false);
  const toggleModal = () => setVisible(!visible);

  return (
    <View style={[globalStyles.whiteContainer, globalStyles.flexRow]}>
      {/* simbol coin */}
      <MaterialCommunityIcons
        name="database"
        size={30}
        color="grey"
        style={styles.inputIcon}
      />

      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={toggleModal}
        style={{...styles.textboxCari, flex: 1, padding: 15}}>
        <View style={globalStyles.flexRow}>
          {/* tulisan */}
          <Text style={{color: 'grey', flex: 1}}>{stateSatuan}</Text>
          {/* icon panah bawah */}
          <MaterialCommunityIcons name="chevron-down" color="grey" />
        </View>
      </TouchableRipple>

      {/* modal */}
      <Portal>
        <Modal visible={visible} onDismiss={toggleModal}>
          <View style={styles.smallModal}>
            {satuanList.map((item, i) => (
              <TouchableRipple
                onPress={() => {
                  dispatchSatuan({type: 'CHANGE_SATUAN', satuan: item});
                  toggleModal();
                }}
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
  );
};

const satuanList = [
  'Pcs',
  'Kg',
  'Liter',
  'Botol',
  'Kardus',
  'Unit',
  'Buah',
  'Meter',
];

export default TambahBarang;
