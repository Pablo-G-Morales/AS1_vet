// Array para almacenar los elementos del carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto, precio, cantidad) {
    carrito.push({ nombreProducto, precio, cantidad });
    mostrarMensajeConfirmacion();
}

// Función para mostrar un mensaje de confirmación en la página del producto
function mostrarMensajeConfirmacion() {
    const mensaje = document.createElement('div');
    mensaje.textContent = '¡Producto añadido al carrito!';
    mensaje.style.backgroundColor = '#f5b24d';
    mensaje.style.color = '#fff';
    mensaje.style.padding = '10px';
    mensaje.style.textAlign = 'center';
    mensaje.style.marginTop = '20px';
    document.body.appendChild(mensaje);
    setTimeout(() => {
        mensaje.remove();
    }, 3000); // Remover el mensaje después de 3 segundos
}

// Obtener el ID del producto desde el nombre del archivo HTML
const nombreArchivo = window.location.pathname.split("/").pop(); // Obtener el nombre del archivo actual
const idProducto = nombreArchivo.replace("p", "").replace("info.html", ""); // Extraer el número de producto del nombre del archivo

// Asignar la función de agregar al carrito al botón respectivo de cada página de producto
document.getElementById('btnAgregarCarrito').addEventListener('click', function() {
    // Obtener el valor de la cantidad ingresada
    let cantidad = parseInt(document.getElementById('cantidad').value);
    
    // Llamar a la función agregarAlCarrito con los detalles del producto actual
    agregarAlCarrito(nombreProducto[idProducto], precio[idProducto], cantidad);
});

// Aquí definirías los nombres y precios de cada producto
const nombreProducto = {
    1: "Diet Adulto + Small bites",
    2: "Hill's Science Diet Kitten",
    3: "Hill's Diet Adult 15 KG",
    4: "Hill's Lata L/D",
    5: "Cat Hill´s Digestion",
    6: "Kitten Hill's Diet Lata"
};

const precio = {
    1: 160,
    2: 160,
    3: 890,
    4: 40,
    5: 190,
    6: 20
};
