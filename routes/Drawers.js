import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Stacks from './Stacks';

const Drawer = createDrawerNavigator();
const Drawers = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#6200ee',
      activeBackgroundColor: '#e3c9ff',
    }}>
    <Drawer.Screen name="Home" component={Stacks.HomeStack} />
    <Drawer.Screen name="Daftar Barang" component={Stacks.DaftarBarangStack} />
    <Drawer.Screen name="Tambah Barang" component={Stacks.TambahBarangStack} />
    <Drawer.Screen name="Pengeluaran" component={Stacks.PengeluaranStack} />
    <Drawer.Screen name="Penjualan" component={Stacks.PenjualanStack} />
    <Drawer.Screen
      name="Laporan Pengeluaran"
      component={Stacks.LaporanPengeluaranStack}
    />
    <Drawer.Screen
      name="Laporan Penjualan"
      component={Stacks.LaporanPenjualanStack}
    />
  </Drawer.Navigator>
);

export default Drawers;
