let connect = document.querySelector(".connect");
const storedToken = sessionStorage.getItem("token");

if (storedToken) {
  connect.innerText = "logout";
  creatEdit();
} else {
  connect.innerText = "login";
}

function creatEdit() {
  const divEdit = document.querySelector(".edit");
  const divButton = document.createElement("div");
  divButton.classList.add("button");
  divEdit.appendChild(divButton);

  const blackButton = document.createElement("button");
  blackButton.classList.add("blackButton");
  blackButton.innerText = "Mode édition";
  blackButton.type = "submit";
  divButton.appendChild(blackButton);

  const whiteButton = document.createElement("button");
  whiteButton.classList.add("whiteButton");
  whiteButton.innerText = "publier les changements";
  whiteButton.type = "submit";
  divButton.appendChild(whiteButton);

  const body = document.querySelector("body");
  body.removeAttribute("max-width");
  body.removeAttribute("margin");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("mainContainer");
  body.appendChild(mainContainer);

  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  mainContainer.appendChild(header);
  mainContainer.appendChild(main);
  mainContainer.appendChild(footer);
}
