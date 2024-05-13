let dueno = {};

function guardarDatosDueno(identificacion, nombre, apellido, correo, telefono) {
    dueno.identificacion = identificacion;
    dueno.nombre = nombre;
    dueno.apellido = apellido;
    dueno.correo = correo;
    dueno.telefono = telefono;
}

function obtenerDatosDueno() {
    return dueno;
}


