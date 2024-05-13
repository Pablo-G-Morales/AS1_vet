// datosMascotas.js

let mascota = {};

function guardarDatosMascota(nombre, especie, raza, dueno) {
    mascota.nombre = nombre;
    mascota.especie = especie;
    mascota.raza = raza;
    mascota.dueno = dueno;
}

function obtenerDatosMascota() {
    return mascota;
}
