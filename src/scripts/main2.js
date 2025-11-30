
import { showAllPokemonsGrid } from "./Api/apiFetch.js";
//import { showMe } from'../scripts/Api/apiFetch.js';
import '../styles/style-Index2.scss';
///////////////////////////////////////////////////////////////////////
/////////////LLAMADAS A ELEMENTOS//////////////////////////////////////
export const anchorElement2= document.querySelector("#app2");
export const asideLeft= document.querySelector("#pdxSide1");
export const asideRigth= document.querySelector("#pdxSide2");
/////////////////////////////////////////////////////////////////
export const mainScreen= document.querySelector("#pdxScreen");
export const NumberPK= document.querySelector("#pdxNumber");
/////////////////////////////////////////////////////////////////////
export const secondScreen= document.querySelector("#pdxScreen2");
export const shapeDiv= document.querySelector("#divShape");
export const weigthDiv= document.querySelector("#WW");
export const heightDiv= document.querySelector("#HH");
export const typeDiv0= document.querySelector("#pdxScreen");
export const typeDiv1= document.querySelector("#type1");
export const typeDiv2= document.querySelector("#type2");
export const gridContainer = document.querySelector("#pokemonGrid");
export const auxScreen = document.querySelector("#pdxScreenAux");

///////////////////////////////////////////////////////////
/*const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "index.html";
};*/


//showMe();




// Al cargar la página
showAllPokemonsGrid(); // Muestra los primeros 20 Pokémon
