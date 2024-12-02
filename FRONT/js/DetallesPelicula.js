import config from "./config.js"
document.addEventListener("DOMContentLoaded", function () {
    const movieContainer = document.querySelector(".movie-container");

    // Obtener el ID de la película desde la URL
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get("id");

    if (!peliculaId) {
        movieContainer.innerHTML = "<p>Error: No se ha especificado ninguna película.</p>";
        return;
    }

    // usamos dos constantes para ambas urls
    const apiUrl = `${config.API_ENDPOINT}/CinemaParaiso/Pelicula/${peliculaId}`;
    const apiSesionesUrl = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/Pelicula/${peliculaId}`;

    let pelicula = null; // Declarar variable global para almacenar los datos de la pelicula
    fetch(apiUrl)//usamos la primera url que se refiere a la pelicula seleccionada
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película");
            }
            return response.json();
        })
        .then(data => {
            pelicula = data; // Asignar los datos a la variable d ela linea 17
            // Mostrar los detalles de la película
            movieContainer.innerHTML = `
                <div class="movie-container">
                    <div class="movie-container__poster-details">
                        <div class="movie-container__poster-image">
                            <img src="${pelicula.imagen}" alt="${pelicula.nombre}">
                        </div>
                        <div class="movie-container__details">
                            <div class="movie-container__details__title">
                                ${pelicula.nombre}
                                <span>${pelicula.edadMinima}</span>
                            </div>
                            <p class="movie-container__details__info">
                                <span class="movie-container__details__info-label">Director:</span> ${pelicula.director}
                            </p>
                            <p class="movie-container__details__info">
                                <span class="movie-container__details__info-label">Duración:</span> ${pelicula.duracion} minutos
                            </p>
                            <p class="movie-container__details__info">
                                <span class="movie-container__details__info-label">Fecha Estreno:</span> ${pelicula.fechaEstreno.replace("T", " ")}
                            </p>
                            <p class="movie-container__details__info">
                                <span class="movie-container__details__info-label">Género:</span> ${pelicula.nombreCategoria}
                            </p>
                        </div>
                    </div>
                    <div class="movie-container__synopsis">
                        <h3>Sinopsis</h3>
                        <p>${pelicula.descripcion}</p>
                    </div>
                </div>
            `;
            // Una vez cargada la película, cargar las sesiones
            cargarSesiones();
        })
        .catch(error => {
            console.error("Error:", error);
            movieContainer.innerHTML = "<p>Error al cargar los detalles de la película.</p>";
        });

        function cargarSesiones() {
            fetch(apiSesionesUrl)
                .then(response => response.json())
                .then(sesiones => {
                    const scheduleSect = document.querySelector('.schedule-section__grid');
                    if (!scheduleSect) {
                        console.error("Error: No se encontró el contenedor de horarios.");
                        return;
                    }
        
            
                    // scheduleSect.innerHTML = "";
        
                    console.log("Sesiones recibidas:", sesiones);
        
                    sesiones.forEach(sesion => {
                        const horario = sesion.horario;
                        // Mostrar los detalles de los horarios
                        scheduleSect.innerHTML += `
                            <a href="../html/ReservarAsientos.html?idPelicula=${sesion.pelicula.idPelicula}&idHorario=${horario.idHorario}&idSesion=${sesion.idSesion}" class="schedule-link">
                                <div class="schedule-section__item">
                                    <h3>${horario.fechaInicio.replace("T", " ")}</h3>
                                    <p>Sala ${horario.sala.nombreSala}</p>
                                </div>
                            </a>
                        `;
                    });
                })
                .catch(error => {
                    console.error("Error al cargar las sesiones:", error);
                });
        }
        
        
        

    // Función global para guardar el idHorario en localStorage
    function guardarHorario(idHorario) {
        console.log("selectedHorarioId");
        localStorage.setItem("selectedHorarioId", idHorario);
    }
});
