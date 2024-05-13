document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.querySelector(".calendar-body");
    const fechaInput = document.getElementById("fecha");
    const mesSelect = document.getElementById("mes");
    const anioSelect = document.getElementById("anio");

    // Función para obtener el número de días en un mes y año dados
    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    // Función para generar el calendario
    function generateCalendar(month, year) {
        calendarBody.innerHTML = ""; // Limpiar el contenido existente

        const daysInMonth = getDaysInMonth(month, year);
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0: domingo, 1: lunes, ..., 6: sábado

        // Agregar celdas vacías para los días anteriores al primer día del mes
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("calendar-day", "empty");
            calendarBody.appendChild(emptyCell);
        }

        // Agregar los días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const calendarDay = document.createElement("div");
            calendarDay.classList.add("calendar-day");
            calendarDay.textContent = day;
            calendarDay.addEventListener("click", function () {
                const selectedDate = new Date(year, month - 1, day);
                const formattedDate = selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                fechaInput.value = formattedDate;
                mesSelect.value = month; // Actualizar el mes seleccionado
                anioSelect.value = year; // Actualizar el año seleccionado
            });
            calendarBody.appendChild(calendarDay);
        }
    }

    // Generar el calendario para el mes y año actuales al cargar la página
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    generateCalendar(currentMonth, currentYear);

    // Manejar la presentación de los datos ingresados
    const citaForm = document.getElementById("cita-form");
    const dataContainer = document.getElementById("data-container");
    const data = document.getElementById("data");

    citaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const fecha = document.getElementById("fecha").value;
        const duracion = document.getElementById("duracion").value;
        const horario = document.getElementById("horario").value;
        const nuevaCita = document.createElement("p");
        nuevaCita.textContent = `Nombre: ${nombre}, Fecha: ${fecha}, Duración: ${duracion}, Horario: ${horario}`;
        data.appendChild(nuevaCita);
        dataContainer.style.display = "block";

        // Guardar los datos en citas.js
        guardarCita(nombre, fecha, duracion, horario);
    });

    // Función para guardar la cita en citas.js
    function guardarCita(nombre, fecha, duracion, horario) {
        const nuevaCita = {
            nombre: nombre,
            fecha: fecha,
            duracion: duracion,
            horario: horario
        };
        // Convertir el objeto a JSON
        const nuevaCitaJSON = JSON.stringify(nuevaCita);
        // Guardar en citas.js
        // Reemplaza la siguiente línea con tu código para guardar la cita en citas.js
        console.log(nuevaCitaJSON);
    }

    // Confirmar y guardar las citas en citas.js al hacer clic en Confirmar
    const confirmBtn = document.getElementById("confirm-btn");
    confirmBtn.addEventListener("click", function () {
        const citas = data.querySelectorAll("p");
        citas.forEach(function (cita) {
            const infoCita = cita.textContent.split(', ');
            const nombre = infoCita[0].split(': ')[1];
            const fecha = infoCita[1].split(': ')[1];
            const duracion = infoCita[2].split(': ')[1];
            const horario = infoCita[3].split(': ')[1];
            guardarCita(nombre, fecha, duracion, horario);
        });
        // Mostrar confirmación
        alert("¡Los datos se han guardado correctamente!");
    });
});
