import React from 'react';
import {DrawerActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function toggleDrawer(...args) {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer(...args));
}

export const route = navigationRef.current?.route;

// add other navigation functions that you need and export them below
