document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const apiUrl = "https://6565dea5eb8bb4b70ef27a95.mockapi.io/user";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((users) => {
        const authenticatedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (authenticatedUser) {
          localStorage.setItem(
            "userSarange",
            JSON.stringify(authenticatedUser)
          );
          window.location.href = "home/home.html";
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  });
});
