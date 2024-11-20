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
    const apiUrl = `https://localhost:7056/CinemaParaiso/Pelicula/${peliculaId}`;

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
                            <p class="movie-details__info"><span class="movie-details__info-label">Fecha Estreno:  <br></span>${pelicula.fechaEstreno}</p>
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
});
