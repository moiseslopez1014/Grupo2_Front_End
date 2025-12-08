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
  fairy: "Hada",
};
// Función auxiliar para obtener sprite desde PokeAPI CDN
export function getSprite(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export const editDiv = document.getElementById("editContainer");

export async function editPokemon(pokeID) {
  const pokemon = await fetchPokemonDetails(pokeID);
  if (!pokemon) return;

  // ======= FORMULARIO COMPLETO =======
  editDiv.classList = "editConteinerView2";
  editDiv.innerHTML = `
    <div class="editForm">

        <!-- NOMBRE -->
        <div class="editNameBox">
            <label>Nombre</label>
            <input id="editName" value="${pokemon.pokeName}" type="text">
        </div>

        <!-- DESCRIPCIÓN -->
        <div class="editDescBox">
            <label>Descripción</label>
            <textarea id="editDesc">${
              pokemon.pokeOverview.description
            }</textarea>
        </div>
<div class="tipeBox">
        <!-- Fila con 3 columnas -->
        <div class="editBasicBox">
            <label>Tipo</label>
            <input id="editType" value="${pokemon.pokeOverview.types.join(
              ","
            )}">
        </div>
            
        <div class="editBasicBox">
            <label>Peso</label>
            <input id="editWeight" value="${pokemon.pokeOverview.weight}">
        </div>
            
        <div class="editBasicBox">
            <label>Altura</label>
            <input id="editHeight" value="${pokemon.pokeOverview.height}">
        </div>
</div>
        <!-- TÍTULO STATS -->
        <h2 class="editStatsTitle">Estadísticas</h2>

        <!-- GRID DE STATS -->
        <div class="editStatsGrid">
           ${pokemon.pokeOverview.stats.map(stat => `
    <div class="statItem">
        <label>${stat.name}</label>
        <input 
            type="number" 
            id="stat-${stat.name}" 
            value="${stat.base}"
        >
    </div>
`).join("")}


        </div>

        <!-- BOTONES -->
        <div class="editButtons">
            <button id="saveEditBtn">Guardar cambios</button>
            <button id="cancelEditBtn">Cancelar</button>
        </div>

    </div>
`;

  // ======= EVENTO GUARDAR =======
  document.getElementById("saveEditBtn").addEventListener("click", async () => {
    const updatedPokemon = {
      pokeName: document.getElementById("editName").value,
      pokeOverview: {
        weight: Number(document.getElementById("editWeight").value),
        height: Number(document.getElementById("editHeight").value),
        types: [document.getElementById("editType").value],
        description: document.getElementById("editDesc").value,

        // ===== STATS CORREGIDOS =====
        stats: [
          { name: "hp", base: Number(document.getElementById("stat-hp").value) },
          {
            name: "attack",
            base: Number(document.getElementById("stat-attack").value),
          },
          {
            name: "defense",
            base: Number(document.getElementById("stat-defense").value),
          },
          {
            name: "special-attack",
            base: Number(document.getElementById("stat-special-attack").value),
          },
          {
            name: "special-defense",
            base: Number(document.getElementById("stat-special-defense").value),
          },
          {
            name: "speed",
            base: Number(document.getElementById("stat-speed").value),
          },
        ],
      },
    };

    try {
      const res = await fetch(`http://localhost:3000/pokemon/${pokeID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPokemon),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al actualizar: " + data.message);
        return;
      }

      alert("Pokémon actualizado correctamente");

      editDiv.classList = "editConteinerView";
      renderPokemon(data.data);
    } catch (e) {
      console.error(e);
      alert("Error de red al actualizar");
    }
  });

  // ======= EVENTO CANCELAR =======
  document.getElementById("cancelEditBtn").addEventListener("click", () => {
    editDiv.classList = "editConteinerView";
  });
}
