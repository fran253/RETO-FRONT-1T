const imagenesPago = document.querySelectorAll('.imagen__pago');

imagenesPago.forEach((imagen) => {
  imagen.addEventListener('click', () => {
    // Quitar la clase 'activo' de todos los recuadros
    imagenesPago.forEach((btn) => btn.classList.remove('activo'));
    // Agregar la clase 'activo' al recuadro clickeado
    imagen.classList.add('activo');
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idSesion = params.get("idSesion");
    const total = params.get("total");
    const seats = params.get("seats").split(',');

    const totalPagoContainer = document.querySelector(".total__pago p:last-child");
    const seatsListContainer = document.querySelector(".total__pago p:first-child");

    totalPagoContainer.textContent = `${total}€`;
    seatsListContainer.innerHTML = `Asientos seleccionados: ${seats.join(", ")}`;

    const payButton = document.querySelector(".total__pago button");
    payButton.addEventListener("click", () => {
        // Verificar si los asientos seleccionados están disponibles
        if (seats.length === 0) {
            alert("No hay asientos seleccionados.");
            return;
        }

        // Realizar la solicitud PUT para marcar los asientos como ocupados
        fetch(`${config.API_ENDPOINT}/CinemaParaiso/Sesion/${idSesion}/Asientos`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seats) // Enviar los IDs de los asientos seleccionados
        })
        .then(response => {
            if (response.ok) {
                // Cambiar color de los asientos a ocupado (esto es opcional, se actualizará en la API)
                alert("Pago procesado con éxito. Los asientos han sido ocupados.");

                // Redirigir a la página de confirmación
                window.location.href = `confirmacion.html?idSesion=${idSesion}`;
            } else {
                response.json().then(errorData => {
                    console.error("Error al marcar los asientos como ocupados:", errorData);
                    alert("Hubo un problema al procesar el pago.");
                });
            }
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
            alert("Hubo un error al procesar el pago.");
        });
    });
});

