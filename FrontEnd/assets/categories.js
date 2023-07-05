//constante boutton category
/*const categorieObjets = document.querySelector(".categorieObjets");

const categorieAppartements = document.querySelector(".categorieAppartements");

const categorieHR = document.querySelector(".catergorieHotelsAndRestaurants");*/

const boutton_categories = document.querySelector(".boutton_categories");

// Fonction pour créer un bouton dans la nav des filtres
function ajoutCategories(category) {
  const buttonFilters = document.createElement("button");
  buttonFilters.setAttribute("data-tag", category.name);
  buttonFilters.setAttribute("data-id", category.id);
  buttonFilters.innerText = category.name;
  //ajout de classes
  if (category.id === 1) {
    buttonFilters.classList.add("objets");
  }
  if (category.id === 2) {
    buttonFilters.classList.add("appartements");
  }
  if (category.id === 3) {
    buttonFilters.classList.add("hotelsEtRestaurants");
  }
  boutton_categories.appendChild(buttonFilters);

  buttonFilters.addEventListener("click", function () {
    filtrerParCategorie(category.id);
  });
}

//création du boutton tous
const bouttonTous = document.createElement("button");
bouttonTous.className = "tous";
bouttonTous.innerText = "Tous";
boutton_categories.appendChild(bouttonTous);

const boutton_objets = document.querySelector(".objets");
const boutton_appartements = document.querySelector(".appartements");
const boutton_hotelsEtRestaurants = document.querySelector(
  ".hotelsEtRestaurants"
);

function filtrerParCategorie(categorieId) {
  // Code pour filtrer les données en fonction de l'identifiant de catégorie
  // ...
  console.log("Filtrage par catégorie avec l'ID :", categorieId);

  const figures = document.querySelectorAll(".gallery figure");

  figures.forEach((figure) => {
    const tag = figure.getAttribute("id");
    /*if (tag === "Objets") {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }

    if (tag === "Appartements") {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }

    if (tag === "Hotels & Restaurants") {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }*/

    if (
      tag === "Objets" ||
      tag === "Appartements" ||
      tag === "Hotels & Restaurants"
    ) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
}

// fetch category
fetch("http://localhost:5678/api/categories")
  .then((reponse) => {
    console.log("premier .then");
    console.log(reponse);
    return reponse.json();
  })

  //.then(reponse => reponse.json())

  .then((categories) => {
    console.log(categories);

    //Auxquelles on applique la fonction createButton
    categories.forEach((categorie) => {
      console.log(categorie);
      ajoutCategories(categorie);
    });
  })

  .catch((error) => console.log(`Erreur : ${error}`));
