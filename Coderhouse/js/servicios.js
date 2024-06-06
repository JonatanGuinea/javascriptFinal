document.addEventListener('DOMContentLoaded', function() {
    // Crear y agregar el contenido por innerHTML
    let app = document.getElementById('app');
    app.innerHTML = `
        <div id="navbar-container">
            <div class="navbar" id="navbar">
                <div class="navbar-brand">
                    <a href="#">JonBank</a>
                </div>
                <div class="navbar-links">
                    <a href="/Coderhouse/pages/cuenta.html">Cuenta</a>
                    <a href="#">Servicios</a>
                    <a href="/Coderhouse/pages/cotizacionusd.html">Cotización USD</a>
                </div>
            </div>
        </div>
        
        <h2 class = "h2-plazofijo">Calcular plazo fijo</h2>
        <div class="plazo-fijo">
        <h2> Saldo actual:$ </h2>
        <b><div id="saldo-local">1000</div></b>
            <p class="info">Tasa Anual: 40%</p>
            <input type="number" id="cantidad-input" placeholder="Cantidad">
            <input type="number" id="dias-input" placeholder="Días">
            <button id="calcular-plazo-fijo">Calcular Plazo Fijo</button>
            <div id="resultado-plazo-fijo"></div>
        </div>`;

    // consultamos y obtenemos saldo del localStorage
    let saldoGuardado = localStorage.getItem('saldo');
    if (saldoGuardado !== null) {
        let saldoLocal = document.getElementById("saldo-local");
        saldoLocal.textContent = saldoGuardado;
    }

    
    let calcularPlazoFijoBtn = document.getElementById("calcular-plazo-fijo");

    
    calcularPlazoFijoBtn.addEventListener('click', function() {
        let cantidadInput = document.getElementById("cantidad-input");
        let cantidad = parseFloat(cantidadInput.value);

        
        let diasInput = document.getElementById("dias-input");
        let dias = parseFloat(diasInput.value);

        // Verificar que se haya ingresado una cantidad válida de dinero y días
        if (!isNaN(cantidad) && cantidad > 0 && !isNaN(dias) && dias > 0) {
            
            let interesAnual = 0.4; 
            let interesDiario = Math.pow(1 + interesAnual, 1/365) - 1;
            let montoFinal = cantidad * Math.pow(1 + interesDiario, dias);
            let interesesGenerados = montoFinal - cantidad;

            // Mostrar el resultado 
            let resultadoPlazoFijo = document.getElementById("resultado-plazo-fijo");
            resultadoPlazoFijo.innerHTML = `
                <p>El monto final después de ${dias} días es: $${montoFinal.toFixed(2)}</p>
                <p>Intereses generados: $${interesesGenerados.toFixed(2)}</p>`;
        } else {
            // Mostrar mensaje de error si los valores ingresados no son válidos
            alert("Por favor, ingrese una cantidad de dinero y una cantidad de días válidas.");
        }
    });
});


