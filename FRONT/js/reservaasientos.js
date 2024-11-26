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

console.log("idPelicula:", idPelicula);
console.log("idHorario:", idHorario);

if (!idPelicula || !idHorario) {
    console.error("Faltan parámetros en la URL.");
} else {
    const urlDetalles = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idHorario}`;
    const urlAsientos = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idHorario}/Asientos`;
    console.log("URL para detalles:", urlDetalles);
    console.log("URL para asientos:", urlAsientos);

    // Obtener detalles de la película y horario
    fetch(urlDetalles)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película y horario.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos (detalles):", data);
            const movieLayout = document.querySelector(".movie-layout");
            if (!movieLayout) {
                console.error("No se encontró el contenedor de detalles de la película.");
                return;
            }

            const horario = data.horario;

            if (!horario || !horario.sala) {
                console.error("La estructura de los datos no contiene 'sala' o 'horario'.");
                return;
            }

            movieLayout.innerHTML = `
                <div class="movie-poster">
                    <img src="${data.pelicula.imagen}" alt="Póster de ${data.pelicula.nombre}" class="movie-poster-image">
                </div>
                <div class="movie-details">
                    <p><strong>${data.pelicula.nombre}</strong></p>
                    <p><strong>Sala:</strong>  ${horario.sala.nombreSala}</p> 
                    <p><strong>Horario:</strong>  ${horario.hora.replace("T", " ")}</p>
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
        .catch(error => {
            console.error("Error al cargar los detalles de la película y horario:", error);
        });

    // Obtener asientos para la sesión
    fetch(urlAsientos)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los asientos.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos (asientos):", data);
            const seatingArea = document.getElementById("seatingArea");
            if (!seatingArea) {
                console.error("No se encontró el elemento seatingArea en el HTML.");
                return;
            }

            seatingArea.innerHTML = "";

            const seats = data.map(asiento => ({
                id: asiento.idAsiento,
                status: asiento.estado.toLowerCase() // Asegurar que los estados sean en minúsculas
            }));

            seats.forEach(asiento => {
                const seatDiv = document.createElement("div");
                seatDiv.className = "seat-item";
                seatDiv.id = `seat-${asiento.id}`;
                seatDiv.style.backgroundColor = seatColors[asiento.status] || seatColors.free;

                seatDiv.addEventListener("click", () => {
                    if (asiento.status === "free") {
                        asiento.status = "selected";
                        seatDiv.style.backgroundColor = seatColors.selected;
                    } else if (asiento.status === "selected") {
                        asiento.status = "free";
                        seatDiv.style.backgroundColor = seatColors.free;
                    }
                });

                seatingArea.appendChild(seatDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar los asientos:", error);
        });
}




/*function generateSeats() {
    seatingArea.innerHTML = ""; // Limpiar el área antes de generar
    seats.forEach((state, index) => {
        const svg = createSeatSVG(seatColors[state]);
        svg.dataset.index = index; // Guardar el índice del asiento

        // Añadir el evento de clic para alternar el estado de asiento a seleccionado
        svg.addEventListener("click", () => toggleSeatSelection(index, svg));
        seatingArea.appendChild(svg);
    });
}

// Función para crear el SVG de un asiento
function createSeatSVG(color) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "seat-svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "2");
    rect.setAttribute("y", "2");
    rect.setAttribute("width", "20");
    rect.setAttribute("height", "20");
    rect.setAttribute("rx", "5"); // Bordes redondeados
    rect.setAttribute("fill", color);

    svg.appendChild(rect);
    return svg;
}

// Función para alternar entre estado libre y seleccionado al hacer clic en un asiento
function toggleSeatSelection(index, svg) {
    const rect = svg.querySelector("rect");
    if (seats[index] === "free") {
        seats[index] = "selected"; // Cambiar a seleccionado
        rect.setAttribute("fill", seatColors.selected);
    } else if (seats[index] === "selected") {
        seats[index] = "free"; // Cambiar de nuevo a libre
        rect.setAttribute("fill", seatColors.free);
    }
}

// Función para comprar los asientos seleccionados
buySeatsButton.addEventListener("click", () => {
    seats.forEach((state, index) => {
        if (state === "selected") {
            seats[index] = "sold"; // Cambiar a vendido
            const svg = seatingArea.children[index];
            const rect = svg.querySelector("rect");
            rect.setAttribute("fill", seatColors.sold);
        }
    });
    alert("Asientos comprados con éxito.");
});

// Llamar a la función para generar la matriz de asientos
generateSeats();*/
