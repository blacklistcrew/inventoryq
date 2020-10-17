import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {toggleDrawer, route} from './RootNavigation';

console.log(route);

const TopNav = () => (
  <Appbar style={styles.bottom}>
    <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
    {/* <Appbar.Content title={route.name} /> */}
  </Appbar>
);

const styles = StyleSheet.create({
  bottom: {
    left: 0,
    right: 0,
    top: 0,
  },
});

export default TopNav;
