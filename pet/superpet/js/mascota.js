$(document).ready(function() {
    $('#registroMascotaForm').submit(function(event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente

        // Obtener los valores del formulario
        var nombre = $('#nombre').val();
        var especie = $('#especie').val();
        var raza = $('#raza').val();
        var dueno = $('#dueno').val();

        // Aquí iría tu código para enviar los datos del formulario a través de AJAX si lo deseas
        // Por ahora, solo simularemos el proceso y mostraremos el mensaje de confirmación

        // Simulación de guardado de datos (puedes reemplazar esto con tu lógica de guardado real)
        var datosGuardados = "Nombre: " + nombre + ", Especie: " + especie + ", Raza: " + raza + ", Dueño: " + dueno;
        console.log("Datos guardados: " + datosGuardados);

        // Mostrar el mensaje de confirmación
        $('#mensajeConfirmacion').slideDown(); // Mostrar el mensaje de confirmación

        // Limpiar el formulario después de mostrar el mensaje de confirmación (puedes quitar esto si no lo deseas)
        $('#registroMascotaForm')[0].reset();
    });
});
