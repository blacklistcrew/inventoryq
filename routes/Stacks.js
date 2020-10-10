import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import DaftarBarang from "../screens/DaftarBarang";
import Pengeluaran from "../screens/Pengeluaran";
import Penjualan from "../screens/Penjualan";
import TambahBarang from "../screens/TambahBarang";
import LaporanPengeluaran from "../screens/LaporanPengeluaran";
import LaporanPenjualan from "../screens/LaporanPenjualan";

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export const DaftarBarangStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="DaftarBarang" component={DaftarBarang} />
  </Stack.Navigator>
);

export const PengeluaranStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="Pengeluaran" component={Pengeluaran} />
  </Stack.Navigator>
);

export const PenjualanStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="Penjualan" component={Penjualan} />
  </Stack.Navigator>
);

export const TambahBarangStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="TambahBarang" component={TambahBarang} />
  </Stack.Navigator>
);

export const LaporanPengeluaranStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="LaporanPengeluaran" component={LaporanPengeluaran} />
  </Stack.Navigator>
);

export const LaporanPenjualanStack = () => (
  <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
    <Stack.Screen name="LaporanPenjualan" component={LaporanPenjualan} />
  </Stack.Navigator>
);

// style
const screenOptions = {
  headerStyle: {
    backgroundColor: "#6200ee",
  },
  headerTintColor: "#fff",
};
