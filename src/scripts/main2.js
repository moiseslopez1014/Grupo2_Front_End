import { showAllPokemonsGrid } from "./events/showAll.js";
//import { showMe } from'../scripts/Api/apiFetch.js';
import "../styles/style-Index2.scss";
import { eventsForNewUserForm } from "./events/createPokemon.js";
import { Dom } from "./dom/domElements.js";

///////////////////////////////////////////////////////////
/*const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "index.html";
};*/

//showMe();

// Al cargar la página
showAllPokemonsGrid(); // Muestra los primeros 20 Pokémon

Dom.createButton.addEventListener("click", () => {
  console.log("Opening new user form...");
  Dom.gridContainer.style.display = "none";
  setNewUserForm();
});

Dom.typeDiv2.addEventListener("click", () => {
  console.log("Opening modify user form...");
  const pokemon = JSON.parse(localStorage.getItem("Selected-Pokemon"));
  console.log(pokemon);
  setModifyUserForm(pokemon);
  //setNewUserForm();
});

export function setNewUserForm() {
  if (document.querySelector("#inputPokeName")) {
    console.log("Form already set");
    return;
  }

  const newUserDiv = document.createElement("div"); ////////////////////////////////////////////////////////
  newUserDiv.id = "newUserDiv"; ////////////////////////////////////////////////////////////////////////////

  // const newUserForm = document.querySelector("PDX"); ///////////////////////////////////////////////
  //newUserForm.id = "newUserForm";////////////////////////////////////////////////////////////////////

  // inputs
  const inputPokeName = document.createElement("input");
  inputPokeName.id = "inputPokeName";
  inputPokeName.required = true;
  inputPokeName.placeholder = "Nombre";

  const inputDescription = document.createElement("input");
  inputDescription.id = "inputDescription";
  inputDescription.required = true;
  inputDescription.placeholder = "Description:";

  const inputWeight = document.createElement("input");
  inputWeight.id = "inputWeight";
  inputWeight.type = "number";
  inputWeight.required = true;
  //inputWeight.placeholder = "Peso"

  const inputHeight = document.createElement("input");
  inputHeight.id = "inputHeight";
  inputHeight.type = "number";
  inputHeight.required = true;
  //inputHeight.placeholder = "Altura"

  const inputPokeType = document.createElement("input");
  inputPokeType.id = "inputPokeType";
  inputPokeType.required = true;
  //inputPokeType.placeholder = "Tipo";

  // buttons
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Can";
  cancelButton.id = "btnCancel";

  const saveButton = document.createElement("button");
  saveButton.id = "btnSave";
  saveButton.type = "submit";
  saveButton.textContent = "Sav";

  Dom.asideRight.append(
    inputDescription, //////
    inputWeight, //////
    inputHeight, //////
    inputPokeType, //////
    cancelButton, //////
    saveButton //////
  );
  Dom.asideLeft.appendChild(inputPokeName);

  // Send elements
  eventsForNewUserForm({
    cancelButton,
    saveButton,
    inputPokeName,
    inputDescription,
    inputWeight,
    inputHeight,
    inputPokeType,
  });
}
