//Récupération des éléments
const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

//Evenements
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    postLogin();
  }
});
//Fonction

async function postLogin() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  let user = {
    email: emailValue,
    password: passwordValue,
  };

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (response.ok) {
    sessionStorage.setItem("token", data.token);
    console.log("token");
    window.location.href = "index.html";
  } else {
    const zoneMessageError = document.querySelector(".error-message");
    zoneMessageError.textContent = "Adresse mail ou mot de passe incorrect";
  }
}

//Input Vérification
function validateInputs() {
  //let eMail = "sophie.bluel@test.tld";
  //let passWord = "S0phie";

  //Obtenir les valeurs des inputs
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  /*if (emailValue != eMail || passwordValue != passWord) {
    let message = "Erreur dans l’identifiant ou le mot de passe";
    setError(password, message);
    console.log(setError);
  } else {
    document.location.href = "index.html";
    window.localStorage.setItem("result", token);
  }*/

  //vérification email
  if (emailValue === "") {
    let message = "Une saisie email est requise";
    setError(email, message);
    console.log(message);
    return false;
  } else if (!isValidEmail(emailValue)) {
    let message = "Saisissez une adresse email valide";
    setError(email, message);
    return false;
  } else {
    setSuccess(email);
    console.log(setSuccess);
  }

  //vérification mot de passe
  if (passwordValue === "") {
    let message = "Mot de passe incorrect";
    setError(password, message);
    return false;
  } else if (passwordValue.length < 5) {
    let message = "Le mot de passe doit contenir au moins 5 caractère.";
    setError(password, message);
    return false;
  } else {
    setSuccess(password);
  }

  return true;
}

//Success
function setSuccess(element) {
  const formControl = element.parentElement;

  formControl.classList.add("success");
  formControl.classList.remove("error");
}

//Paramètre de l'email
function isValidEmail(email) {
  /*const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-] +@ [a-zA-Z0 -9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(String(email).toLowerCase());*/
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//Erreur
function setError(element, message) {
  const formControl = element.parentElement;
  const small = formControl.querySelector("small");

  //Ajout du message d'erreur
  small.innerText = message;

  //Ajout de la classe error Suppression de la classe success
  formControl.classList.add("error");
  formControl.classList.remove("success");
}
