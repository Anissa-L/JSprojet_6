async function postLogin() {
  let user = {
    eMail: "sophie.bluel@test.tld",
    passWord: "S0phie ",
  };

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  alert(result.message);
  console.log(result);
}
//Récupération des éléments
const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

//Evenements
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});
//Fonction

//Erreur
const setError = (element, message) => {
  const formControl = element.parentElement;
  const small = formControl.querySelector("small");

  //Ajout du message d'erreur
  small.innerText = message;

  //Ajout de la classe error Suppression de la classe success
  formControl.classList.add("error");
  formControl.classList.remove("success");
};

/*
//Success
const setSuccess = (element) => {
  const formControl = element.parentElement;

  formControl.classList.add("success");
  formControl.classList.remove("error");
};*/

/*
//Paramètre de l'email
const isValidEmail = (email) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-] +@ [a-zA-Z0 -9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(String(email).toLowerCase());
};*/

//Input Vérification
const validateInputs = () => {
  let eMail = "sophie.bluel@test.tld";
  let passWord = "S0phie";

  //Obtenir les valeurs des inputs
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue != eMail || passwordValue != passWord) {
    let message = "Erreur dans l’identifiant ou le mot de passe";
    setError(password, message);
    console.log(setError);
  } else {
    document.location.href = "index.html";
    window.localStorage.setItem("result", token);
  }
  /*
  //vérification email
  if (emailValue === "") {
    let message = "Une saisie email est requise";
    setError(email, message);
    console.log(message);
  } else if (!isValidEmail(emailValue)) {
    let message = "Saisissez une adresse email valide";
    setError(email, message);
  } else {
    setSuccess(email);
    console.log(setSuccess);
  }

  //vérification mot de passe
  if (passwordValue === "") {
    let message = "Mot de passe incorrect";
    setError(password, message);
  } else if (passwordValue.length < 5) {
    let message = "Le mot de passe doit contenir au moins 5 caractère.";
    setError(password, message);
  } else {
    setSuccess(password);
  }*/
};
