import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  TambahBarangStack,
  LaporanPengeluaranStack,
  LaporanPenjualanStack,
} from './Stacks';
import Tabs from './Tabs';

const Drawer = createDrawerNavigator();
const Drawers = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#6200ee',
      activeBackgroundColor: '#e3c9ff',
    }}>
    <Drawer.Screen name="Home" component={Tabs} />
    <Drawer.Screen name="Tambah Barang" component={TambahBarangStack} />
    <Drawer.Screen
      name="Laporan Pengeluaran"
      component={LaporanPengeluaranStack}
    />
    <Drawer.Screen name="Laporan Penjualan" component={LaporanPenjualanStack} />
  </Drawer.Navigator>
);

export default Drawers;
