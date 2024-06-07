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


let cotizacionContainer = document.querySelector('.cotizacion-container');



cotizacionContainer.innerHTML = `
<h2>Precio del dolar oficial</h2>
        <h3 id = 'precio-dolar-compra'>Compra : $0</h3>
        <h3 id = 'precio-dolar-venta'>Venta : $0</h3>
        <h3 id = 'hora-actualizacion'>fechaActualizacion</h3>`



//aca agregamos la api del dolar
async function precioDelDolar() {
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares/oficial")
        const datos = await response.json();
    let precioCompra = document.querySelector('#precio-dolar-compra')
    let precioVenta = document.querySelector('#precio-dolar-venta')
    let horaActualizacion=document.querySelector('#hora-actualizacion')
    
    precioCompra.textContent=`Compra : $${datos.compra}`
    precioVenta.textContent=`Venta : $${datos.venta}`
    horaActualizacion.textContent=`Actualizado: ${datos.fechaActualizacion.slice(0,10)}`

    
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "ATENCION",
            text: "Error al cargar datos del dolar",
        });
        return [];
    }



}
precioDelDolar()