document.addEventListener("DOMContentLoaded", function () {
    const cartData =JSON.parse(localStorage.getItem("productDetails")) || [];
    const tableBody = document.getElementById("table-body");
    const totalProdukElement = document.getElementById("total-jumlah");
    const totalPoinElement = document.getElementById("total-poin");
    const setButton = document.getElementById("set-button");
  
    let totalProduk = 0;
    let totalPoin = 0;
  
    function updateTotals() {
      totalProduk = 0;
      totalPoin = 0;
      let koinSemua = 0;
  
      const checkboxes = document.querySelectorAll(".checkbox");
      checkboxes.forEach((checkbox, index) => {
        const counterSpan = document.querySelector(
          `#table-body tr:nth-child(${index + 1}) .counter`
        );
        const koin = cartData[index].coin;
  
        if (checkbox.checked) {
          const counterValue = parseInt(counterSpan.textContent);
          totalProduk += counterValue;
          totalPoin += counterValue * koin;
          koinSemua += counterValue * koin;
        }
      });
  
      totalProdukElement.textContent = totalProduk;
      totalPoinElement.textContent = totalPoin;
  
      setButton.disabled = !isAnyCheckboxChecked();
      localStorage.setItem("koinSemua", koinSemua);
    }
  
    cartData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <th scope="row"><input type="checkbox" class="checkbox" /></th>
          <td colspan="2"><img src="${item.img}" alt="${item.title}" /> ${item.title}</td>
          <td>${item.coin}</td>
          <td>
            <button class="decrement-button" disabled>-</button>
            <span class="counter">${item.count}</span>
            <button class="increment-button" disabled>+</button>
          </td>
        `;
      tableBody.appendChild(row);
  
      const checkbox = row.querySelector(".checkbox");
      const counterSpan = row.querySelector(".counter");
      const incrementButton = row.querySelector(".increment-button");
      const decrementButton = row.querySelector(".decrement-button");
  
      checkbox.addEventListener("change", function () {
        counterSpan.textContent = checkbox.checked
          ? item.count
          : item.count;
  
        incrementButton.disabled = !checkbox.checked;
        decrementButton.disabled = !checkbox.checked;
  
        updateTotals();
      });
  
      incrementButton.addEventListener("click", function () {
        const currentValue = parseInt(counterSpan.textContent);
        counterSpan.textContent = String(currentValue + 1);
        updateTotals();
      });
  
      decrementButton.addEventListener("click", function () {
        const currentValue = parseInt(counterSpan.textContent);
        if (currentValue > 0) {
          counterSpan.textContent = String(currentValue - 1);
          updateTotals();
        }
      });
    });
  
    // Function untuk mengecek apakah ada checkbox lain yang dicentang
    function isAnyCheckboxChecked() {
      const checkboxes = document.querySelectorAll(".checkbox");
      return Array.from(checkboxes).some((checkbox) => checkbox.checked);
    }
  
    // menambahkan event listener untuk set button
    setButton.addEventListener("click", function () {
      // membuat sebuah lokal storage jualBarang
      const jualBarang = cartData
        .map((item, index) => {
          const checkbox = document.querySelector(
            `#table-body tr:nth-child(${index + 1}) .checkbox`
          );
          const counterSpan = document.querySelector(
            `#table-body tr:nth-child(${index + 1}) .counter`
          );
          const jumlah = checkbox.checked
            ? parseInt(counterSpan.textContent)
            : 0;
          const totalKoin = item.coin * jumlah;

          return checkbox.checked
            ? {
                namaSampah: item.title,
                koin: item.coin,
                jumlah: jumlah,
                totalKoin: totalKoin,
              }
            : null;
        })
        .filter(Boolean);
  
      localStorage.setItem("jualBarang", JSON.stringify(jualBarang));
      localStorage.removeItem("productDetails");
    });
  });