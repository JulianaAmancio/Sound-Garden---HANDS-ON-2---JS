const main = async () => {
    const params = parseQueryString(window.location.search);
  
    if (!params.id) {
      window.location.replace("admin.html");
    }
  
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
  
    const data = await fetch(`${BASE_URL}/bookings/event/${params.id}`).then((response) =>
        response.json()
      );
      

  
    tbody.innerHTML = "";


  data.forEach((row, index) => {
      if (index === 0) {
      document.querySelector("#eventoNome").innerHTML = row.event.name;
      }
      
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row" width="20px">${index + 1}</th>
      <td>${new Date(row.created_at).toLocaleString("pt-br")}</td>
      <td>${row.owner_name}</td>
      <td>${row.owner_email}</td>
      <td>${row.number_tickets}</td>`;

    tbody.appendChild(tr);
  });

};

main();