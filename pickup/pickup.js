document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userSarange"));
  if (userData) {
    document.getElementById("namaInput").value = userData.nama;
    document.getElementById("nomorTeleponInput").value = userData.noHP;
    document.getElementById("alamatTextarea").value = userData.alamat;
  } else {
    console.error("User data not found in local storage");
  }

  let radioButtons = document.querySelectorAll('input[name="timeBtn"]');
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      radioButtons.forEach((otherRadioButton) => {
        if (otherRadioButton !== radioButton) {
          otherRadioButton.checked = false;
          otherRadioButton.parentElement.style.backgroundColor = "transparent";
          otherRadioButton.parentElement.style.color = "black";
        }
      });
      if (radioButton.checked) {
        radioButton.parentElement.style.backgroundColor = "#52C41A";
        radioButton.parentElement.style.color = "white";
      } else {
        radioButton.parentElement.style.backgroundColor = "transparent";
      }
    });
  });
  function generateId(prefix) {
    const uniqueNumber = Date.now();
    const randomComponent = Math.floor(Math.random() * 1000);
    return `${prefix}-${uniqueNumber}-${randomComponent}`;
}

document.getElementById("pickupButton").addEventListener("click", function () {
    const selectedDate = document.querySelector("#pickup-date input").value;
    const selectedTime = document.querySelector('input[name="timeBtn"]:checked').value;
    
    if (selectedTime !== null) {
        const orderID = generateId("ORDER");

        const pickupData = {
            orderID: orderID,  // Add orderID to the pickupData
            nama: document.getElementById("namaInput").value,
            noHP: document.getElementById("nomorTeleponInput").value,
            alamat: document.getElementById("alamatTextarea").value,
            jadwal: selectedTime,
            tanggal: selectedDate,
        };
        const jadwalKirim = {
            jadwal: selectedTime
        };
        const tanggalKirim = {
            tanggal: selectedDate,
        };
        const statusData = {
            status: "diproses",
        };
        
        localStorage.setItem("orderID", JSON.stringify(orderID));
        localStorage.setItem("jadwalPengiriman", JSON.stringify(pickupData));
        localStorage.setItem("jadwalKirim", JSON.stringify(jadwalKirim));
        localStorage.setItem("tanggalKirim", JSON.stringify(tanggalKirim));
        localStorage.setItem("statusKirim", JSON.stringify(statusData));

        console.log("Data Jadwal Pengiriman:", pickupData);
        const modalTitle = document.querySelector(".modal-title");
        const modalBody = document.querySelector(".modal-body");
        modalTitle.textContent = "Jadwal penjemputan berhasil diatur.";
        modalBody.innerHTML = `<p>Segera siapkan sampahmu ya! <br> Jadwal Penjemputan: ${selectedDate}, pukul ${selectedTime} WIB.</p>`;
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        myModal.show();
    } else {
        const modalTitle = document.querySelector(".modal-title");
        const modalBody = document.querySelector(".modal-body");
        modalTitle.textContent = "Jadwal penjemputan gagal diatur.";
        modalBody.innerHTML = `<p>Mohon pilih tanggal dan waktu yang valid.</p>`;
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        myModal.show();
    }
  });
});