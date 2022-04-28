# Sound-Garden---HANDS-ON-2---JS
Uma casa de show chamada Sound Garden será inaugurada e precisa de um site que exiba os eventos e permita que os clientes reservem ingressos através da Landing Page.

<strong>Painel de controle</strong>

1. Criar Evento: receba os dados que o usuário inserir através do formulário da
página criar-evento.html e envie essa informação para a API utilizando o método
POST.
2. Editar Evento: para cada evento listado, existe um botão editar que deve
direcionar para editar-evento.html?id=0, com o id do evento selecionado. Na
página de edição, o formulário deve aparecer preenchido com os dados do
evento, permitindo a edição das informações.
3. Excluir Evento: para cada evento listado, existe um botão editar que deve
direcionar para excluir-evento.html?id=0, com o id do evento selecionado. Na
página de edição, o formulário deve aparecer preenchido com os dados do
evento, porém com os campos desabilitados. Ao clicar no botão "excluir para
sempre", deve fazer uma requisição na API para excluir o evento do banco de
dados.
4. Ver reservas do evento: Listar as reservas de ingressos do evento selecionado.

<strong>Landing Page</strong>

5. Reserva de ingresso: ao clicar em "reservar ingresso", deve abrir um modal com
formulário (nome e email), para que o usuário possa preencher os dados e
reservar o ingresso.
