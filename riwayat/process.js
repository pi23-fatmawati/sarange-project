// Mengambil nilai dari setiap kunci di lokal storage
const jadwal = JSON.parse(localStorage.getItem("jadwalKirim")) || {};
const tanggal = JSON.parse(localStorage.getItem("tanggalKirim")) || {};
const totalKoin = JSON.parse(localStorage.getItem("koinSemua")) || {};
const jumlahBarang = JSON.parse(localStorage.getItem("cartCount")) || {};
const detailBarang = JSON.parse(localStorage.getItem("jualBarang")) || {};

// Membuat objek baru yang berisi nilai dari kunci-kunci tersebut
const riwayatProses = {
  jadwal: jadwal,
  tanggal: tanggal,
  totalKoin: totalKoin,
  jumlahBarang: jumlahBarang,
  detailBarang: detailBarang,
};

// Menyimpan objek baru "riwayatJual" di lokal storage
localStorage.setItem("riwayatProses", JSON.stringify(riwayatProses));

// Menampilkan hasil
console.log(JSON.parse(localStorage.getItem("riwayatProses")));
