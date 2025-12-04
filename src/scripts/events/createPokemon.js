import { Dom } from "../dom/domElements.js";
import { createNewPokemonFetch } from "./editPokemon.js";


export function eventsForNewUserForm({
  cancelButton,
  saveButton,
  inputPokeName,
  inputDescription,
  inputWeight,
  inputHeight,
  inputPokeType,
}) {

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    Dom.asideLeft.removeChild(inputPokeName)
    Dom.asideRight.removeChild(inputPokeType)
    Dom.asideRight.removeChild(inputHeight)
    Dom.asideRight.removeChild(inputWeight)
    Dom.asideRight.removeChild(inputDescription)
    Dom.asideRight.removeChild(saveButton)
    Dom.asideRight.removeChild(cancelButton)
    Dom.gridContainer.style.display="block";
    //showAllPokemonsGrid();

  })


  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      inputPokeName.value.trim() == "" ||
      inputDescription.value.trim() == "" ||
      inputWeight.value <1 ||
      inputHeight.value <1 ||
      inputPokeType.value.trim() == ""
    ) {
        return console.log("algun campo esta vacio");
    }
    const formGatherData = {
      pokeName: inputPokeName.value,
      pokeOverview: {
        description: inputDescription.value,
        weight: inputWeight.value,
        height: inputHeight.value,
        types: [inputPokeType.value],
      },
    };

    console.log("Sending new pokemon:", formGatherData);

    createNewPokemonFetch(formGatherData);
  });
}
