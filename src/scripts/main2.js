import { showAllPokemonsGrid } from "./Api/apiFetch.js";
//import { showMe } from'../scripts/Api/apiFetch.js';
import "../styles/style-Index2.scss";
import {
  eventsForNewUserForm,
} from "./events/createPokemon.js";
///////////////////////////////////////////////////////////////////////
/////////////LLAMADAS A ELEMENTOS//////////////////////////////////////
export const anchorElement2 = document.querySelector("#app2");
export const asideLeft = document.querySelector("#pdxSide1");
export const asideRigth = document.querySelector("#pdxSide2");
/////////////////////////////////////////////////////////////////
export const mainScreen = document.querySelector("#pdxScreen");
export const createButton = document.querySelector("#pdxCreateButton");
export const NumberPK = document.querySelector("#pdxNumber");
/////////////////////////////////////////////////////////////////////
export const secondScreen = document.querySelector("#pdxScreen2");
export const shapeDiv = document.querySelector("#divShape");
export const weigthDiv = document.querySelector("#WW");
export const heightDiv = document.querySelector("#HH");
export const typeDiv0 = document.querySelector("#pdxScreen");
export const typeDiv1 = document.querySelector("#type1");
export const typeDiv2 = document.querySelector("#type2");
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

createButton.addEventListener("click", () => {
    console.log("Opening new user form...");
  setNewUserForm();
});

export function setNewUserForm() {

     if (document.querySelector("#newUserDiv")) {
    console.log("Form already set");
    return;
  }


  const newUserDiv = document.createElement("div");
  newUserDiv.id = "newUserDiv";

  const newUserForm = document.querySelector("PDX"); ///////////////////////////////////////////////
  newUserForm.id = "newUserForm";////////////////////////////////////////////////////////////////////

  // inputs
  const inputPokeName = document.createElement("input");
  inputPokeName.id = "inputPokeName";
  inputPokeName.required = true;
  inputPokeName.placeholder = "Nombre";

  const inputDescription = document.createElement("input");
  inputDescription.id = "inputDescription";
  inputDescription.required = true;
  inputDescription.placeholder = "Descripcion"

  const inputWeight = document.createElement("input");
  inputWeight.id = "inputWeight";
  inputWeight.type = "number";
  inputWeight.required = true;
  inputWeight.placeholder = "Peso"

  const inputHeight = document.createElement("input");
  inputHeight.id = "inputHeight";
  inputHeight.type = "number";
  inputHeight.required = true;
  inputHeight.placeholder = "Altura"

  const inputPokeType = document.createElement("input");
  inputPokeType.id = "inputPokeType";
  inputPokeType.required = true;
  inputPokeType.placeholder = "Tipo";

  // buttons
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelar";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Guardar";

  newUserForm.append(
    inputPokeName,
    inputDescription,
    inputWeight,
    inputHeight,
    inputPokeType,
    cancelButton,
    saveButton
  );

  //newUserDiv.appendChild(newUserForm);
 // asideLeft.appendChild(newUserDiv);

  // Send elements
  eventsForNewUserForm({
    cancelButton,
    saveButton,
    newUserDiv,
    inputPokeName,
    inputDescription,
    inputWeight,
    inputHeight,
    inputPokeType,
  });
}
