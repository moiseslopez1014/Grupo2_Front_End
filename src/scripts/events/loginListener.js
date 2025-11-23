import { loginValidation } from "../Api/loginValidation.js";


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
}
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