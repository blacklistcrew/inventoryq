import firestore from '@react-native-firebase/firestore';

// tambah / krg stok
export const aturStok = (key, namaBrg, jumlahBrg, status) => {
  firestore()
    .collection('barangs')
    .doc(key)
    .update({
      stok:
        status == 'ditambah'
          ? firestore.FieldValue.increment(jumlahBrg)
          : firestore.FieldValue.increment(-jumlahBrg),
    })
    .then(() => console.log(`stok ${namaBrg} ${status}`))
    .catch((err) => console.log(`stok ${namaBrg} gagal ${status}`, err));
};

// simpan pengeluarans / penjualans
export const cetak = (status, items, total) => {
  // menentukan doc yg akan ditambah
  const doc = status == 'dikurang' ? 'penjualans' : 'pengurangans';

  firestore()
    .collection(doc)
    .add({
      items: items.map(({stok, key, ...other}) => other),
      total,
      createdAt: new Date(),
    })
    .then(() => {
      console.log(doc + ' added');
    })
    .catch((err) => console.log(`add ${doc} failed`, err));
};
