import firestore from '@react-native-firebase/firestore';

// tambah / krg stok
export const aturStok = (items, status) => {
  items.map((item) => {
    firestore()
      .collection('barangs')
      .doc(item.key)
      .update({
        stok:
          status == 'ditambah'
            ? firestore.FieldValue.increment(item.jumlahBrg)
            : firestore.FieldValue.increment(-item.jumlahBrg),
      })
      .then(() => console.log(`stok ${item.namaBrg} ${status}`))
      .catch((err) => console.log(`stok ${item.namaBrg} gagal ${status}`, err));
  });
};

// simpan pengeluarans / penjualans
export const cetak = (status, items, total) => {
  // menentukan doc yg akan ditambah
  const doc = status == 'dikurang' ? 'penjualans' : 'pengeluarans';

  firestore()
    .collection(doc)
    .add({
      items: items.map(({stok, key, ...other}) => other),
      total,
      createdAt: new Date(),
    })
    .then(() => console.log(doc + ' added'))
    .catch((err) => console.log(`add ${doc} failed`, err));
};

// cek apa bulan & tahun tsb sdh dimasukkan di doc sortby atau blm
export const cekSortby = () => {
  const ref = firestore().collection('sortby');
  const tahunIni = new Date().getFullYear();
  const bulanIni = new Date().getMonth();

  ref
    .get()
    .then((querySnapshot) => {
      const ketemu = querySnapshot.docs.find(
        (doc) =>
          doc.data().tahunIni == tahunIni && doc.data().bulanIni == bulanIni,
      );

      console.log(ketemu ? 'sortby sdh ada' : 'sortby blm ada');

      // tambah sortby jika bulan & tahun tsb blm dimasukkan di doc sortby
      if (!ketemu) {
        ref
          .add({
            tahunIni,
            bulanIni,
            createdAt: new Date(),
          })
          .then(() => console.log('sortby added'))
          .catch((err) => console.log('add sortby failed', err));
      }
    })
    .catch((error) => console.log('Error getting documents: ', error));
};
