import { Dom } from "../dom/domElements.js";
import { toggleAdminPokemon } from "../Api/toggleAdminPokemonFetch.js";

export function teamToggleListener() {
    const btn = Dom.toggleTeamBtn;

    if (!btn) return console.warn("teamToggleBtn NOT FOUND!");

    btn.addEventListener("click", async () => {
        const selected = JSON.parse(sessionStorage.getItem("Selected-Pokemon"));
        const admin = JSON.parse(localStorage.getItem("pdx_user"));

        if (!selected) return alert("No Pokémon selected.");
        if (!admin || admin.mode !== "admin") return alert("Admin not logged.");

        try {
            btn.disabled = true;

            const result = await toggleAdminPokemon(selected.pokeID, admin.userName);

            alert(result.message);

            updateToggleButton(btn, result); 

        } catch (err) {
            alert(err.message);
        } finally {
            btn.disabled = false;
        }
    });
}

function updateToggleButton(btn, result) {
    if (result.message.toLowerCase().includes("removed")) {
        btn.textContent = "Add";
        btn.classList.remove("in-team");
    } else if (result.message.toLowerCase().includes("added")) {
        btn.textContent = "Rmv";
        btn.classList.add("in-team");
    }
}
