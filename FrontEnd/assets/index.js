//WORKS
const gallery = document.querySelector(".gallery");
const miniGallery = document.querySelector(".miniGallery");

//CATEGORIES

// Get nav Filters
const filters = document.querySelector(".filtres");

async function main() {
  await getWorks();
  await getCategories();
  await admin();
  console.log(admin);
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

      //on vide les galleries
      gallery.innerHTML = "";
      miniGallery.innerHTML = "";

      projects.forEach((project) => {
        if (categoryId == project.category.id || categoryId == null) {
          createProject(project);
          createProjectModal(project);
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
        creatOption(categorie);
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

// Fonction pour créer un projet dans la mini-galerie
function createProjectModal(project) {
  const figureModal = document.createElement("figure");
  figureModal.setAttribute("data-tag", project.category.name);
  figureModal.setAttribute("data-id", project.id);

  console.log("construction icon-box");
  const iconBox = document.createElement("div");
  iconBox.classList.add("icon-box");
  iconBox.innerHTML = "<i class='fa-solid fa-trash-can modalTrash'></i>";

  const imageModal = document.createElement("img");
  imageModal.src = project.imageUrl;
  imageModal.alt = project.title;

  figureModal.appendChild(iconBox);

  const figcaptionModal = document.createElement("figcaption");
  figcaptionModal.innerText = "éditer";

  figureModal.appendChild(imageModal);
  figureModal.appendChild(figcaptionModal);
  miniGallery.appendChild(figureModal);

  trash(figureModal);
  ajoutPhoto();

  //Boutton trash
}

//MODAL

let connect = document.querySelector(".connect");
const storedToken = sessionStorage.getItem("token");

async function admin() {
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
    switchModal();
  }
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

  const figureImage = document.querySelector(".figure-image");
  const modifText = document.createElement("p");
  modifText.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i>' + " " + "modifier";
  modifText.classList.add("modifText");
  figureImage.appendChild(modifText);

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

    //reset modal ajout photo
    const fileModal = document.getElementById("file");
    const titleModal = document.getElementById("title");
    const categoryModal = document.getElementById("category");
    titleModal.value = "";
    categoryModal.value = "0";
    fileModal.value = "";
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

function trash(figureModal) {
  //const figure = document.querySelector(".miniGallery figure");
  //const trashIcon = document.querySelector(".icon-box");
  console.log(figureModal);

  figureModal.addEventListener("click", async function (e) {
    console.log("click");
    e.preventDefault();
    e.stopPropagation();
    const figureId = figureModal.getAttribute("data-id");

    // Supprime l'image du DOM.
    //figure.remove();
    const monToken = sessionStorage.getItem("token");
    let response = await fetch(`http://localhost:5678/api/works/${figureId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${monToken}`,
      },
    });
    console.log(response);

    if (response.ok) {
      // if HTTP-status is 200-299
      console.log(response);

      alert("Photo supprimée avec succès");
      getWorks(); //on actualise les galeries avec les works fraichement récupérer de l'api
    } else {
      alert("Échec de suppression");
    }
  });
}
console.log(trash);

//changement de fenêtre
function switchModal() {
  const buttonModal = document.querySelector(".buttonModal");
  const galleryModal = document.querySelector(".galleryModal");
  const photoModal = document.querySelector(".photoModal");
  const arrowLeft = document.querySelector(".arrowLeft");

  buttonModal.addEventListener("click", function () {
    console.log("click");
    galleryModal.style.display = "none";
    photoModal.style.display = "flex";
    arrowLeft.style.display = "flex";
    creatOption();
  });

  arrowLeft.addEventListener("click", function () {
    console.log("click");
    galleryModal.style.display = "flex";
    photoModal.style.display = "none";
    arrowLeft.style.display = "none";
  });
}

function creatOption(categorie) {
  const category = document.getElementById("category");
  const option = document.createElement("option");
  option.innerText = categorie.name;
  option.value = categorie.id;
  option.classList.add("option");

  category.appendChild(option);
}

function ajoutPhoto() {
  const form = document.getElementById("form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("click");

    const option = document.createElement("option");
    const categoriePhoto = option.getAttribute("data-id");

    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    formData.append("title", document.getElementById("title").value);
    formData.append("category", categoriePhoto);

    const monToken = sessionStorage.getItem("token");

    let response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${monToken}`,
      },
      body: formData,
    });

    console.log(response);

    if (response.ok) {
      // if HTTP-status is 200-299
      console.log(response);

      message.innerText = "Formulaire envoyé avec succès";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(document.getElementById("file").files[0]);
      gallery.appendChild(img);

      getWorks(); //on actualise les galeries avec les works fraichement récupérer de l'api
    } else {
      message.innerText = "Erreur dans le formulaire ";
    }
    this.reset();

    setTimeout(() => {
      message.innerText = "";
    }, 2000);
  });
}

/*var form = document.forms.namedItem("filePhoto");
  form.addEventListener(
    "submit",
    function (ev) {
      var oOutput = document.querySelector("div"),
        oData = new FormData(form);

      oData.append("CustomField", "Données supplémentaires");

      var oReq = new XMLHttpRequest();
      oReq.open("POST", "stash.php", true);
      oReq.onload = function (oEvent) {
        if (oReq.status == 200) {
          oOutput.innerHTML = "Envoyé&nbsp;!";
        } else {
          oOutput.innerHTML =
            "Erreur " +
            oReq.status +
            " lors de la tentative d’envoi du fichier.<br />";
        }
      };

      oReq.send(oData);
      ev.preventDefault();
    },
    false
  );*/
