import config from "./config.js";

const seatColors = {
    free: "#007bff",
    selected: "#ffc107",
    sold: "#dc3545"
};

// Obtener el ID de la sesión directamente de la URL
const params = new URLSearchParams(window.location.search);
const idSesion = params.get("idSesion");

if (!idSesion) {
    console.error("Faltan parámetros en la URL.");
} else {
    const urlDetalles = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idSesion}`;

    // Obtener detalles de la sesión (película, horario, sala y asientos)
    fetch(urlDetalles)
        .then(response => response.json())
        .then(data => {
            const movieLayout = document.querySelector(".movie-layout");
            const seatingArea = document.getElementById("seatingArea");
            const selectedSeatsContainer = document.getElementById("selected-seats");
            const totalContainer = document.getElementById("total-container"); // Contenedor para mostrar el total

            if (!movieLayout || !seatingArea || !selectedSeatsContainer || !totalContainer) {
                console.error("Faltan contenedores HTML necesarios.");
                return;
            }

            const pelicula = data.pelicula;
            const horario = data.horario;
            const sala = horario.sala;
            const asientos = data.asientosDisponibles;

            movieLayout.innerHTML = `
                <div class="movie-poster">
                    <img src="${pelicula.imagen}" alt="Póster de ${pelicula.nombre}" class="movie-poster-image">
                </div>
                <div class="movie-details">
                    <h3>${pelicula.nombre}</h3>
                    <p><strong>Sala:</strong>  ${sala.nombreSala}</p> 
                    <p><strong>Horario:</strong>  ${horario.hora.replace("T", " ")}</p>
                    <p><strong>Precio Asiento:</strong>  ${sala.precioAsiento}€</p>
                </div>
                <div class="movie-trailer">
                    <h2>Trailer</h2>
                    <iframe 
                        src="${pelicula.trailerUrl || ""}" 
                        title="Trailer de ${pelicula.nombre}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;

            seatingArea.innerHTML = ""; // Limpiar el área de asientos
            selectedSeatsContainer.innerHTML = ''; // Limpiar los asientos seleccionados
            totalContainer.innerHTML = ''; // Limpiar el total

            const selectedSeats = new Set(); // Usar un Set para evitar duplicados

            asientos.forEach(asiento => {
                const seatDiv = document.createElement("div");
                seatDiv.className = "seat-item";
                seatDiv.id = `seat-${asiento.idAsiento}`;
                seatDiv.style.backgroundColor = asiento.libre ? seatColors.free : seatColors.sold;

                seatDiv.addEventListener("click", () => {
                    if (asiento.libre && !selectedSeats.has(asiento.idAsiento)) {
                        asiento.libre = false;
                        seatDiv.style.backgroundColor = seatColors.selected;
                        selectedSeats.add(asiento.idAsiento); // Añadir el asiento a los seleccionados
                    } else if (!asiento.libre && selectedSeats.has(asiento.idAsiento)) {
                        asiento.libre = true;
                        seatDiv.style.backgroundColor = seatColors.free;
                        selectedSeats.delete(asiento.idAsiento); // Eliminar de los seleccionados
                    }

                    // Actualizar el área de asientos seleccionados
                    selectedSeatsContainer.innerHTML = Array.from(selectedSeats)
                        .map(id => {
                            const asientoSeleccionado = asientos.find(a => a.idAsiento === id);
                            return `<p>Asiento ${asientoSeleccionado.numAsiento} seleccionado - Precio: ${sala.precioAsiento}€</p>`;
                        })
                        .join('');

                    // Calcular el total
                    const total = selectedSeats.size * sala.precioAsiento;
                    totalContainer.innerHTML = `<p>Total: ${total}€ (${selectedSeats.size} asiento(s) seleccionado(s))</p>`;
                });

                seatingArea.appendChild(seatDiv);
            });

            // Función para comprar los asientos seleccionados
            const buyButton = document.getElementById("buySeatsButton");
            if (buyButton) {
                buyButton.addEventListener("click", () => {
                    if (selectedSeats.size === 0) {
                        alert("Por favor seleccione al menos un asiento.");
                        return;
                    }

                    // Enviar la solicitud para marcar los asientos como ocupados
                    const seatIds = Array.from(selectedSeats); // Convertir Set a Array
                    const total = selectedSeats.size * sala.precioAsiento;

                    fetch(`${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idSesion}/Asientos`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(seatIds) // Enviar los IDs de los asientos seleccionados
                    })
                    .then(response => {
                        if (response.ok) {
                            // Cambiar color de los asientos a ocupado
                            seatIds.forEach(seatId => {
                                const seatDiv = document.getElementById(`seat-${seatId}`);
                                if (seatDiv) {
                                    seatDiv.style.backgroundColor = seatColors.sold; // Cambiar color a rojo (ocupado)
                                }
                            });

                            console.log(`Asientos ${seatIds.join(", ")} marcados como ocupados`);
                            
                            // Redirigir a la página de pago
                            window.location.href = `pago.html?idSesion=${idSesion}&total=${total}&seats=${seatIds.join(',')}`;
                        } else {
                            response.json().then(errorData => {
                                console.error("Error al marcar los asientos como ocupados:", errorData);
                                alert("Hubo un problema al marcar los asientos como ocupados.");
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error al realizar la solicitud:", error);
                        alert("Hubo un error al procesar la compra.");
                    });
                });
            }

        })
        .catch(error => {
            console.error("Error al cargar los detalles de la sesión:", error);
        });
}
