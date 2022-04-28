const main = async () => {
    const containerDinamico = document.getElementById("teste");

    const data = await fetch(`${BASE_URL}/events`).then((response) =>
        response.json()
    );

    containerDinamico.innerHTML = "";

    data.filter((a) => new Date(a.scheduled) > new Date())
        .sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled)).slice(0, 9)
        .forEach((objeto) => {
            const articleDinamico = document.createElement("article");
            articleDinamico.className = "evento card p-5 m-3";
            articleDinamico.innerHTML = `
            <h2>${objeto.name} - ${new Date(objeto.scheduled).toLocaleString("pt-br")}</h2>
            <h4>${objeto.attractions.join(", ")}</h4>
            <p>${objeto.description}</p>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva" data-bs-id="${objeto._id
                }" data-bs-name="${objeto.name}">reservar ingresso</a>
  `;
            containerDinamico.appendChild(articleDinamico);
        });

    // adicionando os articles no meu container dinamico
    // containerDinamicoEventos.appendChild(articleDois);
    // containerDinamicoEventos.appendChild(articleTres);

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