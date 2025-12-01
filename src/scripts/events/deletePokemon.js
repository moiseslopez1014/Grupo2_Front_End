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
