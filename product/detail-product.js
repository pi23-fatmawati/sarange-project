document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productDetails = JSON.parse(
      decodeURIComponent(urlParams.get("product"))
    );
  
    document.getElementById(
      "detail-img"
    ).innerHTML = `<img src="${productDetails.img}" class="img-fluid rounded-start" alt="Gambar ${productDetails.nama}">`;
    document.querySelector(".card-title.product-detail").textContent =
      productDetails.nama;
    document.querySelector(".coin-tag p").textContent =
      productDetails.koin + " koin";
  
    const deskripsiListContainer = document.querySelector(".card-text ul");
    if (Array.isArray(productDetails.deskripsi)) {
      productDetails.deskripsi.forEach((deskripsi) => {
        const li = document.createElement("li");
        li.textContent = deskripsi;
        deskripsiListContainer.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = productDetails.deskripsi;
      deskripsiListContainer.appendChild(li);
    }
  });