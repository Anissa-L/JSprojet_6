//constante boutton category
const categorieObjets = document.querySelector(".categorieObjets");

const categorieAppartements = document.querySelector(".categorieAppartements");

const categorieHR = document.querySelector(".catergorieHotelsAndRestaurants");

//const categorieTout = document.querySelector(".categorieNone");

//fonction aucun filtre
//categorieNone.addEventListener("click", function () {
//const NoneFilter = None.filter(function (category) {
//return (category.userId = 1);
// });
//console.log(objetFilter);
//});

//fonction filtre objets
categorieObjets.addEventListener("click", function () {
  const objetFilter = Objets.filter(function (category) {
    return (category.id = 1);
  });
  console.log(objetFilter);
});

//fonction filtre appartements
categorieAppartements.addEventListener("click", function () {
  const AppartementsFilter = Appartements.filter(function (category) {
    return (category.id = 2);
  });
  console.log(AppartementsFilter);
});

//fonction filtre hotels & restaurants
categorieHR.addEventListener("click", function () {
  const categorieHRFilter = categorieHR.filter(function (category) {
    return (category.id = 3);
  });
  console.log(categorieHRFilter);
});

// fetch category
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
