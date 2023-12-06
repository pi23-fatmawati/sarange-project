const sisaKoinAwal = localStorage.getItem ('totalKoin');
if(sisaKoinAwal !== null){
    document.querySelector('.total-coin').innerHTML = sisaKoinAwal;
} else {
    document.querySelector('.total-coin').innerHTML = 0;
}
// popup confirm
function showPopup(){
    const inputPhoneNumber = document.getElementById('phone');
    const numberPhone = inputPhoneNumber.value.trim();
    if(numberPhone === ''){
        alert ('Tolong isi nomor handphone');
    }else{
        const popupConfirm = document.getElementById('popup-confirm');
        popupConfirm.style.display = 'flex'

        const phoneNumber = document.getElementById('phone').value;
        sessionStorage.setItem('inputNumber', phoneNumber);
    
        let showNumber = document.getElementById('phone-number');
        showNumber.innerHTML = sessionStorage.getItem('inputNumber');
    }
}
function closePopup(){
    const popupClose = document.getElementById('popup-confirm')
    popupClose.style.display = 'none'
}
// display user
const homeUser = JSON.parse(localStorage.getItem("userSarange"));
    if (homeUser) {
        const userHomeName = document.getElementById("home-user");
        userHomeName.textContent = homeUser.nama;
    } else {
        console.error("User information not found in localStorage");
    }

// reedem koin
fetch('https://656d7962bcc5618d3c233961.mockapi.io/reedemLink')
.then(res => {
    // console.log(res);
    return res.json();
})
.then(data => {
    console.log(data)
    let displayData = document.getElementById('reedem-coin');
    data.forEach((item) => {
        // console.log(item)
        displayData.innerHTML +=
        `
            <div class="voucher-coin mt-3">
                <a href="./klaim-koin.html?id=${item.id}">
                    <div class="img-voucher">
                        <img class="img-reedem" src="${item.image}" alt="logo">
                        <div class="total-voucher">
                            <p>${item.desc}</p>
                        </div>
                    </div>
                    <div class="total-coin-voucher d-flex">
                        <h3>${item.coin}</h3>
                        <p>Koin</p>
                    </div>
                </a>
            </div>
        `;
    });
})
.catch(err => {
    console.log(err);
})
// page href dari reedem koin
document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get('id');
    // console.log(idParams)
    fetch('https://656d7962bcc5618d3c233961.mockapi.io/reedemLink/' + idParams)
    .then(res => {
    // console.log(res);
        return res.json();
    })
    .then(data => {
        console.log(data)
        // console.log(item)
            const klaimDesc = document.getElementById('klaim-desc');
            klaimDesc.innerHTML +=
            `<div class="text-klaim p-4">
             <img src="${data.image}" alt="" id="img">
            <h3>${data.desc}</h3>
            <h1>${data.coin} <span>Koin</span></h1>
            <div class="text-desc-klaim mt-3">
                <p>Hadiah akan dikirimkan oleh kami melalui email terdaftar. <br>
                Pastikan nomor tujuan pengiriman saldo sudah benar.
                </p>
                <p>Hadiah yang sudah diklaim tidak dapat dibatalkan. <br>
                Informasi lebih lanjut hubungi kami. </p>
            </div>
            <a href="./reedem-coin.html" class="btn-back">Kembali</a>
            <a href="./input-number.html" class="button-klaim">Klaim</a>
        </div>`
        
    })
    .catch(err => {
        console.log(err);
    })
})
// display coin


// dropdown menu filter table history koin
const dropdownTable = document.getElementById('dropdown-filter');
dropdownTable.addEventListener('change', tableDisplay);
function tableDisplay(){
    const tableTransaksi = document.getElementById('table-transaksi');
    const selectTable = parseInt(dropdownTable.value);
    const showRowTable = tableTransaksi.querySelectorAll('tbody tr')

   showRowTable.forEach(row => {
        row.style.display = 'none'
    });

    for(let i = 0; i < selectTable; i++){
        if(showRowTable[i]){
            showRowTable[i].style.display = ''
        }
    }
    
}
tableDisplay()

// koin berkurang ketika reedem dan catatan riwayat transaksi
function submitNumber(){
    const totalKoin = parseInt(localStorage.getItem('totalKoin'));
    const totalReedem = 700;

    if (totalKoin >= totalReedem){
        const sisaKoin = totalKoin - totalReedem;

        localStorage.setItem('totalKoin', sisaKoin);

        const transaksiBaru = {
            jumlah: totalReedem,
            tanggal: new Date().toLocaleDateString()
        };

        let transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];
        transaksi.push(transaksiBaru);
        localStorage.setItem('transaksi', JSON.stringify(transaksi));

        tampilkanTransaksi(transaksi);
        document.querySelector('total-coin').textContent = sisaKoin;
    }else{
        alert('Koin tidak mencukupi')
        window.location.href = './home.html'
    }
}

function tampilkanTransaksi(transaksi){
    const tableTransaksi = document.getElementById('table-transaksi');
    tableTransaksi.innerHTML = '';

    transaksi.forEach((item) => {
        const row = `<thead>
                        <tr>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Keterangan</th>
                            <th scope="col">Total Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${item.tanggal}</td>
                            <td>Koin ditukar</td>
                            <td>${item.jumlah}</td>
                        </tr>
                    </tbody>`;
        tableTransaksi.innerHTML += row;
    })
}

const transaksiAwal = JSON.parse(localStorage.getItem('transaksi')) || [];
tampilkanTransaksi(transaksiAwal);