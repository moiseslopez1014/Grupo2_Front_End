
import {Dom} from "../dom/domElements.js";
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
        Dom.typeDiv0.style.display = "none";
        showDetail(pokemon);
    });

    Dom.gridContainer.appendChild(card);
}

// Mostrar detalle con opción de editar
export function showDetail(pokemon) {
    selectedPokemon = pokemon;
    sessionStorage.setItem("Selected-Pokemon", JSON.stringify(selectedPokemon))
    const sprite = getSprite(pokemon.pokeID);

    Dom.auxScreen.style.display = "block";

    Dom.auxScreen.innerHTML = `
        <img class="imgPK" src="${sprite}" alt="${pokemon.pokeName}">
        <h2 class="namePK">${pokemon.pokeName.toUpperCase()}</h2>
    `;

    Dom.NumberPK.innerHTML = `<p>Number: <br> # ${pokemon.pokeID}</p>`;
    Dom.weigthDiv.innerHTML = `<p>W: ${pokemon.pokeOverview.weight}</p>`;
    Dom.heightDiv.innerHTML = `<p>H: ${pokemon.pokeOverview.height}</p>`;

    const firstType = pokemon.pokeOverview.types[0];
    Dom.typeDiv1.innerHTML = `<p>Type: <br> ${typeTranslation[firstType] || firstType}</p>`;

    const desc = pokemon.pokeOverview?.description || "No description available";
    Dom.secondScreen.innerHTML = `<p>Description:<br>${desc}</p>`;
    
    

    Dom.typeDiv2.addEventListener("click", () => {
        if(selectedPokemon === null){return;}
        else{
        // Cambiar los campos a inputs
        Dom.auxScreen.querySelector(".namePK").outerHTML = `<input type="text" id="editName" value="${pokemon.pokeName}">`;
        Dom.weigthDiv.innerHTML = `<input type="number" id="editWeight" value="${pokemon.pokeOverview.weight}">`;
        Dom.heightDiv.innerHTML = `<input type="number" id="editHeight" value="${pokemon.pokeOverview.height}">`;
        Dom.typeDiv1.innerHTML = `<input type="text" id="editType" value="${typeTranslation[firstType] || firstType}">`;
        Dom.secondScreen.innerHTML = `<textarea id="editDesc">${pokemon.pokeOverview.description}</textarea>`;
 ////botojn cancel
 const noBtn = document.createElement("button");
 noBtn.id="noBtn";
 noBtn.textContent = "Can";
 Dom.asideRight.appendChild(noBtn);
        // Botón Save
        const saveBtn = document.createElement("button");
        saveBtn.id="editSaveBTN";
        saveBtn.textContent = "Sav ";
        Dom.asideRight.appendChild(saveBtn);

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
    }});

    // Volver al grid
    Dom.auxScreen.onclick = (e) => {
        
            Dom.auxScreen.style.display = "none";
            Dom.NumberPK.innerHTML = "Number:";
            Dom.weigthDiv.innerHTML = "W:";
            Dom.heightDiv.innerHTML = "H:";
            Dom.typeDiv1.innerHTML = "Type:";
            Dom.secondScreen.innerHTML = "Description:";
            Dom.typeDiv0.style.display = "block";

            selectedPokemon = null;
        
    };
}

//////////////////////????????????????????????????/////////////////////////////////////////////////////
