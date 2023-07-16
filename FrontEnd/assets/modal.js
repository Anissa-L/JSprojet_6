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
}
