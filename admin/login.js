const credentials = {
  username: "f3admin",
  password: "Fresh@88200"
};

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#loginMessage");

function login() {
  if (username.value.trim() === credentials.username && password.value === credentials.password) {
    sessionStorage.setItem("f3-admin-auth", "yes");
    window.location.href = "dashboard.html";
    return;
  }

  loginMessage.textContent = "Invalid username or password.";
}

loginButton.addEventListener("click", login);
password.addEventListener("keydown", (event) => {
  if (event.key === "Enter") login();
});
