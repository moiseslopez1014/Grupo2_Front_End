import { apiConfig } from "../Api/apiConfig.js";
import { Dom } from "../dom/domElements.js";

export async function eventListenerForDelete() {
Dom.deleteButton.addEventListener("click", async (event)=>{
    event.preventDefault();
    const selectedPokemon = JSON.parse(sessionStorage.getItem("Selected-Pokemon"));
    
    deletePoke(selectedPokemon.pokeID);
})
}

export async function deletePoke(pokeID) {
    console.log("ole");
    try {
        const response= await fetch(`${apiConfig.pokemon}${pokeID}`,{
        method: "DELETE",
        headers:{"Content-type": "application/json"}    
        })
        if(!response.ok){
            const errMessage = await response.text();
            throw new Error(errMessage);
        }
        const data = await response.json();
        console.log(data);
        return window.location.reload();

    } catch (error) {
        throw new Error(error.message);
    }
};
