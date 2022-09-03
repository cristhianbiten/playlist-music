
// CAPTURA INFORMAÇÕES DO FORM
const botaoAdiciona = document.querySelector("#form-adiciona") as HTMLInputElement;
const musica = document.querySelector("#musica-add") as HTMLInputElement;
const album = document.querySelector("#album-add") as HTMLInputElement;
const artista = document.querySelector("#cantor-add") as HTMLInputElement;
const tabela = document.querySelector("#tabela-musicas") as HTMLElement;

let arrayVazio: any = [];

// FUNÇÃO EXIBIR - CRIA ELEMENTOS DA TABELA E ORGANIZA
function exibir() {

    tabela.innerHTML = "";

    arrayVazio.map((item: any, index: any) => {

        let edicaoInicial = document.createElement("td");
        edicaoInicial.classList.add("inicia");
        let edicaoIU = document.createElement("i");
        edicaoIU.textContent = "play_arrow";
        edicaoIU.classList.add("material-icons");

        let musicaTr = document.createElement("tr");
        musicaTr.classList.add("musicas");


        let edicaoTd = document.createElement("td");
        edicaoTd.classList.add("edicoes");
        let edicaoI = document.createElement("i");
        edicaoI.textContent = "delete";
        edicaoI.classList.add("material-icons", "cris");
        edicaoI.setAttribute("onclick", `removerItem(${index})`)


        musicaTr.appendChild(edicaoInicial);
        edicaoInicial.appendChild(edicaoIU);
        musicaTr.appendChild(montaTD(item.contMusica, "info-musica"));
        musicaTr.appendChild(montaTD(item.contAlbum, "info-album"));
        musicaTr.appendChild(montaTD(item.contArtista, "info-cantor"));
        musicaTr.appendChild(edicaoTd);
        edicaoTd.appendChild(edicaoI);

        tabela.appendChild(musicaTr);
    });
}

exibir();

// EVENTO DE ADICIONAR MúSICA
botaoAdiciona.addEventListener("submit", function (event) {
    event.preventDefault();

    const objet = {
        contMusica: musica.value,
        contAlbum: album.value,
        contArtista: artista.value
    }

    arrayVazio.push(objet);

    exibir();

    // LIMPA FORM ADD
    musica.value = '';
    album.value = '';
    artista.value = '';
    musica.focus();

});

// MONTA TD 
function montaTD(dado: string, classe: string) {
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td
}

// EVENTO DE FILTRAR MÚSICA
const campoFiltro = document.querySelector("#filtrar-tabela") as HTMLInputElement;

campoFiltro.addEventListener("input", function () {
    const musics = document.querySelectorAll(".musicas");

    if (this.value.length > 0) {
        for (var i = 0; i < musics.length; i++) {
            let musc = musics[i];
            const tdMusica = musc.querySelector(".info-musica") as HTMLElement;
            let nomeMusica = tdMusica.textContent;
            if (nomeMusica != this.value) {
                musc.classList.add("invisivel")
            } else {
                musc.classList.remove("invisivel")
            }
        }
    } else {
        for (let i = 0; i < musics.length; i++) {
            let musc = musics[i];
            musc.classList.remove("invisivel");
        }
    }
});

// EVENTO DE REMOVER MÚSICA
function removerItem(index: any) {
    arrayVazio.splice(index, 1);
    exibir();
}