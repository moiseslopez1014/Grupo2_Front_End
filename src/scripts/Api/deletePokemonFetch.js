import { Dom } from "../dom/domElements.js";
import { apiConfig } from "./apiConfig.js";

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
        Dom.deleteModal.classList.add("hidden");
        return window.location.reload();

    } catch (error) {
        throw new Error(error.message);
    }
};
