import '../styles/style-index0.scss';

const textDisplay = document.getElementById("textDisplay");
const nextBtn = document.getElementById("nextBtn");

const onboardingTexts = [
    "Bienvenido a PokeDex Trainer",
    " la pokédex más completa para entrenadores.",
    "En este panel, los administradores podrán crear y entrenar Pokémon, gestionar sus habilidades y estadísticas, y organizar sus equipos.",
    "Los usuarios normales no son administradores, sino Pokémon, que podrán acceder a su perfil, ver sus estadísticas y movimientos.",
    "Prepárate para explorar el mundo de Pokémon desde dos perspectivas: como entrenador y como Pokémon.",
    "¡Vamos a comenzar la aventura!"
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
        window.location.href = "/index.html";
    }
});
