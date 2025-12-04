import { apiConfig } from "../Api/apiConfig.js";
import { Dom } from "../dom/domElements.js";

Dom.deleteButton.addEventListener("click", async (event)=>{
    console.log("ole");
    event.preventDefault();
    const selectedPokemon = sessionStorage.getItem("Selected-Pokemon")
    pokeID = selectedPokemon.pokeID;
    console.log([pokeID]);
    try {
        await deletePoke(pokeID);
        alert (`Pokemon Nº${pokeID} eliminado... :( `);

       //window.location.reload();

    } catch (error) {
        alert(error.message);
    }
})

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
        return console.log(data);

    } catch (error) {
        throw new Error(error.message);
        
    }
    
};
