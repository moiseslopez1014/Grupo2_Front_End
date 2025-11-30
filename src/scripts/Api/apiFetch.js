
import { heightDiv, mainScreen, NumberPK, typeDiv1, weigthDiv, secondScreen, gridContainer, auxScreen, typeDiv0 } from '../main2.js';

const API_URL = "http://localhost:3000/pokemon";

let selectedCard = null;

// Función auxiliar para obtener sprite desde PokeAPI CDN
function getSprite(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

// Crear card
export function createCardGrid(pokemon) {

    const sprite = getSprite(pokemon.pokeID);

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
        <img src="${sprite}" alt="${pokemon.pokeName}" width="80">
        <p>${pokemon.pokeName.toUpperCase()}</p>
    `;

    card.addEventListener("click", () => {
        typeDiv0.style.display = "none";
        showDetail(pokemon);
    });

    gridContainer.appendChild(card);
}

// Mostrar detalle
export function showDetail(pokemon) {
    const sprite = getSprite(pokemon.pokeID);

    auxScreen.style.display = "block";

    auxScreen.innerHTML = `
        <img class="imgPK" src="${sprite}" alt="${pokemon.pokeName}">
        <h2 class="namePK">${pokemon.pokeName.toUpperCase()}</h2>
    `;

    NumberPK.innerHTML = `<p>Nº: ${pokemon.pokeID}</p>`;
    weigthDiv.innerHTML = `<p>${pokemon.pokeOverview.weight}</p>`;
    heightDiv.innerHTML = `<p>${pokemon.pokeOverview.height}</p>`;
    typeDiv1.innerHTML = `<p>${pokemon.pokeOverview.types.join(", ")}</p>`;

    const desc = pokemon.pokeOverview?.description || "No description available";
    secondScreen.innerHTML = `<p>${desc}</p>`;

    // Volver al grid
    auxScreen.onclick = () => {
        auxScreen.style.display = "none";
        NumberPK.innerHTML = "";
        weigthDiv.innerHTML = "";
        heightDiv.innerHTML = "";
        typeDiv1.innerHTML = "";
        secondScreen.innerHTML = "";
        typeDiv0.style.display = "block";
    };
}

// Mostrar todos los pokemons
export async function showAllPokemonsGrid() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const pokemonList = data.data; // tu backend

        gridContainer.innerHTML = "";

        pokemonList.forEach(pokemon => {
            createCardGrid(pokemon);
        });

    } catch (error) {
        console.error("Error cargando Pokémon desde tu API local:", error);
    }
}
