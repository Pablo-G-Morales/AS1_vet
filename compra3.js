// Función para manejar la compra
function manejarCompra() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precioUnitario = 890; // Precio del producto
    const total = cantidad * precioUnitario;

    // Guardar la compra en localStorage (podrías enviar esta información a un servidor en lugar de localStorage)
    localStorage.setItem('cantidadProducto1', cantidad);
    localStorage.setItem('totalCompra', total);

    // Mostrar el total en pantalla
    alert(`Total de la compra: Q.${total.toFixed(2)}`);

    const mensajeConfirmacion = document.getElementById('confirmacion');
    mensajeConfirmacion.textContent = '¡Producto añadido al carrito!';
    mensajeConfirmacion.style.display = 'block';

    // Ocultar el mensaje de confirmación después de 3 segundos
    setTimeout(function() {
        mensajeConfirmacion.style.display = 'none';
    }, 3000);
}

// Asignar la función manejarCompra al evento click del botón de agregar al carrito
document.getElementById('btnAgregarCarrito').addEventListener('click', manejarCompra);
