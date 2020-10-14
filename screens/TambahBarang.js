import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {Button, TextInput, Snackbar} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import globalStyles from '../styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const TambahBarang = ({navigation}) => {
  const {control, handleSubmit, errors, reset} = useForm();
  const [notif, setNotif] = React.useState(false);
  const toggleNotif = () => setNotif(!notif);
  const dismissNotif = () => setNotif(false);

  // menambah brg ke db
  const addBarang = ({namaBrg, hargaBeli, hargaJual}) => {
    firestore()
      .collection('barangs')
      .add({
        namaBrg,
        hargaBeli: parseInt(hargaBeli),
        hargaJual: parseInt(hargaJual),
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
                  label={input.label}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.inputStyle}
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

      <View style={{padding: 20}}>
        <Button mode="contained" onPress={handleSubmit(addBarang)}>
          Simpan
        </Button>
      </View>

      {/* Notif */}
      <Snackbar
        visible={notif}
        onDismiss={dismissNotif}
        action={{
          label: 'Daftar Barang',
          onPress: () => navigation.navigate('Daftar Barang'),
        }}>
        Barang telah disimpan.
      </Snackbar>
    </ScrollView>
  );
};

// style
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
  inputIcon: {
    padding: 15.5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  error: {
    color: 'red',
    marginLeft: 20,
  },
});

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
    icon: 'cash-multiple',
  },
  {
    label: 'Harga jual',
    name: 'hargaJual',
    icon: 'cash-multiple',
  },
];

export default TambahBarang;
