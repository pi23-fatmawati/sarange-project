document.addEventListener("DOMContentLoaded", function () {
  // Retrieve user information from local storage
  const userData = JSON.parse(localStorage.getItem("userSarange"));

  // Check if user data exists in local storage
  if (userData) {
    // Populate input fields with user information
    document.getElementById("namaInput").value = userData.nama;
    document.getElementById("nomorTeleponInput").value = userData.noHP;
    document.getElementById("alamatTextarea").value = userData.alamat;
  } else {
    // Handle the case when user data is not found in local storage
    console.error("User data not found in local storage");
  }

  // Add event listener for the Atur Jadwal button
  document
    .getElementById("pikcupButton")
    .addEventListener("click", function () {
      // Retrieve selected date
      const selectedDate = document.querySelector("#pickup-date input").value;

      // Retrieve selected time
      const selectedTimeElement = document.querySelector(".timeBtn:checked");
      if (selectedTimeElement) {
        const selectedTime = selectedTimeElement.value;

        // Create a new object with the pickup information
        const pickupData = {
          nama: document.getElementById("namaInput").value,
          noHP: document.getElementById("nomorTeleponInput").value,
          alamat: document.getElementById("alamatTextarea").value,
          jadwal: selectedTime,
          tanggal: selectedDate,
        };

        // Retrieve the existing data from localStorage
        let existingData =
          JSON.parse(localStorage.getItem("jadwalPengiriman")) || [];

        // Add the new data to the array
        existingData.push(pickupData);

        // Save the updated array back to localStorage
        localStorage.setItem("jadwalPengiriman", JSON.stringify(existingData));

        // Perform further actions with the selected date and time (e.g., API request)
        console.log("Data Jadwal Pengiriman:", existingData);
      } else {
        console.error("No time selected");
      }
    });
});
