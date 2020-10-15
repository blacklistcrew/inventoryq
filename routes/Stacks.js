import React from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import DaftarBarang from '../screens/DaftarBarang';
import Pengeluaran from '../screens/Pengeluaran';
import Penjualan from '../screens/Penjualan';
import TambahItemPenjualan from '../screens/TambahItemPenjualan';
import TambahBarang from '../screens/TambahBarang';
import LaporanPengeluaran from '../screens/LaporanPengeluaran';
import LaporanPenjualan from '../screens/LaporanPenjualan';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={({navigation}) => screenOptions(navigation)}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const DaftarBarangStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={({navigation}) => screenOptions(navigation)}>
    <Stack.Screen name="Daftar Barang" component={DaftarBarang} />
  </Stack.Navigator>
);

const PengeluaranStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={({navigation}) => screenOptions(navigation)}>
    <Stack.Screen name="Pengeluaran" component={Pengeluaran} />
  </Stack.Navigator>
);

const PenjualanStack = () => (
  <Stack.Navigator
    screenOptions={({navigation}) => screenOptions(navigation)}
    initialRouteName="Penjualan">
    <Stack.Screen name="Penjualan" component={Penjualan} />
    <Stack.Screen
      name="Tambah Item Penjualan"
      component={TambahItemPenjualan}
    />
  </Stack.Navigator>
);

const TambahBarangStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={({navigation}) => screenOptions(navigation)}>
    <Stack.Screen name="Tambah Barang" component={TambahBarang} />
  </Stack.Navigator>
);

const LaporanPengeluaranStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={({navigation}) => screenOptions(navigation)}>
    <Stack.Screen name="Laporan Pengeluaran" component={LaporanPengeluaran} />
  </Stack.Navigator>
);

const LaporanPenjualanStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={({navigation}) => screenOptions(navigation)}>
    <Stack.Screen name="Laporan Penjualan" component={LaporanPenjualan} />
  </Stack.Navigator>
);

// style
const screenOptions = (navigation) => {
  return {
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <IconButton
        onPress={() => navigation.openDrawer()}
        icon="menu"
        color="#fff"
        size={30}
      />
    ),
  };
};

export {
  HomeStack,
  DaftarBarangStack,
  PengeluaranStack,
  PenjualanStack,
  TambahBarangStack,
  LaporanPengeluaranStack,
  LaporanPenjualanStack,
};
