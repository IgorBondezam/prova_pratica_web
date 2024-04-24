const sigla = new URLSearchParams(document.location.search);
const tituloHeader = document.getElementById('titulo-header');
const titlePage = document.getElementsByTagName('title');
titlePage.innerHTML = 'Municípios de ' + sigla.get('uf');

tituloHeader.innerHTML = 'Municípios de ' + sigla.get('uf');

async function getCidadesFromSigla(){
    let cidades = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla.get('uf')}/municipios`);
    cidades = await cidades.json;
    return cidades;
}

async function criarListagemCidades(){
    let ul = document.createElement("ul");

    cidades = await getCidades();
    cidades.forEach(c => {
        let listElement = document.createElement("li");
        let ancora = document.createElement("a");
        ancora.innerHTML = c.nome;
        ancora.href = './municipios/index.html?uf=' + c.sigla;
        listElement.appendChild(ancora);
        ul.appendChild(listElement);
    });
    main.appendChild(ul);
}

