document.addEventListener('DOMContentLoaded', function() {
    inicializarNavbar();
    inicializarCuentas();
    inicializarModales();
    inicializarSaldo();
    cargarConceptos();
    cargarHistorial();

    // Agregar eventos a botones
    document.querySelector('.agregar-dinero').addEventListener('click', mostrarModalAgregar);
    document.querySelector('.transferir-dinero').addEventListener('click', mostrarModalTransferir);
    document.getElementById('agregar-cantidad').addEventListener('click', agregarDinero);
    document.getElementById('transferir').addEventListener('click', transferirDinero);
    document.getElementById('cancelar-agregar').addEventListener('click', ocultarModalAgregar);
    document.getElementById('cancelar-transferencia').addEventListener('click', ocultarModalTransferir);
});

// Funciones para inicializar elementos
function inicializarSaldo() {
    let saldoGuardado = localStorage.getItem('saldo');
    if (saldoGuardado !== null) {
        document.getElementById("saldo-local").textContent = saldoGuardado;
    }
}

function inicializarNavbar() {
    document.getElementById('navbar').innerHTML = `
        <div class="navbar">
            <div class="navbar-brand">
                <a href="#">JonBank</a>
            </div>
            <div class="navbar-links">
                <a href="/pages/cuenta.html">Cuenta</a>
                <a href="/pages/servicios.html">Servicios</a>
                <a href="/pages/cotizacionusd.html">Cotización USD</a>
            </div>
        </div>`;
}

function inicializarCuentas() {
    document.querySelector('.contenedor-central').innerHTML = `
        <div class="cuenta-container">
            <h2>Cuenta en Moneda Local</h2>
            <div class="saldo">Saldo: $<span id="saldo-local">0</span></div>
            <button class="agregar-dinero">Agregar Dinero</button>
            <button class="transferir-dinero">Transferir Dinero</button>
            <select id="selectConceptos"></select>
        </div>`;
}

function inicializarModales() {
    document.getElementById('modal-agregar').innerHTML = `
        <div class="modal-content">
            <h2>Selecciona una opción para agregar dinero:</h2>
            <div>
                <input type="number" id="cantidad-input" placeholder="Ingrese la cantidad">
                <button id="agregar-cantidad">Agregar</button>
            </div>
            <button id="cancelar-agregar">Cancelar</button>
        </div>`;

    document.getElementById('modal-transferir').innerHTML = `
        <div class="modal-content">
            <h2>Transferir Dinero</h2>
            <div>
                <input type="number" id="cantidad-transferir-input" placeholder="Monto a transferir">
                <input type="text" id="cbu-input" placeholder="CBU o Alias">
                <button id="transferir">Transferir</button>
            </div>
            <button id="cancelar-transferencia">Cancelar</button>
        </div>`;
}

// Función para cargar conceptos desde un archivo JSON
function cargarConceptos() {
    fetch('/db/conceptos.json')
        .then(response => response.json())
        .then(data => {
            let selectConceptos = document.getElementById('selectConceptos');
            data.conceptos.forEach(concepto => {
                let option = document.createElement('option');
                option.value = concepto;
                option.textContent = concepto;
                selectConceptos.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los conceptos:', error));
}

// Funciones para mostrar y ocultar modales o ventanas emergentes
function mostrarModalAgregar() {
    document.getElementById('modal-agregar').style.display = "block";
}

function ocultarModalAgregar() {
    document.getElementById('modal-agregar').style.display = "none";
}

function mostrarModalTransferir() {
    document.getElementById('modal-transferir').style.display = "block";
}

function ocultarModalTransferir() {
    document.getElementById('modal-transferir').style.display = "none";
}

// Funcioon para agregar dinero
function agregarDinero() {
    let cantidadInput = document.getElementById("cantidad-input");
    let cantidad = parseFloat(cantidadInput.value);
    if (!isNaN(cantidad) && cantidad > 0) {
        let saldoLocal = document.getElementById("saldo-local");
        saldoLocal.textContent = parseFloat(saldoLocal.textContent) + cantidad;
        localStorage.setItem('saldo', saldoLocal.textContent);

        agregarMovimiento('Ingreso', cantidad);

        Swal.fire({
            icon: "success",
            title: "Dinero agregado",
            text: `Se han agregado $${cantidad} con éxito.`,
        });

        ocultarModalAgregar();
        cantidadInput.value = "";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingrese una cantidad válida mayor que cero.",
        });
    }
}

// Funcin para transferir dinero
function transferirDinero() {
    let cantidadTransferirInput = document.getElementById("cantidad-transferir-input");
    let cbuInput = document.getElementById("cbu-input");
    let cantidadTransferir = parseFloat(cantidadTransferirInput.value);
    let cbu = cbuInput.value.trim();

    if (!isNaN(cantidadTransferir) && cantidadTransferir > 0 && cbu !== "") {
        let saldoLocal = document.getElementById("saldo-local");
        let saldoActual = parseFloat(saldoLocal.textContent);

        if (cantidadTransferir <= saldoActual) {
            saldoLocal.textContent = saldoActual - cantidadTransferir;
            localStorage.setItem('saldo', saldoLocal.textContent);

            agregarMovimiento('Egreso', -cantidadTransferir);

            Swal.fire({
                icon: "success",
                title: "Transferencia realizada",
                text: `Se han transferido $${cantidadTransferir} con éxito a ${cbu}.`,
            });

            ocultarModalTransferir();
            cantidadTransferirInput.value = "";
            cbuInput.value = "";
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No tienes suficiente saldo para realizar esta transferencia.",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingresa una cantidad válida mayor que cero y un CBU o Alias válido.",
        });
    }
}

// Funcion para agregar un movimiento al historial
function agregarMovimiento(tipo, cantidad) {
    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
    let movimiento = {
        id: generarId(),
        tipo: tipo,
        cantidad: cantidad,
        concepto: document.getElementById('selectConceptos').value,
        fecha: new Date().toLocaleString()
    };
    movimientos.push(movimiento);
    localStorage.setItem('movimientos', JSON.stringify(movimientos));
    mostrarMovimiento(movimiento);
}

// Función para mostrar un movimiento en el historial
function mostrarMovimiento(movimiento) {
    let listaMovimientos = document.getElementById('lista-movimientos');
    let li = document.createElement('li');
    li.textContent = `${movimiento.fecha} - ${movimiento.tipo} - ${movimiento.concepto}: $${movimiento.cantidad}`;
    listaMovimientos.appendChild(li);
}

// Función para cargar el historial de movimientos
function cargarHistorial() {
    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
    movimientos.forEach(movimiento => mostrarMovimiento(movimiento));
}

// Función para generar un ID único para cada movimiento
function generarId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
