const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const loginData = {
    email: "sophie.bluel@test.tld",
    password: "S0phie",
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Typ": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (response.ok) {
        // Connexion réussie
        return response.json();
      } else {
        // Gérer les erreurs de connexion
        throw new Error("Échec de la connexion");
      }
    })
    .then((data) => {
      // Traiter la réponse de la connexion réussie
      console.log(data);
      // Rediriger vers une autre page ou effectuer d'autres actions
    })
    .catch((error) => {
      // Gérer les erreurs de connexion
      console.error(error);
    });
});
