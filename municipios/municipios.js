const sigla = new URLSearchParams(document.location.search);
const tituloHeader = document.getElementById('titulo-header');
const main = document.getElementById('listaEstados');
const titlePage = document.getElementsByTagName('title');

titlePage.innerHTML = 'Municípios de ' + sigla.get('uf');
tituloHeader.innerHTML = 'Municípios de ' + sigla.get('uf');


function setValueLocalStorage(cidade){
    let favoritas = localStorage.getItem('favoritas');
    if(!favoritas){
        let create = [];
        create.push(cidade);
        JSON.stringify(create);
        localStorage.setItem('favoritas', create);
        return;
    }
    favoritas = JSON.parse(favoritas);
    favoritas.push(cidade);
    JSON.stringify(favoritas);
    localStorage.setItem('favoritas', favoritas);
}

async function getCidadesFromSigla(){
    let cidades = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla.get('uf')}/municipios`);
    cidades = await cidades.json();
    return cidades;
}

async function criarListagemCidades(){
    let ul = document.createElement("ul");

    cidades = await getCidadesFromSigla();
    cidades.forEach(c => {
        let botao = criarBotao()
        let listElement = document.createElement("li");
        let span = document.createElement("span");
        span.innerHTML = c.nome;
        listElement.appendChild(span);
        listElement.appendChild(botao);
        console.log(listElement);
        console.log(botao);
        ul.appendChild(listElement);
    });
    main.appendChild(ul);
}

function criarBotao(){
    let botao = document.createElement("button");
    botao.innerHTML = 'Favoritar';
    botao.classList.add("botao-favoritar");
    return botao;
}

criarListagemCidades();