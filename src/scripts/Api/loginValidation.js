
/*
export async function loginValidation(inputData) {
    try {
        const res = await fetch('http://localhost:3000/admin/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        });

        const data = await res.json();
        return console.log(data);
    } catch (error) {
        console.log(error);
    }
}
*/
/*
import { apiConfig } from "./apiConfig.js";

export async function loginValidation(inputData) {
  try {
    const res = await fetch(`${apiConfig.baseUrl}admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
    });

    const data = await res.json();

    if (!res.ok) {
      // manejar errores amigables
      const message = data.error || data.message || 'Login failed';
      console.error("Login error:", message);
      return { ok: false, message };
    }

    // data.user (según la mejora recomendada en backend) o data.adminID
    const user = data.user || data.adminID || null;

    // guardamos en localStorage la info mínima
    if (user) {
      const payload = {
        userName: user.userName || user.UserName || null,
        role: user.role || user.role || 'trainer'
      };
      localStorage.setItem('pdx_user', JSON.stringify(payload));
    }

    return { ok: true, data };

  } catch (error) {
    console.error("Network error:", error);
    return { ok: false, message: error.message };
  }
}
*/
/*
// src/scripts/Api/loginValidation.js
import { apiConfig } from "./apiConfig.js";

export async function loginValidation(inputData) {
  try {
    // 1️⃣ Intentar login como ADMIN
    const adminRes = await fetch(`${apiConfig.baseUrl}admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData)
    });

    const adminData = await adminRes.json();

    if (adminRes.ok) {
      // ÉXITO COMO ADMIN
      const user = adminData.user || adminData.adminID;

      const payload = {
        mode: "admin",                  // 👉 indica tipo
        userName: user.userName,
      };

      localStorage.setItem('pdx_user', JSON.stringify(payload));

      return { ok: true, mode: "admin", data: user };
    }

    // 2️⃣ Si NO es admin, intentar login como POKÉMON
    const pokeName = inputData.userID.toLowerCase();
    const pokeID = Number(inputData.userPASS);

    const pokeRes = await fetch(`${apiConfig.baseUrl}pokemon/${pokeID}`);
    const pokeData = await pokeRes.json();

    // Verificar si coincide nombre + ID
    if (pokeRes.ok && pokeData.pokeName === pokeName) {

      const payload = {
        mode: "pokemon",     // 👉 Muy importante para el listener
        pokeID: pokeData.pokeID,
        pokeName: pokeData.pokeName
      };

      localStorage.setItem("pdx_user", JSON.stringify(payload));

      return { ok: true, mode: "pokemon", data: pokeData };
    }

    // 3️⃣ Si falla todo → error final
    return { ok: false, message: "Usuario o contraseña incorrectos." };

  } catch (error) {
    console.error("Network error:", error);
    return { ok: false, message: error.message };
  }
}
*/
// src/scripts/Api/loginValidation.js
import { apiConfig } from "./apiConfig.js";

/**
 * Función de validación de login.
 * Soporta:
 *  - Admin: con userID + userPASS
 *  - Pokémon: con pokeName como userID y pokeID como password
 */
export async function loginValidation(inputData) {
  try {
    // --------------------------------------
    // 1️⃣ Intentar login como ADMIN
    // --------------------------------------
    const adminRes = await fetch(`${apiConfig.baseUrl}admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });

    const adminData = await adminRes.json();

    if (adminRes.ok) {
      // ÉXITO COMO ADMIN
      // Nota: tu backend devuelve { message, data: admin }
      const user = adminData.data;

      // Guardamos en localStorage la info mínima
      const payload = {
        mode: "admin",        // indica que es admin
        userName: user.userID // tu backend usa userID
      };

      localStorage.setItem("pdx_user", JSON.stringify(payload));

      return { ok: true, mode: "admin", data: user };
    }

    // --------------------------------------
    // 2️⃣ Si NO es admin, intentar login como POKÉMON
    // --------------------------------------
    const pokeName = inputData.userID.toLowerCase(); // nombre escrito
    const pokeID = Number(inputData.userPASS);      // password como número

    const pokeRes = await fetch(`${apiConfig.baseUrl}pokemon/${pokeID}`);
    const pokeData = await pokeRes.json();

    // Verificar si coincide nombre + ID
    if (pokeRes.ok && pokeData.data && pokeData.data.pokeName.toLowerCase() === pokeName) {
      const pokemon = pokeData.data;

      // Guardamos info mínima del Pokémon
      const payload = {
        mode: "pokemon",
        pokeID: pokemon.pokeID,
        pokeName: pokemon.pokeName
      };

      localStorage.setItem("pdx_user", JSON.stringify(payload));

      return { ok: true, mode: "pokemon", data: pokemon };
    }

    // --------------------------------------
    // 3️⃣ Si falla todo → error final
    // --------------------------------------
    return { ok: false, message: "Usuario o contraseña incorrectos." };

  } catch (error) {
    console.error("Network error:", error);
    return { ok: false, message: error.message };
  }
}
