const goToLoginBtn = document.querySelector("#go-to-login");
const goToRegisterBtn = document.querySelector("#go-to-register");

goToLoginBtn.addEventListener("click", redirectToLogin);
goToRegisterBtn.addEventListener("click", redirectToRegister);

function redirectToLogin() {
  document.location.replace("/login");
}

function redirectToRegister() {
  document.location.replace("/register");
}
