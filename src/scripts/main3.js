import '../styles/style-index3.scss';
import { editPokemon, getSprite } from './events/editPokemonFetch.js';

// src/scripts/index3.js

// 🔹 Referencias a los divs donde mostraremos la info
export const mainScreen = document.querySelector("#cubo"); // Imagen, nombre, número
export const typeDiv = document.querySelector("#typeDiv");       // Tipo
export const weightDiv = document.querySelector("#weightDiv");   // Peso
export const heightDiv = document.querySelector("#heightDiv");   // Altura
export const statsDiv = document.querySelector("#statsDiv");     // Estadísticas
export const movesDiv = document.querySelector("#movesDiv");     // Movimientos
export const descriptionDiv = document.querySelector("#descriptionDiv"); // Descripción
export const nav= document.querySelector("#nav");
// Recuperamos info del Pokémon desde localStorage
const storedUser = JSON.parse(localStorage.getItem("pdx_user"));

if (!storedUser || storedUser.mode !== "pokemon") {
  alert("No estás logueado como Pokémon");
  window.location.href = "/index0.html"; // onboarding si no hay sesión
}

const pokeID = storedUser.pokeID;

// Función para traer datos completos del Pokémon
export async function fetchPokemonDetails(id) {
  try {
    const res = await fetch(`http://localhost:3000/pokemon/${id}`);
    const json = await res.json();

    if (!res.ok || !json.data) {
      throw new Error("No se pudo cargar el Pokémon");
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    alert("No se pudo cargar el Pokémon");
  }
}

// Función para pintar los detalles
export function renderPokemon(pokemon) {
  // Imagen, nombre y número
  const sprite = getSprite(pokemon.pokeID);
  mainScreen.innerHTML = `
    <img class="imgPoke" src="${sprite}" alt="${pokemon.pokeName}" />
    <h2 class="namePoke">${pokemon.pokeName.toUpperCase()}</h2>
    <p class="numberPoke">Nº: ${pokemon.pokeID}</p>
  `;

  // Tipo
  typeDiv.innerHTML = `<p>Type: ${pokemon.pokeOverview.types.join(", ")}</p>`;

  // Peso y altura
  weightDiv.innerHTML = `<p>Peso: ${pokemon.pokeOverview.weight}</p>`;
  heightDiv.innerHTML = `<p>Altura: ${pokemon.pokeOverview.height}</p>`;

  // Descripción
  descriptionDiv.innerHTML = `<p>${pokemon.pokeOverview.description}</p>`;

  // Estadísticas
  console.log("STATS:", pokemon.pokeOverview.stats);

  statsDiv.innerHTML = "<h3>Estadísticas</h3>";
  const statsList = document.createElement("div");
  statsList.id="statsDiv_conteiner";
  pokemon.pokeOverview.stats.forEach(stat => {
    const li = document.createElement("div");
    li.classList.add="statsLi";
    li.textContent = `${stat.name}: ${stat.base}`;
    statsList.appendChild(li);
  });
  statsDiv.appendChild(statsList);

  // Movimientos
  movesDiv.innerHTML = "<h3>Movimientos</h3>";
  const movesList = document.createElement("div");
  movesList.className="divMoves";
  pokemon.pokeOverview.moves.forEach(move => {
    const li = document.createElement("p");
    li.textContent = move;
    movesList.appendChild(li);
  });
  movesDiv.appendChild(movesList);
}

// Ejecutar todo al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
  const pokemonData = await fetchPokemonDetails(pokeID);
  if (pokemonData) {
    renderPokemon(pokemonData);
  }
});
document.getElementById("editButton").addEventListener("click", () => {
  editPokemon(pokeID);
});
