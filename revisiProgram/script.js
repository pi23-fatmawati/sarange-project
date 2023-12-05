document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // You can replace this URL with the actual API endpoint
    const apiUrl = "https://6565dea5eb8bb4b70ef27a95.mockapi.io/user";

    // Fetch user data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((users) => {
        // Check if there's a user with the provided email and password
        const authenticatedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (authenticatedUser) {
          // Save user data to local storage
          localStorage.setItem(
            "userSarange",
            JSON.stringify(authenticatedUser)
          );
          window.location.href = "product/product.html";
        } else {
          alert("Invalid email or password"); // You can replace this with your actual error handling
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  });
});
