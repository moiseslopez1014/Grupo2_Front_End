import { apiConfig } from "./apiConfig";


export async function createNewPokemonFetch(formGatherData) {
    try {
        const { pokeName } = formGatherData;
        const { description, height, weight, types } = formGatherData.pokeOverview;
        console.log(typeof pokeName, typeof description, typeof height, typeof weight, typeof types);
        
        const response = await fetch(apiConfig.pokemon, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formGatherData)
        });
        console.log(response);
        if (!response.ok) throw new Error("Error while creating a new pokemon");
        const data = await response.json();
        console.log(data);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}