const categorieObjet = document.querySelector(".categorieObjet");

const categorieAppartements = document.querySelector(".categorieAppartements");

const categorieHR = document.querySelector(".catergorieHotelsAndRestaurants");

categorieObjet.addEventListener("click", function () {
  const objetFilter = Objets.filter(function (category) {
    return (category.id = 1);
  });
  console.log(objetFilter);
});

categorieAppartements.addEventListener("click", function () {
  const AppartementsFilter = Appartements.filter(function (works) {
    return (works.id = 2);
  });
  console.log(AppartementsFilter);
});

categorieHR.addEventListener("click", function () {
  const categorieHRFilter = categorieHR.filter(function (works) {
    return (works.id = 3);
  });
  console.log(categorieHRFilter);
});

fetch("http://localhost:5678/api/categories")
  .then((reponse) => {
    console.log("premier .then");
    console.log(reponse);
    return reponse.json();
  })

  //.then(reponse => reponse.json())

  .then((data) => {
    console.log(data);

    ajoutPortfolio(data);
  })

  .catch((error) => console.log(`Erreur : ${error}`));
