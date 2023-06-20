const gallery = document.querySelector(".gallery");

function ajoutPortfolio(data) {
  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("figure");
    card.setAttribute("id", data[i].category.name);
    const image = document.createElement("img");
    image.src = data[i].image.Url;
    const imageTitle = document.createElement("figcaption");
    imageTitle.innerHTML = data[i].title;

    gallery.appendChild(card);
    card.appendChild(image);
    image.appendChild(imageTitle);
  }
}

fetch("http://localhost:5678/api/works");
.then(reponse => reponse.json());

.then(data => {
  console.log(data);

  ajoutPortfolio(data);
});
