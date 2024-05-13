const bookingForm = document.getElementById('booking-form');

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    // Desmarca todos los checkboxes de servicios
    document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    // Restablece el valor del campo de fecha
    document.getElementById('general-date').value = '';
    // Restablece el valor del campo de correo electrónico
    document.getElementById('email').value = '';
    // Restablece el valor del campo de observaciones
    document.getElementById('observaciones').value = '';
}

// Función para guardar los datos en localStorage
function guardarDatosLocalStorage(servicios, fecha, correo, observaciones) {
    const datos = {
        servicios: servicios,
        fecha: fecha,
        correo: correo,
        observaciones: observaciones
    };
    localStorage.setItem('datosReserva', JSON.stringify(datos));
}

document.getElementById('submit-btn').addEventListener('click', function() {
    const selectedServices = [...document.querySelectorAll('input[name="services"]:checked')].map(service => service.value);
    const generalDate = document.getElementById('general-date').value;
    const email = document.getElementById('email').value;
    const observaciones = document.getElementById('observaciones').value;

    console.log('Servicios seleccionados:', selectedServices);
    console.log('Fecha:', generalDate);
    console.log('Correo electrónico:', email);
    console.log('Observaciones:', observaciones);

    // Guarda los datos en localStorage
    guardarDatosLocalStorage(selectedServices, generalDate, email, observaciones);

    alert('¡Servicios reservados con éxito!');

    // Limpia los campos del formulario después de enviar los datos
    limpiarFormulario();
});
