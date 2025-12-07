

import { fetchPokemonDetails } from "../main3.js";
import { renderPokemon } from "../main3.js";

export const API_URL = "http://localhost:3000/pokemon";

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
export function getSprite(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}


// ======================
// 🔥 FUNCIÓN EDIT POKEMON
// ======================
export async function editPokemon(pokeID) {
    
    const pokemon = await fetchPokemonDetails(pokeID);
  
    if (!pokemon) return;
  
    // Contenedor donde irán los inputs
    const editDiv = document.getElementById("editContainer");
    editDiv.innerHTML = `
        <h2>Editar Pokémon</h2>
  
        <label>Nombre</label>
        <input id="editName" value="${pokemon.pokeName}" type="text">
  
        <label>Peso</label>
        <input id="editWeight" value="${pokemon.pokeOverview.weight}" type="number">
  
        <label>Altura</label>
        <input id="editHeight" value="${pokemon.pokeOverview.height}" type="number">
  
        <label>Tipo</label>
        <input id="editType" value="${pokemon.pokeOverview.types[0]}" type="text">
  
        <label>Descripción</label>
        <textarea id="editDesc">${pokemon.pokeOverview.description}</textarea>
  
        <button id="saveEditBtn">Guardar cambios</button>
        <button id="cancelEditBtn">Cancelar</button>
    `;
  
    // ======= EVENTO GUARDAR =======
    document.getElementById("saveEditBtn").addEventListener("click", async () => {
  
      const updatedPokemon = {
        pokeName: document.getElementById("editName").value,
        pokeOverview: {
          weight: Number(document.getElementById("editWeight").value),
          height: Number(document.getElementById("editHeight").value),
          types: [document.getElementById("editType").value],
          description: document.getElementById("editDesc").value
        }
      };
  
      try {
        const res = await fetch(`http://localhost:3000/pokemon/${pokeID}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPokemon)
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          alert("Error al actualizar: " + data.message);
          return;
        }
  
        alert("Pokémon actualizado correctamente");
  
        editDiv.innerHTML = ""; // limpiar form
        renderPokemon(data.data); // repinta con los nuevos datos
  
      } catch (e) {
        console.error(e);
        alert("Error de red al actualizar");
      }
    });
  
    // ======= EVENTO CANCELAR =======
    document.getElementById("cancelEditBtn")
      .addEventListener("click", () => (editDiv.innerHTML = ""));
  }
  