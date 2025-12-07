import { deletePoke } from "../Api/deletePokemonFetch.js";
import { Dom } from "../dom/domElements.js";

let pokemonToDelete = null;

export function eventListenerForDelete() {
Dom.deleteButton.addEventListener("click", () => {
    if (!sessionStorage.getItem("Selected-Pokemon")) {
        alert("No hay Pokémon seleccionado.");
        return;
    }

    pokemonToDelete = JSON.parse(sessionStorage.getItem("Selected-Pokemon"));
    Dom.deleteModal.classList.remove("hidden");
})};


Dom.cancelDeleteBtn.addEventListener("click", () => {
    Dom.deleteModal.classList.add("hidden");
    pokemonToDelete = null;
});

Dom.confirmDeleteBtn.addEventListener("click", () => {
    if (!pokemonToDelete) return;

    const pokeID = pokemonToDelete.pokeID;
    deletePoke(pokeID);
})
