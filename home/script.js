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


