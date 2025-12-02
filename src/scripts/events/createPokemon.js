import { createButton, pdx } from "../main2.js";
import { setNewUserForm } from "../main2.js";
import { createNewPokemonFetch } from "../Api/apiFetch.js";

export function eventsForNewUserForm({
  cancelButton,
  saveButton,
 // newUserDiv,
  inputPokeName,
  inputDescription,
  inputWeight,
  inputHeight,
  inputPokeType,
}) {
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
   /* pxd.remove(); // cerrar formulario
  });*/
  const inputElements = [
   // newUserDiv,
    inputPokeName,
    inputDescription,
    inputWeight,
    inputHeight,
    inputPokeType,
    saveButton,
    cancelButton
  ];

  inputElements.forEach(el => {
    if (pdx.contains(el)) pdx.removeChild(el);
  });
});

  saveButton.addEventListener("click", (e) => {
    console.log(e);
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
