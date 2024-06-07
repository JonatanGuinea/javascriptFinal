JonBank
JonBank es una aplicación web de simulación bancaria que permite a los usuarios realizar diversas acciones como verificar saldos, agregar dinero, transferir fondos, calcular plazos fijos y consultar la cotización del dólar.

Características Principales

Inicio de Sesión: Los usuarios pueden iniciar sesión en sus cuentas utilizando un nombre de usuario y contraseña.
Cuenta: Los usuarios pueden ver el saldo actual de su cuenta en moneda local, agregar dinero a su cuenta y transferir fondos a otros usuarios.
Historial de Movimientos: Se mantiene un historial de todos los movimientos realizados en la cuenta, incluyendo ingresos y egresos, con detalles como concepto, fecha y hora de la operación, número genérico de operación y monto.
Cotización del Dólar: Los usuarios pueden consultar la cotización actual del dólar oficial.

Tecnologías Utilizadas

HTML: Para la estructura y contenido de las páginas web.
CSS: Para el diseño y estilo de las páginas web.
JavaScript: Para la lógica y funcionalidad interactiva de la aplicación.
SweetAlert2: Para mostrar mensajes de alerta y confirmación.


Estructura del Proyecto

index.html: Página de inicio de sesión.
cuenta.html: Página principal de la cuenta del usuario.
cotizacionusd.html: Página de consulta de la cotización del dólar.
servicios.html: Página de servicios adicionales.
css/styles.css: Hoja de estilos CSS para todas las páginas.
js/main.js: Script principal que controla el inicio de sesión y la navegación.
js/cuenta.js: Script que maneja la funcionalidad de la cuenta del usuario.
js/cotizacionusd.js: Script que consulta y muestra la cotización del dólar.
db/conceptos.json: Archivo JSON que contiene los conceptos para los movimientos de la cuenta.
