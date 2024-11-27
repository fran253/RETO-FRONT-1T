import config from "./config.js";

const seatColors = {
    free: "#007bff",        // Azul para asientos libres
    pending: "#ffc107",     // Amarillo para asientos en espera de confirmación
    occupied: "#dc3545"     // Rojo para asientos ocupados
};

// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const idPelicula = params.get("idPelicula");
const idHorario = params.get("idHorario");

if (!idPelicula || !idHorario) {
    console.error("Faltan parámetros en la URL.");
} else {
    const urlDetalles = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idHorario}`;
    const urlAsientos = `${config.API_ENDPOINT}/CinemaParaiso/Asiento`;
    const urlSaveSeats = `${config.API_ENDPOINT}/CinemaParaiso/Asiento/SaveSeats`;
    
console.log(urlDetalles)
    // Obtener detalles de la película y horario
    fetch(urlDetalles)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los detalles de la película y horario.");
            return response.json();
        })
        .then(data => {
            const movieLayout = document.querySelector(".movie-layout");
            if (!movieLayout) return;

            const horario = data.horario;
            if (!horario || !horario.sala) return;

            movieLayout.innerHTML = `
                <div class="movie-poster">
                    <img src="${data.pelicula.imagen}" alt="Póster de ${data.pelicula.nombre}" class="movie-poster-image">
                </div>
                <div class="movie-details">
                    <p><strong>${data.pelicula.nombre}</strong></p>
                    <p><strong>Sala:</strong> ${horario.sala.nombreSala}</p> 
                    <p><strong>Horario:</strong> ${horario.hora.replace("T", " ")}</p>
                </div>
            `;
        })
        .catch(error => console.error("Error al cargar los detalles:", error));

    // Obtener y renderizar los asientos
    const pendingSeats = []; // Almacena asientos en espera de confirmación

    fetch(urlDetalles)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los datos de los asientos.");
            return response.json();
        })
        .then(sesion => {
            console.log(sesion)
            const seatingArea = document.getElementById("seatingArea");
            if (!seatingArea) return;

            seatingArea.innerHTML = ""; // Limpiar el área de asientos antes de renderizar
            sesion.asientosDisponibles.forEach(asiento => {
                const { idAsiento, estado } = asiento;

                const seatDiv = document.createElement("div");
                seatDiv.classList.add("seat-item");
                seatDiv.style.backgroundColor = estado ? seatColors.occupied : seatColors.free;
                seatDiv.dataset.idAsiento = idAsiento;
                seatDiv.dataset.estado = estado; // Guardar estado inicial (true = ocupado, false = libre)

                seatingArea.appendChild(seatDiv); // Agregar asiento al DOM
            });

            // Llamar a la función de manejo de asientos
            manageSeatActions(pendingSeats, seatingArea, sesion.idSesion);
        })
        .catch(error => console.error("Error al cargar los asientos:", error));
}

// Función para manejar los asientos
function manageSeatActions(pendingSeats, seatingArea, sesionId) {
    const confirmSeatsButton = document.getElementById("confirmSeatsButton");

    // Manejo de clic en los asientos
    seatingArea.addEventListener("click", (event) => {
        const seatDiv = event.target;
        const idAsiento = seatDiv.dataset.idAsiento;
        const estado = seatDiv.dataset.estado;

        if (idAsiento !== undefined) {
            if (estado === "false") {
                // Cambiar a "pendiente de compra" si está libre
                seatDiv.style.backgroundColor = seatColors.pending;
                seatDiv.dataset.estado = "pending";
                pendingSeats.push(parseInt(idAsiento));
            } else if (estado === "pending") {
                // Cambiar a "libre" si está pendiente
                seatDiv.style.backgroundColor = seatColors.free;
                seatDiv.dataset.estado = "false";
                const index = pendingSeats.indexOf(parseInt(idAsiento));
                if (index > -1) pendingSeats.splice(index, 1);
            }
        }
    });

    // Confirmar compra de asientos
    if (confirmSeatsButton) {
        confirmSeatsButton.addEventListener("click", () => {
            // Enviar los asientos pendientes a la API
            fetch(`${config.API_ENDPOINT}/CinemaParaiso/Sesion/${sesionId}/Asientos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pendingSeats })
            })
                .then(response => {
                    if (!response.ok) throw new Error("Error al confirmar los asientos.");
                    return response.json();
                })
                .then(() => {
                    // Actualizar estado de los asientos a "ocupado"
                    pendingSeats.forEach(idAsiento => {
                        const seatDiv = seatingArea.querySelector(`[data-id-asiento='${idAsiento}']`);
                        if (seatDiv) {
                            seatDiv.style.backgroundColor = seatColors.occupied;
                            seatDiv.dataset.estado = "true"; // Actualizar estado a ocupado
                        }
                    });
                    pendingSeats.length = 0; // Vaciar la lista de pendientes
                    alert("Asientos confirmados con éxito.");
                })
                .catch(error => console.error("Error al confirmar los asientos:", error));
        });
    }
}
