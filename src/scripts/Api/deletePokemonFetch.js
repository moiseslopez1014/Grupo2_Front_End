import { Dom } from "../dom/domElements.js";
import { apiConfig } from "./apiConfig.js";

export async function deletePoke(pokeID) {
    console.log("ole");
    try {
        const response= await fetch(`${apiConfig.pokemon}${pokeID}`,{
        method: "DELETE",
        headers:{"Content-type": "application/json"}    
        })
        if(!response.ok) throw new Error("hubo un problema al eliminar el pokemon");
        const data = await response.json();
        console.log("Deleted: ",data);
        Dom.deleteModal.classList.add("hidden");
        return window.location.reload();

    } catch (error) {
        throw new Error(error.message);
    }
};
