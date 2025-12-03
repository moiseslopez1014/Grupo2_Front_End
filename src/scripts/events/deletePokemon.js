import { apiConfig } from "../Api/apiConfig.js";

export async function deletePoke(pokeID) {
    try {
        const response= await fetch(`${apiConfig.baseUrl}pokemon/${pokeID}`,{
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
export const deletePokeBtn= document.querySelector("#deleteBtn");

deletePokeBtn.addEventListener("click", async ()=>{
    const pokeID = selectedPokemon.pokeID;
    try {
        await deletePoke(pokeID);
        alert (`Pokemon Nº${pokeID} eliminado... :( `);

       window.location.reload();

    } catch (error) {
        alert(error.message);
    }
})