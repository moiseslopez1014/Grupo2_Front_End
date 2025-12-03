import { API_URL, createCardGrid } from "./editPokemon";
import { gridContainer } from "../main2";

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