//CREANDO H1

let titulo = document.querySelector('h1');
titulo.innerHTML=`Bienvenido a tu cuenta de JonBank`

//CREANDO INICIO SESIÓN


let contenedor = document.querySelector('#login-container');

contenedor.innerHTML = `
<div class="login-form">
        <h2>Inicio de Sesión</h2>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="butto" id='submit' >Iniciar Sesión</button>
        </form>
    </div>`;

// Obtenemos el botón de inicio de sesión 
let submit = document.querySelector('#submit');

// Agregamos un evento de clic al botón
submit.addEventListener('click', function(event) {
    
    event.preventDefault();

    // Obtenemos los valores de usuario y contraseña
    let username = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="password"]').value;

    // Verificamos si los campos estan completos
    if (username.trim() === '' || password.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "ATENCION",
            text: "Debes completar todos los campos",
        });
    } else {
        //guardamos en el localStorage el nombre de usuario
        localStorage.setItem('username', username)

        // Redireccionamos a inversiones.html


        Swal.fire({
            position: "center",
            icon: "success",
            title: "Ingresando a tu cuenta...",
            showConfirmButton: false,
            timer: 1500
            });
        setTimeout(() => {
            window.location.href = '/Coderhouse/pages/cuenta.html';
            
        }, 1500);
    }
});







