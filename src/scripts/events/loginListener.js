
/*

// LOGIN FORM LISTENER

export function listenerLogin(form, user, password) {
    form.addEventListener('submit', (event) => {
        //prevents
        event.preventDefault();
        //forms an object with login data
        const formData = {
            userID: user.value,
            userPASS: password.value
        };
        //testing data processed
        loginValidation(formData);
    })
}*/
/*
export function listenerLogin(form, user, password) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            userID: user.value,
            userPASS: password.value
        };

        console.log(formData);

        // Aquí haces tu validación. Ejemplo simple:
        if (formData.userID === "admin" && formData.userPASS === true) {
            window.location.href = "index2.html";
        } else if (formData.userID === "user" && formData.userPASS === true) {
            window.location.href = "index3.html";
        } 
        else {
            console.log("Usuario o contraseña incorrectos");
        }
    });
}
    */
////MOI AQUI TE HE DEJADO EL LISTENER CON LAS VALIDACIONES EN JS
///ES IGUAL QUE EL TUYO PERO CON UN IF Y UN ELSE IF PARA ADMIN Y USER
///PARA QUE DEPENDIENDO DEL TIPO DE CUENTA ENTRE EN INDEX2 O EN INDEX3
//TE LA DEJO COMENTADA PARA QUE LO REVISES ;)

/*

// src/scripts/events/loginListener.js
import { loginValidation } from "../Api/loginValidation.js";

export function listenerLogin(form, user, password) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = {
      userID: user.value,
      userPASS: password.value
    };

    const result = await loginValidation(formData);

    if (!result.ok) {
      // Mostrar mensaje de error en UI (puedes mejorarlo luego)
      alert(result.message || "Login fallido");
      return;
    }

    // Leer usuario guardado en localStorage
    const stored = JSON.parse(localStorage.getItem('pdx_user') || '{}');
    const role = stored.role || (result.data?.user?.role) || (result.data?.adminID?.role);

    if (role === 'admin') {
      window.location.href = "/index2.html";
    } else {
      window.location.href = "/index3.html";
    }
  });
}
*/
// src/scripts/events/loginListener.js
import { loginValidation } from "../Api/loginValidation.js";

export function listenerLogin(form, user, password) {

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Datos recogidos del formulario
    const formData = {
      userID: user.value,
      userPASS: password.value
    };

    // Ejecutar validación
    const result = await loginValidation(formData);

    if (!result.ok) {
      alert(result.message || "Login fallido");
      return;
    }

    // Leer lo que guardó loginValidation
    const stored = JSON.parse(localStorage.getItem("pdx_user"));

    if (!stored) {
      alert("Error inesperado.");
      return;
    }

    // 1️⃣ Si es ADMIN → index2
    if (stored.mode === "admin") {
      window.location.href = "/index2.html";
      return;
    }

    // 2️⃣ Si es POKÉMON → index3
    if (stored.mode === "pokemon") {
      window.location.href = "/index3.html";
      return;
    }

    // 3️⃣ Fallback
    alert("No se pudo determinar el tipo de acceso.");
  });
}
