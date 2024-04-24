const main = document.getElementById('listaEstados');
const searchParams = new URLSearchParams(document.location.search);

async function getEstados(){
    console.log('teste')
    let estados = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    estados = await estados.json();
    return estados;
}

async function criarListagemEstados(){
    let ul = document.createElement("ul");

    estados = await getEstados();
    estados.forEach(e => {
        let listElement = document.createElement("li");
        let ancora = document.createElement("a");
        ancora.innerHTML = e.nome;
        ancora.href = './municipios/index.html?uf=' + e.sigla;
        listElement.appendChild(ancora);
        ul.appendChild(listElement);
    });
    main.appendChild(ul);
}

criarListagemEstados();