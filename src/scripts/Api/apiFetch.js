
import { heightDiv, mainScreen, NumberPK, typeDiv1, weigthDiv, secondScreen, gridContainer, auxScreen, typeDiv0 } from '../main2.js';
import { deletePoke } from "../events/deletePokemon.js";
const API_URL = "http://localhost:3000/pokemon";

let selectedCard = null;
let selectedPokemon = null;


const typeTranslation = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada"
};
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
    selectedPokemon= pokemon;
    const sprite = getSprite(pokemon.pokeID);

    auxScreen.style.display = "block";

    auxScreen.innerHTML = `
        <img class="imgPK" src="${sprite}" alt="${pokemon.pokeName}">
        <h2 class="namePK">${pokemon.pokeName.toUpperCase()}</h2>
    `;

    NumberPK.innerHTML = `<p>Number: <br>    # ${pokemon.pokeID}</p>`;
    weigthDiv.innerHTML = `<p>W: ${pokemon.pokeOverview.weight}</p>`;
    heightDiv.innerHTML = `<p>H: ${pokemon.pokeOverview.height}</p>`;
   // typeDiv1.innerHTML = `<p>${pokemon.pokeOverview.types}</p>`;

   const firstType = pokemon.pokeOverview.types[0];
   typeDiv1.innerHTML = `<p>${typeTranslation[firstType] || firstType}</p>`;

    const desc = pokemon.pokeOverview?.description || "No description available";
    secondScreen.innerHTML = `<p>Description:<br>${desc}</p>`;

    // Volver al grid
    auxScreen.onclick = () => {
        auxScreen.style.display = "none";
        NumberPK.innerHTML = "Number:";
        weigthDiv.innerHTML = "W";
        heightDiv.innerHTML = "H";
        typeDiv1.innerHTML = "Type";
        secondScreen.innerHTML = "Description:";
        typeDiv0.style.display = "block";

        selectedPokemon=null;
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
const deletePokeBtn= document.querySelector("#deleteBtn");

deletePokeBtn.addEventListener("click", async ()=>{
    const pokeID = selectedPokemon.pokeID;
    try {
        await deletePoke(pokeID);
        alert (`Pokemon Nº${pokeID} eliminado... :( `);

       window.location.reload();

    } catch (error) {
        alert(error.message);
    }
})


export async function createNewPokemonFetch(formGatherData) {
    console.log('ole');
}