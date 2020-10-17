import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import DaftarBarang from '../screens/DaftarBarang';
import Pengeluaran from '../screens/Pengeluaran';
import Penjualan from '../screens/Penjualan';
import TambahBarang from '../screens/TambahBarang';
import LaporanPengeluaran from '../screens/LaporanPengeluaran';
import LaporanPenjualan from '../screens/LaporanPenjualan';

const Drawer = createDrawerNavigator();

const Drawers = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#6200ee',
      activeBackgroundColor: '#e3c9ff',
    }}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Daftar Barang" component={DaftarBarang} />
    <Drawer.Screen name="Tambah Barang" component={TambahBarang} />
    <Drawer.Screen name="Pengeluaran" component={Pengeluaran} />
    <Drawer.Screen name="Penjualan" component={Penjualan} />
    <Drawer.Screen name="Laporan Pengeluaran" component={LaporanPengeluaran} />
    <Drawer.Screen name="Laporan Penjualan" component={LaporanPenjualan} />
  </Drawer.Navigator>
);

export default Drawers;
