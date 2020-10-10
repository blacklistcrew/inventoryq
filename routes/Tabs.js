import React from "react";
import { IconButton } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStack,
  DaftarBarangStack,
  PengeluaranStack,
  PenjualanStack,
} from "./Stacks";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Daftar Barang":
              iconName = focused ? "cube" : "cube-outline";
              break;
            case "Pengeluaran":
              iconName = focused
                ? "chevron-left-circle"
                : "chevron-left-circle-outline";
              break;
            case "Penjualan":
              iconName = focused ? "cash" : "cash-multiple";
              break;

            default:
              iconName = focused ? "home" : "home-outline";
              break;
          }

          // You can return any component that you like here!
          return <IconButton name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#6200ee",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Daftar Barang" component={DaftarBarangStack} />
      <Tab.Screen name="Pengeluaran" component={PengeluaranStack} />
      <Tab.Screen name="Penjualan" component={PenjualanStack} />
    </Tab.Navigator>
  );
};

export default Tabs;
