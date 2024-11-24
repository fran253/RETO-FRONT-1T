document.addEventListener("DOMContentLoaded", function () {
    const movieContainer = document.querySelector(".movie-container");

    // Obtener el ID de la película desde la URL
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get("id");

    if (!peliculaId) {
        movieContainer.innerHTML = "<p>Error: No se ha especificado ninguna película.</p>";
        return;
    }

    // Construir la URL de la API
    const apiUrl = `https://localhost:7090/CinemaParaiso/Pelicula/${peliculaId}`;

    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película");
            }
            return response.json();
        })
        .then(pelicula => {
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
        })
        .catch(error => {
            console.error("Error:", error);
            movieContainer.innerHTML = "<p>Error al cargar los detalles de la película.</p>";
        });
        fetch(`https://localhost:7090/CinemaParaiso/Sesion/Pelicula/${peliculaId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener los detalles de la película");
        }
        return response.json();
    })
    .then(sesiones => {
        const scheduleSect = document.getElementsByClassName('schedule-section')[0];
        scheduleSect.innerHTML = `<div class="schedule-section__grid">`;

        sesiones.forEach(sesion => {
            sesion.horarios.forEach(horario => {
                scheduleSect.innerHTML += `
                    <div class="schedule-section__item">
                        <button onclick="guardarHorario(${pelicula.idHorario})">
                            Hora: ${horario.hora.replace("T", " ")}<br>
                            Sala: ${horario.sala.nombreSala}
                        </button>
                    </div>
                `;
                
//cambiar el onclick para poder desplazarnos de pagina y que nos funcione todo 


            });
        });

        scheduleSect.innerHTML += `</div>`;
    })
    .catch(error => {
        console.error("Error al cargar las sesiones:", error);
    });

// Función global para guardar el idHorario en localStorage
function guardarHorario(idHorario) {
    console.log("selectedHorarioId")
    localStorage.setItem("selectedHorarioId", idHorario);
}
    
})


