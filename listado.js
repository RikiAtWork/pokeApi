const listaPokemon = document.getElementById("pokemon-listado");
const listaBotones = document.getElementById("lista-botones");
const pag1 = document.getElementById("pagina-1");
const pag2 = document.getElementById("pagina-2");
const pag3 = document.getElementById("pagina-3");
const pag4 = document.getElementById("pagina-4");
const pag5 = document.getElementById("pagina-5");

let paginaActual = 1;
const pokemonPorPagina = 24;

const url = "https://pokeapi.co/api/v2/pokemon/";

function actualizarColorPaginas() {
    const paginas = [pag1, pag2, pag3, pag4, pag5];

    for (let i = 0; i < paginas.length; i++) {
        paginas[i].style.background = i + 1 === paginaActual ? "#e1b505" : "";
    }
}

actualizarColorPaginas();

document.getElementById("pagina-anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        actualizarPagina();
        actualizarColorPaginas();
    }
});

document.getElementById("pagina-siguiente").addEventListener("click", () => {
        paginaActual++;
        actualizarPagina();
        actualizarColorPaginas();
    
});

pag1.addEventListener("click", () => {
    paginaActual = 1;
    actualizarPagina();
    actualizarColorPaginas();
});

pag2.addEventListener("click", () => {
    paginaActual = 2;
    actualizarPagina();
    actualizarColorPaginas();
});

pag3.addEventListener("click", () => {
    paginaActual = 3;
    actualizarPagina();
    actualizarColorPaginas();
});

pag4.addEventListener("click", () => {
    paginaActual = 4;
    actualizarPagina();
    actualizarColorPaginas();
});

pag5.addEventListener("click", () => {
    paginaActual = 5;
    actualizarPagina();
    actualizarColorPaginas();
});

actualizarPagina();

function cargarPaginaPokemon(inicio, fin) {
    for (let i = inicio; i <= fin; i++) {
        const client = new XMLHttpRequest();

        client.responseType = "json";
        client.open("GET", url + i);
        client.send();

        client.addEventListener("readystatechange", () => {
            const isDone = client.readyState === 4;
            const isOk = client.status === 200;

            if (isDone && isOk) {
                const data = client.response;

                const pokemon = {
                    id: data.id,
                    nombre: data.name,
                    imagen: data.sprites.other.home.front_default,
                    shiny: data.sprites.other.home.front_shiny,
                    peso: data.weight,
                    altura: data.height,
                    tipos: data.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`),
                }

                cartaPokemon(pokemon);
            }
        });
    }
}

function actualizarPagina() {
    const inicio = (paginaActual - 1) * pokemonPorPagina + 1;
    const fin = paginaActual * pokemonPorPagina;

    listaPokemon.innerHTML = "";

    cargarPaginaPokemon(inicio, fin);
}

const cartaPokemon = pokemon => {
    const carta = document.createElement("div");
    carta.classList.add("card");

    let tipos = pokemon.tipos;
    tipos = tipos.join('');

    carta.innerHTML =
        ` <div class="card-header">
            <span class="card-id">#${pokemon.id}</span>
        </div>

        <div class="card-image" id="imagen-${pokemon.id}" onclick="cambiarImagen(${pokemon.id}, '${pokemon.imagen}', '${pokemon.shiny}')">
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
        </div>

        <div class="card-title">
            <p>${pokemon.nombre}</p>
        </div>

        <div class="card-stats">
            <span class="card-peso">${pokemon.peso} KG</span>
            <span class="card-peso">${pokemon.altura} M</span>
        </div>
        <div class="card-tipos">
            ${tipos}
        </div>`;
        
    listaPokemon.appendChild(carta);
}

function cambiarImagen(id, imagenActual, imagenShiny) {
    const imagen = document.getElementById(`imagen-${id}`).getElementsByTagName('img')[0];
    
    if (imagen.src === imagenActual) {
        imagen.src = imagenShiny;
    } else {
        imagen.src = imagenActual;
    }
}