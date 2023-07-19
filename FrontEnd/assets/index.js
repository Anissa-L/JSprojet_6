//WORKS
const gallery = document.querySelector(".gallery");

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
  connect.innerHTML = "<a class='logout'href='login.html'>logout</a>";

  const logout = document.querySelector(".logout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
  });

  creatEdit();
  creatModal();
}

function creatEdit() {
  const divEdit = document.querySelector(".edit");
  divEdit.style.display = "flex";

  const body = document.querySelector("body");
  body.style.paddingTop = "43px";

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
  modifA.classList.add("jsModal");
  modification.appendChild(modifA);

  const filtres = document.querySelector(".filtres");
  filtres.style.display = "none";
  portfolioTitle.style.marginBottom = "3em";
}

function creatModal() {
  let modal = null;
  const focusableSelector = "button, a, input, textarea";
  let focusables = [];

  const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
  };

  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-close")
      .removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .removeEventListener("click", stopPropagation);
    modal = null;
  };

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(
      (f) => f === modal.querySelector(":focus")
    );
    index++;
    if (index >= focusables.length) {
      index = 0;
    }
    focusables[index].focus();
    console.log(index);
  };

  document.querySelectorAll(".jsModal").forEach((a) => {
    a.addEventListener("click", openModal);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
      focusInModal(e);
    }
  });
}
