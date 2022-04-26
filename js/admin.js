const tabelaSeletora = document.querySelector('.table');

const corpoDaTabela = tabelaSeletora.childNodes[3];

function createElementsFromEvents(data){
    data.forEach((event, index) => {
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
       
        thElement.innerText = index + 1; 

        const primeiroElement = document.createElement('td');
        const date = event.scheduled.substring(0,10);
        const time = event.scheduled.substring(11,16);
        primeiroElement.innerText = date.replaceAll('-', '/')+ " " + time;

        const segundoElement = document.createElement('td');
        segundoElement.innerText = event.name;

        const terceiroElement = document.createElement('td');
        terceiroElement.innerText = event.attractions.join(', ');

        const quartoElement = document.createElement('td');

        const primeiraAncora = document.createElement('a');
        primeiraAncora.innerText = "ver reservas";
        primeiraAncora.classList.add('btn');
        primeiraAncora.classList.add('btn-dark');
        

        const segundaAncora = document.createElement('a');
        segundaAncora.innerText = "editar";
        segundaAncora.classList.add('btn');
        segundaAncora.classList.add('btn-secondary');
        segundaAncora.href = 'editar-evento.html?id='+ event._id;

        const terceiraAncora = document.createElement('a');
        terceiraAncora.innerText = "excluir";
        terceiraAncora.classList.add('btn');
        terceiraAncora.classList.add('btn-danger');
        terceiraAncora.href = 'excluir-evento.html?id='+ event._id;

        quartoElement.append(primeiraAncora, segundaAncora, terceiraAncora);


        trElement.append(thElement, primeiroElement, segundoElement, terceiroElement, quartoElement);
        corpoDaTabela.appendChild(trElement);

     })
}

fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
"method": "GET"}

).then(response => response.json()

).then(data => createElementsFromEvents(data)

).catch(error => console.log(error));