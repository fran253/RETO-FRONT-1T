// Referencias a la zona de asientos y al botón de compra
const seatingArea = document.getElementById("seatingArea");
const buySeatsButton = document.getElementById("buySeatsButton");
const sesionId  = localStorage.getItem('sesionId')
const idHorario = localStorage.getItem("selectedHorarioId");

// Verificar si seatingArea existe
if (!seatingArea) {
    console.error("No se encontró el elemento seatingArea en el HTML.");
}

const seatColors = {
    free: "#007bff",       
    selected: "#ffc107",   
    sold: "#dc3545",
    vip: "#097969"        
};
fetch(`http://localhost:5000/CinemaParaiso/Horario/${idHorario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los asientos");
            }
            return response.json();
        })
        .then(data => {
            // Obtener el contenedor de la zona de asientos
            const seatingArea = document.getElementById("seatingArea");
            if (!seatingArea) {
                console.error("No se encontró el elemento seatingArea en el HTML.");
                return;
            }

            // Generar los asientos dinámicamente
            seatingArea.innerHTML = ""; // Limpiar el área antes de generar

            // Crear un array para los asientos
            const seats = data.map(asiento => {
                return {
                    id: asiento.idAsiento,
                    status: asiento.estado // Estado: "free", "sold", "selected", "vip"
                };
            });

            // Crear el diseño de los asientos
            seats.forEach(asiento => {
                const seatDiv = document.createElement("div");
                seatDiv.className = "seat-item";
                seatDiv.id = `seat-${asiento.id}`;
                seatDiv.style.backgroundColor = seatColors[asiento.status];

                // Añadir evento de clic para cambiar el estado del asiento
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



fetch(`http://localhost:5000/CinemaParaiso/Sesion/${sesionId}`)
.then(response => {
    if (!response.ok) {
        throw new Error("Error al obtener las películas");
    }
    return response.json();
})
.then(peliculas => {
    peliculas.forEach(pelicula => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        itemDiv.innerHTML = `
            <a href="../html/PeliculaHorariosYSala.html?id=${pelicula.idPelicula}" class="pelicula-link"> <!-- Enlace a la página de detalles -->
                <div class="pelicula">
                    <img src="${pelicula.imagen}" alt="${pelicula.nombre}">
                    <h3>${pelicula.nombre}</h3>
                </div>
            </a>
        `;

        owlPelis.appendChild(itemDiv);
    });

    // Emitir evento personalizado cuando las películas están cargadas
    document.dispatchEvent(new Event("peliculasCargadas"));
})
.catch(error => {
    console.error("Error:", error);
    owlPelis.innerHTML = "<p>Error al cargar las películas</p>";
});

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
