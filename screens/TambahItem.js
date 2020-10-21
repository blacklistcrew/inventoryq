import React from 'react';
import TextCard from '../components/TextCard';
import formatHarga from '../helpers/formatHarga';
import Barangs from '../components/Barangs';

const TambahItem = ({route, navigation}) => {
  // render brg yg akan dipilih
  const renderFlatlist = ({item}) => {
    // menentukan harga yg akan akumulasi
    const harga =
      route.params?.title == 'Pengeluaran' ? item.hargaBeli : item.hargaJual;

    return (
      <TextCard
        title={item.namaBrg}
        desc={`Stok: ${item.stok}`}
        icon="cube"
        right={formatHarga(harga)}
        onPress={() =>
          navigation.navigate(route.params?.title, {
            screen: route.params?.title,
            params: {
              brgKey: item.key,
              namaBrg: item.namaBrg,
              stok: item.stok,
              harga,
            },
          })
        }
      />
    );
  };

  return (
    <Barangs renderFlatlist={renderFlatlist} title={route.params?.title} />
  );
};

export default TambahItem;
