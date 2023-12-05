let URL = "https://656bda9ee1e03bfd572ddc89.mockapi.io/sarange/listSampah";

async function getDataProduct() {
  try {
    let response = await fetch(URL);
    let products = await response.json();
    const productCard = document.getElementById("product-card");

    products.map((product) => {
      productCard.innerHTML += `
            <div class="card product-wrap">
                <img src="${product.img}" class="card-img-top product-img" alt="Gambar ${product.nama}">
                <div class="card-body">
                  <h5 class="card-title product-title">${product.nama}</h5>
                  <p class="card-text"><i class="fa-solid fa-coins"></i> <span class="product-coin">${product.koin}</span> koin per ${product.satuan}.</p>
                  <div class="actions">
                        <button class="btn btn-primary" id="sell">Jual</button>
                        <div class="counter" style="display: none">
                            <button class="btn decrement" id="decrement">-</button>
                            <input type="text" class="form-control count" id="count" value="0"></input>
                            <button class="btn increment" id="increment">+</button>
                        </div>
                        <button class="btn btn-primary" id="term">Detail</button>
                  </div>
                </div>
            </div>
            `;
    });

    let sellButtons = document.querySelectorAll("#sell");
    let incrementButton = document.querySelectorAll("#increment");
    let decrementButton = document.querySelectorAll("#decrement");

    sellButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let parentCard = button.closest(".card");
        let sellButton = parentCard.querySelector("#sell");
        let counterElements = parentCard.querySelectorAll(".counter");
        sellButton.style.display = "none";
        counterElements.forEach((counter) => {
          counter.style.display = "flex";
        });
        updateCountItem();
        showNotification();
      });
    });
    incrementButton.forEach((button) => {
      button.addEventListener("click", () => {
        let parentCard = button.closest(".counter");
        let count = parentCard.querySelector(".count");
        let countValue = parseInt(count.value);
        countValue++;
        count.value = countValue;
        updateCountItem();
        showNotification();
      });
    });
    decrementButton.forEach((button) => {
      button.addEventListener("click", () => {
        let parentCard = button.closest(".counter");
        let count = parentCard.querySelector(".count");
        let countValue = parseInt(count.value);
        countValue = Math.max(0, countValue - 1);
        count.value = countValue;

        if (countValue === 0) {
          let parentCard = button.closest(".card");
          let sellButton = parentCard.querySelector("#sell");
          let counterElements = parentCard.querySelectorAll(".counter");
          sellButton.style.display = "block";
          counterElements.forEach((counter) => {
            counter.style.display = "none";
          });
        }
        updateCountItem();
        showNotification();
      });
    });
    const updateCountItem = () => {
      let countItem = document.getElementById("count-item");
      let countArray = [];
      let productDetailsArray = [];
      document.querySelectorAll(".count").forEach((input, index) => {
        let countValue = parseInt(input.value) || 0;
        if (countValue !== 0) {
          countArray.push(countValue);
          let productImg = document.querySelectorAll(".product-img")[index].src;
          let productTitle =
            document.querySelectorAll(".product-title")[index].textContent;
          let productCoin =
            document.querySelectorAll(".product-coin")[index].textContent;
          productDetailsArray.push({
            img: productImg,
            title: productTitle,
            coin: productCoin,
            count: countValue,
          });
        }
      });
      let totalItemCount = countArray.length;
      countItem.innerHTML = totalItemCount;
      localStorage.setItem("cartCount", totalItemCount);
      localStorage.setItem("countArray", JSON.stringify(countArray));
      localStorage.setItem(
        "productDetails",
        JSON.stringify(productDetailsArray)
      );
    };
    const showNotification = () => {
      let storedCount = localStorage.getItem("cartCount");
      if (storedCount) {
        let countItem = document.getElementById("count-item");
        countItem.textContent = `${storedCount} item`;
        countItem.style.display = storedCount > 0 ? "flex" : "none";
      }
    };

    let detailButton = document.querySelectorAll("#term");
    detailButton.addEventListener("click", () => {});
  } catch (error) {
    console.log(error);
  }
}
getDataProduct();
