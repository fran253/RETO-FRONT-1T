import config from "./config.js";

const seatColors = {
    free: "#007bff",
    selected: "#ffc107",
    sold: "#dc3545",
    vip: "#097969"
};

// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const idPelicula = params.get("idPelicula");
const idHorario = params.get("idHorario");

if (!idPelicula || !idHorario) {
    console.error("Faltan parámetros en la URL.");
} else {
    const urlDetalles = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idHorario}`;
    const urlAsientos = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idHorario}/Asientos`;

    // Obtener detalles de la película y horario
    fetch(urlDetalles)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película y horario.");
            }
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
                <div class="movie-trailer">
                    <h2>Trailer</h2>
                    <iframe 
                        src="${data.pelicula.trailerUrl || ""}" 
                        title="Trailer de ${data.pelicula.nombre}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        })
        .catch(error => console.error("Error al cargar los detalles:", error));

    // Obtener y renderizar los asientos
    const seats = [];

    fetch(urlAsientos)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los datos de los asientos.");
            return response.json();
        })
        .then(data => {
            const seatingArea = document.getElementById("seatingArea");
            if (!seatingArea) return;

            seatingArea.innerHTML = "";
            data.forEach((asiento, index) => {
                seats[index] = asiento.estado.toLowerCase();

                const seatDiv = document.createElement("div");
                seatDiv.classList.add("seat-item");
                seatDiv.style.backgroundColor = seatColors[seats[index]] || seatColors.free;

                seatDiv.addEventListener("click", () => toggleSeatSelection(index, seatDiv));
                seatingArea.appendChild(seatDiv);
            });
        })
        .catch(error => console.error("Error al cargar los asientos:", error));

    // Función para alternar entre estado libre y seleccionado al hacer clic en un asiento
    function toggleSeatSelection(index, seatDiv) {
        if (seats[index] === "free") {
            seats[index] = "selected";
            seatDiv.style.backgroundColor = seatColors.selected;
        } else if (seats[index] === "selected") {
            seats[index] = "free";
            seatDiv.style.backgroundColor = seatColors.free;
        }
    }

    // Función para comprar los asientos seleccionados
    const buySeatsButton = document.getElementById("buySeatsButton");
    if (buySeatsButton) {
        buySeatsButton.addEventListener("click", () => {
            seats.forEach((state, index) => {
                if (state === "selected") {
                    seats[index] = "sold";
                    const seatDiv = document.getElementById("seatingArea").children[index];
                    seatDiv.style.backgroundColor = seatColors.sold;
                }
            });
            alert("Asientos comprados con éxito.");
        });
    }
}
