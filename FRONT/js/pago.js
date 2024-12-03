import config from "./config.js";



document.addEventListener("DOMContentLoaded", function () {
    const contenedorInfo = document.querySelector(".contenedor__info");

    if (!contenedorInfo) {
        console.error("Error: No se encontró el contenedor para mostrar la información.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const idSesion = params.get("idSesion");

    if (!idSesion) {
        console.error("Error: No se especificó un ID de sesión en la URL.");
        contenedorInfo.innerHTML = "<p>Error: No se encontró ninguna sesión para mostrar.</p>";
        return;
    }

    fetch(`${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idSesion}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la sesión");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Datos recibidos del servidor:", data);

            // Manejo de datos incompletos
            const pelicula = data.pelicula || {};
            const horario = data.horario || {};
            const sala = horario.sala || {};
            const asientos = data.asientosDisponibles || [];

            // Filtrar solo los asientos seleccionados (por ejemplo: libre === false)
            const asientosSeleccionados = asientos.filter(asiento => !asiento.libre);

            // Renderizar los datos
            contenedorInfo.innerHTML = `
            <div class="info__top">
                <img src="${pelicula.imagen || "../imgs/poster-placeholder.jpg"}" alt="Póster de la película" class="info__poster">
                <div class="info__details">
                    <h2 class="info__titulo">Película: ${pelicula.nombre || "Título no disponible"}</h2>
                    <p class="info__horario">Horario: ${horario.hora.replace("T", " ")}</p>
                    <p class="info__sala">Sala: ${sala.nombreSala || "Sala no disponible"}</p>
                    <div class="info__asientos">
                        <p><strong>Asientos seleccionados:</strong></p>
                        ${
                          asientosSeleccionados.length > 0
                            ? asientosSeleccionados.map(asiento => `Asiento ${asiento.numAsiento}`).join(", ")
                            : "No hay asientos seleccionados"
                        }
                    </div>
                </div>
            </div>
        `;
        })
        .catch((error) => {
            console.error("Error al cargar los datos de la sesión:", error);
            contenedorInfo.innerHTML = "<p>Error al cargar los datos. Por favor, intenta nuevamente más tarde.</p>";
        });
});
