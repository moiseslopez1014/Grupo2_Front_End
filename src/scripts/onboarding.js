import '../styles/style-index0.scss';

const textDisplay = document.getElementById("textDisplay");
const nextBtn = document.getElementById("nextBtn");

const onboardingTexts = [
    "Bienvenido a PokeDex Trainer",
    "Explora la lista y toca cualquier Pokémon para ver su ficha completa con estadísticas y descripción.",
    "En el modo detalle, pulsa EDIT para modificar nombre, peso, altura, tipo o descripción.",
    "Usa el botón + para crear un nuevo Pokémon: introduce los datos y guarda para registrarlo en la Pokédex.",
    "Pulsa el icono de la papelera para borrar un Pokémon; confirma la acción en la ventana emergente.",
    "Desde la ficha, usa el botón ADD / RMV para agregar o quitar Pokémon de tu equipo (máx. 6)."
];

let currentIndex = 0;

// Mostrar el primer texto
textDisplay.textContent = onboardingTexts[currentIndex];

// Función para avanzar al siguiente texto
nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < onboardingTexts.length) {
        textDisplay.textContent = onboardingTexts[currentIndex];
    } else {
        // Último texto → redirige al login
        window.location.href = "/index1.html";
    }
});
