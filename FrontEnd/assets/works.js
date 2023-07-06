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
