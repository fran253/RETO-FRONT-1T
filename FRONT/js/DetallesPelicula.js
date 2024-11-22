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
    const apiUrl = `http://localhost:5000/CinemaParaiso/Pelicula/${peliculaId}`;

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
                <table class="movie-container__poster-details">
                    <tr>
                        <td class="movie-container__poster-image">
                            <img src="${pelicula.imagen}" alt="${pelicula.nombre}" width="250" height="350">
                        </td>
                        <td class="movie-details">
                            <div class="movie-details__title">
                                ${pelicula.nombre}
                                <span class="movie-details__rating">${pelicula.edadMinima}</span>
                            </div>
                            <p class="movie-details__info"><span class="movie-details__info-label">Director:  <br></span>${pelicula.director}</p>
                            <p class="movie-details__info"><span class="movie-details__info-label">Duración:  <br></span>${pelicula.duracion} minutos</p>
                            <p class="movie-details__info"><span class="movie-details__info-label">Fecha Estreno:  <br></span>${pelicula.fechaEstreno.replace("T"," ")}</p>
                            <p class="movie-details__info"><span class="movie-details__info-label">Género:  <br></span>${pelicula.idCategoriaPelicula}</p>
                        </td>
                    </tr>
                </table>
                <div class="movie-container__synopsis">
                    <h3>Sinopsis</h3>
                    <p>${pelicula.descripcion}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error:", error);
            movieContainer.innerHTML = "<p>Error al cargar los detalles de la película.</p>";
        });
        fetch(`http://localhost:5000/CinemaParaiso/Sesion/PeliculaSesion/${peliculaId}`)
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
                        <button onclick="guardarHorario(${horario.idHorario})">
                            Hora: ${horario.hora.replace("T", " ")}<br>
                            Sala: ${sesion.sala.nombreSala}
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


