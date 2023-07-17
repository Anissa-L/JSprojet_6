let connect = document.querySelector(".connect");
const storedToken = sessionStorage.getItem("token");

if (storedToken) {
  connect.innerHTML = "<a href='login.html'>logout";
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
  modification.appendChild(modifA);
}
