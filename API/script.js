document.addEventListener("DOMContentLoaded", function () {
  // Using API endpoint example: JSONPlaceholder
  const apiUrl = "https://656b4fd0dac3630cf727f9d0.mockapi.io/ListSampah";

  // Get data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the table body element
      const tableBody = document.getElementById("table-body");

      // Iterate through the data and add rows to the table
      data.forEach((user) => {
        const row = document.createElement("tr");

        // Insert data from the API
        row.innerHTML = `
                      <td><input type="checkbox" class="checkbox" /></td>
                      <td><img src="${user.gambar}" alt=""></td>
                      <td>${user.namaSampah}</td>
                      <td>${user.koin}</td>
                      <td><button class="decrement-button" disabled>-</button><span class="counter">0</span><button class="increment-button" disabled>+</button></td>
                  `;

        tableBody.appendChild(row);

        // Add event listener to the checkbox
        const checkbox = row.querySelector(".checkbox");
        const counterSpan = row.querySelector(".counter");
        const incrementButton = row.querySelector(".increment-button");
        const decrementButton = row.querySelector(".decrement-button");

        checkbox.addEventListener("change", function () {
          // Update the counter based on the checkbox state
          counterSpan.textContent = checkbox.checked ? "1" : "0"; // Reset to 0 if unchecked

          // Enable/Disable buttons based on the checkbox state
          incrementButton.disabled = !checkbox.checked;
          decrementButton.disabled = !checkbox.checked;

          // Enable/Disable the save button based on the checkbox state
          saveButton.disabled = !isAnyCheckboxChecked();
        });

        // Add event listener to the increment button
        incrementButton.addEventListener("click", function () {
          // Increment the counter
          counterSpan.textContent = String(
            parseInt(counterSpan.textContent) + 1
          );
        });

        // Add event listener to the decrement button
        decrementButton.addEventListener("click", function () {
          // Decrement the counter, but avoid negative values
          const currentValue = parseInt(counterSpan.textContent);
          if (currentValue > 0) {
            counterSpan.textContent = String(currentValue - 1);
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Save Button
  const saveButton = document.getElementById("save-button");

  saveButton.addEventListener("click", function () {
    // Get all checked rows and save them to localStorage
    const checkedRows = Array.from(
      document.querySelectorAll(".checkbox:checked")
    ).map((checkbox) => {
      const row = checkbox.closest("tr");
      return {
        image: row.children[1].textContent,
        name: row.children[2].textContent,
        coins: row.children[3].textContent,
        counter: row.querySelector(".counter").textContent,
      };
    });

    // Save data to localStorage
    localStorage.setItem("selectedRows", JSON.stringify(checkedRows));

    // Disable the Save button after saving
    saveButton.disabled = true;
  });

  // Function to check if any checkbox is checked
  function isAnyCheckboxChecked() {
    return document.querySelector(".checkbox:checked") !== null;
  }
});
