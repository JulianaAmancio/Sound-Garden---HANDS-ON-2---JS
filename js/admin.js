const main = async () => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const data = await fetch(`${BASE_URL}/events`).then((response) =>
    response.json()
  );

  tbody.innerHTML = "";

  data
    .filter((eventoA) => new Date(eventoA.scheduled) > new Date())
    .sort((eventoA, eventoB) => new Date(eventoA.scheduled) - new Date(eventoB.scheduled))
    .forEach((objeto, indice) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <th scope="row">${indice + 1}</th>
      <td>${new Date(objeto.scheduled).toLocaleString("pt-br")}</td>
      <td>${objeto.name}</td>
      <td>${objeto.attractions.join(", ")}</td>
      <td>
        <a href="reservas.html?id=${objeto._id}" class="btn btn-dark"
          >ver reservas</a
        >
        <a href="editar-evento.html?id=${objeto._id
        }" class="btn btn-secondary">editar</a>
        <a href="excluir-evento.html?id=${objeto._id
        }" class="btn btn-danger">excluir</a>
      </td>`;

      tbody.appendChild(tr);
    });
};

main();
