
import { heightDiv, mainScreen, NumberPK, typeDiv1, weigthDiv, secondScreen, gridContainer, auxScreen, typeDiv0, asideRigth } from '../main2.js';

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

// Mostrar detalle con opción de editar
export function showDetail(pokemon) {
    selectedPokemon = pokemon;
    const sprite = getSprite(pokemon.pokeID);

    auxScreen.style.display = "block";

    auxScreen.innerHTML = `
        <img class="imgPK" src="${sprite}" alt="${pokemon.pokeName}">
        <h2 class="namePK">${pokemon.pokeName.toUpperCase()}</h2>
    `;

    NumberPK.innerHTML = `<p>Number: <br> # ${pokemon.pokeID}</p>`;
    weigthDiv.innerHTML = `<p>W: ${pokemon.pokeOverview.weight}</p>`;
    heightDiv.innerHTML = `<p>H: ${pokemon.pokeOverview.height}</p>`;

    const firstType = pokemon.pokeOverview.types[0];
    typeDiv1.innerHTML = `<p>${typeTranslation[firstType] || firstType}</p>`;

    const desc = pokemon.pokeOverview?.description || "No description available";
    secondScreen.innerHTML = `<p>Description:<br>${desc}</p>`;

    // Botón Edit
    const editBtn = document.querySelector("#type2");
    
    

    editBtn.addEventListener("click", () => {
        // Cambiar los campos a inputs
        auxScreen.querySelector(".namePK").outerHTML = `<input type="text" id="editName" value="${pokemon.pokeName}">`;
        weigthDiv.innerHTML = `<input type="number" id="editWeight" value="${pokemon.pokeOverview.weight}">`;
        heightDiv.innerHTML = `<input type="number" id="editHeight" value="${pokemon.pokeOverview.height}">`;
        typeDiv1.innerHTML = `<input type="text" id="editType" value="${typeTranslation[firstType] || firstType}">`;
        secondScreen.innerHTML = `<textarea id="editDesc">${pokemon.pokeOverview.description}</textarea>`;
 ////botojn cancel
 const noBtn = document.createElement("button");
 noBtn.textContent = "cancel";
 asideRigth.appendChild(noBtn);
        // Botón Save
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save ";
        asideRigth.appendChild(saveBtn);

        saveBtn.addEventListener("click", async () => {
            // Convertimos tipo a su versión interna si es necesario
            const reversedType = Object.keys(typeTranslation).find(
                key => typeTranslation[key] === document.getElementById("editType").value
            ) || document.getElementById("editType").value;
            
           

            const updatedData = {
                pokeName: document.getElementById("editName").value,
                pokeOverview: {
                    weight: Number(document.getElementById("editWeight").value),
                    height: Number(document.getElementById("editHeight").value),
                    types: [reversedType],
                    description: document.getElementById("editDesc").value
                }
            };

            try {
                const res = await fetch(`http://localhost:3000/pokemon/${pokemon.pokeID}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData)
                });
                const data = await res.json();
                if (res.ok) {
                    alert("Pokémon actualizado correctamente");
                    showDetail(data.data); // recargar detalle con nuevos datos
                } else {
                    alert("Error al actualizar: " + data.message);
                }
            } catch (err) {
                console.error(err);
                alert("Error de red al actualizar Pokémon");
            }
        });
    });

    // Volver al grid
    auxScreen.onclick = (e) => {
        
            auxScreen.style.display = "none";
            NumberPK.innerHTML = "Number:";
            weigthDiv.innerHTML = "W";
            heightDiv.innerHTML = "H";
            typeDiv1.innerHTML = "Type";
            secondScreen.innerHTML = "Description:";
            typeDiv0.style.display = "block";

            selectedPokemon = null;
        
    };
}

//////////////////////????????????????????????????/////////////////////////////////////////////////////
export async function createNewPokemonFetch(formGatherData) {
    console.log('ole');
    console.log(formGatherData);
}