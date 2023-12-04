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

// popup confirm
function showPopup(){
    const popupConfirm = document.getElementById('popup-confirm');
    popupConfirm.style.display = 'flex'

    const phoneNumber = document.getElementById('phone').value;
    sessionStorage.setItem('inputNumber', phoneNumber);
    
    let showNumber = document.getElementById('phone-number');
    showNumber.innerHTML = sessionStorage.getItem('inputNumber');
}
function closePopup(){
    const popupClose = document.getElementById('popup-confirm')
    popupClose.style.display = 'none'
}

// reedem koin
fetch('https://656d7962bcc5618d3c233961.mockapi.io/reedemLink')
.then(res => {
    // console.log(res);
    return res.json();
})
.then(data => {
    // console.log(data)
    let displayData = document.getElementById('reedem-coin');
    data.forEach((item, index) => {
        console.log(item)
        displayData.insertAdjacentHTML('beforeend',
        `
            <div class="voucher-coin mt-3">
                <a href="./klaim-gopay-20k.html#${index + 1}">
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
        `);
    });
})
.catch(err => {
    console.log(err);
})

// function updateContent(){
//     const fragment = window.location.hash.substr(1);

//     const klaimDesc = document.getElementById('klaim-desc');
//     const textDescKlaim = document.querySelector('.text-desc-klaim');

//     switch (fragment){
//         case '1':
//             klaimDesc.innerHTML = `
//             <div class="text-klaim p-4">
//                 <img src="../assets/gopay-logo.png" alt="">
//                 <h3>Saldo Gopay Rp. 20.000</h3>
//                 <h1>300 <span>Koin</span></h1>
//                 <div class="text-desc-klaim mt-3">
//                     <p>Dapatkan saldo gopay sebesar Rp. 20.000.</p>
//                     <p>Hadiah akan dikirimkan oleh kami melalui email terdaftar. <br>
//                     Pastikan nomor tujuan pengiriman saldo sudah benar.
//                     </p>
//                     <p>Hadiah yang sudah diklaim tidak dapat dibatalkan. <br>
//                     Informasi lebih lanjut hubungi kami. </p>
//                 </div>
//                 <a href="./reedem-coin.html" class="btn-back">Kembali</a>
//                 <a href="./input-number.html" class="button-klaim">Klaim</a>
//             </div>`;
//             break;
//         case '2':
//             klaimDesc.innerHTML = `
//             <div class="text-klaim p-4">
//                 <img src="../assets/dana-logo.png" alt="">
//                 <h3>Saldo Dana Rp. 20.000</h3>
//                 <h1>300 <span>Koin</span></h1>
//                 <div class="text-desc-klaim mt-3">
//                     <p>Dapatkan saldo dana sebesar Rp. 20.000.</p>
//                     <p>Hadiah akan dikirimkan oleh kami melalui email terdaftar. <br>
//                     Pastikan nomor tujuan pengiriman saldo sudah benar.
//                     </p>
//                     <p>Hadiah yang sudah diklaim tidak dapat dibatalkan. <br>
//                     Informasi lebih lanjut hubungi kami. </p>
//                 </div>
//                 <a href="./reedem-coin.html" class="btn-back">Kembali</a>
//                 <a href="./input-number.html" class="button-klaim">Klaim</a>
//             </div>`
//     }
// }
// document.addEventListener('DOMContentLoaded', updateContent);
// window.addEventListener('hashchange', updateContent);

// // konten reedem
// fetch('https://656bda9ee1e03bfd572ddc89.mockapi.io/sarange/klaimKoin');
// then(res =>{
//     return res.json();
//     console.log(res);
// })
// .then(data =>{
//     let displayContent = document.getElementById('klaim-desc');

//     data.map((content) =>{
//         displayContent.innerHTML = 
//         `<div class="text-klaim p-4">
//             <img src="${content.image}" alt="">
//             <h3>Saldo Gopay Rp. 20.000</h3>
//             <h1>300 <span>Koin</span></h1>
//             <div class="text-desc-klaim mt-3">
//                 <p>Dapatkan saldo gopay sebesar Rp. 20.000.</p>
//                 <p>Hadiah akan dikirimkan oleh kami melalui email terdaftar. <br>
//                 Pastikan nomor tujuan pengiriman saldo sudah benar.
//                 </p>
//                 <p>Hadiah yang sudah diklaim tidak dapat dibatalkan. <br>
//                 Informasi lebih lanjut hubungi kami. </p>
//             </div>
//             <a href="./reedem-coin.html" class="btn-back">Kembali</a>
//             <a href="./input-number.html" class="button-klaim">Klaim</a>
//         </div>`
//     })
// });


