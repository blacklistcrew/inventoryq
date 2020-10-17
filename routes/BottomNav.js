import React from 'react';
import {Appbar} from 'react-native-paper';
import {navigate} from '../helpers/aturNav';

const BottomNav = () => (
  <Appbar style={styles.container}>
    {actions.map((action, i) => (
      <Appbar.Action
        icon={action.icon}
        onPress={() => navigate(action.navigate)}
        key={i.toString()}
      />
    ))}
  </Appbar>
);

const actions = [
  {icon: 'home', navigate: 'Home'},
  {icon: 'cube', navigate: 'Daftar Barang'},
  {icon: 'chevron-left-circle', navigate: 'Pengeluaran'},
  {icon: 'cash', navigate: 'Penjualan'},
];

const styles = {
  container: {
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
  },
};

export default BottomNav;
