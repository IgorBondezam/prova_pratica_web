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
    estados.forEach(c => {
        let listElement = document.createElement("li");
        let ancora = document.createElement("a");
        ancora.innerHTML = c.nome;
        ancora.href = './municipios/index.html?uf=' + c.sigla;
        listElement.appendChild(ancora);
        ul.appendChild(listElement);
    });
    main.appendChild(ul);
}

criarListagemEstados();