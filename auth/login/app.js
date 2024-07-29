import { auth, signInWithEmailAndPassword } from "../../utility/utils.js";

const login_form = document.getElementById("login_form");

login_form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

  console.log("email =>", email);
  console.log("password =>", password);

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      submit_btn.disabled = true;
      submit_btn.innerText = "PLEASE WAIT...";
      submit_btn.style.cursor = "not-allowed";
      window.location.href = "/";
    })
    .catch((err) => alert(err));
});
