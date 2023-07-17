//WORKS
const gallery = document.querySelector(".gallery");

function ajoutWorks(data) {
  for (let i = 0; i < data.length; i++) {
    const figure = document.createElement("figure");
    figure.setAttribute("id", data[i].category.name);
    const img = document.createElement("img");
    img.src = data[i].imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = data[i].title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

fetch("http://localhost:5678/api/works")
  .then((reponse) => {
    console.log("premier .then");
    console.log(reponse);
    return reponse.json();
  })

  //.then(reponse => reponse.json())

  .then((data) => {
    console.log(data);

    ajoutWorks(data);
  })

  .catch((error) => console.log(`Erreur : ${error}`));

//CATEGORIES

// Get nav Filters
const filters = document.querySelector(".filtres");

async function main() {
  await getWorks();
  await getCategories();
}

main();

async function getWorks(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Erreur dans la récupération des données de l'API");
      }
    })
    .then((projects) => {
      console.log(projects);

      //on vide la gallerie
      gallery.innerHTML = "";

      projects.forEach((project) => {
        if (categoryId == project.category.id || categoryId == null) {
          createProject(project);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// PARTIE FILTRE : fetch pour récupérer les données catégories
async function getCategories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Erreur");
      }
    })

    .then((categories) => {
      console.log(categories);
      //Auxquelles on applique la fonction createButton
      categories.forEach((categorie) => {
        createButton(categorie);
      });
    })
    .then(() => {
      //on récupère les boutons
      const buttons = document.querySelectorAll(".filtres button");

      buttons.forEach((button) => {
        //Pour chaque bouton, au clic
        button.addEventListener("click", function () {
          // Get (et Affiche le data-tag)
          let buttonTag = button.getAttribute("data-tag");
          console.log(buttonTag);

          //Get catégorie id
          let categorieId = button.getAttribute("data-id");
          console.log(categorieId);

          //on enlève, pour chaque bouton la classe is-active
          buttons.forEach((button) => button.classList.remove("is-active"));
          //puis on ajoute la classe active au bouton cliqué
          this.classList.add("is-active");
          // On récupère les works de l'API en fonction des categories
          getWorks(categorieId);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Fonction pour créer un bouton dans la nav des filtres
function createButton(categorie) {
  const buttonFilter = document.createElement("button");
  buttonFilter.setAttribute("data-tag", categorie.name);
  buttonFilter.setAttribute("data-id", categorie.id);
  buttonFilter.classList.add("btn_filter");
  buttonFilter.innerText = categorie.name;
  filters.appendChild(buttonFilter);
}

// Fonction pour créer un projet dans la galerie
function createProject(project) {
  const figureProject = document.createElement("figure");
  figureProject.setAttribute("data-tag", project.category.name);
  figureProject.setAttribute("data-id", project.category.id);

  const imageProject = document.createElement("img");
  imageProject.src = project.imageUrl;
  imageProject.alt = project.title;

  const figcaptionProject = document.createElement("figcaption");
  figcaptionProject.innerText = project.title;

  figureProject.appendChild(imageProject);
  figureProject.appendChild(figcaptionProject);
  gallery.appendChild(figureProject);
}

//MODAL

let connect = document.querySelector(".connect");
const storedToken = sessionStorage.getItem("token");

if (storedToken) {
  connect.innerHTML = "<a href='login.html'>logout";
  creatEdit();
}

function creatEdit() {
  const divEdit = document.querySelector(".edit");
  const divButton = document.createElement("div");
  divButton.classList.add("button");
  divEdit.appendChild(divButton);

  const blackButton = document.createElement("button");
  blackButton.classList.add("blackButton");
  blackButton.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i>' + " " + "Mode édition";
  blackButton.type = "submit";
  divButton.appendChild(blackButton);

  const whiteButton = document.createElement("button");
  whiteButton.classList.add("whiteButton");
  whiteButton.innerText = "publier les changements";
  whiteButton.type = "submit";
  divButton.appendChild(whiteButton);

  const body = document.querySelector("body");
  body.style.removeProperty("max-width");
  body.style.margin = "";
  console.log(body);

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("mainContainer");
  body.appendChild(mainContainer);

  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  header.insertAdjacentElement("beforebegin", mainContainer);
  mainContainer.appendChild(header);
  mainContainer.appendChild(main);
  mainContainer.appendChild(footer);

  const portfolio = document.getElementById("portfolio");
  const portfolioTitle = document.querySelector(".portfolioTitle");
  const modification = document.createElement("div");
  modification.classList.add("modification");
  portfolio.appendChild(modification);
  portfolioTitle.insertAdjacentElement("beforebegin", modification);
  modification.appendChild(portfolioTitle);

  const modifA = document.createElement("a");
  modifA.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i>' + " " + "modifier";
  modifA.href = "#modal1";
  modification.appendChild(modifA);

  const filtres = document.querySelector(".filtres");
  filtres.style.display = "none";
  portfolioTitle.style.marginBottom = "3em";
}
