const main = async () => {

  const containerDinamicoEventos = document.getElementById("teste");

  const data = await fetch(`${BASE_URL}/events`).then((response) =>
    response.json()
  );

  containerDinamicoEventos.innerHTML = "";
  const listaOrdenada = data.filter((a) => new Date(a.scheduled) > new Date())
    .sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled))

  // fiz assim pra ficar diferente... como eram só 3 objetos que precisávamos renderizar em tela, fiz na mão mesmo... mas não recomendo =)

  const articleUm = document.createElement("article");
  articleUm.className = "evento card p-5 m-3";
  articleUm.innerHTML = `
      <h2>${listaOrdenada[0].name} - ${new Date(listaOrdenada[0].scheduled).toLocaleString("pt-br")}</h2>
      <h4>${listaOrdenada[0].attractions.join(", ")}</h4>
      <p>${listaOrdenada[0].description}</p>
      <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva" data-bs-id="${listaOrdenada[0]._id
    }" data-bs-name="${listaOrdenada[0].name}">reservar ingresso</a>
`;


  const articleDois = document.createElement("article");

  articleDois.className = "evento card p-5 m-3";
  articleDois.innerHTML = `
      <h2>${listaOrdenada[1].name} - ${new Date(listaOrdenada[1].scheduled).toLocaleString("pt-br")}</h2>
      <h4>${listaOrdenada[1].attractions.join(", ")}</h4>
      <p>${listaOrdenada[1].description}</p>
      <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva" data-bs-id="${listaOrdenada[1]._id
    }" data-bs-name="${listaOrdenada[1].name}">reservar ingresso</a>
`;


  const articleTres = document.createElement("article");
  articleTres.className = "evento card p-5 m-3";
  articleTres.innerHTML = `
      <h2>${listaOrdenada[2].name} - ${new Date(listaOrdenada[2].scheduled).toLocaleString("pt-br")}</h2>
      <h4>${listaOrdenada[2].attractions.join(", ")}</h4>
      <p>${listaOrdenada[2].description}</p>
      <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva" data-bs-id="${listaOrdenada[2]._id
    }" data-bs-name="${listaOrdenada[2].name}">reservar ingresso</a>
`;


  // adicionando os articles no meu container dinamico
  containerDinamicoEventos.appendChild(articleUm);
  containerDinamicoEventos.appendChild(articleDois);
  containerDinamicoEventos.appendChild(articleTres);

  //minha pifía tentativa de fazer sem bootstrap -- vou voltar aqui dps

  // const primeiroBotãoA = document.getElementById("primeiroEvento");
  // const segundoBotãoA = document.getElementById("segundoEvento");
  // const terceiroBotãoA = document.getElementById("terceiroEvento");

  // primeiroBotãoA.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   modal.style.display = "block";
  //   console.log(modal.style.display);
  // });

  // segundoBotãoA.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   modal.style.display = "block";//   modal.show();
  // });

  // terceiroBotãoA.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   modal.style.display = "block";
  // });

  const modalReserva = document.getElementById("modalReserva");
  const modalReservaObj = new bootstrap.Modal(modalReserva);

  modalReserva.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const id = button.getAttribute("data-bs-id");
    const name = button.getAttribute("data-bs-name");

    modalReserva.querySelector("#title").textContent = name;
    modalReserva.querySelector("#id").value = id;
  });

  modalReserva.addEventListener("hide.bs.modal", function () {
    modalReserva.querySelector(".modal-title").textContent = "";
    modalReserva.querySelector("#id").value = "";
    modalReserva.querySelector("#name").value = "";
    modalReserva.querySelector("#email").value = "";
  });

  const formReserva = modalReserva.querySelector("form");

  formReserva.addEventListener("submit", (event) => {
    event.preventDefault();

    const body = {};

    for (i = 0; i < formReserva.elements.length - 1; i++) {
      const item = formReserva.elements[i];

      body[item.name] = item.value;
    }

    fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        alert("Reserva feita com sucesso");

        modalReservaObj.hide();
      })
      .catch((error) => console.log(error.message));
  });

};

main();
