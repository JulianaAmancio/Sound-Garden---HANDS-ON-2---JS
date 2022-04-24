const inputNome = document.querySelector('#nome');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('.col-6');

const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

// informando que cada campo da api irá receber os valores dos inputs
form.onsubmit = async (evento) => {

    evento.preventDefault();

    

    try {
        const novoCadastro = {
            "name": inputNome.value,
            "poster": "https://i.imgur.com/fQHuZuv.png",
            "attractions": inputAtracoes.value.split(','),
            "description": inputDescricao.value,
            "scheduled": inputData.value,
            "number_tickets": inputLotacao.value
        };



        // informando o método utilizado e o formato a ser recebido (JSON)
        const opcoes = {
            method: 'POST',
            body: JSON.stringify(novoCadastro),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // fazendo requisição na api para inserir um novo evento
        const resposta = await fetch(`${BASE_URL}/events`, opcoes);
        const conteudoResposta = await resposta.json();
         console.log(conteudoResposta);

        alert(" Evento cadastrado com sucesso!")
        window.location.replace("admin.html")
        
        //tratamento de erro
    } catch (e) {
        console.log(e);
        alert("Ops! Algo deu errado no cadastro deste evento");
    }
};