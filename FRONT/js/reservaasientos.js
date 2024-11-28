import config from "./config.js";

const seatColors = {
    free: "#007bff",
    pending: "#ffc107",
    occupied: "#dc3545"
};

let total = 0;

const params = new URLSearchParams(window.location.search);
const idPelicula = params.get("idPelicula");
const idHorario = params.get("idHorario");

if (!idPelicula || !idHorario) {
    console.error("Faltan parámetros en la URL.");
} else {
    const urlDetalles = `${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idHorario}`;

    fetch(urlDetalles)
        .then(response => response.ok ? response.json() : Promise.reject("Error al obtener los detalles."))
        .then(data => {
            const movieLayout = document.querySelector(".movie-layout");
            if (!movieLayout) return;

            const precioAsiento = data.horario.sala.precioAsiento;
            const horario = data.horario;
            if (!horario || !horario.sala) return;

            movieLayout.innerHTML = `
                <div class="movie-poster">
                    <img src="${data.pelicula.imagen}" alt="Póster de ${data.pelicula.nombre}" class="movie-poster-image">
                </div>
                <div class="movie-details">
                    <p><strong>${data.pelicula.nombre}</strong></p>
                    <p><strong>Sala:</strong> ${horario.sala.nombreSala}</p>
                    <p><strong>Precio:</strong> ${precioAsiento} €</p>
                    <p><strong>Horario:</strong> ${horario.hora.replace("T", " ")}</p>
                </div>
            `;
        })
        .catch(error => console.error(error));

    const pendingSeats = [];

    fetch(urlDetalles)
        .then(response => response.ok ? response.json() : Promise.reject("Error al obtener los datos de los asientos."))
        .then(sesion => {
            const seatingArea = document.getElementById("seatingArea");
            if (!seatingArea) return;

            seatingArea.innerHTML = "";
            sesion.asientosDisponibles.forEach(asiento => {
                const { idAsiento, estado, precioAsiento } = asiento;

                const seatDiv = document.createElement("div");
                seatDiv.classList.add("seat-item");
                seatDiv.style.backgroundColor = estado ? seatColors.occupied : seatColors.free;
                seatDiv.dataset.idAsiento = idAsiento;
                seatDiv.dataset.estado = estado;
                seatDiv.dataset.precio = precioAsiento;

                seatingArea.appendChild(seatDiv);
            });

            manageSeatActions(pendingSeats, seatingArea, sesion.idSesion);
        })
        .catch(error => console.error(error));
}

function manageSeatActions(pendingSeats, seatingArea, sesionId) {
    const confirmSeatsButton = document.getElementById("confirmSeatsButton");
    const buySeatsButton = document.getElementById("buySeatsButton");
    const selectedSeatsList = document.getElementById("selectedSeatsList");
    const totalDisplay = document.getElementById("totalPrice");

    seatingArea.addEventListener("click", (event) => {
        const seatDiv = event.target;
        const idAsiento = seatDiv.dataset.idAsiento;
        const estado = seatDiv.dataset.estado;
        const precioAsiento = parseFloat(seatDiv.dataset.precio);

        if (idAsiento !== undefined) {
            if (estado === "false") {
                seatDiv.style.backgroundColor = seatColors.pending;
                seatDiv.dataset.estado = "pending";
                pendingSeats.push({ idAsiento: parseInt(idAsiento), precio: precioAsiento });
                total += precioAsiento;
            } else if (estado === "pending") {
                seatDiv.style.backgroundColor = seatColors.free;
                seatDiv.dataset.estado = "false";
                const index = pendingSeats.findIndex(seat => seat.idAsiento === parseInt(idAsiento));
                if (index > -1) {
                    total -= pendingSeats[index].precio;
                    pendingSeats.splice(index, 1);
                }
            }

            updateSelectedSeatsList(pendingSeats, selectedSeatsList);
            if (totalDisplay) totalDisplay.textContent = `Total: ${total.toFixed(2)}`;
        }
    });

    if (confirmSeatsButton) {
        confirmSeatsButton.addEventListener("click", () => {
            fetch(`${config.API_ENDPOINT}/CinemaParaiso/Sesion/${sesionId}/Asientos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pendingSeats: pendingSeats.map(seat => seat.idAsiento) })
            })
                .then(response => response.ok ? response.json() : Promise.reject("Error al confirmar los asientos."))
                .then(() => {
                    pendingSeats.forEach(seat => {
                        const seatDiv = seatingArea.querySelector(`[data-id-asiento='${seat.idAsiento}']`);
                        if (seatDiv) {
                            seatDiv.style.backgroundColor = seatColors.occupied;
                            seatDiv.dataset.estado = "true";
                        }
                    });
                    pendingSeats.length = 0;
                    total = 0;
                    updateSelectedSeatsList(pendingSeats, selectedSeatsList);
                    if (totalDisplay) totalDisplay.textContent = `0.00 €`;
                    alert("Asientos confirmados con éxito.");
                })
                .catch(error => console.error(error));
        });
    }

    if (buySeatsButton) {
        buySeatsButton.addEventListener("click", () => {
            fetch(`${config.API_ENDPOINT}/CinemaParaiso/Sesion/${sesionId}/Asientos`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pendingSeats.map(seat => seat.idAsiento))
            })
                .then(response => response.ok ? response.json() : Promise.reject("Error al marcar los asientos como ocupados."))
                .then(() => {
                    window.location.reload();
                    alert("Compra realizada con éxito. Los asientos están ocupados.");
                    window.location.href = `pago.html`;
                })
                .catch(error => console.error(error));
        });
    }
}

function updateSelectedSeatsList(pendingSeats, selectedSeatsList) {
    selectedSeatsList.innerHTML = "";
    pendingSeats.forEach(seat => {
        const li = document.createElement("li");
        li.textContent = `Asiento ${seat.idAsiento} - ${seat.precio.toFixed(2) }€`;
        selectedSeatsList.appendChild(li);
    });
}
