const main = document.getElementById('listaFavoritos');

function setValueLocalStorage(cidade){
    let favoritas = [];
    favoritas = localStorage.getItem('favoritas');
    favoritas = JSON.parse(favoritas);
    favoritas.map(f => JSON.parse(f));
    let indexRemove = favoritas.indexOf(JSON.stringify(cidade));
    if(indexRemove != -1){
        favoritas.splice(indexRemove, 1);
        localStorage.setItem('favoritas', JSON.stringify(favoritas));
        location.reload();
    }
}

function getValueLocalStorage(){
    let favoritas = localStorage.getItem('favoritas');
    if(!favoritas){
        return [];
    }
    return JSON.parse(favoritas);
}

async function criarListagemFavoritos(){
    let ul = document.createElement("ul");

    favoritos = getValueLocalStorage();
    favoritos.forEach(f => {
        f = JSON.parse(f);
        let botao = criarBotao();
        botao.addEventListener('click', () => setValueLocalStorage(f));
        let listElement = document.createElement("li");
        let span = document.createElement("span");
        span.innerHTML = f.nome;
        listElement.appendChild(span);
        listElement.appendChild(botao);
        ul.appendChild(listElement);
    });
    main.appendChild(ul);
}

function criarBotao(){
    let botao = document.createElement("button");
    botao.innerHTML = 'Remover';
    botao.classList.add("botao-remover");
    return botao;
}

criarListagemFavoritos();