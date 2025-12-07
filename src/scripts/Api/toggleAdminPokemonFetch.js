import { apiConfig } from "./apiConfig.js";

export async function toggleAdminPokemon(pokeID, userID) {
    try {
        const response = await fetch(`${apiConfig.pokemon}collection/${pokeID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }
        console.log(data);
        const dataToLocal = {
            mode: "admin",
            userName: userID,
            collection: data.data
        }
        localStorage.setItem("pdx_user", JSON.stringify(dataToLocal));

        return data;
    } catch (error) {
        console.log("toggleAdminPokemon ERROR:", error);
        throw error;
    }
}
