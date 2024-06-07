//chequamos el saldo en el localStorage

document.addEventListener('DOMContentLoaded', function() {
    let saldoGuardado = localStorage.getItem('saldo');
    if (saldoGuardado !== null) {
        let saldoLocal = document.getElementById("saldo-local");
        saldoLocal.textContent = saldoGuardado;
    }
});




//creamos el navbar


let navbar = document.querySelector('div');

navbar.innerHTML=`
<div class="navbar" id="navbar">
        <div class="navbar-brand">
            <a href="#">JonBank</a>
        </div>
        <div class="navbar-links">
            <a href="/pages/cuenta.html">Cuenta</a>
            <a href="/pages/servicios.html">Servicios</a>
            <a href="/pages/cotizacionusd.html">Cotización USD</a>
        </div>
    </div>`


//cremamos las cuentas

let cuentas = document.querySelector('.contenedor-central');

cuentas.innerHTML = `

        <div class="cuenta-container">
            <h2>Cuenta en Moneda Local</h2>
            <div class="saldo">Saldo: $<span id="saldo-local">0</span></div>
            <button class="agregar-dinero">Agregar Dinero</button>
            <button class="transferir-dinero">Transferir Dinero</button>
            <select id="selectConceptos">
            
            </select>
        </div>
`

//creamos agregar dinero 


let modalAgregar = document.querySelector('#modal');
modalAgregar.innerHTML= `
<div class="modal-content">
            <h2>Selecciona una opción para agregar dinero:</h2>
            <div>
                <input type="number" id="cantidad-input" placeholder="Ingrese la cantidad">
                <button id="agregar-cantidad">Agregar</button>
            </div>
            <button id="cancelar">Cancelar</button>
        </div>
`



// Obtenemos el botón "Agregar Dinero"
let agregarDineroBtn = document.querySelector('.agregar-dinero');


let modal = document.getElementById("modal");
let agregarCantidadBtn = document.getElementById("agregar-cantidad");
let cancelarBtn = document.getElementById("cancelar");

agregarDineroBtn.addEventListener('click', function() {
    modal.style.display = "block"; // Mostramos el modal
});

// Agregamos un evento de clic al botón "Agregar"
agregarCantidadBtn.addEventListener('click', function() {
    let cantidadInput = document.getElementById("cantidad-input");
    let cantidad = parseFloat(cantidadInput.value);
    if (!isNaN(cantidad) && cantidad > 0) {

        let saldoLocal = document.getElementById("saldo-local");

        saldoLocal.textContent = parseFloat(saldoLocal.textContent) + cantidad;

        
        localStorage.setItem('saldo', parseFloat(saldoLocal.textContent));

        Swal.fire({
            icon: "success",
            title: "Dinero agregado",
            text: `Se han agregado $${cantidad} con éxito.`,
        });

        modal.style.display = "none";
        cantidadInput.value = "";
        
    } else {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese una cantidad válida mayor que cero.",
        });
    
    }
});


// Agregamos un evento de clic al botón "Cancelar"
cancelarBtn.addEventListener('click', function() {
    modal.style.display = "none"; 
});
















// Funcion para inicializar el saldo desde localStorage
function inicializarSaldo() {
    let saldoInicial = parseFloat(localStorage.getItem('saldo'));
    if (isNaN(saldoInicial)) {
        saldoInicial = 0;
    }
    document.getElementById("saldo-local").textContent = saldoInicial;
}

// Funcion para mostrar el modal o ventana emergente
function mostrarModal() {
    modalTransferir.style.display = "block";
}

// Funcioon para ocultar el modal 
function ocultarModal() {
    modalTransferir.style.display = "none";
    cantidadTransferirInput.value = "";
    cbuInput.value = "";
}

// Función para realizar la transferencia
function realizarTransferencia() {
    let cantidadTransferir = parseFloat(cantidadTransferirInput.value);
    let cbu = cbuInput.value.trim();

    if (!isNaN(cantidadTransferir) && cantidadTransferir > 0) {
        if (cbu !== "") {
            let saldoLocal = document.getElementById("saldo-local");
            let saldoActual = parseFloat(saldoLocal.textContent);

            if (cantidadTransferir <= saldoActual) {
                saldoLocal.textContent = saldoActual - cantidadTransferir;

                
                localStorage.setItem('saldo', saldoActual - cantidadTransferir);

                Swal.fire({
                    icon: "success",
                    title: "Transferencia realizada",
                    text: `Se han transferido $${cantidadTransferir} con éxito a ${cbu}.`,
                });

                ocultarModal();
            } else {
                // Mostramos un mensaje de error si no hay suficiente saldo
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No tienes suficiente saldo para realizar esta transferencia.",
                });
            }
        } else {
            // Mostramos un mensaje de error si el CBU esta vacíoo
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingresa un CBU o Alias válido.",
            });
        }
    } else {
        // Mostramos un mensaje de error si la cantidad ingresada no es valida o correcta
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingresa una cantidad válida mayor que cero.",
        });
    }
}


let transferirDineroBtn = document.querySelector('.transferir-dinero');
transferirDineroBtn.addEventListener('click', mostrarModal);

// Creamos el modal para transferir dinero
let modalTransferir = document.createElement('div');
modalTransferir.classList.add('modal');
modalTransferir.innerHTML = `
    <div class="modal-content">
        <h2>Transferir Dinero</h2>
        <div>
            <input type="number" id="cantidad-transferir-input" placeholder="Monto a transferir">
            <input type="text" id="cbu-input" placeholder="CBU o Alias">
            <button id="transferir">Transferir</button>
        </div>
        <button id="cancelar-transferencia">Cancelar</button>
    </div>
`;
document.body.appendChild(modalTransferir);

// Obtenemos los elementos dentro del modal de transferir dinero
let cantidadTransferirInput = document.getElementById("cantidad-transferir-input");
let cbuInput = document.getElementById("cbu-input");
let transferirBtn = document.getElementById("transferir");
let cancelarTransferenciaBtn = document.getElementById("cancelar-transferencia");

// Agregamos eventos de clic a los botones del modal
transferirBtn.addEventListener('click', realizarTransferencia);
cancelarTransferenciaBtn.addEventListener('click', ocultarModal);

// Inicializamos el saldo al cargar la pajgina
document.addEventListener('DOMContentLoaded', inicializarSaldo);




