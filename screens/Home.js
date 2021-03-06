import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import TextCard from '../components/TextCard';

const Home = ({navigation}) => (
  <ScrollView>
    {/* menu di hal home */}
    <View style={globalStyles.whiteContainer}>
      <View style={styles.menuContainer}>
        {menuAtas.map((menu, i) => (
          <View style={styles.menuItemContainer} key={i.toString()}>
            <IconButton
              icon={menu.icon}
              color={menu.color}
              size={40}
              onPress={() => navigation.navigate(menu.navigate)}
            />
            <Text style={{color: menu.color}}>{menu.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuContainer}>
        {menuBawah.map((menu, i) => (
          <View style={styles.menuItemContainer} key={i.toString()}>
            <IconButton
              icon={menu.icon}
              color={menu.color}
              size={40}
              onPress={() => navigation.navigate(menu.navigate)}
            />
            <Text style={{color: menu.color}}>{menu.text}</Text>
            <Text style={{color: menu.color}}>{menu.text2}</Text>
          </View>
        ))}
      </View>
    </View>

    {/* penjualan di hal home */}
    <View style={globalStyles.whiteContainer}>
      <TextCard
        title="Penjualan"
        desc="Hari Ini"
        icon="cash-multiple"
        right="Rp 100.000,-"
      />

      <TextCard
        title="Penjualan"
        desc="Oktober 2020"
        icon="cash-multiple"
        right="Rp 1000.000,-"
      />
    </View>
  </ScrollView>
);

const styles = {
  menuContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuItemContainer: {
    alignItems: 'center',
  },
};

const menuAtas = [
  {
    icon: 'cube',
    color: Colors.orange500,
    text: 'Barang',
    navigate: 'Daftar Barang',
  },
  {
    icon: 'chevron-left-circle',
    color: Colors.red500,
    text: 'Pengeluaran',
    navigate: 'Pengeluaran',
  },
  {
    icon: 'cash-multiple',
    color: Colors.green500,
    text: 'Penjualan',
    navigate: 'Penjualan',
  },
];

const menuBawah = [
  {
    icon: 'plus',
    color: Colors.brown500,
    text: 'Tambah',
    text2: 'Barang',
    navigate: 'Tambah Barang',
  },
  {
    icon: 'newspaper',
    color: Colors.purple500,
    text: 'Laporan',
    text2: 'Pengeluaran',
    navigate: 'Laporan Pengeluaran',
  },
  {
    icon: 'newspaper',
    color: Colors.blue500,
    text: 'Laporan',
    text2: 'Penjualan',
    navigate: 'Laporan Penjualan',
  },
];

export default Home;
